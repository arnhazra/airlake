// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LFTContract is ERC20 {
    constructor() ERC20("Lenstack Fungible Token", "LFT") {
        _mint(msg.sender, 300000 * 10 ** decimals());
    }

    function mintCustomAmount(uint256 amount) public {
        _mint(msg.sender, amount);
    }
}
