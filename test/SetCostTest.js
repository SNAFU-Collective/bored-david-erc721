const BoredDavid = artifacts.require("BoredDavid");
const { expectRevert } = require("@openzeppelin/test-helpers");

contract("set cost for contract", (accounts) => {
  const [owner, user1] = accounts;
  let boredDavidInstance = null;
  before(async () => {
    boredDavidInstance = await BoredDavid.deployed();
  });

  // set rare cost
  it("Should set rare cost correctly by owner", async () => {
    let cost = await boredDavidInstance.rareCost();
    await boredDavidInstance.setRareCost(cost.toNumber() + 2, {
      from: owner,
    });
    let updatedCost = await boredDavidInstance.rareCost();
    assert.equal(updatedCost.toNumber(), cost.toNumber() + 2);
  });

  it("Only owner can set rare cost", async () => {
    await expectRevert(
      boredDavidInstance.setRareCost(2, {
        from: user1,
      }),
      "Ownable: caller is not the owner"
    );
  });

  // set common cost
  it("Should set common cost correctly by owner", async () => {
    let cost = await boredDavidInstance.commonCost();
    await boredDavidInstance.setCommonCost(cost.toNumber() + 2, {
      from: owner,
    });
    let updatedCost = await boredDavidInstance.commonCost();
    assert.equal(updatedCost.toNumber(), cost.toNumber() + 2);
  });

  it("Only owner can set common cost", async () => {
    await expectRevert(
      boredDavidInstance.setCommonCost(2, {
        from: user1,
      }),
      "Ownable: caller is not the owner"
    );
  });
});
