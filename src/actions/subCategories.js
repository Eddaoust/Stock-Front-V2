import {CATEGORY_CREATE_ERROR, CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS} from "./categories";

export const SUBCATEGORY_CREATE_REQUEST = 'SUBCATEGORY_CREATE_REQUEST';
export const SUBCATEGORY_CREATE_SUCCESS = 'SUBCATEGORY_CREATE_SUCCESS';
export const SUBCATEGORY_CREATE_ERROR = 'SUBCATEGORY_CREATE_ERROR';

export const SUBCATEGORY_EDIT_REQUEST = 'SUBCATEGORY_EDIT_REQUEST';
export const SUBCATEGORY_EDIT_SUCCESS = 'SUBCATEGORY_EDIT_SUCCESS';
export const SUBCATEGORY_EDIT_ERROR = 'SUBCATEGORY_EDIT_ERROR';

export const SUBCATEGORY_DELETE_REQUEST = 'SUBCATEGORY_DELETE_REQUEST';
export const SUBCATEGORY_DELETE_SUCCESS = 'SUBCATEGORY_DELETE_SUCCESS';
export const SUBCATEGORY_DELETE_ERROR = 'SUBCATEGORY_DELETE_ERROR';

const ROOTURL = 'http://localhost';
//const ROOTURL = 'https://api.eddaoust.com';
const REQUEST_HEADER = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export function subCategoryCreateRequest() {
    return {
        type: SUBCATEGORY_CREATE_REQUEST
    }
}

export function subCategoryCreateSuccess(response) {
    return {
        type: SUBCATEGORY_CREATE_SUCCESS,
        data: response
    }
}

export function subCategoryCreateError(error) {
    return {
        type: SUBCATEGORY_CREATE_ERROR,
        data: error
    }
}

export function subCategoryCreateProcess(formValues, token, props) {
    return function(dispatch) {
        dispatch(subCategoryCreateRequest())
        return fetch(`${ROOTURL}/api/sub-category`, {
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
                            dispatch(subCategoryCreateError(handleError))
                        })
                } else {
                    res.json()
                        .then(response => {
                            console.log(response)
                            dispatch(subCategoryCreateSuccess(response))
                            props.history.push('/app')
                        });
                }
            })
    }
}