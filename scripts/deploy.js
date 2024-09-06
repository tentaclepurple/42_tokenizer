// Importa el objeto `ethers` desde Hardhat
const { ethers } = require("hardhat");

async function main() {
    // Obtén los signers (cuentas) disponibles en el entorno de Hardhat
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Obtén el contrato de fábrica y despliega el contrato
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy(ethers.utils.parseUnits("1000000", 18));  // 1 millón de tokens de suministro inicial

    console.log("Token deployed to:", token.address);
}

// Ejecuta la función principal y maneja errores
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });