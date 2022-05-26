const BoredDavid = artifacts.require("BoredDavid");
const { expectRevert } = require("@openzeppelin/test-helpers");

contract("set cost for contract", (accounts) => {
  const [owner, user1] = accounts;
  let boredDavidInstance = null;
  before(async () => {
    boredDavidInstance = await BoredDavid.deployed();
  });

  // enable common sale
  it("user can not enable common sale", async () => {
    await expectRevert(
      boredDavidInstance.enableCommonSale(true, {
        from: user1,
      }),
      "Ownable: caller is not the owner"
    );
  });

  it("Admin can enable common sale", async () => {
      const oldState = await boredDavidInstance.commonSaleEnabled()
      await boredDavidInstance.enableCommonSale(true)
      const currentState = await boredDavidInstance.commonSaleEnabled();
      assert.equal(currentState, true)
      //assert(oldState != currentState)
  })

  // enable rare sale
  it("user can not enable rare sale", async () => {
    await expectRevert(
      boredDavidInstance.enableRareSale(true, {
        from: user1,
      }),
      "Ownable: caller is not the owner"
    );
  });

  it("Admin can enable rare sale", async () => {
    const oldState = await boredDavidInstance.rareSaleEnabled();
    await boredDavidInstance.enableRareSale(true);
    const currentState = await boredDavidInstance.rareSaleEnabled();
    assert.equal(currentState, true);
    //assert(oldState != currentState);
  });
});
