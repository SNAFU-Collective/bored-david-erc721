const { expectRevert } = require("@openzeppelin/test-helpers");

const BoredDavid = artifacts.require("BoredDavid");

contract("Token URI test", (accounts) => {
  const [owner, user1] = accounts;
  let boredDavidInstance = null;
  before(async () => {
    boredDavidInstance = await BoredDavid.deployed();
    await boredDavidInstance.enableCommonSale(true);
  });

  it("Should return uri of specific token", async () => {
    await boredDavidInstance.mintCommon(1, {
      from: user1,
      value: 5,
    });
    const tokenURI = await boredDavidInstance.tokenURI(1);
    assert.equal(tokenURI, "https://ipfs.infura.io/ipfs/QmQ4FxmmKyHA8Mzpqfvy8Hgjbu2gCUgS84J7R6xDXobqUh");
  });

  it("Invalid number of parameters for \"tokenURI\"", async () => {
    await boredDavidInstance.mintCommon(1, {
      from: user1,
      value: 5,
    });

    await expectRevert(
      boredDavidInstance.tokenURI(),
      'Invalid number of parameters for "tokenURI"'
    );
  });

});
