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

import {Link} from 'react-router-dom';
import GetCookie from "../utils/GetCookie";

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'first_name', label: 'First Name', minWidth: 170 },
  { id: 'last_name', label: 'Last Name', minWidth: 100 },
  { id: 'password', label: 'Password', minWidth: 100 }, 
  { id: 'username', label: 'Username', minWidth: 100 }, 
  { id: 'email', label: 'Email', minWidth: 100 }, 
];

function createData(id, first_name, last_name,
    password, username, email, code) {
    return { 
        id,
        first_name,
        last_name, 
        password,
        username,
        email,
        code
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
                i
                ));
        }
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

    const deleteUser = async (username) => {
        const requestOptions = {
            method: "POST",
            headers: {
            "X-CSRFToken": GetCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                username: username
            }),
        };

        fetch('/api/delete-user', requestOptions).then((response) => {
            if(response.ok) {
                window.location = document.URL;
                this.props.history.push('/adminPage/UserTable');
            }
            else {
                console.log("The user from UserTable hasn't been deleted!");
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
            {userRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                <TableCell>
                                    <Box className="prod_box">
                                        <Button onClick={() => {
                                                deleteUser(row.username).then(r => console.log("The user from UserTable hasn't been deleted!"))}}
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
        count={userRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <div className="add_div">
        <Button component={Link} to={'/adminPage/addUser'} variant="contained" size="large">
            Add User
        </Button>
        </div>
        
    </Paper>
    );
}
export default UserTable;
