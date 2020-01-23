import {connect} from 'react-redux';
import SubCategoryEdit from '../../components/Category/SubCategory/SubCategoryEdit';
import {subCategoryEditProcess} from "../../actions/subCategories";

const mapStateToProps = state => {
    return {
        user: state.user,
        category: state.category
    };
};

const mapDispatchToProps = dispatch => {
    return {
        subCategoryEdit: (event, token, props) => dispatch(subCategoryEditProcess({
            name: event.target.querySelectorAll('input')[0].value,
            subCategoryId: event.target.querySelectorAll('input')[1].value,
        }, token, props))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryEdit)
