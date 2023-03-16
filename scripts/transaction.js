const ethers = require("ethers");
const compiledContract = require("../artifacts/contracts/FrontRunning.sol/FrontRunning.json");
const contractAddress = require("../contract.json");
// execute transaction
async function main() {
    const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/polygon_mumbai");

    // Replace the value below with your private key
    const privateKey = "";
    const signer = new ethers.Wallet(privateKey, provider);

    console.log("Account balance:", (await signer.getBalance()).toString());

    console.log("Contract address:", contractAddress.contractAddress);

    const contract = new ethers.Contract(contractAddress.contractAddress, compiledContract.abi, signer);

    const gasEstimate = await contract.estimateGas.executeTransaction(10);
    console.log("Gas estimate:", gasEstimate.toString());

    const transaction = await contract.executeTransaction(10);
    console.log("Transaction sent, waiting for confirmation...");

    const attack = await contract.executeTransaction(10,{
        gasLimit: gasEstimate*2,
    });
    console.log("Front Running Transaction sent, waiting for confirmation...");

    console.log("Transaction pending: " + transaction.hash);
    console.log("Front Running Transaction pending: " + attack.hash);

    const receipt = await transaction.wait();
    const receipt2 = await attack.wait();
    console.log("Transaction confirmed in block " + receipt.blockNumber);
    console.log("Front Running Transaction confirmed in block " + receipt2.blockNumber);

    console.log("Transaction completed:");
    console.log(receipt);

    console.log("gasUsed:", receipt.gasUsed.toString());

    console.log("Front Running Transaction completed:");
    console.log(receipt2);

    console.log("Front Running Transaction gas Used:", receipt2.gasUsed.toString());
    
    console.log("Account balance:", (await signer.getBalance()).toString());

}

main()