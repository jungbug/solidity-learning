# @version ^0.4.0
# @license MIT

owner: address
manager: address

@deploy
def __init__(_owner: address, _manager: address):
    self.owner = _owner
    self.manager = _manager

@internal
def _onlyOwner(_owner: address):
    assert self.owner == _owner, "You are not authorized"

@internal
def _onlyManager(_manager: address):
    assert self.manager == _manager, "You are not authorized to manager this contract"