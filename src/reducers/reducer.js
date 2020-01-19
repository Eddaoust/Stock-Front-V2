import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REGISTER_REQUEST,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    LOGIN_CLEAR_ERROR,
    REGISTER_CLEAR_ERROR,
} from '../actions/users';

import {
    CATEGORY_FETCH_REQUEST,
    CATEGORY_FETCH_SUCCESS,
    CATEGORY_FETCH_ERROR,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_ERROR,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_EDIT_REQUEST,
    CATEGORY_EDIT_ERROR,
    CATEGORY_EDIT_SUCCESS
    } from '../actions/categories';

import {
    PRODUCTS_FETCH_REQUEST,
    PRODUCTS_FETCH_ERROR,
    PRODUCTS_FETCH_SUCCESS
} from "../actions/products";

const initialState = {
    user: { status: false, data : {} },
    login: { loading: false, error: false },
    registration: { loading: false, error: false },
    category: {loading: false, error: false, data: false},
    product: {loading: false, error: false, data: false}
};

const reducer = (state = initialState, action) => {
    if (action.type === LOGIN_REQUEST) {
        return {
            ...state,
            login: { loading: true, error: false },
        };
    } else if(action.type === LOGIN_ERROR) {
        return {
            ...state,
            login: { loading: false, error: action.data },
        };
    } else if(action.type === LOGIN_SUCCESS) {
        return {
            ...state,
            user: { status: 'auth', data : {accessToken: action.data.token, id: action.data.data.id} },
            login: { loading: false, error: false },
        };
    } else if(action.type === LOGIN_CLEAR_ERROR) {
        return {
            ...state,
            login: { loading: false, error: false }
        };
    } else if(action.type === REGISTER_REQUEST) {
        return {
            ...state,
            registration: { loading: true, error: false }
        };
    } else if(action.type === REGISTER_ERROR) {
        return {
            ...state,
            registration: { loading: false, error: action.data }
        };
    } else if(action.type === REGISTER_SUCCESS) {
        return {
            ...state,
            user: { status: 'reg'},
            registration: { loading: false, error: false },
        };
    } else if(action.type === REGISTER_CLEAR_ERROR) {
        return {
            ...state,
            registration: { loading: false, error: false }
        };
    } else if(action.type === CATEGORY_FETCH_REQUEST) {
        return {
            ...state,
            category: {loading: true, error: false, data: false}
        };
    } else if(action.type === CATEGORY_FETCH_ERROR) {
        return {
            ...state,
            category: {loading: false, error: action.data, data: false}
        };
    } else if(action.type === CATEGORY_FETCH_SUCCESS) {
        return {
            ...state,
            category: {loading: false, error: false, data: action.data.categories}
        };
    }  else if(action.type === CATEGORY_CREATE_REQUEST) {
        return {
            ...state,
            category: {loading: true, error: false, data: [...state.category.data]}
        };
    } else if(action.type === CATEGORY_CREATE_ERROR) {
        return {
            ...state,
            category: {loading: false, error: action.data, data: [...state.category.data]}
        };
    } else if(action.type === CATEGORY_CREATE_SUCCESS) {
        const newCategoryData = [...state.category.data, action.data];
        newCategoryData.sort(sortCategory);
        return {
            ...state,
            category: {loading: false, error: false, data: newCategoryData}
        };
    } else if(action.type === CATEGORY_EDIT_REQUEST) {
        return {
            ...state,
            category: {loading: true, error: false, data: [...state.category.data]}
        };
    } else if(action.type === CATEGORY_EDIT_ERROR) {
        return {
            ...state,
            category: {loading: false, error: action.data, data: [...state.category.data]}
        };
    } else if(action.type === CATEGORY_EDIT_SUCCESS) {
        const modifiedData = updateCategory(state.category.data, action.data);
        return {
            ...state,
            category: {loading: false, error: false, data: modifiedData}
        }
    } else if(action.type === PRODUCTS_FETCH_REQUEST) {
        return {
            ...state,
            product: {loading: true, error: false, data: false}
        };
    } else if(action.type === PRODUCTS_FETCH_ERROR) {
        return {
            ...state,
            product: {loading: false, error: action.data, data: false}
        };
    } else if(action.type === PRODUCTS_FETCH_SUCCESS) {
        return {
            ...state,
            product: {loading: false, error: false, data: action.data.products}
        };
    }
    return state;
};

export default reducer;

function updateCategory(categories, data) {
    return categories.map(category => {
        if (category.id === data.id) {
            return {
                ...category,
                name: data.name
            }
        }
        return category;
    })
}

function sortCategory(a, b) {
    if ( a.name.toUpperCase() < b.name.toUpperCase() ){
        return -1;
    }
    if ( a.name.toUpperCase() > b.name.toUpperCase() ){
        return 1;
    }
    return 0;
}
