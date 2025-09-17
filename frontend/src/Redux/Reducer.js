


const initialstate ={
    Product:[]
}
export const Product_Get_reducer = (state=initialstate,action) =>{
    switch(action.type){
        case "Product_Get":
            return {...state,Product:action.payload}
        default:
            return state
    } 
}

const edite_initialstate ={
    edite_data:[]
}
export const Product_Edite_get_reducer = (state=edite_initialstate,action) =>{
    switch(action.type){
        case "Product_Edite_get":   
            return {...state,
                edite_data:action.payload 
             }
        default:
            return state
    }}