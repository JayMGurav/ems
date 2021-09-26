import { setAuthTokenCookie } from "@/utils/authCookies";
import { createJWT } from "@/utils/jwt";
import {
  createNewHr,
  findAllHrs,
  findHrByEmail,
  removeHrById,
} from "./controllers";
import { checkPasswordValidity } from "@/utils/bcryptUtils";

const QueryResolvers = {
  /**
   *
   * Get all Hr data
   * @returns Hr
   * @Role None
   * @Permission None
   */
  async getAllHrs(_parent, _args, { Hr }) {
    return await findAllHrs(Hr);
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
      // since input is type restricted by schema its safe to spread it here,
      const newHr = await createNewHr({ ...input }, Hr);

      if (newHr) {
        const jwtToken = createJWT(newHr);
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
      console.log({ email, password });
      const hr = await findHrByEmail(email, Hr);
      console.log({ hr });
      if (!hr) {
        return new Error("No such HR found, please register");
      }
      const validPassword = await checkPasswordValidity(password, hr.password);
      console.log({ validPassword });
      if (validPassword) {
        const time_now = new Date().toString();

        // update last Login time
        hr.lastLoginAt = time_now;
        await hr.save();
        const jwtToken = createJWT(hr);
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
      const deletedHr = await removeHrById(id, Hr);
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
