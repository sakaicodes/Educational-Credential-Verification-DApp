// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import CredentialIissuer smart contract 
import "./CredentialIssuer.sol";
import "./IIssuecredential.sol";

contract VerifyCredential is IIssueCredential{

    IIssueCredential public issueCredentialContract;

     constructor(address _issueCredentialAddress) {
        issueCredentialContract = IIssueCredential(_issueCredentialAddress);
    }

    function getIPFSHash(bytes32 _credentialId) public view override returns(string memory) {
        return issueCredentialContract.getIPFSHash(_credentialId);
    }

    function getIssuerDetails(bytes32 _credentialId) public view override returns(Issuer memory){
        return issueCredentialContract.getIssuerDetails(_credentialId);
    }
}