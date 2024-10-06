const {z} = require("zod");

const stdntLoginValidCheck = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email" }),
    pass: z
        .string({ required_error: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters" })
        .max(50, { message: "Password must be less than 50 characters" }),
});

module.exports = stdntLoginValidCheck