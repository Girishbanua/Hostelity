const stdntLoginValidate = (schema) => async (req, res, next) => {
    try{
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        next()
    }catch(err){
        console.log(err.errors);        
        const status = 422
        const message = "Fill the input properly"  
        const extraInfo = err.errors[0].message;
        const error = {status, message, extraInfo}
        next(error)
        console.log(error)
    }
}

module.exports = stdntLoginValidate