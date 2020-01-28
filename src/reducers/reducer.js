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
    } else if(action.type === CATEGORY_DELETE_REQUEST) {
        return {
            ...state,
            category: {loading: true, error: false, data: [...state.category.data]}
        };
    } else if(action.type === CATEGORY_DELETE_ERROR) {
        return {
            ...state,
            category: {loading: false, error: action.data, data: [...state.category.data]}
        };
    } else if(action.type === CATEGORY_DELETE_SUCCESS) {
        return {
            ...state,
            category: {loading: false, error: false, data: state.category.data.filter(item => {
                if (item.id === action.data) {
                    return false;
                } else {
                    return true;
                }
                })}
        };
    } else if(action.type === CATEGORY_CREATE_REQUEST) {
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
    } else if(action.type === SUBCATEGORY_CREATE_REQUEST) {
        return {
            ...state,
            product: {loading: true, error: false, data: [...state.category.data]}
        };
    } else if(action.type === SUBCATEGORY_CREATE_ERROR) {
        return {
            ...state,
            product: {loading: false, error: action.data, data: [...state.category.data]}
        };
    } else if(action.type === SUBCATEGORY_CREATE_SUCCESS) {
        addSubCategory(state.category.data, action.data);
        return {
            ...state,
            product: {loading: false, error: false, data: [...state.category.data]}
        };
    }  else if(action.type === SUBCATEGORY_EDIT_REQUEST) {
        return {
            ...state,
            category: {loading: true, error: false, data: [...state.category.data]}
        };
    } else if(action.type === SUBCATEGORY_EDIT_ERROR) {
        return {
            ...state,
            category: {loading: false, error: action.data, data: [...state.category.data]}
        };
    } else if(action.type === SUBCATEGORY_EDIT_SUCCESS) {
        const modifiedData = updateSubCategory(state.category.data, action.data);
        modifiedData.map((subCategory, index) => {
            state.category.data[index].subCategories = subCategory;
        });
        return {
            ...state,
            category: {loading: false, error: false, data: [...state.category.data]}
        };
    } else if(action.type === SUBCATEGORY_DELETE_REQUEST) {
        return {
            ...state,
            category: {loading: true, error: false, data: [...state.category.data]}
        };
    } else if(action.type === SUBCATEGORY_DELETE_ERROR) {
        return {
            ...state,
            category: {loading: false, error: action.data, data: [...state.category.data]}
        };
    } else if(action.type === SUBCATEGORY_DELETE_SUCCESS) {
        const modifiedData = deleteSubCategory(state.category.data, action.data);
        modifiedData.map((subCategory, index) => {
            state.category.data[index].subCategories = subCategory;
        });
        return {
            ...state,
            category: {loading: false, error: false, data: [...state.category.data]}
        };
    }
    return state;
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
