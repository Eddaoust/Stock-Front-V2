import React, {useEffect} from 'react';
import {Card, CardActions, CardContent, Button, Typography, Grid} from '@material-ui/core';

function Products(props) {
    // Get the user products on mount
    useEffect(() =>{
        props.productsFetch(props.user.data.id, props.user.data.accessToken)
    }, []);

    const card = (
        props.product.data ?
            (props.location.state && props.location.state.catId) ?
                props.product.data.map(item => {
                    if (item.subCategory.id === props.location.state.catId || item.subCategory.parent.id === props.location.state.catId) {
                        return (
                            <Grid key={item.id} item xs={12} sm={6} md={4}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    }
                })
                : props.product.data.map(item => (
                    <Grid key={item.id} item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
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

export default Products;
