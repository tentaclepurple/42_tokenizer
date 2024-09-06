// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MultiSigWallet {
    address[] public owners;
    uint public required;
    mapping(address => bool) public isOwner;
    mapping(uint => Transaction) public transactions;
    mapping(uint => mapping(address => bool)) public confirmations;
    uint public transactionCount;

    struct Transaction {
        address to;
        uint amount;
        bool executed;
    }

    event Deposit(address indexed sender, uint amount);
    event SubmitTransaction(address indexed sender, uint indexed txIndex, address indexed to, uint amount);
    event ConfirmTransaction(address indexed sender, uint indexed txIndex);
    event RevokeConfirmation(address indexed sender, uint indexed txIndex);
    event ExecuteTransaction(address indexed sender, uint indexed txIndex);
    event ExecuteTokenTransfer(address indexed sender, address indexed token, address indexed to, uint amount);

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not an owner");
        _;
    }

    modifier txExists(uint _txIndex) {
        require(_txIndex < transactionCount, "Transaction does not exist");
        _;
    }

    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "Transaction already executed");
        _;
    }

    modifier notConfirmed(uint _txIndex) {
        require(!confirmations[_txIndex][msg.sender], "Transaction already confirmed");
        _;
    }

    constructor(address[] memory _owners, uint _required) {
        require(_owners.length > 0, "Owners required");
        require(_required > 0 && _required <= _owners.length, "Invalid required number of confirmations");

        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Invalid owner");
            require(!isOwner[owner], "Owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }
        required = _required;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function submitTransaction(address _to, uint _amount) public onlyOwner {
        uint txIndex = transactionCount;

        transactions[txIndex] = Transaction({
            to: _to,
            amount: _amount,
            executed: false
        });

        transactionCount++;
        emit SubmitTransaction(msg.sender, txIndex, _to, _amount);
    }

    function confirmTransaction(uint _txIndex) public onlyOwner txExists(_txIndex) notConfirmed(_txIndex) {
        confirmations[_txIndex][msg.sender] = true;
        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    function revokeConfirmation(uint _txIndex) public onlyOwner txExists(_txIndex) {
        require(confirmations[_txIndex][msg.sender], "Transaction not confirmed");

        confirmations[_txIndex][msg.sender] = false;
        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    function executeTransaction(uint _txIndex) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
        require(getConfirmationCount(_txIndex) >= required, "Not enough confirmations");

        Transaction storage transaction = transactions[_txIndex];
        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.amount}("");
        require(success, "Transaction failed");

        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    function executeTokenTransfer(address tokenAddress, address to, uint amount) public onlyOwner {
        require(getConfirmationCount(transactionCount - 1) >= required, "Not enough confirmations");

        IERC20 token = IERC20(tokenAddress);
        bool success = token.transfer(to, amount);
        require(success, "Token transfer failed");

        emit ExecuteTokenTransfer(msg.sender, tokenAddress, to, amount);
    }

    function getConfirmationCount(uint _txIndex) public view returns (uint count) {
        for (uint i = 0; i < owners.length; i++) {
            if (confirmations[_txIndex][owners[i]]) {
                count += 1;
            }
        }
    }
}
