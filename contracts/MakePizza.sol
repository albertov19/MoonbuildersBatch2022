// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract MakePizza {
    uint256 public pizzaCounter;
    IERC20 pizzaToken;

    constructor(address _pizzaToken) {
        pizzaToken = IERC20(_pizzaToken);
    }

    function makePizza() public {
        require(pizzaToken.balanceOf(msg.sender)>= 1 ether, "Not Enough Pizza Tokens");
        require(pizzaToken.allowance(msg.sender, address(this)) >= 1 ether, "Not Enough Pizza Allowance");
        pizzaToken.transferFrom(msg.sender, address(this), 1 ether);
        pizzaCounter++;
    }

    function getPZTBalance() public view returns (uint256) {
        return pizzaToken.balanceOf(address(this));
    }
}