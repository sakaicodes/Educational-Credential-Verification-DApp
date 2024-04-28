import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Import ABI Code to interact with smart contract
import IssueCredential from "../artifacts/contracts/CredentialIssuer.sol/IssueCredential.json";

export default function IssueCredentialForm() {
    const [issuer, setIssuer] = useState('');
    const [studentId, setStudentId] = useState('');
    const [ipfsHash, setIpfsHash] = useState('');
    const [isCredentialStored, setIsCredentialStored] = useState(false);
    const [credentialId, setCredentialId] = useState('');
    const [errors, setErrors] = useState({});

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function storeCredential() {
        try {
            if (typeof window.ethereum !== 'undefined') {
                await requestAccount();

                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner();
                // Contract address
                const issueCredentialAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
                const contract = new ethers.Contract(issueCredentialAddress, IssueCredential.abi, signer);
                const transaction = await contract.storeCredential(issuer, studentId, ipfsHash);

                const receipt = await transaction.wait();

                setIsCredentialStored(true);
                setIssuer('');
                setStudentId('');
                setIpfsHash('');
                setCredentialId(receipt.events[0].args[0].toString());
                // Reset errors
                setErrors({});
            } else {
                console.error('MetaMask not detected');
            }
        } catch (error) {
            console.error('Error storing credential:', error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!issuer || !studentId || !ipfsHash) {
            setErrors({
                issuer: !issuer ? 'Issuer is required' : '',
                studentId: !studentId ? 'Student ID is required' : '',
                ipfsHash: !ipfsHash ? 'IPFS Hash is required' : ''
            });
            return;
        }
        await storeCredential();
    };

    // Timer for credential upload success message 
    useEffect(() => {
        let timer;
        if (isCredentialStored) {
            timer = setTimeout(() => {
                setIsCredentialStored(false);
            }, 5000); 
        }
        return () => clearTimeout(timer);
    }, [isCredentialStored]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white max-w-md mx-auto p-4 border rounded shadow">
                <h2 className="text-2xl font-bold mb-4 text-center">Issue Student Credential Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="issuer" className="block text-gray-700 font-medium mb-2">Issuer</label>
                        <input
                            type="text"
                            id="issuer"
                            className={`w-full p-2 rounded-md border focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 ${errors.issuer ? 'border-red-500' : 'border-gray-300'}`}
                            value={issuer}
                            onChange={(e) => setIssuer(e.target.value)}
                        />
                        {errors.issuer && <p className="text-red-500">{errors.issuer}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="studentId" className="block text-gray-700 font-medium mb-2">Student ID</label>
                        <input
                            type="text"
                            id="studentId"
                            className={`w-full p-2 rounded-md border focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 ${errors.studentId ? 'border-red-500' : 'border-gray-300'}`}
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                        />
                        {errors.studentId && <p className="text-red-500">{errors.studentId}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ipfsHash" className="block text-gray-700 font-medium mb-2">IPFS Hash</label>
                        <input
                            type="text"
                            id="ipfsHash"
                            className={`w-full p-2 rounded-md border focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 ${errors.ipfsHash ? 'border-red-500' : 'border-gray-300'}`}
                            value={ipfsHash}
                            onChange={(e) => setIpfsHash(e.target.value)}
                        />
                        {errors.ipfsHash && <p className="text-red-500">{errors.ipfsHash}</p>}
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md`}
                        >
                            Store on Blockchain
                        </button>
                    </div>
                </form>
                {isCredentialStored && (
                    <div className="text-center mt-4 text-green-600">
                        Credential successfully stored on the blockchain!<br />
                        Credential ID: {credentialId}
                    </div>
                )}
            </div>
        </div>
    );
}
