export const CATEGORY_FETCH_REQUEST = 'CATEGORY_REQUEST';
export const CATEGORY_FETCH_SUCCESS = 'CATEGORY_SUCCESS';
export const CATEGORY_FETCH_ERROR = 'CATEGORY_ERROR';

export const CATEGORY_CREATE_REQUEST = 'CATEGORY_CREATE_REQUEST';
export const CATEGORY_CREATE_SUCCESS = 'CATEGORY_CREATE_SUCCESS';
export const CATEGORY_CREATE_ERROR = 'CATEGORY_CREATE_ERROR';

export const CATEGORY_EDIT_REQUEST = 'CATEGORY_EDIT_REQUEST';
export const CATEGORY_EDIT_SUCCESS = 'CATEGORY_EDIT_SUCCESS';
export const CATEGORY_EDIT_ERROR = 'CATEGORY_EDIT_ERROR';


const ROOTURL = 'http://localhost';
const REQUEST_HEADER = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export function categoryFetchRequest() {
    return {
        type: CATEGORY_FETCH_REQUEST
    }
}

export function categoryFetchSuccess(response) {
    return {
        type: CATEGORY_FETCH_SUCCESS,
        data: response
    }
}

export function categoryFetchError(error) {
    return {
        type: CATEGORY_FETCH_ERROR,
        data: error
    }
}

export function categoryFetchProcess(user_id, token) {
    return function(dispatch) {
        dispatch(categoryFetchRequest())
        return fetch(`${ROOTURL}/api/category/${user_id}`, {
            method: 'GET',
            headers: {
                ...REQUEST_HEADER,
                'Authorization': `Bearer ${token}`
            },
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
                        dispatch(categoryFetchError(handleError))
                    })
                } else {
                    res.json()
                    .then(response => {
                        dispatch(categoryFetchSuccess(response))
                    });
                }
            })
    }
}

export function categoryEditRequest() {
    return {
        type: CATEGORY_EDIT_REQUEST
    }
}

export function categoryEditSuccess(response) {
    return {
        type: CATEGORY_EDIT_SUCCESS,
        data: response
    }
}

export function categoryEditError(error) {
    return {
        type: CATEGORY_EDIT_ERROR,
        data: error
    }
}

export function categoryEditProcess(formValues, token, props) {
    return function(dispatch) {
        dispatch(categoryEditRequest())
        return fetch(`${ROOTURL}/api/category/${formValues.category_id}`, {
            method: 'PATCH',
            headers: {
                ...REQUEST_HEADER,
                'Authorization': `Bearer ${token}`
            },
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
                            dispatch(categoryEditError(handleError))
                        })
                } else {
                    res.json()
                        .then(response => {
                            dispatch(categoryEditSuccess(response))
                            props.history.push('/app')
                        });
                }
            })
    }
}

export function categoryCreateRequest() {
    return {
        type: CATEGORY_CREATE_REQUEST
    }
}

export function categoryCreateSuccess(response) {
    return {
        type: CATEGORY_CREATE_SUCCESS,
        data: response
    }
}

export function categoryCreateError(error) {
    return {
        type: CATEGORY_CREATE_ERROR,
        data: error
    }
}

export function categoryCreateProcess(formValues, token, props) {
    return function(dispatch) {
        dispatch(categoryCreateRequest())
        return fetch(`${ROOTURL}/api/category`, {
            method: 'POST',
            headers: {
                ...REQUEST_HEADER,
                'Authorization': `Bearer ${token}`
            },
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
                            dispatch(categoryCreateError(handleError))
                        })
                } else {
                    res.json()
                        .then(response => {
                            dispatch(categoryCreateSuccess(response))
                            props.history.push('/app')
                        });
                }
            })
    }
}
