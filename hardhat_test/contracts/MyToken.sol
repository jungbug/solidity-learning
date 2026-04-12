// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MyToken{
    string public name;
    string public symbol;
    uint8 public decimals;

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    constructor(string memory _name, string memory _symbol, uint8 _decimal, uint256 _amount) {
        name = _name;
        symbol = _symbol;
        decimals = _decimal;
        _mint(_amount * 10 ** uint256(decimals), msg.sender);
    }

    function _mint(uint amount, address owner) internal {
        totalSupply += amount;
        balanceOf[owner] += amount;
    }

    function transfer(uint256 amount, address to) external {
        require(balanceOf[msg.sender] >= amount, "insufficient balance"); // uint 256은 음수가 없는데 음수를 만들면서 에러가 뜨기 때문에 방지
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
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
