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
import { traiterClaim} from '../../../redux/slices/claims'
import { useDispatch } from 'react-redux'
import {   Button } from '@material-ui/core';
const Claims = () => {
  const dispatch = useDispatch()
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  const claims = useSelector(state => state.claims.claims);

  console.log(claims);
  
  return (
    <>
      <h1>Claims list</h1>

      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
        <TableRow>
        <TableCell align="left">Creator</TableCell>
        <TableCell align="left">Type</TableCell> 
            <TableCell align="left">Message</TableCell>
             
            <TableCell align="left">Status</TableCell>    
            <TableCell align="left">Actions</TableCell>    
            </TableRow>
        </TableHead>
        <TableBody>
                

                {claims.map((claims)=>(
          
<TableRow>
       
          <TableCell align="left">
                      
                      
                        <h6>{claims.creator}</h6>
                        
                      
                      
                      </TableCell>
                      <TableCell align="left"> <h6>{claims.type}</h6> </TableCell>
                      <TableCell align="left"> <h6>{claims.message}</h6> </TableCell>
                      <TableCell align="left"> <h6>{claims.status}</h6> </TableCell>
                      <TableCell><Button color="primary"  fullWidth variant="contained"  onClick={()=>{dispatch(traiterClaim(claims._id))}}>update status</Button> </TableCell>
                <br/>
                    
               </TableRow>
                  ))}

                  
                
</TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default Claims;

