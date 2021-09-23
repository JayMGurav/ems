import { setAuthTokenCookie } from "@/utils/authCookies";
import { createJWT } from "@/utils/jwt";
import bcrypt from "bcryptjs";

const QueryResolvers = {
  /**
   *
   * Get all Hr data
   * @returns Hr
   * @Role None
   * @Permission None
   */
  async getAllHrs(_parent, _args, { Hr }) {
    return await Hr.find({}).exec();
  },
};

const MutationResolvers = {
  /**
   *
   * Create Hr
   * @returns Hr
   * @Role None
   * @Permission None
   */
  async registerHR(_parent, { input }, { Hr, res }) {
    try {
      const existingHr = await Hr.findOne({
        email: input.email,
      }).exec();

      if (Boolean(existingHr)) {
        return new Error(`Hr with ${input.email} already exist!, Please login`);
      }

      const { password, ...userData } = input;
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const time_now = new Date();
      const newHr = await Hr.create({
        ...userData,
        password: passwordHash,
        lastLoginAt: time_now,
      });
      if (newHr) {
        const jwtToken = createJWT(newHr, time_now);
        setAuthTokenCookie(res, jwtToken);
        return newHr;
      } else {
        return null;
      }
    } catch (error) {
      return new Error("Error registering HR: " + error.message);
    }
  },

  /**
   *
   * Login Hr
   * @returns Hr
   * @Role None
   * @Permission None
   */
  async loginHR(_parent, { input }, { Hr, res }) {
    try {
      const { email, password } = input;
      const hr = await Hr.findOne({ email }).exec();
      if (!hr) {
        return new Error("No such HR found, please register");
      }
      const valid = await bcrypt.compare(password, hr.password);
      if (!valid) {
        throw new Error("Invalid password!");
      } else {
        const time_now = new Date().toString();
        // update last Login time
        hr.lastLoginAt = time_now;
        await hr.save();
        const jwtToken = createJWT(hr, time_now);
        setAuthTokenCookie(res, jwtToken);
        return hr;
      }
    } catch (error) {
      return new Error("Error logging in HR: " + error.message);
    }
  },

  /**
   *
   * Deletes Hr
   * @returns Boolean
   * @Role None
   * @Permission None
   */
  async removeHr(_parent, { id }, { Hr }) {
    try {
      const deletedHr = await Hr.findByIdAndRemove(id).exec();
      return Boolean(deletedHr);
    } catch (error) {
      return new Error("Error deleting HR: " + error.message);
    }
  },
};

const hrResolvers = {
  Query: QueryResolvers,
  Mutation: MutationResolvers,
};

export default hrResolvers;
