## SAFETY
**NEVER SHARE YOUR PRIVATE KEY OR SEED PHRASE**

# Setup Guide for ElFaryCoin42 (EFC)

## Prerequisites
- Node.js
- npm
- MetaMask browser extension
- POL(former MATIC) test tokens


## Installation Steps

1. Clone the repository:
   ```
   git clone https://github.com/tentaclepurple/42_tokenizer.git
   ```

2. Buil containers:
   ```
   make
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following lines:
     ```
     PRIVATE_KEY=your_private_key_here
	 SIGNER_PRIVATE_KEY=second_signer_private_key
     ```
   Note: Never share or commit your `.env` file.


4. Install Metamask chrome extension

5. Open MetaMask and click on the network dropdown.

6. Select "Add Network" and enter the following details:
   - Network Name: Polygon Amoy Testnet
   - New RPC URL: https://rpc-amoy.polygon.technology
   - Chain ID: 80002
   - Currency Symbol: POL (former MATIC)
   - Block Explorer URL: https://amoy.polygonscan.com/

7. Get POL test tokens
	Go to a faucet and send tokens to your wallet:
	- https://faucet.polygon.technology/ (get bulk tokens in discord)
	- https://faucets.chain.link/polygon-amoy
	- https://www.alchemy.com/faucets/polygon-amoy


8. Compile contracts
	```
   	make compile
	or
	npx hardhat compile
   	```


## Additional Resources

- Hardhat Documentation: https://hardhat.org/getting-started/
- Polygon Documentation: https://docs.polygon.technology/
- OpenZeppelin Contracts: https://docs.openzeppelin.com/contracts/
