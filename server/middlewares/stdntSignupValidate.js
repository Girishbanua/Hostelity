const { z } = require("zod");

const stdntSignupValidate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {   
        // if(err instanceof z.ZodError){
        //     // const errorMsg = err.issues.map((issue) => {
        //     //     return issue.message
        //     // })
        //     err.issues.forEach((errorMsg) => {
        //         return errorMsg
        //     }); 
        //     res.status(400).json({message: errorMsg})
        // }     
        console.log(err)
        const status = 422
        const message = "Fill the input properly"  
        const extraInfo = err.errors[0].message;
        const error = {status, message, extraInfo}        
        res.status(400).json({ message: extraInfo });
        next(error)
    }    
}

module.exports = stdntSignupValidate