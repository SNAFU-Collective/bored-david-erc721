const BoredDavid = artifacts.require('BoredDavid')

contract('Deploy BoredDavid smart contract', (accounts) => {
    const deployAccount = accounts[0]
    let boredDavidInstance = null
    before(async () => {
        boredDavidInstance = await BoredDavid.deployed()
    })

    it('Should deploy smart contract properly', async () => {
        assert(boredDavidInstance.address != '')
    })

    it("OWNER should be set to the deploying address", async () => {
        const owner = await boredDavidInstance.owner()
        assert.equal(owner, deployAccount, "The deploying address should be the owner of the contract")
    })
})