import React, { useContext, useEffect, useState } from 'react';
import Home from './Home';
import { useNavigate } from 'react-router-dom';
import home from "../images/h2.png";
import { myData } from '../App';
import { Box, Typography, Paper, Button, IconButton, CircularProgress, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from '@mui/icons-material';

import "../dataComponents/ViewAll.css"

const PropertyCard = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[3],
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
    gap: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    }
}));

const PropertyImage = styled('img')({
    width: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: 8,
});

const PropertyDetails = styled(Box)({
    flex: 1,
});

const PropertyActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
}));

function ViewAll() {
    const { propertyData, setPropertyData } = useContext(myData);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        async function getAll() {
            try {
                const property = await fetch("https://carrier-fair-backend.onrender.com/property/all", {
                    method: "GET",
                    headers: {
                        "auth-token": `${token}`,
                        "content-type": "application/json"
                    }
                });
                const resp = await property.json();
                if (resp.response === "Authentication failed" || resp.response === "no token") {
                    navigate("/login");
                }
                if (resp.data) {
                    setData(resp.data);
                    setPropertyData(resp.data);
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        }
        getAll();
    }, [token, navigate, setPropertyData]);

    const deleteData = async (id) => {
        try {
            const response = await fetch(`https://carrier-fair-backend.onrender.com/property/delete-property/${id}`, {
                method: "DELETE",
                headers: {
                    "auth-token": `${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const result = await response.json();
            if (result.ok) {
                setData(data.filter(prop => prop._id !== id));
            } else {
                console.error('Error deleting property:', result.response);
            }
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = (id) => {
        deleteData(id);
    };

    return (
        <Home>
            <Container component="main" maxWidth="lg" sx={{ marginTop: 8, marginBottom: 8 }}>
                <Typography variant="h4" gutterBottom>
                    All Properties
                </Typography>
                <Add  id='bottomicon' color="inherit" onClick={() => navigate('/add')}>
               </Add>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        {data.length > 0 ? (
                            data.map((prop) => (
                                <Grid item xs={12} sm={6} key={prop._id}>
                                    <PropertyCard>
                                        <PropertyImage src={home} alt="Property" />
                                        <PropertyDetails>
                                            <Typography variant="h6">{prop.propertyType}</Typography>
                                            <Typography>Price: <strong>{prop.price} all taxes (inclusive)</strong></Typography>
                                            <Typography>Location: <strong>{prop.location}</strong></Typography>
                                            <Typography>Status: <strong>{prop.status}</strong></Typography>
                                            <Typography>Description: <p>{prop.description}</p></Typography>
                                        </PropertyDetails>
                                        <PropertyActions>
                                            <IconButton color="primary" onClick={() => handleEdit(prop._id)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(prop._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </PropertyActions>
                                    </PropertyCard>
                                </Grid>
                            ))
                        ) : (
                            <Typography>No data to display</Typography>
                        )}
                    </Grid>
                )}
            </Container>
        </Home>
    );
}

export default ViewAll;
