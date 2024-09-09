const { ethers } = require("hardhat");

async function main() {
    const [deployer, secondSigner] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Second signer address:", secondSigner.address);

    const initialSupply = ethers.utils.parseUnits("100000000", 18);

    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy(initialSupply, secondSigner.address);

    await token.deployed();

    console.log("Token address:", token.address);
    console.log("Initial supply:", ethers.utils.formatUnits(initialSupply, 18));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });