import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import { Container, Typography, Box, IconButton, TextField, Button } from '@mui/material';
import { Add, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BrandCreate() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const [brandName, setBrandName] = useState('');
  const [brandUrl, setBrandUrl] = useState('');
  const [errors, setErrors] = useState({
    brandName: false,
    brandUrl: false,
  });

  const handleSuccess = () => {
    toast.success('Brand created successfully', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000, // Notification will automatically close after 2 seconds
    });
  
    navigate('/brands');
  };
  
  const handleError = () => {
    toast.error('Failed to create brand', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000, // Notification will automatically close after 2 seconds
    });
  };

  const handleGoBack = () => {
    navigate('/brands');
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    // Validate input fields
    let hasError = false;
    const newErrors = {
      brandName: brandName.trim() === '',
      brandUrl: !isValidUrl(brandUrl),
    };

    setErrors(newErrors);

    for (const error of Object.values(newErrors)) {
      if (error) {
        hasError = true;
        break;
      }
    }

    if (hasError) {
      return;
    }

    // Handle form submission logic here
    try {
      const response = await axios.post('/brands', { brandName, brandUrl });
      console.log('Brand created:', response.data);
      handleSuccess(); // Show success notification and redirect to brands page
    } catch (error) {
      console.error('Error creating brand:', error);
      handleError(); // Show error notification
    }
  };


  const isValidUrl = (url) => {
    try {
      new URL(`https://${url}`);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <Page title="Page One">
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Create Brand
          </Typography>
          <IconButton color="primary" aria-label="Go Back" onClick={handleGoBack}>
            <ArrowBack />
          </IconButton>
        </Box>

        <Box sx={{ bgcolor: 'background.paper', p: 4 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Brand Name"
              fullWidth
              margin="normal"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              error={errors.brandName}
              helperText={errors.brandName && 'Please enter a brand name'}
            />
            <TextField
              label="Brand URL"
              fullWidth
              margin="normal"
              value={brandUrl}
              onChange={(e) => setBrandUrl(e.target.value)}
              error={errors.brandUrl}
              helperText={errors.brandUrl && 'Please enter a valid URL'}
            />

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </Page>
  );
}
