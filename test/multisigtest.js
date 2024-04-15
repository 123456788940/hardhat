const { expect } = require("chai");

describe("MultisigWallet", function() {
 
  let multisigWallet;
  let owner1;
  let owner2;
  let owner3;
  let value;

  beforeEach(async function () {
    // Deploy the contract
    multisigWallet = await ethers.getContractFactory("multisigWallet");
    [owner1, owner2, owner3] = await ethers.getSigners();
    multisigWallet = await multisigWallet.deploy([owner1.address, owner2.address, owner3.address], 2);
  });

  it("Should submit a transaction", async function() {
    const to = owner1.address;
   
    const data = "0x"; // Example: no data

  });

  it("Should execute a transaction", async function() {
    // First, let's submit a transaction
    const to = owner1.address;

    const data = "0x"; // Example: no data


    // Now, let's approve the transaction
    const transactionId = 0; // Assuming this is the first transaction

  });

  // Add more test cases for other functions

});
