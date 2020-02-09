import React, {useEffect} from "react";
import classes from "../Category/CategoryAdd.module.css";
import {Button, Grid, Input, Paper, TextField, Typography} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';

function ProductAdd(props) {
    useEffect(() => {
        return () => {
            props.clearError()
        }
    }, [])
    // Add fields error props
    let error = false;
    let helperText = '';
    if (props.product.error) {
        props.product.error.data.map(e => {
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
                            Ajouter un produit
                        </Typography>
                        <form >
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Nom"
                                autoFocus
                                type="text"
                                error={error}
                                helperText={helperText}
                            />
                            <TextField
                                name="description"
                                variant="outlined"
                                required
                                fullWidth
                                multiline={true}
                                rows={2}
                                rowsMax={4}
                                id="description"
                                label="Description"
                                autoFocus
                                type="textarea"
                                error={error}
                                helperText={helperText}
                            />
                            <Input
                                type="file"
                            />
                            <Rating
                                name="simple-controlled"
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

export default ProductAdd;