import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {Typography, IconButton, Toolbar, AppBar, Icon, SvgIcon} from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor: '#fff',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    toolbar: theme.mixins.toolbar,
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    imageIcon: {
        height: '100%',
    },
    iconRoot: {
        textAlign: 'center',
        width: 35,
        height: 35,
    }
}));

function Navbar(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="primary"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.clicked}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Icon className={classes.iconRoot}>
                    <img className={classes.imageIcon} src="/image/wool-ball-color.png"/>
                </Icon>
                <Typography variant="h6" noWrap color="primary">
                    TidyDO
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
