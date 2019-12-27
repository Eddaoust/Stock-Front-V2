import React, {useEffect} from 'react';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import Navbar from "./UI/Navbar";
import ProductsContainer from "../../containers/ProductsContainer/ProductsContainer";
import CategoryAddContainer from "../../containers/CategoryAddContainer/CategoryAddContainer";
import CategoryEditContainer from "../../containers/CategoryEditContainer/CategoryEditContainer";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: 64
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function Layout(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    // Get the user categories on mount
    useEffect(() =>{
        props.categoryFetch(props.user.data.id, props.user.data.accessToken)
    }, []);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    function handleMenuItemClick(event, index) {
        setSelectedIndex(index);
        props.history.push({
            pathname: '/app',
            state: {catId: index}
        })
    }

    function handleCategoryEdit(event, category_id, category_name) {
        event.stopPropagation();
        props.history.push({
            pathname: "/app/category/edit",
            state: {
                categoryId: category_id,
                categoryName: category_name
            }
        })
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider/>
            <List>
                <ListItem>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText><Link to="/app/category/add">Ajouter une catégorie</Link></ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText>Ajouter un produit</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText><Link to='/app'>Toutes les catégories</Link></ListItemText>
                </ListItem>
            </List>
            <Divider />
            <List>
                {/*TODO Sort by alphabetical order*/}
                {props.category.data ? props.category.data.categories.map(category => (
                    <div key={category.id}>
                        <ListItem button key={category.id}
                                  onClick={event => handleMenuItemClick(event, category.id)}
                                  selected={category.id === selectedIndex}>
                            <ListItemText>{category.name}</ListItemText>
                            <IconButton
                                onClick={(event) => handleCategoryEdit(event, category.id, category.name)}
                                size="small">
                                <EditIcon fontSize="small"/>
                            </IconButton>
                            <IconButton
                                size="small">
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </ListItem>
                        <List className={classes.nested}>
                            {category.subCategories.map(subCategory => (
                                <ListItem button key={subCategory.id}
                                          onClick={event => handleMenuItemClick(event, subCategory.id)}
                                          selected={subCategory.id === selectedIndex}>
                                    <ListItemText>{subCategory.name}</ListItemText>
                                    <IconButton
                                        onClick={(event) => handleCategoryEdit(event, subCategory.id, subCategory.name)}
                                        size="small">
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
                                    <IconButton size="small"><DeleteIcon fontSize="small"/></IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                )): ''}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar clicked={handleDrawerToggle}/>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

            <main className={classes.content}>
                <Switch>
                    <Route path="/app/category/add" exact component={CategoryAddContainer}/>
                    <Route path="/app/category/edit" exact component={CategoryEditContainer}/>
                    <Route path="/app" component={ProductsContainer}/>
                </Switch>
            </main>
        </div>
    );
}

Layout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default withRouter(Layout);

