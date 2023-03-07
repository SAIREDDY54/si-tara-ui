import * as React from 'react';
import Paper from "@mui/material/Paper";
import Axios from "axios";
import BOSCH from "../img/bosch.png";
import TextField from '@mui/material/TextField';
import Appbar from '../Pages/Appbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(null);
    const history = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(bosch.com|in.bosch.com|de.bosch.com)$/;

        if (!email.includes("@")) {
            setError("Email should contain '@' symbol");
            return;
        } else if (!emailRegex.test(email)) {
            setError("Invalid email address");
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
            setError('Password must contain at least one letter, one number, and one special character');
            return;
        }

        setError(null);
        const data = {
            mail: email,
            password: password
        }

        Axios.post("http://localhost:8080/registerUser", data)
            .then(response => {
                if (response.status === 201) {
                    history("/home", { replace: true })
                    localStorage.setItem("email", email);
                } else {
                    setError('Email is already registered')
                }

            }).catch(error => {
                setError('Email is already registered')
            })
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Appbar />

            <div>
                <form onSubmit={handleSubmit}>
                    <Stack
                        sx={{
                            width: '45ch',
                        }}
                        spacing={2}
                        noValidate
                        autoComplete="off"
                        direction="column">
                        <p>Register Page</p>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            error={Boolean(error)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button variant="contained" type='submit'>Sign up</Button>
                    </Stack>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <Paper
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60px",
                    backgroundColor: "#1976d2",
                }}
                elevation={3}
            ><img src={BOSCH} style={{ height: "50px", maxWidth: "50%", float: "right", marginRight: "10px", marginTop: "5px" }} /></Paper>
        </div>
    )
}
export default Register