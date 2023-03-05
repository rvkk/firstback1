class ResponseModelFactory {
    static GetSuccessResponseModel(result) {
        const responseModel = new ResponseModel();
        responseModel.setSuccessResponse(result);
        return responseModel;
    }

    static GetErrorResponseModel(statusCode, errorMessage) {
        const responseModel = new ResponseModel();
        responseModel.setErrorResponse(statusCode, errorMessage);
        return responseModel;
    }
}

class ResponseModel {
    success;
    statusCode;
    message;
    result;

    setSuccessResponse(result) {
        this.result = result;
        this.success = true;
        this.statusCode = 200;
    }

    setErrorResponse(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
    }
}

module.exports = {
    ResponseModelFactory, ResponseModel
}