async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying MultiSigWallet with the account:", deployer.address);

    const owners = [
        "0x85ba3d0155c7fF03ecC36999A085c0c6A94520D1"
    ];
    const required = 2;

    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    const multiSigWallet = await MultiSigWallet.deploy(owners, required);

    console.log("MultiSigWallet deployed to:", multiSigWallet.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
