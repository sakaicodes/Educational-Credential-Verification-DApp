// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CredentialIssuer.sol";

interface IIssueCredential {
    function getIPFSHash(bytes32 _credentialId) external view returns(string memory);
    function getIssuerDetails(bytes32 _credentialId) external view returns(Issuer memory);
}
