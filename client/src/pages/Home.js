import Header from "../components/Header";

export default function Home() {
    return (
        <>
            <Header />
            <div className="flex justify-center items-center h-screen">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-4 text-center">Welcome to EduTrust</h1>
                    <p className="text-lg text-gray-700 text-center">EduTrust is a decentralised platform that leverages blockchain technology and decentralised storage to enable secure, direct, and efficient educational credential verification.</p>
                </div>
            </div>
        </>
    );
}
