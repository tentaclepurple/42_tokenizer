const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Checking token balance for the account:", deployer.address);

    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.attach("0xe3586712dccE0619f9C71Ae3DD790e8e88e1CbF4"); // Reemplaza con la dirección del contrato desplegado

    const balance = await token.balanceOf(deployer.address);
    console.log("Token balance:", ethers.utils.formatUnits(balance, 18)); // Asumiendo que el token tiene 18 decimales
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });