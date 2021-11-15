import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Collapse } from '@mui/material';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import '../../static/css/productTable.css'


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'price', label: 'Price', minWidth: 100 },
  { id: 'category', label: 'Category', minWidth: 100 },
  { id: 'date_crerated', label: 'Date Created', minWidth: 100 },

//   name = models.CharField(max_length=200, null=False)
//   ingredients = models.CharField(max_length=200, null=True)
//   price = models.CharField(max_length=200, null=True)
//   category = models.CharField(max_length=200, null=True)
//   description = models.CharField(max_length=200, null=True)
//   date_created = models.DateTimeField(auto_now_add=True, null=True)
//   image = models.ImageField(null=True, blank=True, upload_to="images/")
//   stock_count = models.IntegerField(null=False, default=0)
  
];

function createData(name, price, category, date_created) {
  return { 
    name,
    price, 
    category, 
    date_created
};
}

const rows = [
  createData('Chocolate Cake', '50$', 'Cake', '12/09/2012'),
  createData('Chocolate Cake', '50$', 'Cake', '12/09/2012'),
  createData('Chocolate Cake', '50$', 'Cake', '12/09/2012'),
  createData('Chocolate Cake', '50$', 'Cake', '12/09/2012'),
  createData('Chocolate Cake', '50$', 'Cake', '12/09/2012'),
  createData('Chocolate Cake', '50$', 'Cake', '12/09/2012'),
  createData('Chocolate Cake', '50$', 'Cake', '12/09/2012'),
  createData('Chocolate Cake', '50$', 'Cake', '12/09/2012'),
  createData('Chocolate Cake', '50$', 'Cake', '12/09/2012'),
  createData('Chocolate Cake', '50$', 'Cake', '12/09/2012'),
  createData('Chocolate Cake', '50$', 'Cake', '12/09/2012'),
  createData('Chocolate Cake', '50$', 'Cake', '12/09/2012'),
  
];

// const [open, setOpen] = React.useState(false);
const open = true;

const ProductTable =() => {
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                    <>
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            <TableCell>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    // onClick={() => setOpen(!open)}
                                >
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
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
                        <TableRow>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box className="prod_box">
                                    <Button variant="contained" size="small">
                                        Update
                                    </Button>

                                    <Button variant="contained" size="small">
                                        Delete
                                    </Button>
                                </Box>
                            </Collapse>

                        </TableRow>
                    </>
                );
              })}
          </TableBody>
        </Table>
        
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
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
      
    </Paper>
  );
}
export default ProductTable;