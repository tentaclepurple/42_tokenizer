const { ethers } = require("hardhat");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    try {
        const [owner] = await ethers.getSigners();

        // Ask for the token contract address
        const tokenAddress = await askQuestion("Enter the token contract address: ");

        // Ask for the private key
        const privateKey = await askQuestion("Enter the owner's private key (without '0x' prefix): ");
        const wallet = new ethers.Wallet(privateKey, ethers.provider);

        // Verify if the address matches the first signer
        if (wallet.address.toLowerCase() !== owner.address.toLowerCase()) {
            throw new Error("The provided private key does not correspond to the contract owner.");
        }

        const Token = await ethers.getContractFactory("MyToken");
        const token = await Token.attach(tokenAddress);

        // Check owner's balance
        const ownerBalance = await token.balanceOf(owner.address);
        console.log("Initial owner balance:", ethers.utils.formatUnits(ownerBalance, 18));

        // Ask for the amount of tokens to burn
        const burnAmountInput = await askQuestion("Enter the amount of tokens to burn: ");
        const burnAmount = ethers.utils.parseUnits(burnAmountInput, 18);

        if (ownerBalance.lt(burnAmount)) {
            throw new Error("Insufficient balance to burn the specified amount.");
        }

        // Create burn request
        console.log("Creating burn request...");
        const burnTx = await token.connect(owner).createBurnRequest(burnAmount);
        await burnTx.wait();
        console.log("Burn request created");

        // Get the ID of the last burn request
        const burnRequestId = await token.getCurrentBurnRequestId();
        console.log("Burn request ID:", burnRequestId.toString());

        // Check the new owner balance
        const newOwnerBalance = await token.balanceOf(owner.address);
        console.log("New owner balance:", ethers.utils.formatUnits(newOwnerBalance, 18));

        // Check the contract balance
        const contractBalance = await token.balanceOf(tokenAddress);
        console.log("Contract balance after request:", ethers.utils.formatUnits(contractBalance, 18));

    } catch (error) {
        console.error("An error occurred:");
        if (error.reason) {
            console.error("Reason:", error.reason);
        } else {
            console.error(error.message);
        }
        if (error.data) {
            console.error("Additional data:", error.data);
        }
    } finally {
        rl.close();
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Unexpected error:", error);
        process.exit(1);
    });