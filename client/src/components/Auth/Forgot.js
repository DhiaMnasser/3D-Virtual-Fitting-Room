import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import axios from 'axios';

export const reset = ({ password, token }) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ password, token });
    try {
      const res = await axios.put(
        `http://localhost:3000/api/auth/reset/${token}`,
        body,
        config
      );
      dispatch({
        type: RESET_PASSWORD,
        payload: res.data
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(alert(error.msg, 'danger')));
      }
    }
  };
