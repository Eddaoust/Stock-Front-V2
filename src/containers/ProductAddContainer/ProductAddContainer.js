import {connect} from 'react-redux';
import ProductAdd from "../../components/Products/ProductAdd";
import {productCreateProcess, productClearError} from "../../actions/products";


const mapStateToProps = state => {
    return {
        user: state.user,
        category: state.category,
        product: state.product
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clearError: () => dispatch(productClearError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdd);
