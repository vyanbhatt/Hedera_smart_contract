// components/hedera/walletConnect.js
const { ethers } = require('ethers');
require('dotenv').config();

async function walletConnectFcn() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
    const wallet = new ethers.Wallet(process.env.ETHEREUM_PRIVATE_KEY, provider);

    const account = await wallet.getAddress();
    const network = await provider.getNetwork();

    return [account, wallet, network.name];
}

module.exports = walletConnectFcn;
