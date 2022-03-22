const { expectRevert } = require("@openzeppelin/test-helpers");
const BoredDavid = artifacts.require("BoredDavid");

contract("Mint NFTs", (accounts) => {
    const [owner, user1, user2, user3] = accounts
    let boredDavidInstance = null

    before(async () => {
        boredDavidInstance = await BoredDavid.deployed();
    })

    it("Mint amount must be more than 0", async () => {
        await expectRevert(
          boredDavidInstance.mint(0, {
            from: user1,
          }),
          "Mint amount must be more than 0"
        );
    })

    it("Mint amount must be less than or equal to maxMintAmount", async () => {
      await expectRevert(
        boredDavidInstance.mint(10, {
          from: user1,
        }),
        "Mint amount must be less than or equal to maxMintAmount"
      );
    });

    // TODO: max supply test case, maybe we could deploy sc with 1 total supply and try to mint 2 nfts or if this is not
    // doable we could just test it manually in ropsten

    it("Need to pay appropriate amount of eth to mint", async () => {
      await expectRevert(
        boredDavidInstance.mint(5, {
          from: user1,
        }),
        "Need appropriate amount of eth"
      );
    });

    it("User can mint nft correctly", async () => {
      const response = await boredDavidInstance.mint(5, {
          from: user1,
          value: 5,
        })

        assert.equal(response.logs[0].event, "Transfer");
        assert.equal(response.logs[1].event, "UserMint");
    });

    it("Owner do not need to pay in order to mint", async () => {
      const response = await boredDavidInstance.mint(5, {
        from: owner,
      });

      assert.equal(response.logs[0].event, "Transfer");
      assert.equal(response.logs[1].event, "OwnerMint");
    });
})