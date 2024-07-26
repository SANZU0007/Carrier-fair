import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Typography, Paper, Box, CircularProgress, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import add from "../images/signup.png";

const UpdatePassPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: theme.shadows[5],
    width: '100%',
    maxWidth: 400,
}));

const UpdatePassAvatar = styled('img')({
    width: 90,
    height: 90,
});

function UpdatePass() {
    const { id, token } = useParams();
    const [show, setShow] = useState(true);
    const [btn, setBtn] = useState("Update");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [show1, setShow1] = useState(false);
    const [enable, setEnable] = useState(false);

    useEffect(() => {
        async function verifyToken() {
            let isValid = await fetch(`https://carrier-fair-backend.onrender.com/token-verify/${id}/${token}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            let response = await isValid.json();
            if (response.ok) {
                setShow(false);
            } else {
                alert(response.response);
                navigate("/forgot");
            }
        }
        verifyToken();
    }, [id, token, navigate]);

    function handleSubmit(e) {
        e.preventDefault();
        if (password.length < 6 || password.length >= 16) {
            setShow1(true);
            setMsg("Password length should be 6-16 characters");
            return;
        }
        let obj = {
            password
        };
        addNewPass(obj);
    }

    async function addNewPass(obj) {
        setBtn("Updating...");
        setEnable(true);
        try {
            let addUser = await fetch(`https://carrier-fair-backend.onrender.com/update-password/${id}`, {
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
            setBtn("Update");
            setEnable(false);
        }
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        setShow1(false);
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: 8, marginBottom: 8 }}>
            {show ? (
                <Box display="flex" flexDirection="column" alignItems="center">
                    <CircularProgress />
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        Verifying... Please wait
                    </Typography>
                </Box>
            ) : (
                <UpdatePassPaper elevation={3}>
                    <Box display="flex" justifyContent="center">
                        <UpdatePassAvatar src={add} alt='Update avatar' />
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Update new password
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="New Password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            helperText={show1 ? msg : ""}
                            error={show1}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 2 }}
                            disabled={enable}
                        >
                            {btn}
                        </Button>
                    </form>
                </UpdatePassPaper>
            )}
        </Container>
    );
}

export default UpdatePass;
