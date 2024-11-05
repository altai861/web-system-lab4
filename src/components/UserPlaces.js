import '../style/userPlace.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { usePlaces } from '../context/PlaceContext';
import { useEffect, useState } from 'react';

function UserPlaces() {
    const { uid } = useParams(); // Get the user ID from the URL parameters
    const navigate = useNavigate();
    const [userPlaces, setUserPlaces] = useState([]); // Initialize as an empty array
    const { users } = useAuth();
    const { getUserPlaces } = usePlaces();

    // Function to get a user by ID
    const getUserById = (id) => {
        return users.find(user => user.id == id); // Use strict equality (===) if IDs are numbers
    };

    useEffect(() => {
        const fetchUserPlaces = async () => {
            const places = await getUserPlaces(uid); // Make sure getUserPlaces is defined and returns places
            setUserPlaces(places); // Update the userPlaces state
        };

        fetchUserPlaces(); // Call the async function to fetch places
    }, [uid, getUserPlaces]); // Dependencies to re-fetch if uid or getUserPlaces changes

    const selectedUser = getUserById(uid); // Get the selected user

    return (
        <div>
            <Navbar />
            <div id="places-list">
                <h3>{selectedUser ? `${selectedUser.username} нэртэй хэрэглэгчийн оруулсан газрууд` : "Хэрэглэгчийн мэдээлэл олдсонгүй"}</h3> {/* Fallback if user is not found */}
                {userPlaces.length > 0 ? (
                    <ul className="places-list">
                        {userPlaces.map((place) => (
                            <li key={place.id} className="user-place-item" onClick={() => navigate(`/places/${place.id}`)}>
                                <img src={place.image} alt={place.title} className="user-place-image" />
                                <div className="user-place-details">
                                    <h4 className="user-place-title">{place.title}</h4>
                                    <p className="user-place-description">{place.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Газар оруулаагүй байна</p> // "No places found."
                )}
            </div>
        </div>
    );
}

export default UserPlaces;
