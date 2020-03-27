export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_CLEAR_ERROR = 'LOGIN_CLEAR_ERROR';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_CLEAR_ERROR = 'REGISTER_CLEAR_ERROR';

export const FETCH_USER = 'FETCH_USER';

const ROOTURL = 'http://localhost:8888';
//const ROOTURL = 'https://api.eddaoust.com';
const REQUEST_HEADER = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export function loginRequest() {
    return {
        type: LOGIN_REQUEST,
    };
}

export function loginSuccess(token) {
    return {
        type: LOGIN_SUCCESS,
        data: token
    };
}

export function loginError(error) {
    return {
        type: LOGIN_ERROR,
        data: error
    }
}

export function loginClearError() {
    return {
        type: LOGIN_CLEAR_ERROR
    }
}

export function loginProcess(formValues) {
    return function(dispatch) {
        dispatch(loginRequest())
        return fetch(`${ROOTURL}/api/login_check`, {
            method: 'POST',
            headers: REQUEST_HEADER,
            body: JSON.stringify(formValues)
        })
            .then(res => {
                if (res.status !== 200) {
                    const handleError = {
                        status: res.status,
                        text: res.statusText,
                        data: ''
                    };
                    res.json()
                        .then(error => {
                            handleError.data = error;
                            dispatch(loginError(handleError))
                        })
                } else {
                    res.json()
                        .then(response => dispatch(loginSuccess(response)));
                }
            })
    }
}

export function registerRequest() {
    return {
        type: REGISTER_REQUEST,
    };
}

export function registerSuccess(token) {
    return {
        type: REGISTER_SUCCESS,
        data: token
    };
}

export function registerError(error) {
    return {
        type: REGISTER_ERROR,
        data: error
    }
}

export function registerClearError() {
    return {
        type: REGISTER_CLEAR_ERROR
    }
}

export function registrationProcess(formValues, props) {
    return function(dispatch) {
        dispatch(registerRequest())
        return fetch(`${ROOTURL}/registration`, {
            method: 'POST',
            headers: REQUEST_HEADER,
            body: JSON.stringify(formValues)
        })
            .then(res => {
                if (res.status !== 200) {
                    const handleError = {
                        status: res.status,
                        text: res.statusText,
                        data: ''
                    };
                    res.json()
                    .then(error => {
                        handleError.data = error;
                        dispatch(registerError(handleError))
                    })
                } else {
                    res.json()
                    .then(response => {
                        dispatch(registerSuccess(response))
                        props.history.push({
                            pathname: "/",
                            state: {
                                registration: true
                            }
                        })
                    });
                }
            })
    }
}
