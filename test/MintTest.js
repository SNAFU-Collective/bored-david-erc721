const { expectRevert } = require("@openzeppelin/test-helpers");
const BoredDavid = artifacts.require("BoredDavid");

contract("Mint NFTs", (accounts) => {
    const [owner, user1, user2, user3] = accounts
    let boredDavidInstance = null

    before(async () => {
        boredDavidInstance = await BoredDavid.deployed();
    })

    it("Should failed because of null value", async () => {
        const response = await boredDavidInstance.mint(10, {
            from: user1,
        })
        console.log(response);
    })
})