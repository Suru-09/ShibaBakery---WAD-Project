import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import GetAllProducts from '../utils/GetAllProducts';
import { useState, useEffect } from 'react';
import '../../static/css/productTable.css';
import UpdateProduct from '../pages/UpdateProduct';
import AddProduct from '../pages/AddProduct';
import { Grid } from '@material-ui/core';


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'ingredients', label: 'Ingredients', minWidth: 170 },
  { id: 'price', label: 'Price', minWidth: 100 },
  { id: 'category', label: 'Category', minWidth: 100 }, 
  { id: 'description', label: 'Description', minWidth: 100 }, 
  { id: 'image', label: 'Image URL', minWidth: 100 }, 
  { id: 'stock_count', label: 'Stock', minWidth: 100 }, 
];

function createData(name, ingredients, price, category, 
    description, image, stock_count) {
    return { 
        name,
        ingredients,
        price, 
        category,
        description,
        image,
        stock_count
    };
}

const ProductTable =() => {

    const [products, setProducts] = useState([]);
    const productRows = []

    useEffect(() => {
        async function getProducts() {
            const products = await GetAllProducts();
            setProducts(products);
        }
        getProducts();
    }, [])

    for(let i = 0; i < products.length; ++i) {
        productRows.push(createData(products[i].name,
            products[i].ingredients,
            products[i].price,
            products[i].category,
            products[i].description,
            products[i].image,
            products[i].stock_count
            ));
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow>
                <TableCell></TableCell> 
                {columns.map((column) => (
                <TableCell
                    style={{ minWidth: column.minWidth }}
                >
                    {column.label}
                </TableCell>
                ))}
            </TableRow>
            </TableHead>
            <TableBody>
            {productRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                <TableCell>
                                    <Box className="prod_box">
                                        <Button variant="contained" size="small" >
                                            Update
                                        </Button>

                                        <Button variant="contained" size="small">
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell>
                                    {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                );
                                })}
                            </TableRow>
                    );
                })
            }
            </TableBody>
        </Table>
        
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={productRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <div className="add_div">
        <Button variant="contained" size="large">
            Add Product
        </Button>
        </div>

        {/* <UpdateProduct/> */}
        <Grid  container spacing={2} direction={"row"}>
                        <div>
                            <UpdateProduct/>
                        </div>

                        <div>
                            <AddProduct/>
                        </div>
        </Grid>
        
    </Paper>
    );
}
export default ProductTable;