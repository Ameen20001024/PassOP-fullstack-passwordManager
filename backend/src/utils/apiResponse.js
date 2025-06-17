class ApiResponse{
    constructor(statuscode, data, message = "Success"){
        this.statuscode = statuscode
        this.data = data
        this.success = true
        this.message = message
    }
}

export {ApiResponse}