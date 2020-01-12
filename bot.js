const tmi = require("tmi.js")
const secrets = require("./config.json");
var prefix = "?"


var config = {
    options: {
        debug: true
    },
    connection: {
        cluster: (secrets.cluster),
        reconnect: true
    },
    identity: {
        username: (secrets.username),
        password: (secrets.password)
    },
    channels: [(secrets.channels)]
}

var client = new tmi.client(config)
client.connect();
console.log('============================')
console.log(' ____   ___________ _______')
console.log(' |__] \_/  | |___|__]|  | | ')
console.log(' |__]  |  | |___|__]|__| | ')
console.log('')
console.log('============================')
console.log()
client.on("connected", (address, port) => {
    client.action("The bot has connected on" + address + ":" + port)
})

/*Events*/
client.on("cheer", (channel, username, userstate, message) => {
  try {
      let cheerFile = require(`./events/cheer.js`)
      cheerFile.run(channel, username, userstate, message)
  } catch (err) {
      return;
  }
});

/*Commands*/
client.on("chat", (channel, user, message, self) => {
    if (self) return;

    const args = message.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    try {
        let commandFile = require(`./commands/${cmd}.js`)
        commandFile.run(client, message, args, user, channel, self)
    } catch (err) {
        return;
    }

})
