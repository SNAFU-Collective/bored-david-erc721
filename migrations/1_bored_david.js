require("dotenv").config();
const BoredDavid = artifacts.require("BoredDavid.sol");

module.exports = function (deployer) {
  deployer.deploy(
    BoredDavid,
    process.env.NAME,
    process.env.SYMBOL,
    process.env.NOT_REVEAL_URL,
  );
};
