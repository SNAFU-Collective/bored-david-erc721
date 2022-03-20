const { expectRevert } = require("@openzeppelin/test-helpers");
const BoredDavid = artifacts.require("BoredDavid");

contract("Mint NFTs", (accounts) => {
    const [owner, user1, user2, user3] = accounts
    let boredDavidInstance = null

    before(async () => {
        boredDavidInstance = await BoredDavid.deployed();
    })

    it("Should be failed because of less mint amout", async () => {
        await expectRevert(
          boredDavidInstance.mint(0, {
            from: user1,
          }),
          "Mint amount must be more than 0"
        );
    })

    it("Should be failed because of more than max mint amout", async () => {
      await expectRevert(
        boredDavidInstance.mint(10, {
          from: user1,
        }),
        "Mint amount must be less than or equal to maxMintAmount"
      );
    });

    // TODO: max supply test case

    it("Should be failed due to less amount of eth", async () => {
      await expectRevert(
        boredDavidInstance.mint(5, {
          from: user1,
        }),
        "Need appropriate amount of eth"
      );
    });

    it("Should be failed due to less amount of eth", async () => {
      const response = await boredDavidInstance.mint(5, {
          from: user1,
          value: 5,
        })

        assert.equal(response.logs[0].event, "Transfer");
        assert.equal(response.logs[1].event, "UserMint");
    });

    it("Should be minted without eth if user is owner", async () => {
      const response = await boredDavidInstance.mint(5, {
        from: owner,
      });

      assert.equal(response.logs[0].event, "Transfer");
      assert.equal(response.logs[1].event, "OwnerMint");
    });
})