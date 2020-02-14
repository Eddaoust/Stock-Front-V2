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
        productCreate: (e, props) => dispatch(productCreateProcess(props.user.data.accessToken, {
            name: e.target.querySelectorAll('input')[0].value,
            description: e.target.querySelectorAll('textarea')[0].value,
            image: e.target.querySelectorAll('input')[1].files[0],
        })),
        clearError: () => dispatch(productClearError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdd);
