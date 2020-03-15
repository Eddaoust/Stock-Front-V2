import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Button, Grid, Input, Paper, TextField, Typography} from "@material-ui/core";
import CategorySelectInput from "./CategorySelectInput";
import RatingInput from "./RatingInput";

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
    img: {
        maxWidth: '50%'
    }
}));

//TODO add button to delete product image
function ProductEdit(props) {
    // Clear error on unmount
    useEffect(() => {
        return () => {
            props.clearError()
        }
    }, [])

    // The product object to edit
    const product = props.location.state.product;
    // Get the value of the select component
    let categoryValue = product.subCategory.id;
    const getCategoryValue = value => {
        categoryValue = value
    };
    // Get the value of the rating component
    let ratingValue = product.rating;
    const getRatingValue = value => {
        ratingValue = value
    };
    // Define style
    const classes = useStyles();
    // Set the amount of infos field relative to the previous user data to set the default infos state
    let initialInfos = [];
    // Get the infos keys
    let infosKeys = [];
    for (let i = 0; i < product.infos.length; i++) {
        initialInfos.push([`key-${i}`, `value-${i}`]);
        infosKeys.push(Object.keys(product.infos[i]));
    }
    // Add info fields
    const [infoFields, setInfoFields] = useState(initialInfos);
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
                            Editer un produit
                        </Typography>
                        <form onSubmit={event => {
                            event.preventDefault()
                            props.productEdit(event, props, infoFields, categoryValue, ratingValue, product.id)
                        }}>
                            <Grid container spacing={2}>
                                <Grid item key={Math.random().toString(36).substr(2, 9)} xs={12}>
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
                                        defaultValue={product.name}
                                    />
                                </Grid>
                                <Grid item key={Math.random().toString(36).substr(2, 9)} xs={12}>
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
                                        defaultValue={product.description}
                                    />
                                </Grid>

                                {infoFields.map((input, index) => (
                                    <Grid item key={Math.random().toString(36).substr(2, 9)} xs={10}>
                                        <Grid container spacing={2} key={input[0]}>
                                            <Grid item key={Math.random().toString(36).substr(2, 9)} xs={5}>
                                                <TextField
                                                    variant="outlined"
                                                    label="Nom"
                                                    type="text"
                                                    id={input[0]}
                                                    name={input[0]}
                                                    defaultValue={infosKeys[index] ? infosKeys[index][0] : ''}
                                                />
                                            </Grid>
                                            <Grid item key={Math.random().toString(36).substr(2, 9)} xs={5}>
                                                <TextField
                                                    variant="outlined"
                                                    label="Valeur"
                                                    type="text"
                                                    id={input[1]}
                                                    name={input[1]}
                                                    defaultValue={infosKeys[index] ? product.infos[index][infosKeys[index][0]] : ''}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                ))}
                                <Grid item key={Math.random().toString(36).substr(2, 9)} xs={2}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        onClick={addInfoField}
                                    >
                                        Ajouter un champ
                                    </Button>
                                </Grid>
                                <Grid item key={Math.random().toString(36).substr(2, 9)} xs={6}>
                                    {/* If category data is empty, display a create category button */}
                                    {props.category.data ? (
                                        <CategorySelectInput
                                            category={props.category}
                                            categoryValue={getCategoryValue}
                                            productSubCategory={product.subCategory.id}
                                        />
                                    ): (
                                        <Button>Créer une Catégorie</Button>
                                    )}
                                </Grid>
                                <Grid item key={Math.random().toString(36).substr(2, 9)} xs={12}>
                                    <RatingInput
                                        ratingValue={getRatingValue}
                                        productRating={product.rating}
                                    />
                                </Grid>
                                <Grid item key={Math.random().toString(36).substr(2, 9)} xs={6}>
                                    <Input
                                        type="file"
                                        name="image"
                                        variant="outlined"
                                        fullWidth
                                        id="image"
                                        label="Image"
                                    />
                                </Grid>
                                <Grid item key={Math.random().toString(36).substr(2, 9)} xs={6}>
                                    <img
                                        src={props.product_path + product.image}
                                        alt="product image"
                                        className={classes.img}
                                    />
                                </Grid>
                                <Input
                                    name="user_id"
                                    required
                                    id="user_id"
                                    type="hidden"
                                    value={props.user.data.id}
                                    key={Math.random().toString(36).substr(2, 9)}
                                />
                                <Grid item key={Math.random().toString(36).substr(2, 9)} xs={12}>
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

export default ProductEdit;