import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, iconButtonClasses } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import GetAllOrders from "../utils/GetAllOrders";
import GetProductsFromOrder from "../utils/GetProductsFromOrder";
import GetCookie from "../utils/GetCookie";



const columns = [
  { id: 'customer', label: 'Customer', minWidth: 50 },
  { id: 'product_list', label: 'Product', minWidth: 150 },
  { id: 'status', label: 'Status', minWidth: 50 }, 
  { id: 'contact_person', label: 'Contact Person', minWidth: 50 }, 
  { id: 'phone_number', label: 'Phone Number', minWidth: 50 }, 
  { id: 'delivery_address', label: 'Delivery Address', minWidth: 50 }, 
];

function createData(customer, product_list, status, contact_person, phone_number, delivery_address ) {
    return {
        customer,
        product_list,
        status,
        contact_person,
        phone_number,
        delivery_address
    };
}

const OrderTable =() => {

    const [orders, setOrder] = useState([]);
    const [product_orders, setProductOrder] = useState([]);

    useEffect(() => {
        async function getOrders() {
            const orders = await GetAllOrders();
            setOrder(orders);

            let product_order = []
            for(let i = 0; i < orders.length; ++i) {

                const products = await GetProductsFromOrder(orders[i].id);
                console.log("Eu sunt products: ");
                console.log(products);
                let products_name = ""

                for(let j = 0; j < products.length; ++j) {
                    if (j !== 0)
                        products_name = products_name + ", " + products[j].name;
                    else
                        products_name = products_name + products[j].name;
                }
                product_order.push(products_name);
            }
            setProductOrder(product_order);
        }
        getOrders();
    }, [])

    let orderRows = []
    for(let i = 0 ; i < orders.length; i++) {
        orderRows.push(
            createData(
                orders[i].customer,
                product_orders[i],
                orders[i].status,
                orders[i].contact_person,
                orders[i].phone_number,
                orders[i].delivery_address
            )
        );
    }

    const deleteProduct = (product) => {
        const requestOptions = {
            method: "POST",
            headers: {
            "X-CSRFToken": GetCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                product: product
            }),
        };

        fetch('/api/get-order-products', requestOptions).then((response) => {
            if(response.ok) {
                window.location = document.URL;
                this.props.history.push('/adminPage/OrderTable');
            }
            else {
                console.log("The order from the OrderTable hasn't been deleted!");
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    console.log("Eu sunt productOrder: ");
    console.log(orderRows);

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
                    {/*  Empty Cell for table alignment. DO NOT DELETE */}
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
            {orderRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                <TableCell>
                                    <Box className="prod_box">
                                        <Button onClick={() => {
                                                deleteProduct(row)
                                                }}
                                                variant="contained" size="small" color='inherit'>
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
        count={orderRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <div className="add_div">
        <Button component={Link} to={'/adminPage/addOrder'} variant="contained" size="large" color='inherit'>
            Add Order
        </Button>
        </div>
    </Paper>
    );
}
export default OrderTable;