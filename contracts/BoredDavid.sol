// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";


//TODO: add error messages
//TODO: test the batch amount
contract BoredDavid is
    ERC721Enumerable,
    ERC721URIStorage,
    ERC721Burnable,
    Ownable
{
    event AirdropClaimed(address indexed user, uint256 indexed tokenId);
    event OwnerMint(address indexed user, uint256 indexed tokenId);
    event UserMint(address indexed user, uint256 indexed tokenId);

    using Strings for uint256;

    uint256 public cost;
    uint256 public maxSupply;
    uint256 public maxMintAmount;
    bool public paused = false;
    string public notRevealedUri;

    mapping(address => bool) public eligibleForAirdrop;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initNotRevealedUri,
        uint256 _cost,
        uint256 _maxSupply,
        uint256 _maxMintAmount
    ) ERC721(_name, _symbol) {
        setNotRevealedURI(_initNotRevealedUri);
        cost = _cost;
        maxSupply = _maxSupply;
        maxMintAmount = _maxMintAmount;
    }

    function claimAirdrop() external {
        require(
            eligibleForAirdrop[msg.sender] == true,
            "Only listed users can mint it once"
        );
        eligibleForAirdrop[msg.sender] = false;
        uint256 supply = totalSupply();
        require(!paused);
        uint256 tokenId = supply + 1;
        require(tokenId <= maxSupply);
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, notRevealedUri);
        emit AirdropClaimed(msg.sender, tokenId);
    }

    //TODO: Add another variable to enable minting
    function mint(uint256 _mintAmount) external payable {
        uint256 supply = totalSupply();
        require(!paused);
        require(_mintAmount > 0);
        require(msg.sender == owner() || _mintAmount <= maxMintAmount);
        require(supply + _mintAmount <= maxSupply);

        if (msg.sender != owner()) {
            require(msg.value >= cost * _mintAmount);
        }

        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender, supply + i);
            _setTokenURI(supply + i, notRevealedUri);
            if (msg.sender != owner()) {
                emit UserMint(msg.sender, supply + i);
            }else{
                emit OwnerMint(msg.sender, supply + i);
            }
        }
    }

    function walletOfOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i = 0; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // Only owner can access these
    function addAddressesToAirdrop(address[] memory _users) external onlyOwner {
        for (uint256 i = 0; i < _users.length; i++) {
            eligibleForAirdrop[_users[i]] = true;
        }
    }

    function removeAddressesToAirdrop(address[] memory _users)
        external
        onlyOwner
    {
        for (uint256 i = 0; i < _users.length; i++) {
            eligibleForAirdrop[_users[i]] = false;
        }
    }

    //unveilNFTs

    // One will accept a batch of nfts.

    // Parameters: 2 arrays, one for token ids and one for token uris. You can update it more than once.

    // We could do a mapping (unveiled -> true/false). If unveiled === true then you cannot update the tokenUri.

    function unveilNFTs(uint256[] memory tokenIds, string[] memory uris)
        external
        onlyOwner
    {
        require(
            tokenIds.length == uris.length,
            "Parameters Arrays should have the same length"
        );
        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            string memory uri = uris[i];
            if (
                keccak256(abi.encodePacked(tokenURI(tokenId))) ==
                keccak256(abi.encodePacked(notRevealedUri))
            ) {
                _setTokenURI(tokenId, uri);
            }
        }
    }

    function setCost(uint256 _newCost) external onlyOwner {
        cost = _newCost;
    }

    function setmaxMintAmount(uint256 _newmaxMintAmount) external onlyOwner {
        maxMintAmount = _newmaxMintAmount;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function pause(bool _state) external onlyOwner {
        paused = _state;
    }

    function withdraw() external onlyOwner {
        address _owner = owner();
        payable(_owner).transfer(address(this).balance);
    }
}
