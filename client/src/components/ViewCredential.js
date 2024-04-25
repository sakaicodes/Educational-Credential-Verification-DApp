import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Import ABI Code to interact with smart contract
import IssueCredential from "../artifacts/contracts/CredentialIssuer.sol/IssueCredential.json";

export default function ViewCredential() {
    const [credentials, setCredentials] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCredentials = async () => {
            setIsLoading(true);
            try {
                if (typeof window.ethereum !== 'undefined') {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    // Contract address
                    const issueCredentialAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
                    const contract = new ethers.Contract(issueCredentialAddress, IssueCredential.abi, signer);
                    const credentials = await contract.viewAllIssuedCredentials();
                    setCredentials(credentials);
                }
            } catch (error) {
                console.error('Error fetching credentials:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCredentials();
    }, []);

    return (
        <div className="container mx-auto mt-4">
            <h1 className="text-3xl font-bold text-center mb-4">Issued Credentials</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed border-collapse border border-gray-400">
                        <thead>
                            <tr>
                                <th className="w-1/12 border border-gray-400 px-2 py-2">Index</th>
                                <th className="w-2/12 border border-gray-400 px-2 py-2">Credential ID</th>
                                <th className="w-3/12 border border-gray-400 px-2 py-2">Issuer Name</th>
                                <th className="w-2/12 border border-gray-400 px-2 py-2">Recipient</th>
                                <th className="w-4/12 border border-gray-400 px-2 py-2">IPFS Hash</th>
                            </tr>
                        </thead>
                        <tbody>
                            {credentials.map((credential, index) => (
                                <tr key={index}>
                                    <td className="w-1/12 border border-gray-400 px-2 py-2 whitespace-normal">{index}</td>
                                    <td className="w-2/12 border border-gray-400 px-2 py-2 whitespace-normal
                                    break-all">{credential.credentialId}</td>
                                    <td className="w-3/12 border border-gray-400 px-2 py-2 whitespace-normal">{credential.issuerDetails.nameOfIssuer}</td>
                                    <td className="w-2/12 border border-gray-400 px-2 py-2 whitespace-normal">{credential.recipient}</td>
                                    <td className="w-4/12 border border-gray-400 px-2 py-2 whitespace-normal break-all">{credential.ipfsHash}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
