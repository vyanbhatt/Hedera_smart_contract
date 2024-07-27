// scripts/deployEthereum.js
const deployEthereumContract = require('../components/ethereum/ethereumInteraction');

async function main() {
    await deployEthereumContract();
}

main().catch(console.error);
