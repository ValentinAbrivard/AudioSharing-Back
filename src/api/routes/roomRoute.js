module.exports = (server) => {
    const roomController = require('../controllers/roomController');

    server.route('/room')
    .get(roomController.list_all_rooms) //ok
    .post(roomController.create_a_room); //ok

    server.route('/room/:room_id')
    .get(roomController.get_a_room) //ok
    .post(roomController.change_name_room) //ok
    .delete(roomController.delete_a_room); //ok

    server.route('/room/:room_id/live')
    .post(roomController.live_room); //ok

    server.route('/room/:room_id/:user_id')
    .post(roomController.add_user_in_room) //ok
    .delete(roomController.delete_user_in_room); //ok

}
