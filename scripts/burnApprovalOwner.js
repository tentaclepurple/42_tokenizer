const { ethers } = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners();
    const tokenAddress = "0x86e6Cf1d6c15B390c2C1c98e46efda7f01F3cA74"; // Reemplaza esto con la dirección real de tu contrato
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.attach(tokenAddress);

    // Obtén el ID de la última solicitud de quema
    const burnRequestId = await token.getCurrentBurnRequestId() - 1;
    console.log("ID de la solicitud de quema a aprobar:", burnRequestId.toString());

    // Aprobar la solicitud de quema
    console.log("Aprobando la solicitud de quema como propietario...");
    const approveTx = await token.approveBurnRequest(burnRequestId);
    await approveTx.wait();
    console.log("Solicitud de quema aprobada por el propietario");

    // Verificar el estado de la solicitud
    const request = await token.burnRequests(burnRequestId);
    console.log("Estado de la solicitud:", 
        request.executed ? "Ejecutada" : "Pendiente de aprobación del segundo firmante");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });