// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MyToken{
    string public name;
    string public symbol;
    uint8 public decimals;

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    constructor(string memory _name, string memory _symbol, uint8 _decimal) {
        name = _name;
        symbol = _symbol;
        decimals = _decimal;
        _mint(1000000000000000000, msg.sender); // 1 MT 발생함 sender에게 보낸다.
    }

    function _mint(uint amount, address owner) internal {
        totalSupply += amount;
        balanceOf[owner] += amount;
    }

    // function totalSupply() external view returns (uint256) {
    //     return totalSupply;
    // }

    // function balanceOf(address owner) external view returns (uint256) {
    //     return balanceOf[owner];
    // } 

    // function name() external view returns (string memory) {
    //     return name;
    // }
}
