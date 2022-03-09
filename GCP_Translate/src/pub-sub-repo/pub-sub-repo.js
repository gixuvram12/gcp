

//publishing message to topic
    const publishMessage = async function (pubSubClient, topicName, payload) {
        const dataBuffer = Buffer.from(JSON.stringify(payload));
        const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
        return dataBuffer;
    } 

module.exports = { publishMessage };
