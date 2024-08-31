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

---

### 2.1 Create account
starkli account oz init ~/.starkli-wallets/erc20test/account0_account.json

### 2.2 Deploy account
starkli account deploy ~/.starkli-wallets/erc20test/account0_account.json

### 2.3.1 Get the account deployed
cat account0_account.json

### 2.3.2 Connect with local account
starkli account fetch **address** --rpc https://starknet-sepolia.public.blastapi.io/rpc/v0_7 --output ~/.starkli-wallets/erc20test/account0_account.json

---

### 3 Declare the contract
starkli declare target/dev/----.contract_class.json --rpc https://starknet-sepolia.public.blastapi.io/rpc/v0_7 --account ~/.starkli-wallets/erc20test/account0_account.json --keystore ~/.starkli-wallets/erc20test/user0_keystore.json

---

### 4 Deploy the contract
starkli deploy **clash hash** **arguments example: u256:1000** **account_deployed**

---

### 5 Check the functions
starkli call **address-contract** **name-function** --rpc https://starknet-sepolia.public.blastapi.io/rpc/v0_7
