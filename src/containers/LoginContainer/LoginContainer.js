import Login from '../../components/Login/Login';
import {connect} from 'react-redux';
import {loginProcess, loginClearError} from '../../actions/users';


const mapStateToProps = state => {
    return {
        user: state.user,
        login: state.login
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (e) => {
            dispatch(loginProcess({
                username: e.target.querySelectorAll('input')[0].value,
                password: e.target.querySelectorAll('input')[1].value
            }))
        },
        clearError: () => dispatch(loginClearError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
