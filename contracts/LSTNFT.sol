// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./LST.sol";
import "./Vendor.sol";

contract LSTNFT is ERC721 {
    address payable public owner;
    LST public currencyToken;
    Vendor public vendorToken;

    struct Item {
        uint tokenId;
        string title;
        uint256 price;
        address payable owner;
    }

    mapping(uint256 => Item) public item;

    constructor(
        uint tokenId,
        string memory title,
        uint price,
        address LSTAddress
    ) ERC721("LST_NFT", "LSTNFT") {
        owner = payable(msg.sender);
        _safeMint(owner, tokenId);
        item[tokenId] = Item(tokenId, title, price, owner);
        currencyToken = LST(LSTAddress);
    }

    function buyItem(uint tokenId) public payable {
        require(msg.sender != owner, "You cannot buy your own item");
        vendorToken.transferToken(payable(msg.sender), item[tokenId].price);
        _transfer(owner, msg.sender, tokenId);
        item[tokenId].owner = payable(msg.sender);
        owner = payable(msg.sender);
    }
}
