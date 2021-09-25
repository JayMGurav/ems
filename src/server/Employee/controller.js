import bcrypt from "bcryptjs";

export async function createNewEmployee(
  { password, ...employeeData },
  Employee
) {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const time_now = new Date();
  return await Employee.create({
    ...employeeData,
    password: passwordHash,
    lastLoginAt: time_now,
  });
}

export async function findAllEmployees(Employee) {
  return await Employee.find({}).exec();
}

export async function findEmployeeByEmail(email, Employee) {
  return await Employee.findOne({ email }).exec();
}

export async function isEmployee(email, Employee) {
  return Boolean(await findEmployeeByEmail(email, Employee));
}

export async function findEmployeeById(id, Employee) {
  return await Employee.findById(id).exec();
}

/**
 *
 * @param {ID} id : employee id
 * @param {String} date : date of leave to apply
 * @param {String} reason  reason of leave
 * @param {Model} Employee employee model
 * @returns Updated Employee
 */
export async function applyEmployeeLeave(id, date, reason, Employee) {
  try {
    return await Employee.findByIdAndUpdate(
      id,
      {
        $push: { leaves: { date, reason } },
        $inc: { availableLeaves: -1 },
      },
      { new: true }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function removeEmployeeById(id, Employee) {
  return await Employee.findByIdAndRemove(id).exec();
}

/**
 *
 * @param {{employeeId, leaveId, leaveDate, status}} obj
 * @param {*} Employee
 * @returns updated  employee
 */
export async function findLeaveAndUpdateStatus(
  { employeeId, leaveId, leaveDate, status },
  Employee
) {
  return await Employee.findOneAndUpdate(
    { id: employeeId, "leaves._id": leaveId, "leaves.date": leaveDate },
    {
      $set: {
        "leaves.$.status": status,
      },
    },
    { new: true }
  );
}
