import React, {useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function Products(props) {
    // Get the user products on mount
    useEffect(() =>{
        props.productsFetch(props.user.data.id, props.user.data.accessToken)
    }, []);

    const card = (
        props.product.data ?
            (props.location.state && props.location.state.catId) ?
                props.product.data.map(item => {
                    if (item.category_id === props.location.state.catId || item.parent_category === props.location.state.catId) {
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
