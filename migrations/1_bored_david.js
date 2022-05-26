const { ether } = require('@openzeppelin/test-helpers');

const chainParameters = {
  "rinkeby": {
      name: "Bored Test on Rinkeby",
      symbol: "BTEST",
      not_reveal_url: "https://ipfs.infura.io/ipfs/QmQ4FxmmKyHA8Mzpqfvy8Hgjbu2gCUgS84J7R6xDXobqUh",
      rare_cost: ether('0.005'),
      common_cost: ether('0.001'),
      max_supply: 1000,
      max_mint_amount: 20,
      starting_token_id: 0,
      common_sale_enabled: true,
      rare_sale_enabled: true
  },
  "development": {
    name: "Bored Test on DEV",
    symbol: "BTEST",
    not_reveal_url: "https://ipfs.infura.io/ipfs/QmQ4FxmmKyHA8Mzpqfvy8Hgjbu2gCUgS84J7R6xDXobqUh",
    rare_cost: 1,
    common_cost: 1,
    max_supply: 1000,
    max_mint_amount: 5,
    starting_token_id: 0,
    common_sale_enabled: true,
    rare_sale_enabled: true
},
  "goerli": {
    name: "Bored Test on Goerli",
    symbol: "BTEST",
    not_reveal_url: "https://ipfs.infura.io/ipfs/QmQ4FxmmKyHA8Mzpqfvy8Hgjbu2gCUgS84J7R6xDXobqUh",
    rare_cost: ether('0.004'),
    common_cost: ether('0.0001'),
    max_supply: 1000,
    max_mint_amount: 20,
    starting_token_id: 1000,
    common_sale_enabled: true,
    rare_sale_enabled: true
  },
  "ropsten": {
    name: "Bored Test on Ropsten",
    symbol: "BTEST",
    not_reveal_url: "https://ipfs.infura.io/ipfs/QmQ4FxmmKyHA8Mzpqfvy8Hgjbu2gCUgS84J7R6xDXobqUh",
    rare_cost: ether('0.0045'),
    common_cost: ether('0.0002'),
    max_supply: 1000,
    max_mint_amount: 20,
    starting_token_id: 2000,
    common_sale_enabled: true,
    rare_sale_enabled: true
  },

}
//gnosis, ethereum, aurora, polygon, avalanche, bsc

const BoredDavid = artifacts.require("BoredDavid.sol");
module.exports = function (deployer, network) {
  let parameters = chainParameters[network];
  if(!parameters) {
    console.error("Parameters for network %s not found", network);
    return;
  }
  deployer.deploy(
    BoredDavid,
    parameters.name,
    parameters.symbol,
    parameters.not_reveal_url,
    parameters.rare_cost,
    parameters.common_cost,
    parameters.max_supply,
    parameters.max_mint_amount,
    parameters.starting_token_id,
    parameters.common_sale_enabled,
    parameters.rare_sale_enabled
  );
};