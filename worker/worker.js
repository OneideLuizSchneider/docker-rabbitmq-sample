var amqp = require('amqp-connection-manager');

var QUEUE_NAME = 'messages';

var connection = amqp.connect(['amqp://localhost']);
connection.on('connect', function () {
    console.log('Connected!');
});
connection.on('disconnect', function (params) {
    console.log('Disconnected.', params.err.stack);
});

var channelWrapper = connection.createChannel({
    json: true,
    setup: function (channel) {
        return channel.assertQueue(QUEUE_NAME, { durable: true })
    }
});

var sendMessage = function (message) {
    channelWrapper.sendToQueue(QUEUE_NAME, message)
        .then(function () {
            console.log("Message sent");
        })
        .then(function () {
            setTimeout(function () {
                return sendMessage({ time: Date() });
            }, 1000);

        }).catch(function (err) {
            console.log("Message was rejected:", err.stack);
            channelWrapper.close();
            connection.close();
        });
};

sendMessage({ time: Date() });