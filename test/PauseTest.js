const { expectRevert } = require("@openzeppelin/test-helpers");

const BoredDavid = artifacts.require("BoredDavid");

contract("Pause test", (accounts) => {
  const [owner, user1] = accounts;
  let boredDavidInstance = null;
  before(async () => {
    boredDavidInstance = await BoredDavid.deployed();
  });

  it("Should be callable only by owner", async () => {
    await expectRevert(
      boredDavidInstance.pause(true, {
        from: user1,
      }),
      "Ownable: caller is not the owner"
    );
  });

  it("Should update contract pause status", async () => {
      const oldState = await boredDavidInstance.paused();
      await boredDavidInstance.pause(true);
      const currentState = await boredDavidInstance.paused();

      assert(oldState != currentState);
      assert.equal(currentState, true);
  })
});
