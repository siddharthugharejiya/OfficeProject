import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "../App.css";

// 3D toast function
const showToast = (message, type = "success") => {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        className: `custom-toast ${type}`,
        style: {
            background: type === "success" ? "linear-gradient(to right, #00b09b, #96c93d)" : "#ff4e4e",
            borderRadius: "10px",
            color: "#fff",
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
            transform: "scale(1.05)"
        }
    }).showToast();
};

// FETCH PRODUCTS
export const Product_Get = () => async (dispatch) => {
    try {
        dispatch({ type: "Product_Get_Loading" });
        const response = await fetch("https://officeproject-backend.onrender.com/get");
        const res = await response.json();
        dispatch({ type: "Product_Get", payload: res.data });
    } catch (error) {
        showToast("Failed to fetch products", "error");
        console.error("Product_Get error:", error);
        dispatch({ type: "Product_Get_Error", payload: error.message });
    }
};

// ADD PRODUCT
export const product_add_action = (data) => async (dispatch) => {
    try {
        const response = await fetch("https://officeproject-backend.onrender.com/add", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const res = await response.json();
        showToast("✅ Product Added Successfully", "success");
        dispatch({ type: "Product_Add", payload: res });
        dispatch(Product_Get());
    } catch (error) {
        showToast("❌ Failed to add product", "error");
        console.error("Add error:", error);
    }
};

// DELETE PRODUCT
export const Product_del = (id) => async (dispatch) => {
    try {
        const response = await fetch(`https://officeproject-backend.onrender.com/del/${id}`, {
            method: "DELETE"
        });

        const res = await response.json();
        showToast("🗑️ Product Deleted", "success");
        dispatch(Product_Get());
        dispatch({ type: "PRODUCT_DELETE", payload: id });
    } catch (error) {
        showToast("❌ Failed to delete product", "error");
        console.error("Delete error:", error);
    }
};

// EDIT GET PRODUCT
export const Product_edite_get = (id) => async (dispatch) => {
    try {
        const response = await fetch(`https://officeproject-backend.onrender.com/edite-get/${id}`);
        const res = await response.json();

        dispatch({ type: "Product_Edite_get", payload: res })
        // dispatch(Product_Get())
    } catch (error) {
        showToast("❌ Failed to get product for edit", "error");
        console.error("Edit get error:", error);
    }
};

// EDIT PRODUCT
export const product_edite_action = (id, productData) => async (dispatch) => {
    try {
        const response = await fetch(`https://officeproject-backend.onrender.com/edite/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        });

        const res = await response.json();
        showToast("✏️ Product Updated", "success");
        dispatch(Product_Get());
        dispatch({
            type: "PRODUCT_EDIT_SUCCESS",
            payload: res
        });

        return res;
    } catch (error) {
        showToast("❌ Failed to update product", "error");
        console.error("Edit error:", error);
        dispatch({
            type: "PRODUCT_EDIT_ERROR",
            payload: error.message
        });
        throw error;
    }
};

export const SingleProduct_Action = (id) => async (dispatch) => {
    try {
        const response = await fetch(`https://officeproject-backend.onrender.com/SinglePage/${id}`);
        const data = await response.json(); // ✔️ direct json data मिलेगा (product object)

        dispatch({ type: "Single_Product", payload: data }); // ✔️ यहां res.data मत लिखो
    } catch (error) {
        console.error("SingleProduct error:", error);
    }
};

export const Product_Action = (id) => async (dispatch) => {
    try {
        const response = await fetch(`https://officeproject-backend.onrender.com/product/${id}`);
        const data = await response.json(); // ✔️ direct json data मिलेगा (product object)

        dispatch({ type: "Product", payload: data }); // ✔️ यहां res.data मत लिखो
    } catch (error) {
        console.error("Product error:", error);
    }
}

export const All_Product = async () => {
    try {
        const response = await fetch(`https://officeproject-backend.onrender.com/product/${id}`);
        const data = await response.json()

        dispatch({ type: "Product", payload: data });
    } catch (error) {
        console.error("Product error:", error);
    }
}


export const Product_category = (category) => async (dispatch) => {
    console.log(category);
    const response = await fetch(`https://officeproject-backend.onrender.com/category/${category}`, {
        method: "GET",
    });

    const data = await response.json();
    console.log(data);

    dispatch({ type: "Product_category", payload: data });
}
