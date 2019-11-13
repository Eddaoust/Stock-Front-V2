import Layout from '../../components/Layout/Layout';
import {connect} from 'react-redux';
import {categoryFetchProcess} from "../../actions/categories";

const mapStateToProps = state => {
    return {
        user: state.user,
        category: state.category
    };
};

const mapDispatchToProps = dispatch => {
    return {
        categoryFetch: (user_id, token) => dispatch(categoryFetchProcess(user_id, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
