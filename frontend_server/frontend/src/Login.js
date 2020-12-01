import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
//import "./Login.css";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function validateForm() {
		return username.length > 0 && password.length > 0;
	}

	async function handleSubmit(event) {
		var headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}

		event.preventDefault();
		console.log("button_press");
		axios.post('http://localhost:9001/login-point', {
			username: username,
			password: password
		}, {headers : headers}).then(res => {
			console.log(res);
			cookies.set("session", {
				token: res.data.token
			});
			alert("Signed in ")
		}).catch(err => {
			alert("Wrong password");
			console.log(err);
		});
	}

	return (
		<div className="Login">
			<Form onSubmit={handleSubmit}>
				<Form.Group size="lg" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
					autoFocus
					type="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button block size="lg" type="submit" disabled={!validateForm()}>
					Login
				</Button>
			</Form>
		</div>
	);
}