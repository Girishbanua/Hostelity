const stdntUpdateValidate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        console.log(err.errors);        
        const status = 422
        const message = "Fill the input properly"          
        const error = {status, message}
        next(error)        
        console.log("Error while updating student",error);
    }
}

module.exports = stdntUpdateValidate