const BoredDavid = artifacts.require("BoredDavid");
const { expectRevert } = require("@openzeppelin/test-helpers");

contract("set cost for contract", (accounts) => {
  const deployAccount = accounts[0];
  let boredDavidInstance = null;
  before(async () => {
    boredDavidInstance = await BoredDavid.deployed();
  });

  it("Should set cost correctly by owner", async () => {
    let cost = await boredDavidInstance.cost();
    await boredDavidInstance.setCost(cost.toNumber() + 2, {
      from: deployAccount,
    });
    let updatedCost = await boredDavidInstance.cost();
    assert.equal(updatedCost.toNumber(), cost.toNumber() + 2);
  });

  it("Should be failed if set cost try without owner", async () => {
    await expectRevert(
      boredDavidInstance.setCost(2, {
        from: accounts[1],
      }),
      "Ownable: caller is not the owner"
    );
  });
});
