require("dotenv").config();
const BoredDavid = artifacts.require("BoredDavid.sol");

module.exports = function (deployer) {
  deployer.deploy(
    BoredDavid,
    process.env.NAME,
    process.env.SYMBOL,
    process.env.NOT_REVEAL_URL,
    process.env.RARE_COST,
    process.env.COMMON_COST,
    process.env.MAX_SUPPLY,
    process.env.MAX_MINT_AMOUNT,
    process.env.STARTING_TOKEN_ID
  );
};