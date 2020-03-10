import React, {useEffect} from 'react';
import {Card, CardActions, CardContent, Button, Typography, Grid, makeStyles, CardActionArea, CardMedia} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';

function Products(props) {

    const useStyles = makeStyles({
        card: {
            maxWidth: 300,
            height: 450
        },
        media: {
            height: 200,
        },
    });

    // Get the user products on mount
    useEffect(() =>{
        props.productsFetch(props.user.data.id, props.user.data.accessToken)
    }, []);

    function handleProductShow(productId) {
        const product = props.product.data.find(item => item.id === productId);
        props.history.push({
            pathname: "/app/product/show",
            state: {
                product: product
            }
        })
    }

    const classes = useStyles();

    const card = (
        props.product.data ?
            (props.location.state && props.location.state.catId) ?
                props.product.data.map(item => {
                    if (item.subCategory.id === props.location.state.catId || item.subCategory.parent.id === props.location.state.catId) {
                        return (
                            <Grid key={item.id} item xs={12} sm={6} md={3}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={props.product_path + item.image}
                                            title="product image"
                                        />
                                    </CardActionArea>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            {item.name}
                                            <Rating name="size-small" defaultValue={item.rating} size="small" readOnly/>
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => handleProductShow(item.id)} size="small">Show more</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    }
                })
                : props.product.data.map(item => (
                    <Grid key={item.id} item xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={props.product_path + item.image}
                                    title="product image"
                                />
                            </CardActionArea>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {item.name}
                                    <Rating name="size-small" defaultValue={item.rating} size="small" readOnly/>
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => handleProductShow(item.id)} size="small">Show more</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            : ''
    );

    return (
        <div>
            <Grid container spacing={2}>
                {card}
            </Grid>
        </div>
    );
}

export default withRouter(Products);
