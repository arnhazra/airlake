// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import "./ELT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Vendor is Ownable {
    ELT yourToken;
    uint256 public tokensPerETH = 10000;
    event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);

    constructor(address tokenAddress) {
        yourToken = ELT(tokenAddress);
    }

    function buyTokens() public payable returns (uint256 tokenAmount) {
        require(msg.value > 0, "You need to send some ETH to proceed");
        uint256 amountToBuy = msg.value * tokensPerETH;

        uint256 vendorBalance = yourToken.balanceOf(address(this));
        require(vendorBalance >= amountToBuy, "Vendor has insufficient tokens");

        bool sent = yourToken.transfer(msg.sender, amountToBuy);
        require(sent, "Failed to transfer token to user");

        emit BuyTokens(msg.sender, msg.value, amountToBuy);
        return amountToBuy;
    }

    function sellTokens(uint256 tokenAmountToSell) public {
        require(
            tokenAmountToSell > 0,
            "Specify an amount of token greater than zero"
        );

        uint256 userBalance = yourToken.balanceOf(msg.sender);
        require(
            userBalance >= tokenAmountToSell,
            "You have insufficient tokens"
        );

        uint256 amountOfETHToTransfer = tokenAmountToSell / tokensPerETH;
        uint256 ownerETHBalance = address(this).balance;
        require(
            ownerETHBalance >= amountOfETHToTransfer,
            "Vendor has insufficient funds"
        );
        bool sent = yourToken.transferFrom(
            msg.sender,
            address(this),
            tokenAmountToSell
        );
        require(sent, "Failed to transfer tokens from user to vendor");

        (sent, ) = msg.sender.call{value: amountOfETHToTransfer}("");
        require(sent, "Failed to send ETH to the user");
    }

    function transferToken(address recipient, uint256 amount) public {
        require(amount > 0, "Specify an amount greater than zero");

        uint256 userBalance = yourToken.balanceOf(msg.sender);
        require(userBalance >= amount, "You have insufficient tokens");

        bool sent = yourToken.transfer(recipient, amount);
        require(sent, "Failed to transfer token");
    }
}
