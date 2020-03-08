import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";

function RatingInput(props) {

    // Focus the selected option
    const [ratingValue, setRatingValue] = useState(0);
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