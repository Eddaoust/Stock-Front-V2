import {connect} from 'react-redux';
import CategoryEdit from "../../components/Category/CategoryEdit";
import {categoryEditProcess} from "../../actions/categories";

const mapStateToProps = state => {
    return {
        user: state.user,
        category: state.category
    };
};

const mapDispatchToProps = dispatch => {
    return {
        categoryEdit: (event, token, props) => dispatch(categoryEditProcess({
            name: event.target.querySelectorAll('input')[0].value,
            user_id: event.target.querySelectorAll('input')[1].value,
            category_id: event.target.querySelectorAll('input')[2].value,
        }, token, props))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEdit);
