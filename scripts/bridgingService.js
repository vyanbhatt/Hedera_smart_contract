// scripts/bridgingService.js
require('dotenv').config();
const { ethers } = require('ethers');
const Web3 = require('web3');
const { Client, TopicMessageQuery } = require('@hashgraph/sdk');

const ethereumProvider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
const ethereumWallet = new ethers.Wallet(process.env.ETHEREUM_PRIVATE_KEY, ethereumProvider);
const tokenAddress = process.env.ETHEREUM_TOKEN_ADDRESS;
const tokenAbi = [ /* ERC-20 ABI */ ];
const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, ethereumWallet);

const quorumProvider = new Web3.providers.HttpProvider(process.env.QUORUM_RPC_URL);
const quorumWeb3 = new Web3(quorumProvider);
const quorumContractAddress = process.env.QUORUM_CONTRACT_ADDRESS;
const quorumContractAbi = [ /* Quorum ABI */ ];
const quorumContract = new quorumWeb3.eth.Contract(quorumContractAbi, quorumContractAddress);

const hederaClient = Client.forTestnet(); // Use Client.forMainnet() for mainnet
const hederaTopicId = process.env.HEDERA_TOPIC_ID;

async function monitorHedera() {
    new TopicMessageQuery()
        .setTopicId(hederaTopicId)
        .subscribe(hederaClient, null, (message) => {
            const decodedMessage = JSON.parse(Buffer.from(message.contents).toString());
            const { to, amount } = decodedMessage;
            console.log(`Initiate transfer of ${amount} tokens to ${to}`);
            lockTokensOnEthereum(decodedMessage);
        });
}

async function lockTokensOnEthereum({ to, amount }) {
    try {
        const tx = await tokenContract.lockTokens(amount);
        await tx.wait();
        console.log(`Locked ${amount} tokens on Ethereum for ${to}`);
        mintTokensOnQuorum(to, amount);
    } catch (error) {
        console.error("Error locking tokens on Ethereum:", error);
    }
}

async function mintTokensOnQuorum(to, amount) {
    try {
        const accounts = await quorumWeb3.eth.getAccounts();
        await quorumContract.methods.mintTokens(to, amount).send({ from: accounts[0] });
        console.log(`Minted ${amount} tokens on Quorum for ${to}`);
    } catch (error) {
        console.error("Error minting tokens on Quorum:", error);
    }
}

// Start Monitoring
monitorHedera();
