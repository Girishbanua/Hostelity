const { z } = require("zod");

const stdntSignupValidCheck = z
  .object({
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
      }),
    pass: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must be less than 50 characters" }),
    confirm: z
      .string({ required_error: "Confirm password is required" })
      .min(6, {
        message:
          "Confirm password must be at least 6 characters and same as password",
      })
      .max(50, {
        message:
          "Confirm password must be less than 50 characters and same as password",
      }),
    mess: z.string({ required_error: "Please choose a mess option" }),
    date: z
      .string({ required_error: "Date is required" })
      .min(10, { message: "Date must be at least 10 character" })
      .max(10, { message: "Date cannot be more than 10 character" }),
    seater: z.string({ required_error: "Seater is required" }),
    pdone: z.string({
      required_error: "Payment must be done before registration!",
    }),
    hpay: z.string({
      required_error: "Please choose one of the hostel payment option",
    }),
    mpay: z
      .string({ required_error: "Mess payment is required" })
      .regex(/^[0-9]+$/, { message: "Mess payment must be a number" }),
  })
  .refine((value) => value.pass === value.confirm, {
    message: "Password and Confirm password must be same",
    path: ["confirm"],
  });

module.exports = stdntSignupValidCheck;
