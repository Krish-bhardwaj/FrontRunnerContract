// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FrontRunning {

    uint256 lastBlockNumber = 0;
    
    uint public balance;

    constructor (uint _balance) {
        balance = _balance;
    }

    function executeTransaction(uint amount) public {
        require(block.number > lastBlockNumber, "Can only execute one transaction per block");
        require(amount <= balance, "Not enough balance");
        lastBlockNumber = block.number;
        balance -= amount;
    }

}
