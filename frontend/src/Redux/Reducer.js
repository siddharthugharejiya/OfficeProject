


const initialstate = {
    Product: [],
    loading: false,
    error: null
}
export const Product_Get_reducer = (state = initialstate, action) => {
    switch (action.type) {
        case "Product_Get_Loading":
            return { ...state, loading: true, error: null }
        case "Product_Get":
            return { ...state, Product: action.payload, loading: false, error: null }
        case "Product_Get_Error":
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

const edite_initialstate = {
    edite_data: []
}
export const Product_Edite_get_reducer = (state = edite_initialstate, action) => {
    switch (action.type) {
        case "Product_Edite_get":
            return {
                ...state,
                edite_data: action.payload
            }
        default:
            return state
    }
}

const initialState1 = {
    Product: [],
    // singleProduct: null,
    // loading: false,
    error: null
};

export const productReducer_del = (state = initialState1, action) => {
    switch (action.type) {
        // 🟢 DELETE product
        case "PRODUCT_DELETE":
            return {
                ...state,
                Product: state.Product.filter(item => item._id !== action.payload),
                loading: false,
            };


        // 🔴 ERROR
        case "PRODUCT_ERROR":
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        // 🔄 DEFAULT
        default:
            return state;
    }
};

const initialState2 = {
    Product: null, // ✅ सही
    loading: false,
    error: null
};


export const SinglePage_reducer = (state = initialState2, { type, payload }) => {
    switch (type) {
        case "Single_Product":
            return { ...state, Product: payload }
        default:
            return state
    }

}



const initialState3 = {
    Product: [], // ✅ सही
    loading: false,
    error: null
};


export const Product_Page_reducer = (state = initialState3, { type, payload }) => {
    switch (type) {
        case "Product":
            return { ...state, Product: payload }
        default:
            return state
    }

}

const initialState111 = {
    category: [],
};

export const Product_category_reducer = (state = initialState111, action) => {
    switch (action.type) {
        case "Product_category":
            return {
                ...state,
                category: action.payload, // ✅ सिर्फ data ही store करो
            };
        default:
            return state;
    }
};
