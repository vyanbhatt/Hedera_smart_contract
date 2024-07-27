// components/ethereum/ethereumInteraction.js
const { ethers } = require('ethers');
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
const wallet = new ethers.Wallet(process.env.ETHEREUM_PRIVATE_KEY, provider);

async function deployEthereumContract() {
    const tokenAbi = [ /* ERC-20 ABI */ ];
    const tokenBytecode = "0x..."; // Bytecode of the contract

    const factory = new ethers.ContractFactory(tokenAbi, tokenBytecode, wallet);
    const contract = await factory.deploy();
    await contract.deployTransaction.wait();

    console.log(`Ethereum Contract deployed at address: ${contract.address}`);
    return contract.address;
}

module.exports = deployEthereumContract;
