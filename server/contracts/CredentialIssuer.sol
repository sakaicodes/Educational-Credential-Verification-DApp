// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

  struct Issuer {
        string nameOfIssuer;
        address addressOfIssuer;
    }
    
contract IssueCredential {
    // Mappings
    mapping(address => bool) public authorizedIssuers;
    mapping(address => Credential[]) public credentialsByIssuer;
    mapping(bytes32 => string) public ipfsHashes;
    mapping(bytes32 => Issuer) public issuerLookUp;

    struct Credential {
        bytes32 credentialId;
        Issuer issuerDetails;
        string recipient; 
        string ipfsHash;
        bool isIssued; 
    }

    // Events
    event CredentialIssuedEvent(
        bytes32 credentalId,
        Issuer issuerDetails,
        string recipient,
        uint256 timeOfIssue
    );

    // Modifiers 
    // modifier isAuthorizedIssuer(address _issuer) {
    //     require(authorizedIssuers[_issuer], "Not an Authorized User. Invalid Permissions");
    //     _;
    // }

    // function addAuthorizedIssuer(address _issuer) public {
    //     authorizedIssuers[_issuer] = true;
    // }

    //Fallback functions
    receive() external payable {}
    fallback() external payable {}

    // Issue credential function
    function storeCredential(
        string  memory _nameOfIssuer,
        string memory _studentId,
        string memory _ipfsHash) public returns(bytes32){
        
        // Validate inputs 
        require(bytes(_nameOfIssuer).length > 0, "Issuer name cannot be empty");
        require(bytes(_studentId).length > 0, "Student ID cannot be empty");
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");

        // Create Unique credential ID hash usingKeccak256
        bytes32 hashId = keccak256(abi.encodePacked(_nameOfIssuer, _studentId, _ipfsHash));

        // Create Issuer
        Issuer memory newIssuer = Issuer({
            nameOfIssuer: _nameOfIssuer,
            addressOfIssuer: msg.sender
        });
        
        // Create Credential 
        Credential memory newCredential = Credential({
            credentialId: hashId,
            issuerDetails: newIssuer,
            recipient: _studentId,
            ipfsHash: _ipfsHash,
            isIssued: true
        });

        uint256 timestamp = block.timestamp;

        emit CredentialIssuedEvent(newCredential.credentialId, newCredential.issuerDetails, newCredential.recipient, timestamp);

        // Add credential to list of issuer issued credentials 
        credentialsByIssuer[msg.sender].push(newCredential);

        // Add credential hash to list of hashes and IssuerLookUp
        ipfsHashes[hashId] = _ipfsHash;
        issuerLookUp[hashId] = newIssuer;

        // Return credenital ID
        return(hashId);
        }

        // View Credential functions 
        function viewAllIssuedCredentials() public view returns (Credential[] memory) {
            return credentialsByIssuer[msg.sender];
            }
            
        function viewIssuedCredential(bytes32 _credentialId) public view returns (Credential memory) {
            for(uint256 i; i < credentialsByIssuer[msg.sender].length; i++){
                if (credentialsByIssuer[msg.sender][i].credentialId == _credentialId){
                    return credentialsByIssuer[msg.sender][i];
                }
            }
            revert("Credential not found");
        }

        // Functions for verifying credentials     
        function getIPFSHash(bytes32 _credentialId) public view  returns(string memory){
            return ipfsHashes[_credentialId];
        }

        function getIssuerDetails(bytes32 _credentialId) public view  returns(Issuer memory){
            return issuerLookUp[_credentialId];
        }
}
