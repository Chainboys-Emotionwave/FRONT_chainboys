// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./lib/ERC721Minimal.sol";

contract SoulboundBadge is ERC721Minimal {
    address public minter;

    error Soulbound();

    constructor(string memory name_, string memory symbol_) ERC721Minimal(name_, symbol_) {
        minter = msg.sender;
    }

    modifier onlyMinter() {
        require(msg.sender == minter, "not minter");
        _;
    }

    function setMinter(address m) external onlyOwner {
        minter = m;
    }

    function mint(address to, uint256 tokenId, string memory uri) external onlyMinter {
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // disable transfers/approvals
    function approve(address, uint256) public pure override { revert Soulbound(); }
    function setApprovalForAll(address, bool) public pure override { revert Soulbound(); }
    function transferFrom(address, address, uint256) public pure override { revert Soulbound(); }
    function safeTransferFrom(address, address, uint256) public pure override { revert Soulbound(); }
    function safeTransferFrom(address, address, uint256, bytes memory) public pure override { revert Soulbound(); }
}


