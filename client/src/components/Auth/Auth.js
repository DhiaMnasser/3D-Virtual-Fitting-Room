import React , { useState }from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import Input from './Input';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes';
import { useHistory } from 'react-router-dom';
import Icon from './icon';
import { signin, signup } from '../../redux/slices/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
const Auth = () => {
  const history = useHistory();
  const [form, setForm] = useState(initialState);
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const dispatch = useDispatch();
    const switchMode = () => {

        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
      };
      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (isSignup) {
          dispatch(signup(form, history));
        } else {
          dispatch(signin(form, history));
        }
      };
      const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');
    const googleSuccess = async (res) => {
      const result = res?.profileObj;
      const token = res?.tokenId;
  
      try {
        dispatch({ type: AUTH, data: { result, token } });
        history.push('/');
  
      } catch (error) {
        console.log(error);
      }
    };
    
    return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              { isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              { isSignup ? 'Sign Up' : 'Sign In' }
            </Button>
            <GoogleLogin
            clientId="189127956148-bhlf3115c2e9dgi1jqflpfd9aefa1hrp.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
            <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    )
}

export default Auth
