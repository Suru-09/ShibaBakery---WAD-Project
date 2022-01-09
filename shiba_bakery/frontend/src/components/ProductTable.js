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
import {
    Link
} from 'react-router-dom';
import GetCookie from "../utils/GetCookie";

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
    description, image, stock_count, code) {
    return { 
        name,
        ingredients,
        price, 
        category,
        description,
        image,
        stock_count,
        code
    };
}

const ProductTable = ( {productCallBack} ) => {

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
            products[i].stock_count,
            i
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

    const deleteProduct = async (name) => {
        const requestOptions = {
            method: "POST",
            headers: {
            "X-CSRFToken": GetCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                name: name,
            }),
        };

        await fetch('/api/delete-product', requestOptions).then((response) => {
            if(response.ok) {
                console.log("Am reusit");
                window.location = document.URL;
                this.props.history.push('/adminPage/ProductTable');
            }
            else {
                console.log("Am esuat rau de tot!");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow>
                {/*  Empty Cell for table alignemet. DO NOT DELETE */}
                <TableCell/> 
                {columns.map((column) => (
                <TableCell key={column.id}
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
                                        <Button to='/adminPage/updateProduct' onClick={ () => {productCallBack(row)} }
                                            component={Link} variant="contained" size="small" >
                                            Update
                                        </Button>

                                        <Button onClick={() => {
                                                deleteProduct(row.name).then(r => {console.log("The product hasn't been deleted")})}}
                                                variant="contained"
                                                size="small">
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id}>
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
        <Button component={Link} to={'/adminPage/addProduct'} variant="contained" size="large">
            Add Product
        </Button>
        </div>

        {/*<Grid  container spacing={2} direction={"row"}>*/}
        {/*                <div>*/}
        {/*                    <UpdateProduct/>*/}
        {/*                </div>*/}

        {/*                <div>*/}
        {/*                    <AddProduct/>*/}
        {/*                </div>*/}
        {/*</Grid>*/}
        
    </Paper>
    );
}
export default ProductTable;