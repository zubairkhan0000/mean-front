import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Import the CSS file

const Auth = () => {
    const [isRegister, setIsRegister] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        const endpoint = isRegister ? "register" : "login";
        const response = await fetch(`http://localhost:9002/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            if (!isRegister) navigate("/products"); // Redirect to products after login
        } else {
            alert(data.error || "Something went wrong!");
        }
    };

    return (
        <div className="container">
            <div className="auth-box">
                <h2>{isRegister ? "📝 Register" : "🔑 Login"}</h2>
                <form onSubmit={handleAuth}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">
                        {isRegister ? "Register" : "Login"}
                    </button>
                </form>
                <p>
                    {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button className="toggle-btn" onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? "Login here" : "Register here"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Auth;
