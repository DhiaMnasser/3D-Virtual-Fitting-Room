import React from "react";
// import Product from "../Product/Product";
import { useSelector } from "react-redux";
import { fa, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Users = () => {

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  const users = useSelector(state => state.users.users);

  console.log(users);
  
  return (
    <>
      <h1> Users list</h1>

      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
        <TableRow>
        <TableCell align="left">Username</TableCell>
        <TableCell align="left">Email</TableCell> 
            
            </TableRow>
        </TableHead>
        <TableBody>
                

                {users.map((users)=>(
          
<TableRow>
       
          <TableCell align="left">
                      
                      
                        <h6>{users.name}</h6>
                        
                      
                      
                      </TableCell>
                      <TableCell align="left"> <h6>{users.email}</h6> </TableCell>
                      
                    
               </TableRow>
                  ))}

                  
                
</TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default Users;
