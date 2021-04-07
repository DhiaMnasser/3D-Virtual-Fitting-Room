
import {React , useState }from "react";
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


const MyClaims = () => {
  
    const user = JSON.parse(localStorage.getItem('profile'));
  console.log( "My name", user?.result?.name);
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
      <h1>My claims</h1>

      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
        <TableRow>
        <TableCell align="left">Creator</TableCell>
        <TableCell align="left">Type</TableCell> 
            <TableCell align="left">Message</TableCell>
             
            <TableCell align="left">Status</TableCell>    
           
            </TableRow>
        </TableHead>
        <TableBody>
                

                {claims.filter(claim=> claim.creator === (user?.result?.name) ).map(filtered =>( 
                        
          
<TableRow>
      
       
          <TableCell align="left">
                      
                      
                        <h6>{filtered.creator}</h6>
                        
                      
                      
                      </TableCell>
                      <TableCell align="left"> <h6>{filtered.type}</h6> </TableCell>
                      <TableCell align="left"> <h6>{filtered.message}</h6> </TableCell>
                      <TableCell align="left"> <h6>{filtered.status}</h6> </TableCell>
                      
                <br/>
                    
               </TableRow>
                  ))}

                  
                
</TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default MyClaims;
