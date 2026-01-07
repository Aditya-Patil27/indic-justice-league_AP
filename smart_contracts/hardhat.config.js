require("@nomiclabs/hardhat-ethers");
require("dotenv").config(); // Load env variables

module.exports = {
  solidity: "0.8.19",
  networks: {
    // 1. Local Development (Default for Hackathon)
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    // 2. Public Testnet (Optional - Use only if needed)
    polygon: {
      url: process.env.POLYGON_RPC_URL || "https://rpc-amoy.polygon.technology",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};