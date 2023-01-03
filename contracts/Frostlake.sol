// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Frostlake is ERC20 {
    constructor() ERC20("Frostlake", "FLG") {
        _mint(msg.sender, 10000000 * 10**18);
    }
}
