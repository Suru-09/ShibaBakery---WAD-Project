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
import AddOrder from '../pages/AddOrder';
import { Grid } from '@material-ui/core';
import HandleOrder from '../pages/HandleOrder';



const columns = [
  { id: 'date_created', label: 'Date', minWidth: 170 },
  { id: 'customer', label: 'Customer', minWidth: 170 },
  { id: 'product', label: 'Product', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 }, 
];

function createData(date_created, customer, product, status ) {
    return { 
        date_created,
        customer,
        product,
        status
    };
}

const OrderTable =() => {

    const [orders, setOrder] = useState([]);
    const orderRows = []

    // useEffect(() => {
    //     async function getProducts() {
    //         const products = await GetAllProducts();
    //         setProducts(products);
    //     }
    //     getProducts();
    // }, [])

    // for(let i = 0; i < orders.length; ++i) {
    //     orderRows.push(createData(orders[i].date_created,
    //         orders[i].customer,
    //         orders[i].product,
    //         orders[i].status
    //         ));
    // }

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
            {orderRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                <TableCell>
                                    <Box className="prod_box">
                                        <Button variant="contained" size="small">
                                            Update
                                        </Button>

                                        <Button variant="contained" size="small">
                                            Delete
                                        </Button>
                                        <Button variant="contained" size="small">
                                            Handle
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
        count={orderRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <div className="add_div">
        <Button variant="contained" size="large">
            Add Order
        </Button>
        </div>

        <Grid  container spacing={2} direction={"row"}>
                        <div>
                            <AddOrder/>
                        </div>

                        <div>
                            <HandleOrder/>
                        </div>
        </Grid>
        
    </Paper>
    );
}
export default OrderTable;