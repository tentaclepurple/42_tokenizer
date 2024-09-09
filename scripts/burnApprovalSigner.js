const { ethers } = require("hardhat");

async function main() {
    const [, secondSigner] = await ethers.getSigners();
    const tokenAddress = "0x86e6Cf1d6c15B390c2C1c98e46efda7f01F3cA74"; // Reemplaza esto con la dirección real de tu contrato
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.attach(tokenAddress);

    // Obtén el ID de la última solicitud de quema
    const burnRequestId = await token.getCurrentBurnRequestId() - 1;
    console.log("ID de la solicitud de quema a aprobar:", burnRequestId.toString());

    // Aprobar la solicitud de quema
    console.log("Aprobando la solicitud de quema como segundo firmante...");
    const approveTx = await token.connect(secondSigner).approveBurnRequest(burnRequestId);
    await approveTx.wait();
    console.log("Solicitud de quema aprobada por el segundo firmante");

    // Verificar el estado de la solicitud
    const request = await token.burnRequests(burnRequestId);
    console.log("Estado de la solicitud:", request.executed ? "Ejecutada" : "Pendiente");

    if (request.executed) {
        // Si la solicitud se ejecutó, verificar el nuevo balance del contrato
        const contractBalance = await token.balanceOf(tokenAddress);
        console.log("Nuevo balance del contrato:", ethers.utils.formatUnits(contractBalance, 18));
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });