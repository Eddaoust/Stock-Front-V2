import React, {useEffect, useState} from "react";
import classes from "../Category/CategoryAdd.module.css";
import {Button, Grid, Input, Paper, TextField, Typography} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';

function ProductAdd(props) {
    useEffect(() => {
        return () => {
            props.clearError()
        }
    }, [])

    const [infoFields, setInfoFields] = useState([['key-0', 'value-0']]);
    const addInfoField = () => {
        if (infoFields.length < 5) {
            setInfoFields([...infoFields,[`key-${infoFields.length}`, `value-${infoFields.length}`]])
        }
    }

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
                        <form onSubmit={event => {
                            event.preventDefault();
                            props.productCreate(event, props)
                        }}>
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
                                type="text"
                                error={error}
                                helperText={helperText}
                            />
                            {infoFields.map(input => (
                                <div key={input[0]}>
                                    <TextField
                                        variant="outlined"
                                        label="Nom"
                                        type="text"
                                        name={input[0]} />
                                    <TextField
                                        variant="outlined"
                                        label="Valeur"
                                        type="text"
                                        name={input[1]} />
                                </div>
                            ))}
                            <Input
                                type="file"
                                name="image"
                                variant="outlined"
                                fullWidth
                                id="image"
                                label="Image"
                            />
                            <Rating
                                name="simple-controlled"
                            />
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                onClick={addInfoField}
                            >
                                Ajouter un champ
                            </Button>
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