// deploy token.sol erc 20 contract to mumbai testnet
// run: npx hardhat run scripts\deploy.js --network mumbai

const { ethers } = require("ethers");
const fs = require('fs');
const compiledContract = require("../artifacts/contracts/FrontRunning.sol/FrontRunning.json");
// deploy FrontRunning contract
async function main() {
  // Connect to the Ethereum network
  const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/polygon_mumbai");

  // Replace the value below with your private key
  const privateKey = "";
  const signer = new ethers.Wallet(privateKey, provider);

  console.log("Account balance:", (await signer.getBalance()).toString());

  const factory = new ethers.ContractFactory(compiledContract.abi, compiledContract.bytecode, signer);
  const contract = await factory.deploy(100)
  console.log("Contract address:", contract.address);
  // if you want to wait for the contract to be mined
  await contract.deployed();
  console.log("Contract deployed:", contract.address);

  // write contract address in a file
  fs.writeFileSync('contract.json', JSON.stringify({"contractAddress":contract.address}));

}

main()