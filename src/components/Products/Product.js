import React from 'react';
import {Card, CardActions, CardContent, Button, Typography, Grid, makeStyles, CardMedia} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

function Product(props) {

    const useStyles = makeStyles({
        card: {
            minWidth: '80vw',
            height: '100%'
        },
        media: {
            height: 200,
        },
        title: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }
    });

    const classes = useStyles();
    const product = props.location.state.product;

    const card = (
        <Grid item md={12}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={product.image}
                    title="product image"
                />
                <CardContent>
                    <div className={classes.title}>
                        <Typography variant="h5" component="h2">
                            {product.name}
                        </Typography>
                        <Rating name="size-small" defaultValue={product.rating} size="small" readOnly/>
                    </div>
                    <Typography variant="body2" component="p">
                        {product.description}
                    </Typography>
                    <div>
                        {product.infos.map(info => {
                            let keyTemp = Object.keys(info)[0]
                            return (
                                    <div>{keyTemp}: {info[keyTemp]} </div>
                                )
                        })}
                    </div>
                </CardContent>
                <CardActions>
                    <Button onClick={props.history.goBack} size="small">Go back</Button>
                </CardActions>
            </Card>
        </Grid>
    );

    return (
        <div>
            <Grid container spacing={2}>
                {card}
            </Grid>
        </div>
    );
}

export default Product;