const { expectRevert, balance } = require("@openzeppelin/test-helpers");

const BoredDavid = artifacts.require("BoredDavid");

contract("Withdraw balance", (accounts) => {
  const [owner, user1, user2] = accounts;
  let boredDavidInstance = null;
  before(async () => {
    boredDavidInstance = await BoredDavid.deployed();
  });

  it("Only owner should be able to withdraw", async () => {
    await expectRevert(
      boredDavidInstance.withdraw({
        from: user1,
      }),
      "Ownable: caller is not the owner"
    );
  });

  it("Owner should be able to withdraw balance successfully", async () => {
    const ownerBalance = await balance.current(owner);
    await boredDavidInstance.mint(5, {
      from: user1,
      value: 5,
    });

    const contractAdd = await boredDavidInstance.address;
    const contractBalance = await balance.current(contractAdd);
    assert.equal(contractBalance.toNumber(), 5);
    await boredDavidInstance.withdraw();
    const currentContractBalance = await balance.current(contractAdd);

    assert.equal(currentContractBalance.toNumber(), 0);
    const ownerCurrentBalance = await balance.current(owner);
    assert(ownerBalance != ownerCurrentBalance)
  });
});
