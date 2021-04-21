    import React, { Fragment, useState } from 'react';
    import { connect } from 'react-redux';
    import { Link, Redirect } from 'react-router-dom';
    import { reset } from '../../actions/auth';
    import PropTypes from 'prop-types';

    const Reset = ({ setAlert, reset, match }) => {
        const [formData, setFormData] = useState({
        password: '',
        password2: ''
      });
      const { password, password2 } = formData;
      const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
      const onSubmit = async => {
        const token = match.params.tok
        console.log(token);
        if (password !== password2) {
          setAlert('password does not matched', 'danger');
        } else {
          reset({ password, token });
      }
      };

      return (
        <Fragment>
          <section className='container'>
            <h1 className='large text-primary'>RESET PASSWORD</h1>
            <p className='lead'>
              <i className='fas fa-user' /> Create Your NEW PASSWORD
            </p>
            <form
              className='form'
              onSubmit={e => onSubmit(e)}
              action='create-profile.html'
            >
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Confirm Password'
                  name='password2'
                  value={password2}
                  onChange={e => onChange(e)}
                />
              </div>
              <input type='submit' className='btn btn-primary' value='Register' />
            </form>
            <p className='my-1'>
              Already have an account? <Link to='/login'>Sign In</Link>
            </p>
          </section>
        </Fragment>
      );
    };
    Reset.propTypes = {
      setAlert: PropTypes.func.isRequired,
      reset: PropTypes.func.isRequired
    };

    export default connect(
      null,
      { alert, reset }
    )(Reset);

    
