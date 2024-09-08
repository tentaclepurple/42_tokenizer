// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("PurpleTentacleToken42", "PTT") {
        _mint(msg.sender, initialSupply);
    }
    function tokenURI() public pure returns (string memory) {
        return "https://play-lh.googleusercontent.com/_JDQjk8EJGyHOlSQ_zSnoUrjjWOy8fy3spaKAYa8V9rhPbFrzusAuMfkvissvM9FuQ"; 
    }
}
