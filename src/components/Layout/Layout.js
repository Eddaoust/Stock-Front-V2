import React, {useEffect} from 'react';
import {Route, Link, Switch, withRouter} from 'react-router-dom';
import Navbar from "./UI/Navbar";
import ProductsContainer from "../../containers/ProductsContainer/ProductsContainer";
import CategoryAddContainer from "../../containers/CategoryAddContainer/CategoryAddContainer";
import CategoryEditContainer from "../../containers/CategoryEditContainer/CategoryEditContainer";
import SubCategoryAddContainer from "../../containers/SubCategoryAddContainer/SubCategoryAddContainer";
import SubCategoryEditContainer from "../../containers/SubCategoryEditContainer/SubCategoryEditContainer";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Modal, Button} from '@material-ui/core'
import MailIcon from '@material-ui/icons/Mail';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const drawerWidth = 240;
let modalCategory = '';
let modalSubCategory = '';

//TODO Big refactoring needed!
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
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Layout(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    // Get the user categories on mount
    useEffect(() =>{
        props.categoryFetch(props.user.data.id, props.user.data.accessToken)
    }, []);

    const handleModalOpen = (event, categoryId, categoryName) => {
        modalCategory = {
            id: categoryId,
            name: categoryName
        };
        event.stopPropagation();
        setOpen(true);
    };

    const handleModalClose = (event) => {
        event.stopPropagation();
        setOpen(false);
    };

    function deleteCategory(categoryId, token, props, event) {
        props.categoryDelete(categoryId, token, props)
        handleModalClose(event)
    }

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

    function handleSubCategoryAdd(category_id) {
        props.history.push({
            pathname: "/app/sub-category/add",
            state: {
                categoryId: category_id
            }
        })
    }

    function handleSubCategoryEdit(event, subCategory_id, subCategory_name) {
        event.stopPropagation();
        props.history.push({
            pathname: "/app/sub-category/edit",
            state: {
                subCategoryId: subCategory_id,
                subCategoryName: subCategory_name
            }
        })
    }
    // Ouverture modal sub category
    const handleSubCategoryDeleteModal = (event, subCategoryId, subCategoryName) => {
        modalSubCategory = {
            id: subCategoryId,
            name: subCategoryName
        };
        event.stopPropagation();
        setOpen2(true);
    };

    // Delete action
    function deleteSubCategory(subCategoryId, token, props, event) {
        props.subCategoryDelete(subCategoryId, token, props);
        handleSubModalClose(event)
    }

    // Close sub category modal
    const handleSubModalClose = (event) => {
        event.stopPropagation();
        setOpen2(false);
    };

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
                {props.category.data ? props.category.data.map(category => (
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
                                onClick={(event) => handleModalOpen(event, category.id, category.name)}
                                size="small">
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </ListItem>
                        <List className={classes.nested}>
                            <ListItem>
                                <ListItemText>Ajouter une sous-catégorie</ListItemText>
                                <IconButton
                                    onClick={() => handleSubCategoryAdd(category.id)}
                                    size="small">
                                    <AddCircleIcon/>
                                </IconButton>
                            </ListItem>
                            {category.subCategories.map(subCategory => {
                                if (!subCategory.deleted) {
                                    return (
                                    <ListItem button key={subCategory.id}
                                              onClick={event => handleMenuItemClick(event, subCategory.id)}
                                              selected={subCategory.id === selectedIndex}>
                                        <ListItemText>{subCategory.name}</ListItemText>
                                        <IconButton
                                            onClick={(event) => handleSubCategoryEdit(event, subCategory.id, subCategory.name)}
                                            size="small">
                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                        <IconButton
                                            onClick={(event) => handleSubCategoryDeleteModal(event, subCategory.id, subCategory.name)}
                                            size="small"><DeleteIcon fontSize="small"/></IconButton>
                                    </ListItem>
                                    )}
                            })}
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
                <Modal
                    //Main Category deletion modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleModalClose}
                >
                    <div className={classes.paper}>
                        <h2 id="simple-modal-title">Supprimer une catégorie</h2>
                        <p id="simple-modal-description">Voulez vous supprimer la catégorie suivante: <strong>{modalCategory.name}</strong></p>
                        <Button
                            onClick={(event) => deleteCategory(modalCategory.id, props.user.data.accessToken, props, event)}
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                        >
                            Supprimer
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<CancelIcon />}
                            onClick={handleModalClose}
                        >
                            Annuler
                        </Button>
                    </div>
                </Modal>
                <Modal
                    // Sub Category deletion modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open2}
                    onClose={handleSubModalClose}
                >
                    <div className={classes.paper}>
                        <h2 id="simple-modal-title">Supprimer une sous-catégorie</h2>
                        <p id="simple-modal-description">Voulez vous supprimer la sous-catégorie suivante: <strong>{modalSubCategory.name}</strong></p>
                        <Button
                            onClick={(event) => deleteSubCategory(modalSubCategory.id, props.user.data.accessToken, props, event)}
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                        >
                            Supprimer
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<CancelIcon />}
                            onClick={handleSubModalClose}
                        >
                            Annuler
                        </Button>
                    </div>
                </Modal>
            </nav>

            {/* App content routing */ }
            <main className={classes.content}>
                <Switch>
                    <Route path="/app/category/add" exact component={CategoryAddContainer}/>
                    <Route path="/app/category/edit" exact component={CategoryEditContainer}/>
                    <Route path="/app/sub-category/add" exact component={SubCategoryAddContainer}/>
                    <Route path="/app/sub-category/edit" exact component={SubCategoryEditContainer}/>
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

