const {z} = require("zod");

const stdntUpdateValidCheck = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .regex(/^[a-zA-Z ]+$/, { message: "Name must be a string" })
        .min(3, { message: "Name must be at least 3 characters" })
        .max(50, { message: "Name must be less than 50 characters" }),
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email" }),
    phone: z
        .string({ required_error: "Phone number is required" })
        .regex(/^[0-9]+$/, { message: "Phone number must be a number" })
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(10, { message: "Phone number cannot be more than 10 digits" }),
    paddress: z
        .string({ required_error: "Permanent address is required" })
        .min(3, { message: "Please enter a valid address" })
        .max(50, { message: "Permanent address must be less than 50 characters" }),
        pname: z
      .string({ required_error: "Name of the parent is required" })
      .regex(/^[a-zA-Z ]+$/, { message: "Name of the parent must be a string" })
      .min(3, { message: "Name of the parent must be at least 3 characters" })
      .max(50, { message: "Name of the parent must be less than 50 characters" }),
    rltn: z
      .string({ required_error: "Relation with the parent is required" })
      .min(3, { message: "Relation with the parent must be at least 3 characters" })
      .max(50, { message: "Relation with the parent must be less than 50 characters" }),
    cnumber: z
      .string({ required_error: "Contact number is required" })
      .regex(/^[0-9]+$/, { message: "Contact number must be a number" })
      .min(10, { message: "Contact number must be at least 10 digits" })
      .max(10, { message: "Contact number cannot be more than 10 digits" }),
      college: z
      .string({ required_error: "College name is required" })
      .regex(/^[a-zA-Z ]+$/, { message: "College name must be a string" })
      .min(3, { message: "College name must be at least 3 characters" })
      .max(50, { message: "College name must be less than 50 characters" }),
    admission: z
      .string({ required_error: "Admission number is required" })
      .min(9, { message: "Admission number must be at least 9 characters" })
      .max(10, {
        message: "Admission number cannot be more than 10 characters",
      }),
    department: z
      .string({ required_error: "Department name is required" })
      .regex(/^[a-zA-Z ]+$/, { message: "Department name must be a string" })
      .min(3, { message: "Department name must be at least 3 characters" })
      .max(50, { message: "Department name must be less than 50 characters" }),
    semester: z
      .string({ required_error: "Semester is required" })
      .regex(/^[1-6]$/, {
        message: "Semester must be a number between 1 to 6",
      }),
    duration: z
      .string({ required_error: "Duration is required" })
      .regex(/^[1-6]$/, {
        message: "Duration must be a number between 1 to 6",
      })
});

module.exports = {stdntUpdateValidCheck} 