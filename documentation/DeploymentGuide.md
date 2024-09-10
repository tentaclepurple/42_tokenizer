## SAFETY
**NEVER SHARE YOUR PRIVATE KEY OR SEED PHRASE**


# Deployment Guide for ElFaryCoin42 (EFC)

## Prerequisites
- Completed all steps in the SetupGuide.md
- Sufficient test POL/MATIC in your wallet for deployment on Amoy testnet


## Deployment Steps

### Command for running scripts
	```
	npx hardhat run <path_to_script> --network amoy
	```

1. Deploy the contract to Amoy Testnet:
   ```
   make deploy
   ```

2. Update the README.md with the deployed contract address if needed.


## Burn functionality
In the process you will be asked for some data like:
- Token contract address
- Owner private key
- Second signer private key
- Token amount to burn
- Burn request id


1. Init a burn request
     ```
	 make burn
	 ```

2. Verified owner signs the request
	```
	make owner
	```

3. Verified second signer signs and approve the burn request
	```
	make signer
	```

## Further steps
- Upload and send info and logo about your token to the main blockchain explorers, wallets and centraliced/decentraliced exchanges


## Mainnet Deployment (Do it at your own risk)

1. Ensure you have real MATIC for mainnet deployment.

2. Update `hardhat.config.js` to include Polygon Mainnet configuration.

3. Deploy to mainnet:
   ```
   npx hardhat run scripts/deploy.js --network polygon
   ```

4. Verify the contract on Polygon Mainnet:
   ```
   npx hardhat verify --network polygon DEPLOYED_CONTRACT_ADDRESS "INITIAL_SUPPLY" "SECOND_SIGNER_ADDRESS"
   ```

