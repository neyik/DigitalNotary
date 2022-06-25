var contract = undefined;
var customProvider = undefined;
var address ='0x76a65752896358e5C0AF4A5b5336c9620c633A06';
var abi = undefined;

function start() {
  if (typeof web3 !== 'undefined') {
      window.web3 = new Web3(web3.currentProvider);
  } else {
      alert("Browser error.");
  }
  ethereum.enable()
.then(function (accounts) {

})
.catch(function (error) {
console.error(error)
})
   abi =[
      {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
        constant: undefined,
        payable: undefined
      },
      {
        inputs: [{
          "name": "hash",
          "type": "bytes32"
        }],
        name: 'RegDHash',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
        constant: undefined,
        payable: undefined,
        signature: '0x133a48f3'
      },
      {
        inputs: [{
          "name": "hash",
          "type": "bytes32"
        }],
        name: 'SearchHash',
        outputs: [{
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }],
        stateMutability: 'view',
        type: 'function',
        constant: true,
        payable: undefined,
        signature: '0x4cf00d3f'
      }
  ];
  contract = new web3.eth.Contract(abi, address);
};

function NPOST(hash, callback) {
    web3.eth.getAccounts(function (error, accounts) {
      contract.methods.RegDHash(hash).send({
        from: accounts[0]
      },function(error, tx) {
        if (error) callback(error, null);
        else callback(null, tx);
      });
    });
};

function NSEARCH(hash, callback) {
  contract.methods.SearchHash(hash).call(function (error, result) {
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
  