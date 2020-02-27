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
        productCreate: (e, props, infoFields, infoSelected) => {
            let infos = []
            infoFields.map(field => {
                let info = {}
                info[e.target.querySelector(`#${field[0]}`).value] = e.target.querySelector(`#${field[1]}`).value
                infos.push(info)
            })

            dispatch(productCreateProcess(props.user.data.accessToken, {
                name: e.target.querySelector('#name').value,
                description: e.target.querySelector('#description').value,
                infos: infos,
                rating: 4,
                subcategory_id: infoSelected,
                user_id: e.target.querySelector('#user_id').value,
                //image: e.target.querySelectorAll('input')[1].files[0],
            }
        ))},
        clearError: () => dispatch(productClearError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdd);
