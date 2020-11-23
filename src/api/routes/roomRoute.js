module.exports = (server) => {
    const roomController = require('../controllers/roomController');

    server.route('/room')
    .get(roomController.list_all_rooms)
    .post(roomController.create_a_room);

}