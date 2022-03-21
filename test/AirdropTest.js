const { expectRevert } = require("@openzeppelin/test-helpers");
const BoredDavid = artifacts.require("BoredDavid");

contract("Add, remove, claim Airdrop", (accounts) => {
  const [owner, user1, user2] = accounts;
  let boredDavidInstance = null;
  
  before(async () => {
    boredDavidInstance = await BoredDavid.deployed();
  });

   // add airdrop
  it("Should be failed to add airdrop list due to onlyOwner access", async () => {
    await expectRevert(
      boredDavidInstance.addAddressesToAirdrop([user1], {
        from: user2,
      }),
      "Ownable: caller is not the owner"
    );
  });

  it("Should add users to airdrop list", async () => {
     const response = await boredDavidInstance.addAddressesToAirdrop([user1, user2])
      assert.equal(response.receipt.status, true);
  });

  it("Should be failed without array argument", async () => {
    await expectRevert(
      boredDavidInstance.addAddressesToAirdrop(),
      'Invalid number of parameters for "addAddressesToAirdrop"'
    );
  });

  // remove from airdrop list
  it("Should be failed to remove airdrop list due to onlyOwner access", async () => {
    await expectRevert(
      boredDavidInstance.removeAddressesToAirdrop([user1], {
        from: user2,
      }),
      "Ownable: caller is not the owner"
    );
  });

   it("Should remove users to airdrop list", async () => {
     const response = await boredDavidInstance.addAddressesToAirdrop([
       user1,
       user2,
     ]);
     assert.equal(response.receipt.status, true);
   });

  // claim airdrop
  it("Should success to claim airdrop", async () => {
    await boredDavidInstance.addAddressesToAirdrop([user1, user2], {
      from: owner,
    });

    const response = await boredDavidInstance.claimAirdrop({from: user1})
    assert.equal(response.logs[0].event, "Transfer")
    assert.equal(response.logs[1].event, "AirdropClaimed");
  });

  it("Should fail to claim airdrop", async () => {
    await expectRevert(
      boredDavidInstance.claimAirdrop({
        from: user1,
      }),
      "Only listed users can mint it once"
    );
  });
});
