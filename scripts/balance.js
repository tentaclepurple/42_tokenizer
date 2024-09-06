const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Checking token balance for the account:", deployer.address);

    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.attach("0x53c0f329bCA0872DebdcB2f23e11fC8A7ca95406"); // Reemplaza con la dirección del contrato desplegado

    const balance = await token.balanceOf(deployer.address);
    console.log("Token balance:", ethers.utils.formatUnits(balance, 18)); // Asumiendo que el token tiene 18 decimales
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });