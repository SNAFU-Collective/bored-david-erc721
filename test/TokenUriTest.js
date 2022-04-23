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
    const tokenURI = await boredDavidInstance.tokenURI(2);
    assert.equal(tokenURI, "https://example.com");
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
