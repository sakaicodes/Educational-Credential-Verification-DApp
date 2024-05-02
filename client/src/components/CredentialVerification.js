import React, { useState } from "react";
import { ethers } from "ethers";

// Import ABI Code to interact with smart contract
import VerifyCredential from "../artifacts/contracts/CredentialVerifier.sol/VerifyCredential.json";

export default function CredentialVerification() {
  const [credentialId, setCredentialId] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const VerifyContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  async function fetchIPFSHash(credentialId) {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        VerifyContractAddress,
        VerifyCredential.abi,
        provider
      );
      try {
        const ipfsHash = await contract.getIPFSHash(credentialId);
        const gatewayUrl = process.env.REACT_APP_GATEWAY_URL;
        const url = `http://${gatewayUrl}/ipfs/${ipfsHash}`;
        return url;
      } catch (error) {
        console.log("Error fetching IPFS hash:", error);
        return null;
      }
    }
  }

  async function fetchIssuer(credentialId) {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        VerifyContractAddress,
        VerifyCredential.abi,
        provider
      );
      try {
        const issuerDetails = await contract.getIssuerDetails(credentialId);
        return issuerDetails;
      } catch (error) {
        console.log("Error fetching issuer details:", error);
        return null;
      }
    }
  }

  const handleChange = (event) => {
    setCredentialId(event.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const ipfsHash = await fetchIPFSHash(credentialId);
      const issuerDetails = await fetchIssuer(credentialId);
      if (ipfsHash && issuerDetails) {
        setVerificationResult({
          exists: true,
          ipfsUrl: ipfsHash,
          issuer: {
            name: issuerDetails.nameOfIssuer,
            id: issuerDetails.addressOfIssuer,
          },
        });
      } else {
        setVerificationResult({ exists: false });
      }
    } catch (error) {
      console.error("Error verifying credential:", error);
      setVerificationResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-300 text-center">
        <h2 className="text-2xl font-bold mb-4">Verify Student Credential</h2>
        <div className="flex flex-col space-y-4">
          <label className="form-label">Enter Credential ID:</label>
          <input
            type="text"
            value={credentialId}
            onChange={handleChange}
            placeholder="Enter Credential ID..."
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            disabled={!credentialId || isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
        {verificationResult && (
          <div className="mt-8">
            {verificationResult.exists ? (
              <>
                <p className="text-green-700 font-semibold">
                  Credential Found!
                </p>
                <p className="mt-2">
                  <a
                    href={verificationResult.ipfsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Credential
                  </a>
                </p>
                <p className="mt-2">
                  Issued by: {verificationResult.issuer.name}
                </p>
                <p className="mt-2">Issuer ID: {verificationResult.issuer.id}</p>
              </>
            ) : (
              <p className="text-red-700 font-semibold">
                Credential Not Found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
