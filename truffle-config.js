const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = require("./secrets.json").mnemonic;

module.exports = {
  networks: {
    ropsten: {
       provider: () => new HDWalletProvider(mnemonic, `https://speedy-nodes-nyc.moralis.io/eec2a136121f189bdf1631fc/eth/ropsten`),
       network_id: 3,       // Ropsten's id
       gas: 5500000,        // Ropsten has a lower block limit than mainnet
       confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
       timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
       skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
     },
     development:{
      host: '127.0.0.1',
      
      network_id: '*', // eslint-disable-line camelcase 
      
     }
  },
  mocha: {
  },
  compilers: {
    solc: {
      version: "0.8.14",      // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};
