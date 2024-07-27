// components/hedera/contractDeploy.js
const deployEthereumContract = require('../ethereum/ethereumInteraction');
const deployQuorumContract = require('../quorum/quorumInteraction');
const deployHederaContract = require('../hedera/hederaInteraction');

async function deployAllContracts() {
    const ethAddress = await deployEthereumContract();
    console.log(`Ethereum contract deployed at ${ethAddress}`);

    const quorumAddress = await deployQuorumContract();
    console.log(`Quorum contract deployed at ${quorumAddress}`);

    const hederaAddress = await deployHederaContract();
    console.log(`Hedera contract deployed at ${hederaAddress}`);

    return { ethAddress, quorumAddress, hederaAddress };
}

module.exports = deployAllContracts;
