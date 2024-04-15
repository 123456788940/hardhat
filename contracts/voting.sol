// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;


contract vote {
    // variable denoting the owner
    address public owner;
    // variable denoting the user
    address public user;
    // total count of votes
    uint  votes;
    // mapping to denote participant enabling it to take part
    mapping(address=>bool) public hasParticipated;
    // mapping to enable voting right
    mapping(address=>bool) public hasVoted;
    // constructor to initialize variables
    constructor(){
        owner=msg.sender;
        user=msg.sender;
    }
    // modifier only giving access to the owner for particular functions
    modifier onlyOwner() {
        require(owner==msg.sender, "only owner has access");
        _;
    }
        
    // modifier only giving access to the user for particular functions
      modifier onlyUser() {
        require(user==msg.sender, "only user has access");
        _;
    }
    
    // function enabling users to participate in protocols
    function participateInProtocol(address participant) public onlyUser {
        require(participant != address(0), "participant address has to be valid");
        require(!hasParticipated[user], "participant has not participated yet");
        hasParticipated[user] = true;


    }

    // function enabling users to vote
    function casteVote(address participant) public onlyUser {
     require(participant != address(0), "participant address has to be valid");
     require(hasParticipated[user], "participant has not participated yet");
     require(!hasVoted[user], "voting not done yet");
     hasVoted[user] = true;
     votes++;

    }

   //  function to track votes
    function trackVotes() public view onlyOwner returns(uint) {
        return votes;
    }


}