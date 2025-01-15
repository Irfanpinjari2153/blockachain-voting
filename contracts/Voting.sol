// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    address public admin;
    mapping(address => bool) public isRegistered;
    mapping(address => bool) public hasVoted;
    Candidate[] public candidates;

    event VoterRegistered(address indexed voter);
    event VoteCast(address indexed voter, string candidate);

    constructor(string[] memory candidateNames) {
        admin = msg.sender;
        for (uint256 i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({name: candidateNames[i], voteCount: 0}));
        }
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    function registerVoter(address _voter) public onlyAdmin {
        require(!isRegistered[_voter], "Voter is already registered.");
        isRegistered[_voter] = true;
        emit VoterRegistered(_voter);
    }

    function vote(string memory _candidate) public {
        require(isRegistered[msg.sender], "You must be registered to vote.");
        require(!hasVoted[msg.sender], "You have already voted.");

        bool candidateFound = false;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (keccak256(abi.encodePacked(candidates[i].name)) == keccak256(abi.encodePacked(_candidate))) {
                candidates[i].voteCount++;
                candidateFound = true;
                break;
            }
        }

        require(candidateFound, "Invalid candidate.");
        hasVoted[msg.sender] = true;
        emit VoteCast(msg.sender, _candidate);
    }

    function getAllCandidates() public view returns (string[] memory) {
        string[] memory names = new string[](candidates.length);
        for (uint256 i = 0; i < candidates.length; i++) {
            names[i] = candidates[i].name;
        }
        return names;
    }

    function getVotes(string memory _candidate) public view returns (uint256) {
        for (uint256 i = 0; i < candidates.length; i++) {
            if (keccak256(abi.encodePacked(candidates[i].name)) == keccak256(abi.encodePacked(_candidate))) {
                return candidates[i].voteCount;
            }
        }
        revert("Candidate not found.");
    }
}
