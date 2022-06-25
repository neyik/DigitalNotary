const Web3 = require('web3');
const jsSHA = require("jssha");
const fs = require("fs");

let web3 = undefined;
let contract = undefined;

function init () {
  let provider = new Web3.providers.HttpProvider("http://localhost:8545");
  web3 = new Web3(provider);
  let abi = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "hash",
          "type": "bytes32"
        }
      ],
      "name": "RegDHash",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "hash",
          "type": "bytes32"
        }
      ],
      "name": "SearchHash",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ];
  let address = "0xe760F7f79Ac331c8Cfe188026107A090c6d77bd3";
  contract = new web3.eth.Contract(abi, address);
};

function computeHash (fileName) {
  let fileContent = fs.readFileSync(fileName);
  return computeHashB(fileContent);
};

function computeHashB (data) {
  let  shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
  shaObj.update(data);
  let hash = "0x" + shaObj.getHash("HEX");
  return hash;
};

function sendHash (hash, callback) {
    web3.eth.getAccounts(function (error, accounts) {
      contract.methods.RegDHash(hash).reg({
        from: accounts[0]
      },function(error, tx) {
        if (error) callback(error, null);
        else callback(null, tx);
      });
    });
};

function findHash (hash, callback) {
  contract.methods.SearchHash(hash).call( function (error, result) {
    if (error) callback(error, null);
    else {
      let resultObj = {
        timestamp:  new Date(result[0] * 1000),
        blockNumber: result[1]
      }
      callback(null, resultObj);
    }
  });
};

let NotaryExports = {
  findHash : findHash,
  sendHash : sendHash,
  computeHash : computeHash,
  init : init,
  computeHashB : computeHashB,
};

module.exports = NotaryExports;