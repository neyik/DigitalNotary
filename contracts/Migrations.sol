// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Migrations {
  address public owner;
  uint public lastupload_migration;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  constructor() {
    owner = msg.sender;
  }

  function DoneComp(uint done) public restricted {
    lastupload_migration = done;
  }

  function upgrade(address newaddress) public restricted {
    Migrations upgraded = Migrations(newaddress);
    upgraded.DoneComp(lastupload_migration);
  }
}