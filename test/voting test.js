const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vote contract", function () {
  let Vote;
  let vote;
  let owner;
  let user;
  const participant = "0x1234567890123456789012345678901234567890";

  beforeEach(async function () {
    Vote = await ethers.getContractFactory("vote"); // Corrected variable name
    [owner, user] = await ethers.getSigners();
    vote = await Vote.deploy();
  });

  it("Should set the owner and user correctly", async function () {
    expect(await vote.owner()).to.equal(owner.address);
    expect(await vote.user()).to.equal(owner.address);
  });

  it("Should allow user to participate in protocol", async function () {
    await vote.participateInProtocol(participant);
    expect(await vote.hasParticipated(owner.address)).to.be.true;
  });

  it("Should allow user to cast vote", async function () {
    await vote.participateInProtocol(participant);
    await vote.casteVote(participant);
    expect(await vote.hasVoted(owner.address)).to.be.true;
    expect(await vote.trackVotes()).to.equal(1);
  });

  it("Should revert if participant address is invalid", async function () {
    await expect(vote.participateInProtocol(ethers.constants.AddressZero)).to.be.revertedWith(
      "participant address has to be valid"
    ); // Corrected error message
  });

  it("Should revert if participant has not participated yet", async function () {
    await expect(vote.casteVote(participant)).to.be.revertedWith("participant has not participated yet");
  });

  it("Should revert if voting is already done", async function () {
    await vote.participateInProtocol(participant);
    await vote.casteVote(participant);
    await expect(vote.casteVote(participant)).to.be.revertedWith("voting not done yet");
  });

  it("Should revert if trying to access trackVotes() by non-owner", async function () {
    const [, nonOwner] = await ethers.getSigners();
    await expect(vote.connect(nonOwner).trackVotes()).to.be.revertedWith("only owner has access");
  });
});
