import React, { useState } from 'react';
import '../style/authenticate.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Authenticate() {
    const { register, login } = useAuth();
    const navigate = useNavigate();
    // State for registration form
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        url: '',
        password: '',
        confirmPassword: ''
    });

    // State for login form
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [registerError, setRegisterError] = useState({
        show: false,
        text: ''
    })

    const [registerSuccess, setRegisterSuccess] = useState({
        show: false,
        text: ''
    })

    const [loginError, setLoginError] = useState({
        show: false,
        text: ''
    })

    // Handle input changes for registration form
    const handleRegisterChange = (e) => {
        setRegisterError({ show: false, text: '' })
        setRegisterSuccess({ show: false, text: '' });
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        });
    };

    // Handle input changes for login form
    const handleLoginChange = (e) => {
        setLoginError({ show: false, text: '' })
        setRegisterError({ show: false, text: '' });
        setRegisterSuccess({ show: false, text: '' });
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    // Handle register form submission
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        // Add form validation and submission logic here
        if (registerData.password !== registerData.confirmPassword) {
            setRegisterError({ show: true, text: 'Нууц үг болон давтсан нууц үг таарахгүй байна' })
            return;
        }

        const returnArray = await register(registerData.email, registerData.password, registerData.url, registerData.username);
        if (returnArray[0]) {
            setRegisterSuccess({ show: true, text: returnArray[1] });
            setRegisterData({
                username: '',
                email: '',
                url: '',
                password: '',
                confirmPassword: ''
            })
            return;
        } else {
            setRegisterError({ show: true, text: returnArray[1] });
            return;
        }


    };

    // Handle login form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        
        const status = await login(loginData.email, loginData.password);

        if (!status) {
            setLoginError({ show: true, text: "Имэйл эсвэл нууц үг буруу байна" })
        }
        
    };

    return (
        <div id="authenticate-page">
            <button id="back-button" onClick={() => navigate("/")}>Үндсэн хуудас</button>
            <div>
                <h2>Бүртгүүлэх</h2>
                {registerError.show && <span id="error">{registerError.text}</span> }
                {registerSuccess.show && <span id="success">{registerSuccess.text}</span>}
                <form onSubmit={handleRegisterSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Нэр"
                        value={registerData.username}
                        onChange={handleRegisterChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Имэйл"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        required
                    />
                    <input
                        type="url"
                        name="url"
                        placeholder="Зураг линк"
                        value={registerData.url}
                        onChange={handleRegisterChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Нууц үг"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Нууц үг давтах"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        required
                    />
                    <button type="submit">Бүртгүүлэх</button>
                </form>
            </div>

            <div>
                <h2>Нэвтрэх</h2>
                {loginError.show && <span id="error">{loginError.text}</span> }
                <form onSubmit={handleLoginSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Имэйл"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Нууц үг"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                    />
                    <button type="submit">Нэвтрэх</button>
                </form>
            </div>
        </div>
    );
}

export default Authenticate;
