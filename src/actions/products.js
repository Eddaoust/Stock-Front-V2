export const PRODUCTS_FETCH_REQUEST = 'PRODUCTS_REQUEST';
export const PRODUCTS_FETCH_SUCCESS = 'PRODUCTS_SUCCESS';
export const PRODUCTS_FETCH_ERROR = 'PRODUCTS_ERROR';

export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

const ROOTURL = 'http://localhost';
const REQUEST_HEADER = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export function productsFetchRequest() {
    return {
        type: PRODUCTS_FETCH_REQUEST
    }
}

export function productsFetchSuccess(response) {
    return {
        type: PRODUCTS_FETCH_SUCCESS,
        data: response
    }
}

export function productsFetchError(error) {
    return {
        type: PRODUCTS_FETCH_ERROR,
        data: error
    }
}

export function productsFetchProcess(user_id, token) {
    return function(dispatch) {
        dispatch(productsFetchRequest())
        return fetch(`${ROOTURL}/api/product/${user_id}`, {
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
                            dispatch(productsFetchError(handleError))
                        })
                } else {
                    res.json()
                        .then(response => {
                            dispatch(productsFetchSuccess(response))
                        });
                }
            })
    }
}
