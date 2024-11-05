import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../style/navbar.css'

function Navbar() {
    const { userInformation, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    const renderNavbar = () => {
        if (userInformation) {
            return (
                <>
                    <div className="navbar-user-info">
                        <h2 onClick={() => navigate("/")} id="home-title">Places</h2>
                    </div>
                    <div id="navbar-right">
                        <img
                            src={userInformation.image} // User's image URL
                            alt={userInformation.name}
                            className="navbar-user-image"
                        />
                        <span>{userInformation.name}</span>
                        <button onClick={() => navigate("/places/new")}>Газар нэмэх</button>
                        <button onClick={handleLogout}>Гарах</button>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="navbar-user-info">
                        <h2 onClick={() => navigate("/")} id="home-title">Places</h2>
                    </div>
                    <div id="navbar-right">
                        <button onClick={() => navigate("/authenticate")}>Нэвтрэх</button>
                    </div>
                </>
            );
        }
    };

    return (
        <div id="navbar">
            {renderNavbar()}
        </div>
    )
}

export default Navbar