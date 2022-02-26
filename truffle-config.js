require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonic = process.env.MNEMONIC;
const INFURA_KEY = process.env.INFURA_URL + process.env.INFURA_KEY;

module.exports = {
  networks: {
    xdai: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
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
          process.env.MNEMONIC,
          "https://polygon-rpc.com/"
        );
      },
      network_id: 137,
    },

    avalanche: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://api.avax.network/ext/bc/C/rpc/"
        );
      },
      network_id: 43114,
    },

    bsc: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://bsc-dataseed.binance.org/"
        );
      },
      network_id: 56,
    },

    fantom: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
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
