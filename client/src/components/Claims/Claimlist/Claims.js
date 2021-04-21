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
const Claims = () => {
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
            <TableCell align="left">Message</TableCell>
                   
            </TableRow>
        </TableHead>
        <TableBody>
                

                {claims.map((claims)=>(
          
<TableRow>
       
          <TableCell align="left">
                      
                      
                        <h6>{claims.creator}</h6>
                        
                      
                      
                      </TableCell>
                      <TableCell align="left"> <h6>{claims.message}</h6> </TableCell>

               </TableRow>
                  ))}

                  
                
</TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default Claims;
