// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LenstackNFT is ERC721, Ownable {
    IERC20 public tokenContract;

    constructor(address _tokenAddress) ERC721("LenstackNFT", "LNFT") {
        tokenContract = IERC20(_tokenAddress);
    }

    function mintNft(uint256 tokenId, uint256 nftPrice) public {
        tokenContract.transferFrom(msg.sender, address(this), nftPrice);
        _safeMint(msg.sender, tokenId);
    }
}
