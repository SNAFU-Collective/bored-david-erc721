const { ether } = require('@openzeppelin/test-helpers');

const chainParameters = {
  "ethereum": {
      name: "Bored David",
      symbol: "DAVID",//non sono sicuro del symbol
      not_reveal_url: "https://ipfs.infura.io/ipfs/QmeA68Y53B2kVps5BR3cZzS3WTJSPV2uyF5Uxc8zSZM5zA",
      rare_cost: ether('0.15'),
      common_cost: ether('0.03'),
      max_supply: 2166,
      max_mint_amount: 10,
      starting_token_id: 0,//chiedere a franz se il primo nft avrà id 1 o 0
      common_sale_enabled: true,
      rare_sale_enabled: true
  },
  "gnosis": {
    name: "Bored David on Gnosis",
    symbol: "DAVID",
    not_reveal_url: "https://ipfs.infura.io/ipfs/QmRgdewi4YsqC7dUnoyNz1QnHdQ5hMisPh66P4kMLvS63D",
    rare_cost: ether('300'),
    common_cost: ether('50'),
    max_supply: 2000,
    max_mint_amount: 10,
    starting_token_id: 2166,
    common_sale_enabled: true,
    rare_sale_enabled: true
},
  "bsc": {
    name: "Bored David on BSC",
    symbol: "DAVID",
    not_reveal_url: "https://ipfs.infura.io/ipfs/QmNS9DiFDfPGNu8zfrxq61ZZoAgap3B6GWM23aBHnLTXfn",
    rare_cost: ether('1'),
    common_cost: ether('0.16'),
    max_supply: 1000,
    max_mint_amount: 10,
    starting_token_id: 4166,
    common_sale_enabled: true,
    rare_sale_enabled: true
  },
  "avalanche": {
    name: "Bored David on Avalanche",
    symbol: "DAVID",
    not_reveal_url: "https://ipfs.infura.io/ipfs/Qmbm3JzrkivKGvAghsmMbJV6F1wZCkY722uoiZoeS3gEWX",
    rare_cost: ether('11'),
    common_cost: ether('2'),
    max_supply: 500,
    max_mint_amount: 10,
    starting_token_id: 5166,
    common_sale_enabled: true,
    rare_sale_enabled: true
  },
  "polygon": {
    name: "Bored David on Polygon",
    symbol: "DAVID",
    not_reveal_url: "https://ipfs.infura.io/ipfs/QmWpH3ZQ91BfXjQMpWqdf4GNUXRwbTXzrftSmqDZmmNWjo",
    rare_cost: ether('480'),
    common_cost: ether('80'),
    max_supply: 500,
    max_mint_amount: 10,
    starting_token_id: 5666,
    common_sale_enabled: true,
    rare_sale_enabled: true
  },
  "aurora": {
    name: "Bored David on Aurora",
    symbol: "DAVID",
    not_reveal_url: "https://ipfs.infura.io/ipfs/QmP59nQCKiFHL1yydEJGUxUpCveiPKYP5LyuEVoSq9YtFE",
    rare_cost: ether('100'),
    common_cost: ether('15'),
    max_supply: 500,
    max_mint_amount: 10,
    starting_token_id: 6166,
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