import CredentialVerification from "../components/CredentialVerification";
import Header from "../components/Header";


export default function Verification() {
    return (
        <>
            <Header />
            <div className="container mx-auto mt-4 mb-8">
            <h1 className="text-3xl font-bold text-center mb-4">Welcome to the Credential Verification Portal</h1>
                <p className="text-lg text-center text-gray-600 mb-2">
                    The verification portal is where employers can securely verify prospective employees educational credentials.
                </p>
                <CredentialVerification />
            </div>
            
        </>
    )
}