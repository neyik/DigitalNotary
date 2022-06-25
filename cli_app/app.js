const notary = require('./notaryLib.js');
const commandLineArgs = require('command-line-args');
const cmdOptions = [
  {
    name: "add",
    alias: "a",
    type: String
  },
  {
    name: "find",
    alias: "f",
    type: String
  }
];
const options = commandLineArgs(cmdOptions);
notary.init();

if (options.add) {
  console.log("Added hash value for this file: " + options.add);
  let hash = notary.computeHash(options.add);
  console.log("SHA-256 hash: " + hash);
  notary.sendHash(hash, function(error, tx) {
    console.log("Transaction ID: " + tx);
  });
}
else if (options.find) {
  console.log("Searching hash for this file: " + options.find);
  let hash = notary.computeHash(options.find);
  console.log("SHA-256 hash: " + hash);
  notary.findHash(hash, function (error, result) {
    if (result.blockNumber!=0)
    {
      console.log("Has value found at block No.: " + result.blockNumber);
      console.log("Timestamp: " + result.timestamp);
    }
    else console.log("Hash value does not exist on blockchain.");
  });
}
else {
  console.log("Not an option.");
}