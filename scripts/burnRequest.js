const { ethers } = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners();
    const tokenAddress = "0x86e6Cf1d6c15B390c2C1c98e46efda7f01F3cA74"; // Reemplaza esto con la dirección real de tu contrato
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.attach(tokenAddress);

    // Verifica el balance del propietario
    const ownerBalance = await token.balanceOf(owner.address);
    console.log("Balance inicial del propietario:", ethers.utils.formatUnits(ownerBalance, 18));

    // Cantidad de tokens a quemar
    const burnAmount = ethers.utils.parseUnits("1", 18); // Ajusta esta cantidad según sea necesario

    // Crea la solicitud de quema
    console.log("Creando solicitud de quema...");
    const burnTx = await token.createBurnRequest(burnAmount);
    await burnTx.wait();
    console.log("Solicitud de quema creada");

    // Obtiene el ID de la última solicitud de quema
    const burnRequestId = await token.getCurrentBurnRequestId();
    console.log("ID de la solicitud de quema:", burnRequestId.toString());

    // Verifica el nuevo balance del propietario
    const newOwnerBalance = await token.balanceOf(owner.address);
    console.log("Nuevo balance del propietario:", ethers.utils.formatUnits(newOwnerBalance, 18));

    // Verifica el balance del contrato
    const contractBalance = await token.balanceOf(tokenAddress);
    console.log("Balance del contrato después de la solicitud:", ethers.utils.formatUnits(contractBalance, 18));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
