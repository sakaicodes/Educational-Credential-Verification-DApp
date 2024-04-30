const { ethers } = require("hardhat");
const { ethers: ethersoriginal } = require("ethers");
const { expect } = require("chai");

describe("VerifyCredential", function () {
  let verifyCredential;
  let issueCredential;

  beforeEach(async function () {
    const IssueCredential = await ethers.getContractFactory("IssueCredential");
    issueCredential = await IssueCredential.deploy();
    
    const VerifyCredential = await ethers.getContractFactory("VerifyCredential");
    verifyCredential = await VerifyCredential.deploy(issueCredential.getAddress());
  });


  // Check that the deployed contract is being deployed
  describe("Deployment", function () {
    it("Should deploy IssueCredenital and VerifyCredential smart contracts", async function () {
      expect(issueCredential).to.not.be.null;
      expect(verifyCredential).to.not.be.null;
    });
  });

  // Check initialization
  describe("Initialization", function () {
    it("Should initialize VerifyCredential with provided address", async function () {
      const issueCredentialAddress = await issueCredential.getAddress();
      const verifyCredentialAddressPromise = verifyCredential.getIssueCredentialContract();
      const verifyCredentialAddress = await verifyCredentialAddressPromise;
      expect(verifyCredentialAddress).to.equal(issueCredentialAddress);
    });
  });

  // Test IPFS hash retrieval
  describe("IPFS Hash Retrieval", function () {
    it("Should retrieve correct IPFS hash for a given credential ID", async function () {
      const CredentialId = "0x48c656420b556843413d4e38d17255973013efdc2a504d72c7e577822953cd99";
      const IPFSHash = "ExampleIPFSHash";
      await issueCredential.setIPFSHash(CredentialId, IPFSHash);
      const retrievedIPFSHash = await verifyCredential.getIPFSHash(CredentialId);
      expect(retrievedIPFSHash).to.equal(IPFSHash);
    });
  });

  describe("Issuer Details Retrieval", function () {
    it("Should retrieve correct issuer details for a given credential ID", async function () {
      // Mock issuer details in the IssueCredential contract
      const CredentialId = "0x48c656420b556843413d4e38d17255973013efdc2a504d72c7e577822953cd99";
      const issuerName = "Issuer";
      const issuerAddress = "0xc0f5f28B5d1F73E54D7F4634afc8a0f09f30D43d"; 
      await issueCredential.setIssuerDetails(CredentialId, issuerName, issuerAddress);
  
      // Retrieve issuer details using VerifyCredential
      const retrievedIssuerDetails = await verifyCredential.getIssuerDetails(CredentialId);
      expect(retrievedIssuerDetails.nameOfIssuer).to.equal(issuerName);
      expect(retrievedIssuerDetails.addressOfIssuer).to.equal(issuerAddress);
    });
  });

});
