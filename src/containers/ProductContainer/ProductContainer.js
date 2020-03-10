import Product from "../../components/Products/Product";
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        user: state.user,
        product_path: state.product_path
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
