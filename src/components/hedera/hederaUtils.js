// components/hedera/hederaUtils.js
const { Client, ContractExecuteTransaction, ContractCallQuery } = require('@hashgraph/sdk');
require('dotenv').config();

const client = Client.forTestnet(); // Use Client.forMainnet() for mainnet
client.setOperator(process.env.HEDERA_ACCOUNT_ID, process.env.HEDERA_PRIVATE_KEY);

async function executeHederaContract(contractId, functionName, ...args) {
    const tx = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setFunction(functionName, args)
        .setGas(1000000);
    
    const response = await tx.execute(client);
    const receipt = await response.getReceipt(client);

    return receipt.status.toString();
}

async function queryHederaContract(contractId, functionName, ...args) {
    const query = new ContractCallQuery()
        .setContractId(contractId)
        .setFunction(functionName, args);
    
    const result = await query.execute(client);
    return result;
}

module.exports = { executeHederaContract, queryHederaContract };
