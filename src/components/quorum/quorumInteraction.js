// components/quorum/quorumInteraction.js
const Web3 = require('web3');
require('dotenv').config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.QUORUM_RPC_URL));
const quorumContractAbi = [ /* Quorum ABI */ ];
const quorumContractBytecode = "0x..."; // Bytecode of the contract

async function deployQuorumContract() {
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(quorumContractAbi);
    
    const deployTx = contract.deploy({ data: quorumContractBytecode });
    const deployedContract = await deployTx.send({ from: accounts[0], gas: '2000000' });

    console.log(`Quorum Contract deployed at address: ${deployedContract.options.address}`);
    return deployedContract.options.address;
}

module.exports = deployQuorumContract;
