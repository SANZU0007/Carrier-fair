import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Paper, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import add from "../images/signup.png";

const SignupPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: theme.shadows[5],
    width: '100%',
    maxWidth: 400,
}));

const SignupAvatar = styled('img')({
    width: 90,
    height: 90,
});

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [show, setShow] = useState(false);
    const [btn, setBtn] = useState("Signup");
    const navigate = useNavigate();

    function handleNameChange(e) {
        setName(e.target.value);
        setShow(false);
    }

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
            name,
            email,
            password
        };

        createUser(obj);
    }

    async function createUser(obj) {
        setBtn("Loading ....");
        try {
            let addUser = await fetch("https://career-fair-server.onrender.com/signup", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json"
                }
            });
            let response = await addUser.json();
            if (response.ok) {
                navigate("/login");
            } else {
                setMsg(response.response);
                setShow(true);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setBtn("Signup");
        }
    }

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{ marginTop: 8, marginBottom: 8 }} // Add margin here
        >
            <SignupPaper elevation={3}>
                {/* <Box display="flex" justifyContent="center">
                    <SignupAvatar src={add} alt='Signup avatar' />
                </Box> */}
                <Typography variant="h5" gutterBottom>Signup</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Your Name"
                        value={name}
                        onChange={handleNameChange}
                        autoFocus
                    />
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
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Typography color="textSecondary">Already have an account?</Typography>
                        </Link>
                    </Box>
                </form>
            </SignupPaper>
        </Container>
    );
}

export default Signup;
