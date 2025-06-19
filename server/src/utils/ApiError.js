class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        error=[],
        stack="",
        suggestedFix
        
    ){
        super(message)

        this.statusCode = statusCode;
        this.data = null
        this.message = message;
        this.success = false;
        this.error = error
        this.suggestedFix = suggestedFix;
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}

//  = ApiError;