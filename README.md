## Version
scarb 2.6.3
snforge 0.22.0
openzeppelin 0.10.0

#
scarb build
snforge test

# Steps

### 0 - Create a folder
mkdir ~/.starkli-wallets
mkdir ~/.starkli-wallets/erc20test

### 1.2 - Create a new private key
starkli signer keystore new ~/.starkli-wallets/erc20test/user0_keystore.json

### 1.2.1 - Config the enviroment variable
export STARKNET_KEYSTORE="~/.starkli-wallets/erc20test/user0_keystore.json"

### 1.3 If have a private key
starkli signer from-key ~/.starkli-wallets/erc20test/user0_keystore.json

--

### 2.1 Create account
starkli account oz init ~/.starkli-wallets/erc20test/account0_account.json

### 2.2 Deploy account
starkli account deploy ~/.starkli-wallets/erc20test/account0_account.json

### 2.3.1 Get the account deployed
cat account0_account.json

### 2.3.2 Connect with local account
starkli account fetch **address** --rpc https://starknet-sepolia.public.blastapi.io/rpc/v0_7 --output ~/.starkli-wallets/erc20test/account0_account.json~

### 3 Declare the contract
starkli declare target/dev/----.contract_class.json --rpc https://starknet-sepolia.public.blastapi.io/rpc/v0_7 --account ~/.starkli-wallets/erc20test/account0_account.json --keystore ~/.starkli-wallets/erc20test/user0_keystore.json

### 4 Deploy the contract
starkli deploy **clash hash** **arguments example: u256:1000** **account_deployed**

### 5 Check the functions
starkli call **address-contract** **name-function** --rpc https://starknet-sepolia.public.blastapi.io/rpc/v0_7

The contract will be deployed at address: 
0x04765e875221caec05d88911b54c3737c8a8b93fe821d8b80a9eccf96375ec6f

Contract deployment transaction: 
0x0799f72cedf8dee7a72e44018c4c2231684ce46eca4d3effa50572789fa11c0d

Contract deployed:
0x04765e875221caec05d88911b54c3737c8a8b93fe821d8b80a9eccf96375ec6f