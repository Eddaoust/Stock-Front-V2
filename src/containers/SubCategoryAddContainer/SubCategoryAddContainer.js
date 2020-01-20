import {connect} from 'react-redux';
import SubCategoryAdd from '../../components/Category/SubCategory/SubCategoryAdd';
import {subCategoryCreateProcess} from "../../actions/subCategories";

const mapStateToProps = state => {
    return {
        user: state.user,
        category: state.category
    };
};

const mapDispatchToProps = dispatch => {
    return {
        subCategoryCreate: (event, token, props) => dispatch(subCategoryCreateProcess({
            name: event.target.querySelectorAll('input')[0].value,
            category_id: event.target.querySelectorAll('input')[1].value,
        }, token, props))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryAdd)
