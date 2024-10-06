const { z } = require("zod");

const stdntSignupValidCheck = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(10, { message: "Phone number cannot be more than 10 digits" })
    .regex(/^[0-9]+$/, { message: "Phone number must be a number" }),
  college: z
    .string({ required_error: "College name is required" })
    .min(3, { message: "College name must be at least 3 characters" })
    .max(50, { message: "College name must be less than 50 characters" }),
  admission: z
    .string({ required_error: "Admission number is required" })
    .min(9, { message: "Admission number must be at least 9 characters" })
    .max(10, { message: "Admission number cannot be more than 10 characters" }),
  department: z
    .string({ required_error: "Department name is required" })
    .min(3, { message: "Department name must be at least 3 characters" })
    .max(50, { message: "Department name must be less than 50 characters" }),
  semester: z
    .string({ required_error: "Semester is required" })
    .min(1, { message: "Semester must be at least 1 character" })
    .max(1, { message: "Semester cannot be more than 1 character" })
    .regex(/^[1-6]$/, { message: "Semester must be a number between 1 to 6" }),
  duration: z
    .string({ required_error: "Duration is required" })
    .min(1, { message: "Duration must be at least 1 character" })
    .max(1, { message: "Duration cannot be more than 1 character" })
    .regex(/^[1-6]$/, { message: "Duration must be a number between 1 to 6" }),
  pass: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password must be less than 50 characters" }),
  confirm: z
    .string({ required_error: "Confirm password is required" })
    .min(6, { message: "Confirm password must be at least 6 characters and same as password" })
    .max(50, { message: "Confirm password must be less than 50 characters and same as password" }),   
  mess: z
    .string({ required_error: "Mess name is required" })
    .min(2, { message: "Mess name must be at least 3 characters" })
    .max(3, { message: "Mess name must be less than 3 characters" }),
  date: z
    .string({ required_error: "Date is required" })
    .min(10, { message: "Date must be at least 10 character" })
    .max(10, { message: "Date cannot be more than 10 character" }),
  pdone: z
    .string({ required_error: "Payment done is required" })
    .min(2, { message: "Payment done must be at least 2 character" })
    .max(3, { message: "Payment done cannot be more than 3 character" }),
  hpay: z
    .string({ required_error: "Hostel payment is required" })
    .min(4, { message: "Hostel payment must be at least 4 digits" })
    .max(5, { message: "Hostel payment cannot be more than 5 digits" })
    .regex(/^[0-9]+$/, { message: "Mess payment must be a number" }),
  mpay: z
    .string({ required_error: "Mess payment is required" })
    .min(4, { message: "Mess payment must be at least 4 digits" })
    .max(5, { message: "Mess payment cannot be more than 5 digits" })
    .regex(/^[0-9]+$/, { message: "Mess payment must be a number" }),
}).refine((value) => value.pass === value.confirm, {message: "Password and Confirm password must be same", path: ["confirm"]});

module.exports = stdntSignupValidCheck;