import React, {useEffect, useState, useRef} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Button, Grid, Input, Paper, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Container} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function ProductAdd(props) {
    // Clear error on unmount
    useEffect(() => {
        return () => {
            props.clearError()
        }
    }, [])

    const classes = useStyles();


    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    // Focus the selected option
    const [infoSelected, setInfoSelected] = useState('');
    const handleChange = event => {
        setInfoSelected(event.target.value);
    };

    // Build the nested option list
    const menuItemsList = [];
    if (props.category.data) {
        props.category.data.map(category => {
            menuItemsList.push(<MenuItem key={category.id} disabled>{category.name}</MenuItem>)
            if (category.subCategories) {
                category.subCategories.map(subCategory => {
                    menuItemsList.push(<MenuItem key={subCategory.id} value={subCategory.id} className={classes.nested}>{subCategory.name}</MenuItem>)
                })
            }
        })
    } else {
        menuItemsList.push(<MenuItem disabled>Create a category...</MenuItem> )
    }


    // Add info fields
    const [infoFields, setInfoFields] = useState([['key-0', 'value-0']]);
    const addInfoField = () => {
        if (infoFields.length < 5) {
            setInfoFields([...infoFields,[`key-${infoFields.length}`, `value-${infoFields.length}`]])
        }
    };


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
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
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
                                </Grid>
                                <Grid item xs={12}>
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
                                </Grid>

                                {infoFields.map(input => (
                                    <Grid item xs={10}>
                                        <Grid container spacing={2} key={input[0]}>
                                            <Grid item xs={5}>
                                                <TextField
                                                    variant="outlined"
                                                    label="Nom"
                                                    type="text"
                                                    name={input[0]} />
                                            </Grid>
                                            <Grid item xs={5}>
                                                <TextField
                                                    variant="outlined"
                                                    label="Valeur"
                                                    type="text"
                                                    name={input[1]} />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                ))}
                                <Grid item xs={2}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        onClick={addInfoField}
                                    >
                                        Ajouter un champ
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    {/* If category data is empty, display a create category button */}
                                    {props.category.data ? (
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                                                Infos Complémentaires
                                            </InputLabel>
                                            <Select
                                                labelWidth={labelWidth}
                                                value={infoSelected}
                                                onChange={handleChange}

                                            >
                                                {menuItemsList}
                                            </Select>
                                        </FormControl>
                                    ): (
                                        <Button>Créer une Catégorie</Button>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Rating
                                        name="simple-controlled"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Input
                                        type="file"
                                        name="image"
                                        variant="outlined"
                                        fullWidth
                                        id="image"
                                        label="Image"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.Button}
                                    >
                                        Ajouter
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Paper>

        </div>
    );
}

export default ProductAdd;