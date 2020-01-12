exports.run = (channel, username, userstate, message) => {
    client.say(channel, username + ' wirft ' + userstate.bits + ' Bits in den Speicher!');
}
