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
        const signerPrivateKey = await askQuestion("Enter the second signer's private key: ");
        const burnRequestId = await askQuestion("Enter the burn request ID to approve: ");

        const [, secondSigner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("MyToken");
        const token = await Token.attach(tokenAddress);

        // Function to compare a provided private key with the second signer's
        function comparePrivateKey(providedPrivateKey) {
            try {
                const wallet = new ethers.Wallet(providedPrivateKey);
                return wallet.address.toLowerCase() === secondSigner.address.toLowerCase();
            } catch (error) {
                console.error("Error processing the provided private key:", error.message);
                return false;
            }
        }

        // Compare the provided private key
        const isMatch = comparePrivateKey(signerPrivateKey);

        if (!isMatch) {
            throw new Error("The provided private key does not match the second signer's. Aborting operation.");
        }

        console.log("Burn request ID to approve:", burnRequestId);

        // Approve the burn request
        console.log("Approving the burn request as second signer...");
        const approveTx = await token.connect(secondSigner).approveBurnRequest(burnRequestId);
        await approveTx.wait();
        console.log("Burn request approved by the second signer");

        // Verify the request status
        const request = await token.burnRequests(burnRequestId);
        console.log("Request status:", request.executed ? "Executed" : "Pending");

        if (request.executed) {
            // If the request was executed, verify the new contract balance
            const contractBalance = await token.balanceOf(tokenAddress);
            console.log("New contract balance:", ethers.utils.formatUnits(contractBalance, 18));
        }

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