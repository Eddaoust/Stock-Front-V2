export const PRODUCTS_FETCH_REQUEST = 'PRODUCTS_REQUEST';
export const PRODUCTS_FETCH_SUCCESS = 'PRODUCTS_SUCCESS';
export const PRODUCTS_FETCH_ERROR = 'PRODUCTS_ERROR';

export const PRODUCTS_CREATE_REQUEST = 'PRODUCTS_CREATE_REQUEST';
export const PRODUCTS_CREATE_SUCCESS = 'PRODUCTS_CREATE_SUCCESS';
export const PRODUCTS_CREATE_ERROR = 'PRODUCTS_CREATE_ERROR';

export const PRODUCT_CLEAR_ERROR = 'PRODUCT_CLEAR_ERROR';

const ROOTURL = 'http://localhost';
//const ROOTURL = 'https://api.eddaoust.com';
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

export function productCreateRequest() {
    return {
        type: PRODUCTS_CREATE_REQUEST
    }
}

export function productCreateSuccess(response) {
    return {
        type: PRODUCTS_CREATE_SUCCESS,
        data: response
    }
}

export function productCreateError(error) {
    return {
        type: PRODUCTS_CREATE_ERROR,
        data: error
    }
}

export function productCreateProcess(token, form) {
    return function(dispatch) {
        console.log(form)
        dispatch(productCreateRequest())
        return fetch(`${ROOTURL}/api/product`, {
            method: 'POST',
            headers: {
                ...REQUEST_HEADER,
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(form)
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
                            dispatch(productCreateError(handleError))
                        })
                } else {
                    res.json()
                        .then(response => {
                            dispatch(productCreateSuccess(response))
                        });
                }
            })
    }
}

export function productClearError() {
    return {
        type: PRODUCT_CLEAR_ERROR
    }
}
