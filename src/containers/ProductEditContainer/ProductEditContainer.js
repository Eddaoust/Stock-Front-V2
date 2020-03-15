import {connect} from 'react-redux';
import ProductEdit from "../../components/Products/ProductEdit";


const mapStateToProps = state => {
    return {
        user: state.user,
        category: state.category,
        product: state.product,
        product_path: state.product_path
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clearError: () => dispatch()
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);
