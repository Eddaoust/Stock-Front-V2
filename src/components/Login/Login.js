import React, {useEffect} from 'react';
import { Redirect, Link as RouterLink, withRouter } from 'react-router-dom';
import classes from '../Login/Login.module.css';
import {Avatar, Button, TextField, Link, Grid, Typography, CircularProgress, Snackbar, Slide} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
}

function Login(props) {
    // Clear Error on Component unmount
    useEffect(() => {
        return () => props.clearError();
    }, []);

    let snackbar = '';
    if ((props.user.status === 'auth' && !props.user.data.activated) || (props.location.state && props.location.state.registration)) {
        snackbar = (<Snackbar
            open={true}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert severity="info">
                Ce compte doit maintenant être activé. Un lien d'activation a été envoyé à votre adresse e-mail.
            </Alert>
        </Snackbar>);
    }

    // Render the spinner on loading
    let avatar = '';
    if (props.login.loading) {
        avatar = <CircularProgress className={classes.progress} color="secondary" />;
    } else {
        avatar = <Avatar className={classes.Avatar}><LockOutlinedIcon/></Avatar>;
    }
    // Add fields error props
    let error = false;
    let helperText = '';
    if (props.login.error) {
        error = true;
        helperText = 'Email ou mot de passe non valide'
    }

    console.log(props)

    if (props.user.status === 'auth' && !props.login.error && props.user.data.activated) {
        return <Redirect to="/app"/>;
    } else {
        return (
            <Grid container className={classes.Root}>
                <Grid item xs={false} sm={4} md={7} className={classes.Image} />
                <Grid item xs={12} sm={8} md={5} elevation={6}>
                    <div className={classes.Paper}>
                        {avatar}
                        <Typography component="h1" variant="h5">
                            Connexion
                        </Typography>
                        <form className={classes.Form} onSubmit={e => {
                            e.preventDefault();
                            props.onLogin(e)}
                        }>
                            <TextField
                                error={error}
                                helperText={helperText}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                type="email"
                                autoFocus
                            />
                            <TextField
                                error={error}
                                helperText={helperText}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.Submit}
                            >
                                Connexion
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2" underline="none">
                                        Mot de passe oublié?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link variant="body2" underline="none">
                                        <RouterLink className={classes.Link} to="/registration">Créer un compte</RouterLink>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid container>
                                {snackbar}
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(Login);
