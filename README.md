# Tokenizer 42

## Overview
PurpleTentacleToken42 (PTT) is a custom ERC20 token implemented on the Polygon network. This project demonstrates the creation, deployment, and management of a token with burn functionality and multi-signature approval.

## Technical Choices

### Blockchain Platform: Polygon (Matic)
We chose Polygon for its:
- Low transaction costs
- High throughput
- Ethereum compatibility
- Growing ecosystem

### Development Environment: Hardhat
Hardhat was selected for its:
- Robust testing framework
- Easy deployment to multiple networks
- Built-in Solidity compiler
- Active community support

### Programming Language: Solidity
Solidity is the primary language for Ethereum-compatible smart contracts, offering:
- Strong typing
- Rich functionality for contract development
- Extensive documentation and community resources

### Token Standard: ERC20
The ERC20 standard ensures compatibility with a wide range of wallets, exchanges, and DApps.

### Additional Features
- Burn functionality with multi-signature approval for enhanced security
- Owner and second signer roles for governance
- Careful management of private keys and access control

## Project Structure
- `code/`: Contains the Solidity smart contract
- `deployment/`: Scripts for deploying and interacting with the contract
- `documentation/`: Detailed project documentation

## Smart Contract Address
- Network: Polygon Amoy Testnet
- Address: [Your Contract Address Here when deployed...]

## Setup and Deployment
Refer to the documentation folder for detailed instructions on setting up the development environment, deploying the contract, and interacting with the token.



### Create a Metamask wallet



### Get test POL/MATIC
	
	Faucet:
	https://faucets.chain.link/polygon-amoy
	https://faucet.polygon.technology/



### Compile contract

	npx hardhat compile



### Deploy Script (scripts/deploy.js)

	npx hardhat run scripts/deploy.js --network amoy


