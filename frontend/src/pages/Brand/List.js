import { useState,useEffect } from 'react';
import { Container, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Box, TablePagination } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import { useNavigate } from 'react-router-dom';
import brandsData from "../../json/brands.json"


const rowsPerPageOptions = [5, 10, 25];

export default function BrandList() {
  const { themeStretch } = useSettings();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Load the brands data from the JSON file
    setBrands(brandsData);
  }, []);

  const handleAddBrand = () => {
    navigate('/brands/create');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, brands.length - page * rowsPerPage);

  return (
    <Page title="Brands">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {/* Brand List Heading */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3" component="h1" paragraph>
            Brand List
          </Typography>

          {/* Add Brand Button */}
          <IconButton color="primary" aria-label="Add Brand" onClick={handleAddBrand}>
            <Add />
          </IconButton>
        </Box>

        {/* Brand List Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Brand Name</TableCell>
                <TableCell>Brand URL</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? brands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : brands
              ).map((brand, index) => (
                <TableRow key={index}>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell>{brand.url}</TableCell>
                  <TableCell>
                    {/* Edit Button */}
                    <IconButton color="primary" aria-label="Edit">
                      <Edit />
                    </IconButton>

                    {/* Delete Button */}
                    <IconButton color="error" aria-label="Delete">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={brands.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Page>
  );
}
