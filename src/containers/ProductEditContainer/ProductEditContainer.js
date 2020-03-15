import {connect} from 'react-redux';
import ProductEdit from "../../components/Products/ProductEdit";
import {productEditProcess, productClearError} from "../../actions/products";


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
        productEdit: (e, props, infoFields, infoSelected, rating, productId) => {
            let infos = []
            infoFields.map(field => {
                let info = {}
                info[e.target.querySelector(`#${field[0]}`).value] = e.target.querySelector(`#${field[1]}`).value
                infos.push(info)
            })

            dispatch(productEditProcess(props, props.user.data.accessToken, {
                    name: e.target.querySelector('#name').value,
                    description: e.target.querySelector('#description').value,
                    infos: infos,
                    rating: rating,
                    subcategory_id: infoSelected,
                    user_id: e.target.querySelector('#user_id').value,
                    image: e.target.querySelector('#image').files[0],
                }, productId
            ))},
        clearError: () => dispatch(productClearError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);
