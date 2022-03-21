const { expectRevert } = require("@openzeppelin/test-helpers");
const BoredDavid = artifacts.require("BoredDavid");

contract("Add, remove, claim Airdrop", (accounts) => {
  const [owner, user1, user2] = accounts;
  let boredDavidInstance = null;
  
  before(async () => {
    boredDavidInstance = await BoredDavid.deployed();
  });

   // add airdrop
  it("Only owner can add addresses to airdrop", async () => {
    await expectRevert(
      boredDavidInstance.addAddressesToAirdrop([user1], {
        from: user2,
      }),
      "Ownable: caller is not the owner"
    );
  });

  it("Owner can correctly add addresses to airdrop", async () => {
     const response = await boredDavidInstance.addAddressesToAirdrop([user1, user2])
      assert.equal(response.receipt.status, true);
  });

  it("Should fail without array argument", async () => {
    await expectRevert(
      boredDavidInstance.addAddressesToAirdrop(),
      'Invalid number of parameters for "addAddressesToAirdrop"'
    );
  });

  // remove from airdrop list
  it("Only owner should be able to remove addresses from airdrop list", async () => {
    await expectRevert(
      boredDavidInstance.removeAddressesToAirdrop([user1], {
        from: user2,
      }),
      "Ownable: caller is not the owner"
    );
  });

   it("Owner can successfully remove addresses from airdrop list", async () => {
     const response = await boredDavidInstance.addAddressesToAirdrop([
       user1,
       user2,
     ]);
     assert.equal(response.receipt.status, true);
   });

  // claim airdrop
  it("Whitelisted user can successfully claim airdrop", async () => {
    await boredDavidInstance.addAddressesToAirdrop([user1, user2], {
      from: owner,
    });

    const response = await boredDavidInstance.claimAirdrop({from: user1})
    assert.equal(response.logs[0].event, "Transfer")
    assert.equal(response.logs[1].event, "AirdropClaimed");
  });

  it("Only whitelisted users can claim airdrop", async () => {
    await expectRevert(
      boredDavidInstance.claimAirdrop({
        from: user1,
      }),
      "Only listed users can mint it once"
    );
  });
});
