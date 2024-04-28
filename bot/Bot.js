// imports
const mineflayer = require('mineflayer');
const fs = require('fs');
const vec3 = require('vec3');
const { brotliCompress } = require('zlib');
// imports //

// hash system
const hashes = JSON.parse(fs.readFileSync('./hashes/hashes.json', 'utf8'));

let currentHash = hashes[Math.floor(Math.random() * hashes.length)];

const jokes = fs.readFileSync('./jokes.txt', 'utf8');
// hash system //

// bot setup
bot = mineflayer.createBot({
  host: 'botonlyserver.aternos.me',
  port: 25565,
  username: 'MachineBladeBOT',
  password: 'pASsWoRD',
  version: "1.20.1"
});
// bot setup //

// functions
function cloop(message, interval) { // clooping function
  setInterval(() => {
    bot.chat(message);
  }, interval);
}
function helpmessage() {
  setInterval(() => {
    bot.chat("Say (help for help");
  }, 120000);
}
function prefixmessage() {
  setInterval(() => {
    bot.chat("Prefix: (");
  }, 60000);
}
// functions //
// bot events
bot.on('login', function() {
    console.log("logged in");
    currentHash = hashes[Math.floor(Math.random() * hashes.length)];
    console.log("Current hash: " + currentHash);
    bot.chat(`/world world_flatlands`);
    helpmessage();
    prefixmessage();
});
bot.on('kicked', function(reason) {
    console.log("Got kicked for " +reason+" :( ");
});
bot.on('error', function(err) {
    console.log("Error: "+err);
});
bot.on('chat', async function(username, message) {
    if (username == bot.username) {
        return;
    }
    const words = message.split(' ');
    
    
    if (message == '(validate '+currentHash) {
        bot.chat("/tellraw @a {\"text\":\"Valid Hash\",\"color\":\"green\"}");
        currentHash = hashes[Math.floor(Math.random() * hashes.length)];
        console.log("New hash: " + currentHash);
    } else if (message == '(help') {
        bot.chat("/tellraw @a {\"text\":\"Commands: (validate [hash] - Validates hash, (randomwords - Generates random words, (block1 - 6 places a block (Not of your choice!), (cloop <hash> add <message> <interval>\",\"color\":\"green\"}");
    } else if (message == '(randomwords') {
        let words = "";
        for (let i = 0; i < 10; i++) {
            words += jokes[Math.floor(Math.random() * jokes.length)] + " ";
        }
        bot.chat("/tellraw @a {\"text\":\"" + words + "\",\"color\":\"blue\"}");
    } else if (message == '(buildhouse') {
        bot.chat("/tellraw @a {\"text\":\"Usage: (buildhouse <x,y,z>)\",\"color\":\"red\"}");
    } else if (message == '(block1 '+currentHash) {
      bot.chat(`/setblock -639583 -57 655279 minecraft:chain_command_block[facing=up]{Command:"deop @a"}`);
    } else if (message == '(block2 '+currentHash) {
      bot.chat(`/setblock -639583 -58 655279 minecraft:repeating_command_block[facing=up]{Command:"clone ~ ~3 ~ ~ ~2 ~ ~ ~ ~ "}`);
    } else if (message == '(block3 '+currentHash) {
      bot.chat(`/setblock -639583 -59 655279 minecraft:chain_command_block[facing=up]`);
    } else if (message == '(block4 '+currentHash) {
      bot.chat(`/setblock -639583 -60 655279 minecraft:repeating_command_block[facing=up]{Command:"clone ~ ~3 ~ ~ ~2 ~ ~ ~ ~ "}`);
    } else if (message == '(block5 '+currentHash) {
      bot.chat(`/setblock -639584 -60 655279 minecraft:redstone_block `);
    } else if (message == '(stopblocks '+currentHash) {
      bot.chat("/fill ~-639583 ~-60 ~655279 ~-639582 ~-59 ~655279 air destroy");
    } else if (message == '(resethashes') {
      bot.chat("/tellraw @a {\"text\":\"Resetting hashes\",\"color\":\"red\"}");
      hashes = JSON.parse(fs.readFileSync('./hashes/hashes.json', 'utf8'));
      currentHash = hashes[Math.floor(Math.random() * hashes.length)];
      console.log("New hash: " + currentHash);
    } else if (words[0] == '(cloop') {
      if (words[1] == currentHash) {
        if (words[2] == 'add') {
          let message = words.slice(3).join(' '); // clooping message
          let interval = parseInt(words[3]); // clooping interval
          cloop(message, interval);
        }
      }
    } else if (words[0] == '(echo') {
      let message = words[1];
      bot.chat(message);
    } else if (message.startsWith('(validate ')) {
      bot.chat("/tellraw @a {\"text\":\"Invalid Hash\",\"color\":\"red\"}");
    }

    
});