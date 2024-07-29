import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Paper, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import add from "../images/signup.png";

const ForgotPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: theme.shadows[5],
    width: '100%',
    maxWidth: 400,
}));

const ForgotAvatar = styled('img')({
    width: 90,
    height: 90,
});

function Forgot() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [show, setShow] = useState(false);
    const [btn, setBtn] = useState("Forgot");
    const [enable, setEnable] = useState(false);

    function handleEmailChange(e) {
        setEmail(e.target.value);
        setShow(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let obj = {
            email
        };

        createUser(obj);
    }

    async function createUser(obj) {
        setBtn("Verifying...");
        setEnable(true);
        try {
            let addUser = await fetch("https://carrier-fair-backend.onrender.com/forgot", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json"
                }
            });
            let response = await addUser.json();
            if (response.ok) {
                alert(response.response);
                navigate("/login");
            } else {
                setMsg(response.response);
                setShow(true);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setBtn("Forgot");
            setEnable(false);
        }
    }

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{ marginTop: 8, marginBottom: 8 }} // Add margin here
        >
            <ForgotPaper elevation={3}>
             
                <Typography variant="h5" gutterBottom>Forgot password</Typography>
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
                    {show && <Typography color="error" align="center" margin="normal">{msg}</Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }} // Add margin-top here
                        disabled={enable}
                    >
                        {btn}
                    </Button>
                    <Box textAlign="center" marginTop="16px">
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Typography color="textSecondary" variant="body2">New User? Create Account</Typography>
                        </Link>
                    </Box>
                </form>
            </ForgotPaper>
        </Container>
    );
}

export default Forgot;
