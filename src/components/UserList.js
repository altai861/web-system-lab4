import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../style/userList.css'
import Navbar from "./Navbar";

function UserList() {
    const { users, getUsers } = useAuth();
    const navigate = useNavigate();

    // // Fetch the list of users from localStorage
    // useEffect(() => {
    //     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    //     setUsers(storedUsers);
    // }, []);

    useEffect(() => {
        getUsers();
    }, [])
    
    const handleUserClick = (id) => {
        navigate(`/${id}/places`)
    }

    return (
        <div>
            <Navbar />

            <div id="users-list">
                <h3>Хэрэглэгчдийн жагсаалт</h3>
                {users.length > 0 ? (
                    <ul>
                        {users.map((user) => (
                            <li key={user.id} onClick={() => handleUserClick(user.id)}>
                                <img src={user.image} alt={`${user.name} profile photo`} />
                                {user.name} - {user.email}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Хэрэглэгч алга байна.</p>
                )}
            </div>
        </div>
    );
}

export default UserList;
