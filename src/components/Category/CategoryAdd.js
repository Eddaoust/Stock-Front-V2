import React from "react";
import classes from './CategoryAdd.module.css';
import {Button, TextField, Input, Paper, Grid, Typography} from '@material-ui/core';

function CategoryAdd(props) {

    // Add fields error props
    let error = false;
    let helperText = '';
    if (props.category.error) {
        props.category.error.data.map(e => {
            if (e.message === 'The name must be at least 2 characters.') {
                error = true;
                helperText = "La catégorie doit faire au moins 2 caractères.";
            } else if (e.message === 'The name may not be greater than 30 characters.') {
                error = true;
                helperText = "La catégorie doit faire au maximum 30 caractères.";
            } else if (e.message === 'The name must be a string.') {
                error = true;
                helperText = "La catégorie doit être une chaine de caractère.";
            }
        })
    }

    return (
        <div className={classes.Content}>
            <Paper className={classes.Paper}>
                <Grid
                container
                direction="row"
                justify="center">
                    <Grid item >
                        <Typography
                            component="h1"
                            variant="h5"
                            align="center"
                            className={classes.Title}>
                            Ajouter une catégorie
                        </Typography>
                        <form onSubmit={event => {
                            event.preventDefault();
                            props.categoryCreate(event, props.user.data.accessToken, props)
                            event.target.querySelectorAll('input')[0].value = ''
                        }}>
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Catégories"
                                autoFocus
                                type="text"
                                error={error}
                                helperText={helperText}
                            />
                            <Input
                                name="user_id"
                                required
                                id="user_id"
                                type="hidden"
                                value={props.user.data.id}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.Button}
                            >
                                Ajouter
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Paper>

        </div>
    );
}

export default CategoryAdd;
