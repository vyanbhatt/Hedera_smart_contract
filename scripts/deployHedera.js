// scripts/deployHedera.js
const deployHederaContract = require('../components/hedera/hederaInteraction');

async function main() {
    await deployHederaContract();
}

main().catch(console.error);
