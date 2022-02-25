require("dotenv").config();
const BoredDavid = artifacts.require("BoredDavid.sol");
console.log(
  process.env.NAME,
  process.env.SYMBOL,
  process.env.BASE_URL,
  process.env.NOT_REVEAL_URL
);

module.exports = function (deployer) {
  deployer.deploy(
    BoredDavid,
    process.env.NAME,
    process.env.SYMBOL,
    process.env.BASE_URL,
    process.env.NOT_REVEAL_URL,
  );
};
