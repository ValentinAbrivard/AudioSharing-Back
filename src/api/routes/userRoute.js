module.exports = (server) => {
    const userController = require('../controllers/userController');

    server.route('/user')
    .get(userController.list_all_users)
    .post(userController.create_a_user);

    server.route('/user/token')
    .post(userController.create_a_token_from_user);


    server.post('/user/login', userController.user_login)

}
