//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

abstract contract MultiManagedAccess {
    uint constant public MANAGER_NUMBERS = 5;
    uint immutable public BACKUP_MANAGERS_NUMBERS;

    address public owner;
    address[MANAGER_NUMBERS] public managers;
    bool[MANAGER_NUMBERS] public confirmed;

    constructor(address _owner, address[MANAGER_NUMBERS] memory _managers, uint _manager_numbers) {
        require(_managers.length == _manager_numbers, "size unmatched");
        owner = _owner;
        for (uint i = 0; i < MANAGER_NUMBERS; i++) {
            managers[i] = _managers[i];
        }
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function allConfirmed() internal view returns (bool) {
        for (uint i = 0; i < MANAGER_NUMBERS; i++) {
            if (!confirmed[i]) {
                return false;
            }
        }
        return true;
    }

    function reset() internal {
        for (uint i = 0; i < MANAGER_NUMBERS; i++) {
            confirmed[i] = false;
        }
    }

    modifier onlyAllConfirmed() {
        require(allConfirmed(), "Not all managers confirmed");
        reset();
        _;
    }

    function confirm() external {
        bool found = false;
        for (uint i=0; i < MANAGER_NUMBERS; i++) {
            if (managers[i] == msg.sender) {
                confirmed[i] = true;
                found = true;
                break;
            }
        }
        require(found, "You are not one of managers");
    }

} 