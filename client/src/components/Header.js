import { Link } from 'react-router-dom';
import logo from '../img/logo.png'; 

export default function Header() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-8 w-auto mr-4" />
                    <h1 className="text-white text-2xl font-bold">EduTrust</h1>
                </div>
                <div className="flex items-center space-x-6">
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/verifierportal">Verifier Portal</NavLink>
                    <NavLink to="/issuerportal">Issuer Portal</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </div>
            </div>
        </nav>
    );
}

function NavLink({ to, children }) {
    return (
        <Link to={to} className="text-white hover:text-gray-300">{children}</Link>
    );
}
