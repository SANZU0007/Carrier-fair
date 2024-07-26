import React, { useContext, useEffect, useState } from 'react';
import Home from './Home';
import house from "../images/logo.png";
import { useNavigate, useParams } from 'react-router-dom';
import { myData } from '../App';
import { Box, Button, Container, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const StyledImage = styled('img')({
  width: '90px',
  height: '90px',
  margin: '0 auto',
});

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #4a90e2, #357abd, #1d6d9f, #0a3f5a, #002b45)',
  color: '#fff',
  '&:hover': {
    background: 'linear-gradient(to right, #357abd, #1d6d9f, #0a3f5a, #002b45, #001e33)',
  },
}));


function Edit() {
  const { propertyData, setPropertyData } = useContext(myData);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [btn, setBtn] = useState("Save");
  const [selectedType, setSelectedType] = useState('');
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { dataId } = useParams();

  useEffect(() => {
    if (propertyData) {
      const property = propertyData.find((prod) => prod._id === dataId);
      if (property) {
        setName(property.propertyType);
        setPrice(property.price);
        setLocation(property.location);
        setDescription(property.description);
        setSelectedType(property.status);
      }
    }
  }, [propertyData, dataId]);

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
    const obj = {
      propertyType: name,
      location,
      price,
      description,
      status: selectedType,
    };
    updateProperty(obj);
  }

  async function updateProperty(obj) {
    try {
      setBtn("Updating...");
      const result = await fetch(`https://carrier-fair-backend.onrender.com/property/edit-property/${dataId}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "auth-token": `${token}`,
          "content-type": "application/json",
        },
      });
      const resp = await result.json();
      if (resp.ok) {
        navigate("/all-property");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBtn("Update property");
    }
  }

  return (
    <Home>
      <Container component="main" maxWidth="xs" sx={{ marginTop: 8, marginBottom: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Property
        </Typography>
        <Box display="flex" justifyContent="center" mb={4}>
          <StyledImage src={house} alt='Edit property avatar' />
        </Box>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            label="Property Name"
            value={name}
            onChange={handleName}
            required
          />
          <TextField
            label="Price"
            value={price}
            onChange={handlePrice}
            required
          />
          <TextField
            label="Location"
            value={location}
            onChange={handleLocation}
            required
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={handleDesc}
            required
          />
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedType}
            onChange={handleDropdownChange}
            required
          >
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="Sold">Sold</MenuItem>
            <MenuItem value="Unsold">Unsold</MenuItem>
          </Select>
          <Box display="flex"  >
            <StyledButton type="submit" variant="contained">
              {btn}
            </StyledButton>
          </Box>
        </StyledForm>
      </Container>
    </Home>
  );
}

export default Edit;
