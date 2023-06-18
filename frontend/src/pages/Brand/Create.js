import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import { Container, Typography, Box, IconButton, TextField, Button } from '@mui/material';
import { Add, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function BrandCreate() {

  const { themeStretch } = useSettings();

  const navigate = useNavigate();
  const [brandName, setBrandName] = useState('');
  const [brandUrl, setBrandUrl] = useState('');
  const [errors, setErrors] = useState({
    brandName: false,
    brandUrl: false,
  });

  const handleGoBack = () => {
    navigate('/brands');
  };

  const handleSubmit = (event) => {
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
    console.log('Brand Name:', brandName);
    console.log('Brand URL:', brandUrl);
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
