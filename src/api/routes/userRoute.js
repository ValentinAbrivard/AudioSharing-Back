module.exports = (server) => {
    const userController = require('../controllers/userController');

    server.route('/user')
    .get(userController.list_all_users) //ok
    .post(userController.create_a_user); //ok

    server.route('/user/:user_id')
    .get(userController.get_a_user) //ok
    .delete(userController.delete_a_user); //ok

    server.route('/user/:user_id/modify')
    .post(userController.update_user); //ok

    server.route('/user/token')
    .post(userController.create_a_token_from_user); //ok


    server.route('/user/login')
    .post(userController.user_login); //ok

}
