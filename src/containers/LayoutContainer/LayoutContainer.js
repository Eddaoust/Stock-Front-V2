import Layout from '../../components/Layout/Layout';
import {connect} from 'react-redux';
import {categoryFetchProcess, categoryDeleteProcess} from "../../actions/categories";
import {subCategoryDeleteProcess} from "../../actions/subCategories";

const mapStateToProps = state => {
    return {
        user: state.user,
        category: state.category
    };
};

const mapDispatchToProps = dispatch => {
    return {
        categoryFetch: (user_id, token) => dispatch(categoryFetchProcess(user_id, token)),
        categoryDelete: (categoryId, token, props) => dispatch(categoryDeleteProcess(categoryId, token, props)),
        subCategoryDelete: (subCategoryId, token, props) => dispatch(subCategoryDeleteProcess(subCategoryId, token, props))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
