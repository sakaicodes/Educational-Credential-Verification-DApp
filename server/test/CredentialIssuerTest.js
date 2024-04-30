const { ethers} = require("hardhat");
const { expect } = require("chai");

describe("IssueCredential", function () {
  let issueCredential;

  beforeEach(async function () {
    const IssueCredential = await ethers.getContractFactory("IssueCredential");
    issueCredential = await IssueCredential.deploy();
  });

  // Check that the deployed contract is being deployed
  describe("Deployment", function () {
    it("Should deploy IssueCredential smart contract", async function () {
      expect(issueCredential).to.not.be.null;
    });
  });

  // Check that credential is being stored and added to list of issued credentials
  describe("StoreCredential", function () {
    it("Should issue a new credential", async function () {
      const issuerName = "Test Issuer";
      const studentId = "12345";
      const ipfsHash = "IPFS_HASH";

      const credentialId = await issueCredential.storeCredential(issuerName, studentId, ipfsHash);

      const allCredentials = await issueCredential.viewAllIssuedCredentials();
      expect(allCredentials.length).to.equal(1); // Check one credential added
    });
  });

  // Check that credential issue event is being emitted 
  describe("CredentialEvent", function () {
    it("Should emit an event", async function () {
      const issuerName = "Test Issuer";
      const studentId = "12345";
      const ipfsHash = "IPFS_HASH";

      const tx = await issueCredential.storeCredential(issuerName, studentId, ipfsHash);
      await tx.wait(); 

      expect(tx).to.emit(issueCredential, "CredentialIssuedEvent");
    });
  });

   // Confirm that correct credential details are being issued
   describe("CredentialDetails", function () {
    it("Should store correct credential detials", async function () {
      const issuerName = "Test Issuer";
      const studentId = "12345";
      const ipfsHash = "IPFS_HASH";

      const credentialId = await issueCredential.storeCredential(issuerName, studentId, ipfsHash);

      const allCredentials = await issueCredential.viewAllIssuedCredentials();
      expect(allCredentials.length).to.equal(1); // Check one credential added

      const storedCredential = allCredentials[0];
      expect(storedCredential.issuerDetails.nameOfIssuer).to.equal(issuerName); // Check issuer name
      expect(storedCredential.recipient).to.equal(studentId); // Check student ID
      expect(storedCredential.ipfsHash).to.equal(ipfsHash); // Check IPFS hash
      expect(storedCredential.isIssued).to.equal(true); // Check if credential is issued
    });
  });

});
