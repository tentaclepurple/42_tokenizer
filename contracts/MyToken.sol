// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("PurpleTentacleToken42", "PTT") {
        _mint(msg.sender, initialSupply);
    }
    function tokenURI() public pure returns (string memory) {
        return "https://www.dropbox.com/scl/fi/1au6mg882aewfq0al1m5i/metadata.json?rlkey=6ao31d5qml0fkj7ftwu29pany&dl=0"; 
    }
}
