const loginController = require('./../controllers/login.ctrl')
module.exports = (router) => {
    router
        .route('/userLogin')
        .post(loginController.loginUser)

}