import bcrypt from "bcryptjs";

export async function createNewHr({ fullname, email, password }, Hr) {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const time_now = new Date();
  return await Hr.create({
    fullname,
    email,
    password: passwordHash,
    lastLoginAt: time_now,
  });
}

export async function removeHrById(id, Hr) {
  return await Hr.findByIdAndRemove(id).exec();
}

export async function findAllHrs(Hr) {
  return await Hr.find({}).exec();
}

export async function findHrByEmail(email, Hr) {
  return await Hr.findOne({ email }).exec();
}
