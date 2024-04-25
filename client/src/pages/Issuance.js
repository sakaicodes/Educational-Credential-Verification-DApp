import React from 'react';
import CredentialForm from '../components/CredentialForm';
import Header from '../components/Header';
import UploadCredential from '../components/CredentialUpload';

export default function Issuance() {
    return (
        <>
            <Header />
            <div className="container mx-auto mt-4 mb-8">
                <h1 className="text-3xl font-bold text-center mb-4">Welcome to the Credential Issuer Portal</h1>
                <p className="text-lg text-center text-gray-600 mb-2">
                    The issuer portal is where educational institutions can securely store and issue digital credentials.
                </p>
                <div className="flex justify-center items-center">
                    <div className="flex space-x-24">
                        <div style={{ flex: 1 }}>
                            <UploadCredential />
                        </div>
                        <div style={{ flex: 1 }}>
                            <CredentialForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
