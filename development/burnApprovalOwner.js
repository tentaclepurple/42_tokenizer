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
        // Request data from the user
        const tokenAddress = await askQuestion("Enter the token contract address: ");
        const ownerPrivateKey = await askQuestion("Enter the owner's private key: ");
        const burnRequestId = await askQuestion("Enter the burn request ID to approve: ");

        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("MyToken");
        const token = await Token.attach(tokenAddress);

        // Function to compare a provided private key with the owner's
        function comparePrivateKey(providedPrivateKey) {
            try {
                const wallet = new ethers.Wallet(providedPrivateKey);
                return wallet.address.toLowerCase() === owner.address.toLowerCase();
            } catch (error) {
                console.error("Error processing the provided private key:", error.message);
                return false;
            }
        }

        // Compare the provided private key
        const isMatch = comparePrivateKey(ownerPrivateKey);

        if (!isMatch) {
            throw new Error("The provided private key does not match the owner's. Aborting operation.");
        }

        console.log("Burn request ID to approve:", burnRequestId);

        // Approve the burn request
        console.log("Approving the burn request as owner...");
        const approveTx = await token.approveBurnRequest(burnRequestId);
        await approveTx.wait();
        console.log("Burn request approved by the owner");

        // Verify the request status
        const request = await token.burnRequests(burnRequestId);
        console.log("Request status:", 
            request.executed ? "Executed" : "Pending second signer approval");

    } catch (error) {
        console.error("An error occurred:", error.message);
    } finally {
        rl.close();
        process.exit(0);
    }
}

main().catch((error) => {
    console.error("Unhandled error:", error);
    process.exit(1);
});
