const { expectRevert } = require("@openzeppelin/test-helpers");

const BoredDavid = artifacts.require("BoredDavid");

contract("Owner Wallet", (accounts) => {
  const [owner, user1] = accounts;
  let boredDavidInstance = null;
  before(async () => {
    boredDavidInstance = await BoredDavid.deployed();
  });

  it("Should return owner's token that he own", async () => {
    await boredDavidInstance.mint(5, {
      from: user1,
      value: 5,
    });
    const tokens = await boredDavidInstance.walletOfOwner(user1);
    assert.equal(tokens.length, 5);
  });

  it("Should be failed without owner address parameter", async () => {
    await boredDavidInstance.mint(5, {
      from: user1,
      value: 5,
    });
    await expectRevert(
      boredDavidInstance.walletOfOwner(),
      'Invalid number of parameters for "walletOfOwner"'
    );
  });
});
