require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const MNEMONIC = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : process.env.MNEMONIC;
const INFURA_KEY = process.env.INFURA_KEY;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      skipDryRun: true
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "https://rinkeby.infura.io/v3/" + INFURA_KEY
        );
      },
      network_id: "4"
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "https://ropsten.infura.io/v3/" + INFURA_KEY
        );
      },
      network_id: "3"
    },
    ethereum: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "https://mainnet.infura.io/v3/" + INFURA_KEY
        );
      },
      network_id: "1",
      gasPrice: 30000000000

    },
    goerli: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "https://goerli.infura.io/v3/" + INFURA_KEY
        );
      },
      network_id: "5"
    },
    gnosis: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "https://rpc.gnosischain.com"
        );
      },
      network_id: 100,
      gasPrice: 1500000000 
      // gas: 500000,
      // gasPrice: 1000000000,
    },

    polygon: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "https://polygon-mainnet.g.alchemy.com/v2/"
        );
      },
      network_id: 137,
      gasPrice: 50000000000
    },

    avalanche: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "https://rpc.ankr.com/avalanche"
        );
      },
      network_id: 43114,
      gasPrice: 27000000000
    },

    bsc: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "https://bsc-dataseed.binance.org/"
        );
      },
      network_id: 56,
      gasPrice: 5000000000
    },
    aurora: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "https://mainnet.aurora.dev"
        );
      },
      network_id: "1313161554",
      gasPrice: 1000000000,
      gas: 4156674
    },
  },

  mocha: {
    reporter: 'eth-gas-reporter',
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",
      settings: {          
        optimizer: {
          enabled: true,
          runs: 1500
        },
      }
    },
  },
  plugins: ["truffle-plugin-verify"],

  api_keys: {
    etherscan: process.env.ETHERSCAN_KEY,
    polygonscan: process.env.POLYGON_KEY,
    bscscan: process.env.BSC_KEY,
    snowtrace: process.env.SNOWTRACE,
    aurorascan: process.env.AURORA_KEY,

  },
};
