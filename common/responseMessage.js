const success = (response,message,data={}) => {
    return response.json({
        message:message,
        data:data,
        success:true
    })
}
const error = (response,errors) => {
    return response.json({
        errors,
        success:false,

    })
}

module.exports = {
    success,
    error
}