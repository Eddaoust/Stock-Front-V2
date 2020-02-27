import React, { useState, useRef} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem} from "@material-ui/core";

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

function CategorySelectInput(props) {

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
        props.categoryValue(event.target.value);
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

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                Infos Complémentaires
            </InputLabel>
            <Select
                labelWidth={labelWidth}
                value={infoSelected}
                onChange={handleChange}
                name="sub_category"
            >
                {menuItemsList}
            </Select>
        </FormControl>
    );
}

export default CategorySelectInput;