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
    CATEGORY_EDIT_SUCCESS,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_ERROR,
    } from '../actions/categories';

import {
    PRODUCTS_FETCH_REQUEST,
    PRODUCTS_FETCH_ERROR,
    PRODUCTS_FETCH_SUCCESS
} from "../actions/products";

import {
    SUBCATEGORY_CREATE_REQUEST,
    SUBCATEGORY_CREATE_ERROR,
    SUBCATEGORY_CREATE_SUCCESS,
    SUBCATEGORY_EDIT_REQUEST,
    SUBCATEGORY_EDIT_ERROR,
    SUBCATEGORY_EDIT_SUCCESS,
    SUBCATEGORY_DELETE_REQUEST,
    SUBCATEGORY_DELETE_ERROR,
    SUBCATEGORY_DELETE_SUCCESS,
} from "../actions/subCategories";

const initialState = {
    user: { status: false, data : {} },
    login: { loading: false, error: false },
    registration: { loading: false, error: false },
    category: {loading: false, error: false, data: false},
    product: {loading: false, error: false, data: false}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                 ...state,
                 login: { loading: true, error: false },
            }
        case LOGIN_ERROR:
            return {
                ...state,
                login: { loading: false, error: action.data },
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: { status: 'auth', data : {accessToken: action.data.token, id: action.data.data.id} },
                login: { loading: false, error: false },
            }
        case LOGIN_CLEAR_ERROR:
            return {
                ...state,
                login: { loading: false, error: false }
            }
        case REGISTER_REQUEST:
            return {
                ...state,
                registration: { loading: true, error: false }
            }
        case REGISTER_ERROR:
            return {
                ...state,
                registration: { loading: false, error: action.data }
            }
        case REGISTER_SUCCESS:
            return {
                 ...state,
                 user: { status: 'reg'},
                 registration: { loading: false, error: false },
            }
        case REGISTER_CLEAR_ERROR:
            return {
                ...state,
                registration: { loading: false, error: false }
            }
        case CATEGORY_FETCH_REQUEST:
            return {
                ...state,
                category: {loading: true, error: false, data: false}
            }
        case CATEGORY_FETCH_ERROR:
            return {
                ...state,
                category: {loading: false, error: action.data, data: false}
            }
        case CATEGORY_FETCH_SUCCESS:
            return {
                ...state,
                category: {loading: false, error: false, data: action.data.categories}
            }
        case CATEGORY_CREATE_REQUEST:
            return {
                ...state,
                category: {loading: true, error: false, data: [...state.category.data]}
            }
        case CATEGORY_CREATE_ERROR:
            return {
                ...state,
                category: {loading: false, error: action.data, data: [...state.category.data]}
            }
        case CATEGORY_CREATE_SUCCESS:
            const newCategoryData = [...state.category.data, action.data];
            newCategoryData.sort(sortCategory);
            return {
                 ...state,
                 category: {loading: false, error: false, data: newCategoryData}
            }
        case CATEGORY_EDIT_REQUEST:
            return {
                ...state,
                category: {loading: true, error: false, data: [...state.category.data]}
            }
        case CATEGORY_EDIT_ERROR:
            return {
                ...state,
                category: {loading: false, error: action.data, data: [...state.category.data]}
            }
        case CATEGORY_EDIT_SUCCESS:
            const modifiedData = updateCategory(state.category.data, action.data);
            return {
                 ...state,
                 category: {loading: false, error: false, data: modifiedData}
            }
        case CATEGORY_DELETE_REQUEST:
            return {
                ...state,
                category: {loading: true, error: false, data: [...state.category.data]}
            }
        case CATEGORY_DELETE_ERROR:
            return {
                ...state,
                category: {loading: false, error: action.data, data: [...state.category.data]}
            }
        case CATEGORY_DELETE_SUCCESS:
             return {
                ...state,
                category: {loading: false, error: false, data: state.category.data.filter(item => {
                     if (item.id === action.data) {
                         return false;
                     } else {
                         return true;
                     }
                 })}
            }
        case SUBCATEGORY_CREATE_REQUEST:
            return {
                ...state,
                category: {loading: true, error: false, data: [...state.category.data]}
            }
        case SUBCATEGORY_CREATE_ERROR:
            return {
                ...state,
                category: {loading: false, error: action.data, data: [...state.category.data]}
            }
        case SUBCATEGORY_CREATE_SUCCESS:
            addSubCategory(state.category.data, action.data);
            return {
                ...state,
            }
        case SUBCATEGORY_EDIT_REQUEST:
            return {
                ...state,
                category: {loading: true, error: false, data: [...state.category.data]}
            }
        case SUBCATEGORY_EDIT_ERROR:
            return {
                ...state,
                category: {loading: false, error: action.data, data: [...state.category.data]}
            }
        case SUBCATEGORY_EDIT_SUCCESS:
            const modifiedSubData = updateSubCategory(state.category.data, action.data);
            modifiedSubData.map((subCategory, index) => {
                state.category.data[index].subCategories = subCategory;
            })
            return {
            ...state,
                category: {loading: false, error: false, data: [...state.category.data]}
            }
        case SUBCATEGORY_DELETE_REQUEST:
            return {
                ...state,
                category: {loading: true, error: false, data: [...state.category.data]}
            }
        case SUBCATEGORY_DELETE_ERROR:
            return {
                ...state,
                category: {loading: false, error: action.data, data: [...state.category.data]}
            }
        case SUBCATEGORY_DELETE_SUCCESS:
            const modifiedSubDelData = deleteSubCategory(state.category.data, action.data);
            modifiedSubDelData.map((subCategory, index) => {
                state.category.data[index].subCategories = subCategory;
            })
            return {
                ...state,
                category: {loading: false, error: false, data: [...state.category.data]}
            }
        case PRODUCTS_FETCH_REQUEST:
            return {
                ...state,
                product: {loading: true, error: false, data: false}
            }
        case PRODUCTS_FETCH_ERROR:
            return {
                ...state,
                product: {loading: false, error: action.data, data: false}
            }
        case PRODUCTS_FETCH_SUCCESS:
            return {
                ...state,
                product: {loading: false, error: false, data: action.data.products}
            }
        default:
            return state
    }
};

export default reducer;


// STATE MANAGER HELPER
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

function updateSubCategory(categories, data) {
    return categories.map(category => {
        return category.subCategories.map(subCategory => {
            if (subCategory.id === data.id) {
                return {
                    ...subCategory,
                    name: data.name
                }
            } else {
                return subCategory
            }
        })
    })
}

function addSubCategory(array, data) {
    return array.map(category => {
        if (category.id === data.parent.id) {
            category.subCategories.push(data);
            category.subCategories.sort(sortCategory);
        }
    })
}

function deleteSubCategory(array, data) {
    return array.map(category => {
        return category.subCategories.filter(subCategory => {
            if (subCategory.id === data.id) {
                return false;
            } else {
                return true;
            }
        })
    })
}
