const { expectRevert } = require("@openzeppelin/test-helpers");

const BoredDavid = artifacts.require("BoredDavid");

contract("Token URI test", (accounts) => {
  const [owner, user1] = accounts;
  let boredDavidInstance = null;
  before(async () => {
    boredDavidInstance = await BoredDavid.deployed();
  });

  it("Should return uri of specific token", async () => {
    await boredDavidInstance.mint(1, {
      from: user1,
      value: 5,
    });
    const tokenURI = await boredDavidInstance.tokenURI(1);
    assert.equal(tokenURI, "https://example.com");
  });

  it("Should return uri of specific token", async () => {
    await boredDavidInstance.mint(1, {
      from: user1,
      value: 5,
    });

    await expectRevert(
      boredDavidInstance.tokenURI(),
      'Invalid number of parameters for "tokenURI"'
    );
  });

});
