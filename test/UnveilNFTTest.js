const { expectRevert } = require("@openzeppelin/test-helpers");

const BoredDavid = artifacts.require("BoredDavid");

contract("Unveil NFT", (accounts) => {
  const [owner, user1] = accounts;
  let boredDavidInstance = null;
  before(async () => {
    boredDavidInstance = await BoredDavid.deployed();
  });

  it("Should be callable only by owner", async () => {
    await expectRevert(
      boredDavidInstance.unveilNFTs([], [], {
        from: user1,
      }),
      "Ownable: caller is not the owner"
    );
  });

  it("Should be same length of token and uris", async () => {
    await expectRevert(
      boredDavidInstance.unveilNFTs([1, 2], [], {
        from: owner,
      }),
      "Parameters Arrays should have the same length"
    );
  });

  it("Owner can unveil nfts successfully", async () => {
      await boredDavidInstance.mint(2, {
        from: owner,
      });

    await boredDavidInstance.unveilNFTs(
      [1, 2],
      ["http://updateuri.com", "http://updateuri2.com"],
      {
        from: owner,
      }
    );

    const tokenURI = await boredDavidInstance.tokenURI(1);
    assert.equal(tokenURI, "http://updateuri.com");

  });
});
