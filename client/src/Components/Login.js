import { useState, React } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
function Register(props) {
    const navigate = useNavigate()
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const loginUser = async (event) => {
        event.preventDefault();
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: Username,
                password: Password
            })
        });
        const data = await response.json();
        if (data.error) {
            props.showAlert("danger", data.error);
        }
        else {
            localStorage.setItem("token", data.data);
            navigate("/dashboard");
        }
    }
    return (
        <div className="container my-5 d-flex flex-column justify-content-center">
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="addon-wrapping">@</span>
                    <input type="text" className="form-control" placeholder="Username" value={Username} onChange={handleUsernameChange} />
                </div>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Password" value={Password} onChange={handlePasswordChange} autoComplete="off" />
                </div>
                <button type="submit" className="btn btn-dark">Login</button>
            </form>
        </div>
    );
}

export default Register;
