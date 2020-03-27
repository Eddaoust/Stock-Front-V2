import Registration from '../../components/Registration/Registration';
import {connect} from 'react-redux';
import {registrationProcess, registerClearError} from '../../actions/users';


const mapStateToProps = state => {
    return {
        user: state.user,
        registration: state.registration
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRegistration: (e, props) => {
            dispatch(registrationProcess({
                firstname: e.target.querySelectorAll('input')[0].value,
                lastname: e.target.querySelectorAll('input')[1].value,
                email: e.target.querySelectorAll('input')[2].value,
                password: e.target.querySelectorAll('input')[3].value,
                password_confirmation: e.target.querySelectorAll('input')[4].value,
            }, props))
        },
        clearError: () => dispatch(registerClearError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
