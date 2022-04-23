require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const MNEMONIC = process.env.MNEMONIC;
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
      provider: function() {
        return new HDWalletProvider(
          MNEMONIC,
          "https://rinkeby.infura.io/v3/" + INFURA_KEY
        );
      },
      network_id: "4"
    },
    xdai: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "https://rpc.gnosischain.com"
        );
      },
      network_id: 100,
      // gas: 500000,
      // gasPrice: 1000000000,
    },

    polygon: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "https://polygon-rpc.com/"
        );
      },
      network_id: 137,
    },

    avalanche: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "https://api.avax.network/ext/bc/C/rpc/"
        );
      },
      network_id: 43114,
    },

    bsc: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "https://bsc-dataseed.binance.org/"
        );
      },
      network_id: 56,
    },

    fantom: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "https://rpc.ftm.tools/"
        );
      },
      network_id: 250,
    },
  },

  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",
    },
  },
  plugins: ["truffle-plugin-verify"],

  api_keys: {
    etherscan: process.env.ETHERSCAN_KEY,
  },
};
