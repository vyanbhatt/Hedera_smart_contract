// scripts/deployQuorum.js
const deployQuorumContract = require('../components/quorum/quorumInteraction');

async function main() {
    await deployQuorumContract();
}

main().catch(console.error);
