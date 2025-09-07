// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RewardPool {
    address public owner;
    uint256 public totalPool;
    uint256 public start;
    uint256 public end;
    bytes public rule;

    event Deposited(address indexed sender, uint256 amount);
    event Configured(uint256 start, uint256 end, bytes rule);
    event Distributed(bytes32 indexed batchId, address[] creators, uint256[] amounts);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function deposit() external payable {
        require(msg.value > 0, "no value");
        totalPool += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function configure(uint256 _start, uint256 _end, bytes calldata _rule) external onlyOwner {
        require(_start < _end, "invalid period");
        start = _start;
        end = _end;
        rule = _rule;
        emit Configured(_start, _end, _rule);
    }

    function getSchedule() external view returns (uint256, uint256, bytes memory) {
        return (start, end, rule);
    }

    function distribute(address[] calldata creators, uint256[] calldata amounts) external onlyOwner {
        require(creators.length == amounts.length, "length mismatch");
        uint256 total;
        for (uint256 i = 0; i < amounts.length; i++) {
            total += amounts[i];
        }
        require(total <= totalPool, "exceeds pool");
        totalPool -= total;
        for (uint256 i = 0; i < creators.length; i++) {
            (bool ok, ) = creators[i].call{value: amounts[i]}("");
            require(ok, "transfer failed");
        }
        bytes32 batchId = keccak256(abi.encodePacked(block.number, creators.length, total));
        emit Distributed(batchId, creators, amounts);
    }
}


