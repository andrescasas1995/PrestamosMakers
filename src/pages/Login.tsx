import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login = () => {
    const { setUser } = useUser();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e: any) => {
		e.preventDefault();

		try {
            console.log(email,password);
            
			const response = await axios.post("/api/auth/login", {email, password});

			if (response.status === 200) {
                setUser(response.data);
				navigate("/loans");
			}
		} catch (err) {
			setError("Invalid credentials");
		}
	};
	return (
		<div className="d-flex justify-content-center align-items-center vh-100">
			<div className="card" style={{width: "25rem"}}>
				<img
					src={require("../imgs/makers.png")}
					className="card-img-top"
					alt="Makers logo"
					style={{width: "100%", height: "auto"}}
				/>
				<div className="card-body">
					<h5 className="card-title">Iniciar Sesión</h5>
					<form onSubmit={handleLogin}>
						<div className="mb-3">
							<label htmlFor="email" className="form-label">
								Correo Electrónico
							</label>
							<input
                                required
								type="email"
								className="form-control"
								id="email"
								placeholder="Introduce tu correo"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="form-label">
								Contraseña
							</label>
							<input
                                required
								type="password"
								className="form-control"
								id="password"
								placeholder="Introduce tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button type="submit" className="btn btn-primary w-100">
							Iniciar Sesión
						</button>
					</form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
				</div>
			</div>
		</div>
	);
};

export default Login;
