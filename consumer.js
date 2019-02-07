var amqp = require('amqp-connection-manager');

var QUEUE_NAME = 'messages'

var connection = amqp.connect(['amqp://localhost'], { json: true });
connection.on('connect', function () {
    console.log('Connected!');
});
connection.on('disconnect', function (params) {
    console.log('Disconnected.', params.err.stack);
});

var channelWrapper = connection.createChannel({
    setup: function (channel) {
        return Promise.all([
            channel.assertQueue(QUEUE_NAME, { durable: true }),
            channel.prefetch(1),
            channel.consume(QUEUE_NAME, onMessage)
        ]);
    }
});

channelWrapper.waitForConnect()
    .then(function () {
        console.log("Listening for messages");
    });

var onMessage = function (data) {
    setTimeout(function () {
        var message = JSON.parse(data.content.toString());
        console.log("receiver: got message", message);
        channelWrapper.ack(data);
    }, 2000);
}    