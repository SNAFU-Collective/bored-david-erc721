const chainParameters = {
  "rinkeby": {
      name: "Bored Test",
      symbol: "BTEST",
      not_reveal_url: "https://ipfs.infura.io/ipfs/QmQ4FxmmKyHA8Mzpqfvy8Hgjbu2gCUgS84J7R6xDXobqUh",
      rare_cost: 5,
      common_cost: 1,
      max_supply: 100,
      max_mint_amount: 20,
      starting_token_id: 1
  },
  "development": {
      name: "Bored Test",
      symbol: "BTEST",
      not_reveal_url: "https://ipfs.infura.io/ipfs/QmQ4FxmmKyHA8Mzpqfvy8Hgjbu2gCUgS84J7R6xDXobqUh",
      rare_cost: 1,
      common_cost: 1,
      max_supply: 1000,
      max_mint_amount: 5,
      starting_token_id: 1
  }
}

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
    parameters.starting_token_id
  );
};