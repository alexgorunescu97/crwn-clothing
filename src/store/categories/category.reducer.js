import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    errorState: null
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch(type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload,
                isLoading: false
            }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        default: 
            return state;
    }
};