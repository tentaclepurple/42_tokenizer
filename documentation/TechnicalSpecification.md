## SAFETY
**NEVER SHARE YOUR PRIVATE KEY OR SEED PHRASE**

# Technical Specification: ElFaryCoin42 (EFC)

## Overview
ElFaryCoin42 (EFC) is an ERC20 token implemented on the Polygon network, featuring enhanced burn functionality with multi-signature approval.

## Token Details
- Name: ElFaryCoin42
- Symbol: EFC
- Blockchain: Polygon Amoy Testnet
- Total Supply: 100,000,000 PTT (initial)


## Smart Contract Architecture

```solidity
contract MyToken is ERC20, Ownable {
    using Counters for Counters.Counter;
```
- inherits from ERC20 and Ownable
- The line `using Counters for Counters.Counter;` is an important Solidity feature called the "using for" directive. Let's break it down:
1. `Counters` is a library provided by OpenZeppelin.
2. `Counters.Counter` is a type defined within this library.
3. `using A for B;` is a Solidity syntax that allows attaching functions from a library (A) to a specific type (B).


### Constructor
```solidity
constructor(uint256 initialSupply, address _secondSigner) ERC20("PurpleTentacleToken42", "PT0") Ownable() {
    _mint(msg.sender, initialSupply);
    secondSigner = _secondSigner;
}
```
- Initializes the token with a name, symbol, initial supply, and sets the second signer.
- `msg.sender` is the address deploying the contract.

### tokenURI
```solidity
function tokenURI() public pure returns (string memory) {
    return "https://tentaclepurple.github.io/42_tokenizer/metadata.json";
}
```
- Returns a static URL for token metadata.
- `pure` because it doesn't read or modify state.

### createBurnRequest
```solidity
function createBurnRequest(uint256 amount) public onlyOwner {
    // Function body
}
```
- Creates a new burn request.
- `onlyOwner` restricts this function to the contract owner.
- Transfers tokens from the owner to the contract.

### approveBurnRequest
```solidity
function approveBurnRequest(uint256 requestId) public {
    // Function body
}
```
- Allows the owner or second signer to approve a burn request.
- Automatically executes the burn if both have approved.

### executeBurnRequest
```solidity
function executeBurnRequest(uint256 requestId) internal {
    // Function body
}
```
- Internal function to execute an approved burn request.
- Burns the tokens from the contract's balance.

### setSecondSigner
```solidity
function setSecondSigner(address newSecondSigner) public onlyOwner {
    secondSigner = newSecondSigner;
}
```
- Allows the owner to change the second signer's address.

### getCurrentBurnRequestId
```solidity
function getCurrentBurnRequestId() public view returns (uint256) {
    return _burnRequestId.current();
}
```
- Returns the current burn request ID.
- `view` because it only reads state.




### State Variables
- `address public secondSigner`: Public variable storing the address of the second signer.
- `Counters.Counter private _burnRequestId`: Private counter for burn request IDs.

### Structs
```solidity
struct BurnRequest {
    uint256 amount;
    bool ownerApproved;
    bool secondSignerApproved;
    bool executed;
}
```
Structs allow grouping related data together.

### Mappings
```solidity
mapping(uint256 => BurnRequest) public burnRequests;
```
Mappings are key-value stores. Here, it maps request IDs to BurnRequest structs.


### Events
Events are used to emit logs on the blockchain, which can be listened to by external applications.

### Function Modifiers
- `public`: Can be called internally or externally.
- `internal`: Can only be called internally or by derived contracts.
- `pure`: Doesn't read or modify the contract's state.
- `view`: Reads but doesn't modify the contract's state.
- `onlyOwner`: Custom modifier from Ownable, restricts function access to the contract owner.

### Data Location
- `memory`: Data that is stored temporarily during function execution.
- `storage`: Data that is stored permanently on the blockchain.