function socket(io) {
    // start listen with socket.io
    io.on('connection', function(socket){
      console.log('a user connected');
      socket.on('message', function(msg){
        var data = {
            text: msg
        };
        io.emit('chat message', data);
      });
    });
  }
  
  module.exports = socket;