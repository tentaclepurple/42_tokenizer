// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyToken is ERC20, Ownable {
    using Counters for Counters.Counter;

    address public secondSigner;
    Counters.Counter private _burnRequestId;

    struct BurnRequest {
        uint256 amount;
        bool ownerApproved;
        bool secondSignerApproved;
        bool executed;
    }

    mapping(uint256 => BurnRequest) public burnRequests;

    event BurnRequestCreated(uint256 indexed requestId, uint256 amount);
    event BurnRequestApproved(uint256 indexed requestId, address approver);
    event BurnRequestExecuted(uint256 indexed requestId, uint256 amount);

    constructor(uint256 initialSupply, address _secondSigner) ERC20("ElFaryCoin42", "EFC") Ownable() {
        _mint(msg.sender, initialSupply);
        secondSigner = _secondSigner;
    }

    function tokenURI() public pure returns (string memory) {
        return "https://tentaclepurple.github.io/42_tokenizer/documentation/metadata.json";
    }

    function createBurnRequest(uint256 amount) public onlyOwner {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance for burn");

        // Transfer tokens from owner to contract
        _transfer(msg.sender, address(this), amount);

        uint256 requestId = _burnRequestId.current();
        burnRequests[requestId] = BurnRequest({
            amount: amount,
            ownerApproved: false,
            secondSignerApproved: false,
            executed: false
        });

        _burnRequestId.increment();

        emit BurnRequestCreated(requestId, amount);
    }

    function approveBurnRequest(uint256 requestId) public {
        require(msg.sender == owner() || msg.sender == secondSigner, "Not authorized");
        require(!burnRequests[requestId].executed, "Request already executed");

        if (msg.sender == owner()) {
            burnRequests[requestId].ownerApproved = true;
        } else {
            burnRequests[requestId].secondSignerApproved = true;
        }

        emit BurnRequestApproved(requestId, msg.sender);

        if (burnRequests[requestId].ownerApproved && burnRequests[requestId].secondSignerApproved) {
            executeBurnRequest(requestId);
        }
    }

    function executeBurnRequest(uint256 requestId) internal {
        require(burnRequests[requestId].ownerApproved && burnRequests[requestId].secondSignerApproved, "Not fully approved");
        require(!burnRequests[requestId].executed, "Already executed");
        require(balanceOf(address(this)) >= burnRequests[requestId].amount, "Insufficient balance for burn");

        burnRequests[requestId].executed = true;
        _burn(address(this), burnRequests[requestId].amount);

        emit BurnRequestExecuted(requestId, burnRequests[requestId].amount);
    }

    function setSecondSigner(address newSecondSigner) public onlyOwner {
        secondSigner = newSecondSigner;
    }

	function getCurrentBurnRequestId() public view returns (uint256) {
    return _burnRequestId.current();
	}
}
