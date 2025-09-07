// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

abstract contract ERC721Minimal {
    string public name;
    string public symbol;
    address public owner;

    mapping(uint256 => address) internal _owners;
    mapping(address => uint256) internal _balances;
    mapping(uint256 => string) internal _tokenURIs;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor(string memory name_, string memory symbol_) {
        name = name_;
        symbol = symbol_;
        owner = msg.sender;
    }

    function balanceOf(address a) public view returns (uint256) {
        require(a != address(0), "zero");
        return _balances[a];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address o = _owners[tokenId];
        require(o != address(0), "not minted");
        return o;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_owners[tokenId] != address(0), "not minted");
        return _tokenURIs[tokenId];
    }

    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        require(_owners[tokenId] != address(0), "not minted");
        _tokenURIs[tokenId] = uri;
    }

    function approve(address, uint256) public virtual {}
    function setApprovalForAll(address, bool) public virtual {}
    function transferFrom(address, address, uint256) public virtual {}
    function safeTransferFrom(address, address, uint256) public virtual {}
    function safeTransferFrom(address, address, uint256, bytes memory) public virtual {}

    function _mint(address to, uint256 tokenId) internal {
        require(to != address(0), "zero");
        require(_owners[tokenId] == address(0), "exists");
        _owners[tokenId] = to;
        _balances[to] += 1;
        emit Transfer(address(0), to, tokenId);
    }
}


