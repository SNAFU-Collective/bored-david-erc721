const { expectRevert } = require("@openzeppelin/test-helpers");

const BoredDavid = artifacts.require("BoredDavid");

contract("Owner Wallet", (accounts) => {
  const [owner, user1] = accounts;
  let boredDavidInstance = null;
  before(async () => {
    boredDavidInstance = await BoredDavid.deployed();
  });

  it("User can index the nfts he owns", async () => {
    await boredDavidInstance.mint(5, {
      from: user1,
      value: 5,
    });
    const tokens = await boredDavidInstance.walletOfOwner(user1);
    assert.equal(tokens.length, 5);
  });

  it("User address is needed to index nfts of a user", async () => {
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
