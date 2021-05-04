import React, { useState } from "react";
// import Product from "../Product/Product";
import { fa, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { traiterMessage } from "../../../redux/slices/messages";
import { Button } from "@material-ui/core";

const Messages = () => {
    const dispatch = useDispatch();
    const useStyles = makeStyles({
      table: {
        minWidth: 650
      }
    });
    const classes = useStyles();
    const messages = useSelector((state) => state.messages.messages);
    console.log(messages);
  
    return (
      <>
        <h1>Messages list</h1>
  
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map(message => (
                <TableRow>
                  <TableCell align="left">
                    <h6>{message.name}</h6>
                  </TableCell>
                  <TableCell align="left">
                    {" "}
                    <h6>{message.email}</h6>{" "}
                  </TableCell>
                  <TableCell align="left">
                    {" "}
                    <h6>{message.message}</h6>{" "}
                  </TableCell>
                  <br />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
      
    );
  };


export default Messages;