const { expectRevert } = require("@openzeppelin/test-helpers");

const BoredDavid = artifacts.require("BoredDavid");

contract("Set max mint amount", (accounts) => {
  const [owner, user1] = accounts;
  let boredDavidInstance = null;
  before(async () => {
    boredDavidInstance = await BoredDavid.deployed();
  });

  it("Should be callable only by owner", async () => {
    await expectRevert(
      boredDavidInstance.setmaxMintAmount(2, {
        from: user1,
      }),
      "Ownable: caller is not the owner"
    );
  });

  it("Should update max mint amount", async () => {
      const oldMax = await boredDavidInstance.maxMintAmount()
      await boredDavidInstance.setmaxMintAmount(oldMax.toNumber() + 10)
      const currentMax = await boredDavidInstance.maxMintAmount();
      assert.equal(oldMax.toNumber() + 10, currentMax.toNumber())
  })
});
