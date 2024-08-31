const fs = require("fs");

const rawData = fs.readFileSync(
  "../../token-sender-erc20/target/dev/token_sender_MockERC20.contract_class.json"
);
const data = JSON.parse(rawData);

const abi = data.abi;

fs.writeFileSync("src/abis/abi_erc20.json", JSON.stringify(abi, null, 4));

console.log(JSON.stringify(abi, null, 4));
