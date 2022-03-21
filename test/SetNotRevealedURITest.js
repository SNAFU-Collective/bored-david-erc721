const { expectRevert } = require("@openzeppelin/test-helpers");

const BoredDavid = artifacts.require("BoredDavid");

contract("Set not revealed URI", (accounts) => {
  const [owner, user1] = accounts;
  let boredDavidInstance = null;
  before(async () => {
    boredDavidInstance = await BoredDavid.deployed();
  });

  it("Should be callable only by owner", async () => {
    await expectRevert(
      boredDavidInstance.setNotRevealedURI("http://testuri.com", {
        from: user1,
      }),
      "Ownable: caller is not the owner"
    );
  });

  it("Should update max mint amount", async () => {
      const oldURI = await boredDavidInstance.notRevealedUri();
      await boredDavidInstance.setNotRevealedURI("http://testuri.com");
      const currentURI = await boredDavidInstance.notRevealedUri();

      assert(oldURI != currentURI)
      assert.equal(currentURI, "http://testuri.com");
  })
});
