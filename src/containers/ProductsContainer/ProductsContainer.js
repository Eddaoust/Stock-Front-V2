import Products from "../../components/Products/Products";
import {productsFetchProcess} from "../../actions/products";
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        user: state.user,
        product: state.product,
        product_path: state.product_path
    };
};

const mapDispatchToProps = dispatch => {
    return {
        productsFetch: (user_id, token) => dispatch(productsFetchProcess(user_id, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
