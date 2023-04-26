// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract LSTNFT is ERC721 {
    constructor() ERC721("LST_NFT", "LSTNFT") {}

    function createNft(uint256 tokenId) public payable {
        address nftOwner = msg.sender;
        _mint(nftOwner, tokenId);
    }
}
