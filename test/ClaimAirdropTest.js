const { expectRevert } = require("@openzeppelin/test-helpers");
const BoredDavid = artifacts.require("BoredDavid");

contract("Claim Airdrop", (accounts) => {
  const deployAccount = accounts[0];
  let boredDavidInstance = null;
  
  before(async () => {
    boredDavidInstance = await BoredDavid.deployed();
  });

  it("Should success to claim airdrop", async () => {
    await boredDavidInstance.addAddressesToAirdrop([accounts[1]], {
      from: accounts[0],
    });

    const response = await boredDavidInstance.claimAirdrop({from: accounts[1]})
    assert.equal(response.logs[0].event, "Transfer")
    assert.equal(response.logs[1].event, "AirdropClaimed");
  });

  it("Should fail to claim airdrop", async () => {
    await expectRevert(
      boredDavidInstance.claimAirdrop({
        from: accounts[1],
      }),
      "Only listed users can mint it once"
    );
  });
});
