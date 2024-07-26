import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Paper, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import add from "../images/signup.png";

const LoginPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: theme.shadows[5],
    width: '100%',
    maxWidth: 400,
}));

const LoginAvatar = styled('img')({
    width: 90,
    height: 90,
});

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [show, setShow] = useState(false);
    const [btn, setBtn] = useState("Login");
    const navigate = useNavigate();

    function handleEmailChange(e) {
        setEmail(e.target.value);
        setShow(false);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        setShow(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (password.length < 6 || password.length >= 16) {
            setShow(true);
            setMsg("Password length should be 6-16 characters");
            return;
        }
        let obj = {
            email,
            password
        };

        createUser(obj);
    }

    async function createUser(obj) {
        setBtn("Verifying...");
        try {
            let addUser = await fetch("https://career-fair-server.onrender.com/login", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json"
                }
            });
            let response = await addUser.json();
            if (response.ok) {
                localStorage.setItem("userId", response.id);
                localStorage.setItem("authToken", response.token);
                navigate("/all-property");
            } else {
                setMsg(response.response);
                setShow(true);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setBtn("Login");
        }
    }

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{ marginTop: 8, marginBottom: 8 }} // Add margin here
        >
            <LoginPaper elevation={3}>
               
                <Typography variant="h5" gutterBottom> Login in Your Account</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Your Email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        label="Your Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {show && <Typography color="error" align="center" margin="normal">{msg}</Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }} // Add margin-top here
                    >
                        {btn}
                    </Button>
                    <Box textAlign="center" marginTop="16px">
                        <Link to="/forgot" style={{ textDecoration: 'none' }}>
                            <Typography color="textSecondary" variant="body2">Forgot password?</Typography>
                        </Link>
                        <Link to="/" style={{ textDecoration: 'none', display: 'block', marginTop: '16px' }}>
                            <Typography color="textSecondary" variant="body2">New User? Create Account</Typography>
                        </Link>
                    </Box>
                </form>
            </LoginPaper>
        </Container>
    );
}

export default Login;
