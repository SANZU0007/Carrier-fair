import React, { useState } from 'react';
import Home from './Home';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Paper, Box, MenuItem, Select, CircularProgress, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import house from "../images/logo.png";

const AddPropertyPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: theme.shadows[5],
    width: '100%',
    maxWidth: 500,
    margin: 'auto',
}));

const AddPropertyAvatar = styled('img')({
    width: 90,
    height: 90,
    marginBottom: 16,
});

const AddPropertyTextArea = styled(TextField)({
    width: '100%',
    marginTop: 8,
});

function AddProperty() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [btn, setBtn] = useState("Create");
    const [selectedType, setSelectedType] = useState('');
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();
    const id = localStorage.getItem("userId");

    function handleName(e) {
        setName(e.target.value);
    }

    function handlePrice(e) {
        setPrice(e.target.value);
    }

    function handleDropdownChange(e) {
        setSelectedType(e.target.value);
    }

    function handleLocation(e) {
        setLocation(e.target.value);
    }

    function handleDesc(e) {
        setDescription(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let obj = {
            propertyType: name,
            location,
            price,
            description,
            status: selectedType,
            id
        };
        createProperty(obj);
    }

    async function createProperty(obj) {
        setLoading(true);
        setBtn("Creating...");
        try {
            let result = await fetch("https://career-fair-server.onrender.com/property/add-property", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "auth-token": `${token}`,
                    "content-type": "application/json"
                }
            });
            let resp = await result.json();
            if (resp.ok) {
                navigate("/all-property");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setBtn("Create");
            setLoading(false);
        }
    }

    return (
        <Home>
            <Container component="main" maxWidth="xs" sx={{ marginTop: 8, marginBottom: 8 }}>
                <AddPropertyPaper elevation={3}>
                    <Box display="flex" justifyContent="center" mb={2}>
                        <AddPropertyAvatar src={house} alt='Property logo' />
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Add new property
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Property Name"
                            value={name}
                            onChange={handleName}
                            required
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Price"
                            value={price}
                            onChange={handlePrice}
                            required
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Location"
                            value={location}
                            onChange={handleLocation}
                            required
                        />
                        <AddPropertyTextArea
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            label="Description"
                            value={description}
                            onChange={handleDesc}
                            required
                        />
                        <Select
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={selectedType}
                            onChange={handleDropdownChange}
                            displayEmpty
                            required
                        >
                            <MenuItem value="" disabled>Select Status</MenuItem>
                            <MenuItem value="Sold">Sold</MenuItem>
                            <MenuItem value="Unsold">Unsold</MenuItem>
                        </Select>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : btn}
                        </Button>
                    </form>
                </AddPropertyPaper>
            </Container>
        </Home>
    );
}

export default AddProperty;
