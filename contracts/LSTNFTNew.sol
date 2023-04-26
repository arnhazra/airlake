// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./LST.sol";

contract LSTNFT is ERC721 {
    LST public fungibleToken;

    struct NFToken {
        uint256 tokenId;
        string datasetId;
        uint256 price;
        address owner;
    }

    mapping(uint256 => NFToken) public nft;

    constructor() ERC721("LST_NFT", "LSTNFT") {}

    function createNft(
        uint256 tokenId,
        string memory datasetId,
        uint256 price,
        address ftContract
    ) public {
        address owner = msg.sender;
        _mint(owner, tokenId);
        nft[tokenId] = NFToken(tokenId, datasetId, price, owner);
        require(
            fungibleToken.allowance(owner, address(this)) >= price,
            "Insufficient allowance"
        );
        fungibleToken.transferFrom(owner, ftContract, price);
    }

    function buyItem(uint256 tokenId) public {
        address owner = nft[tokenId].owner;
        fungibleToken.transfer(owner, nft[tokenId].price);
        _transfer(owner, msg.sender, tokenId);
        nft[tokenId].owner = msg.sender;
        owner = msg.sender;
    }

    function sellIten(uint256 tokenId, uint256 price) public {
        address owner = nft[tokenId].owner;
        require(msg.sender == owner, "Only owner can sell");
        nft[tokenId].price = price;
    }
}
