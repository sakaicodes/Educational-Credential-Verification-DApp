import Header from "../components/Header";
import ViewCredential from "../components/ViewCredential";

export default function Dashboard() {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Header />
            <div className="flex-1 overflow-y-auto">
                <ViewCredential />
            </div>
        </div>
    );
}
