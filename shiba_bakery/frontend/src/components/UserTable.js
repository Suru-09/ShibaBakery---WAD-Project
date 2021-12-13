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
import GetAllUsers from '../utils/GetAllUsers';
import { useState, useEffect } from 'react';
// import '../../static/css/userTable.css'
import AddUser from '../pages/AddUser';
import { Grid } from '@material-ui/core';

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'first_name', label: 'First Name', minWidth: 170 },
  { id: 'last_name', label: 'Last Name', minWidth: 100 },
  { id: 'password', label: 'Password', minWidth: 100 }, 
  { id: 'username', label: 'Username', minWidth: 100 }, 
  { id: 'email', label: 'Email', minWidth: 100 }, 
];

function createData(id, first_name, last_name,
    password, username, email) {
    return { 
        id,
        first_name,
        last_name, 
        password,
        username,
        email
    };
}

const UserTable =() => {

    const [users, setUsers] = useState([]);
    const userRows = []

    useEffect(() => {
        async function getProducts() {
            const users = await GetAllUsers();
            setUsers(users);
        }
        getProducts();
    }, [])

    const hidden_password = "*********";
    for(let i = 0; i < users.length; ++i) {
        if(users[i].username != 'admin') {
            userRows.push(createData(users[i].id,
                users[i].first_name,
                users[i].last_name,
                hidden_password,
                users[i].username,
                users[i].email,
                ));
        }
    }

    console.log(users);

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
            {userRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                <TableCell>
                                    <Box className="prod_box">
                                        {/* <Button variant="contained" size="small">
                                            Update
                                        </Button> */}

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
        count={userRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <div className="add_div">
        <Button variant="contained" size="large">
            Add User
        </Button>
        </div>

        <Grid  container spacing={2} direction={"row"}>
                        <div>
                            <AddUser/>
                        </div>
        </Grid>
        
    </Paper>
    );
}
export default UserTable;