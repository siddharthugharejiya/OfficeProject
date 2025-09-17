

export const Product_Get = () => async (dispatch) => {
    await fetch("http://localhost:9595/get")
        .then((res) => res.json())
        .then((res) => dispatch({ type: "Product_Get", payload: res.data }))
}

export const product_add_action = (data) => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:9595/add", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const res = await response.json();

        alert("Product Added Successfully");

        dispatch({ type: "Product_Add", payload: res });
    } catch (error) {
        console.error("Error adding product:", error);
        alert("Something went wrong while adding the product");
    }
}

export const Product_del = async (el) => {
    await fetch(`http://localhost:9595/del/${el}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then(() => alert("Product Deleted Successfully"))
}

export const Product_edite_get = (el) => async (dispatch) => {
    await fetch(`http://localhost:9595/edite-get/${el}`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);

            dispatch(
                {
                    type: "Product_Edite_get",
                    payload: res
                }
            )
        })
}

// In your action file
export const product_edite_action = (id, productData) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:9595/edite/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        });

        const res = await response.json();
        console.log("Edit response:", res);

        dispatch({
            type: "PRODUCT_EDIT_SUCCESS",
            payload: res
        });

        return res;
    } catch (error) {
        console.error("Edit error:", error);
        dispatch({
            type: "PRODUCT_EDIT_ERROR",
            payload: error.message
        });
        throw error;
    }
}