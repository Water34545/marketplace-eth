const HDWalletProvider = require("@truffle/hdwallet-provider");
const keys = require("./keys.json");

module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*",
    },
    goerli: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: keys.MNEMONIC
          },
          providerOrUrl: `https://goerli.infura.io/v3/${keys.INFURA_PROJECT_ID}`,
          addressIndex: 0
        }),
      network_id: 5,
      gas: 8000000, // Gas Limit, How much gas we are willing to spent
      gasPrice: 21000000000, // how much we are willing to spent for unit of gas
      confirmations: 2, // number of blocks to wait between deployment
      timeoutBlocks: 200, // number of blocks before deployment times out
      networkCheckTimeoutnetworkCheckTimeout: 10000
    }
  },
  compilers: {
    solc: {
      version: "0.8.13",
    }
  }
};
