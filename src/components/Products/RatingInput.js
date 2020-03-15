import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";

function RatingInput(props) {

    // Get the previous rating value on edit product action
    let defaultValue = props.productRating ? props.productRating : 0;
    // Focus the selected option
    const [ratingValue, setRatingValue] = useState(defaultValue);
    const handleChange = (event, newValue) => {
        setRatingValue(newValue);
        props.ratingValue(newValue);
    };

    return (
        <Rating
            name="rating"
            id="rating"
            value={ratingValue}
            onChange={handleChange}
        />
    );
}

export default RatingInput;