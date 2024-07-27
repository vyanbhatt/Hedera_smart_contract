// components/hedera/hederaInteraction.js
const { Client, ContractCreateTransaction } = require('@hashgraph/sdk');
require('dotenv').config();

const client = Client.forTestnet(); // Use Client.forMainnet() for mainnet
client.setOperator(process.env.HEDERA_ACCOUNT_ID, process.env.HEDERA_PRIVATE_KEY);

async function deployHederaContract() {
    const contractBytecode = Buffer.from("0x...", 'hex'); // Bytecode of the contract

    const transaction = new ContractCreateTransaction()
        .setBytecode(contractBytecode)
        .setGas(1000000)
        .setAdminKey(process.env.HEDERA_ADMIN_KEY);

    const response = await transaction.execute(client);
    const receipt = await response.getReceipt(client);

    console.log(`Hedera Contract deployed at address: ${receipt.contractId.toString()}`);
    return receipt.contractId.toString();
}

module.exports = deployHederaContract;
