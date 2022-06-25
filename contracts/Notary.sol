// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Notary {
struct Record {
    uint timestamp;
    uint blockNumber;
  }
mapping (bytes32 => Record) private file_hash;
constructor ()  {
}
function RegDHash (bytes32 hash) public {
    Record memory newrec = Record(block.timestamp, block.number);
    file_hash[hash] = newrec;
  }
function SearchHash (bytes32 hash) public view returns(uint, uint) {
    return (file_hash[hash].timestamp, file_hash[hash].blockNumber);
  }
}