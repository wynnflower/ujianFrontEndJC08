import { urlApi } from './../support/urlApi'
import Axios from 'axios';
import cookie from 'universal-cookie';
import swal from 'sweetalert'

var objCookie = new cookie()
export const addToCart = (newProduct) => {
return(dispatch) => {
    Axios.get(urlApi+'/cart?iduser=' + newProduct.iduser + '&nama=' + newProduct.nama)
    .then((res)=>{
        console.log(res)
        if(res.data.length > 0){
            var quantity = res.data[0].qty + newProduct.qty
            Axios.put(urlApi+'/cart/'+ res.data[0].id,{...newProduct,qty:quantity})
            .then((res)=>{
                
                Axios.get(urlApi + '/cart?iduser=' + newProduct.iduser)
                .then((res)=>{
                    
                    if(res.data.length >0){
                        swal({title: "Add to Cart!",
                    text: "Add to Cart Success",
                    icon: "success",
                    button: "OK"})
                        dispatch({
                            type :"CART_SAVE",
                            payload : res.data
                        })
                    }
                })
                .catch((err)=>console.log(err))
                objCookie.set('userDataCart',newProduct.iduser,{path:'/'})
            })
            .catch((err)=>{
                console.log(err)
            })
        } else {
            Axios.post(urlApi + '/cart',newProduct)
            .then((res)=>{
                Axios.get(urlApi + '/cart?iduser=' +newProduct.iduser)
                .then((res)=>{
                    if(res.data.length >0){
                        swal({title: "Add to Cart!",
                            text: "Add to Cart Success",
                            icon: "success",
                            button: "OK"})
                        dispatch({
                            type :"CART_SAVE",
                            payload : res.data
                        })
                    }
                })
                .catch((err)=>console.log(err))
                objCookie.set('userDataCart',newProduct.iduser,{path:'/'})
            })
            .catch((err)=>console.log(err))
        }
    })
    .catch((err)=>console.log(err))
    }
}

export const keepCart = (iduser) => {
    return(dispatch) => {
        Axios.get(urlApi + '/cart?iduser=' +iduser)
        .then((res)=>{
            dispatch({
                type : "CART_SAVE",
                payload : res.data
            })
        })
        .catch((err)=>console.log(err))
    }
}

export const countLength=(cart)=>{
    return {
        type:"ADD_CART",
        payload:cart
    }
}
export const emptyCart=()=>{
    return {
        type:"EMPTY_CART",

    }
}

export const deleteCart = (idcart,iduser) => {
    return(dispatch) => {
        Axios.get(urlApi+'/cart?iduser=' + iduser)//id user
        .then((res)=>{
            Axios.delete(urlApi+'/cart/'+idcart)
            .then((res)=>{
                console.log(res)
                // this.setState({rows:res.data})
                Axios.get(urlApi + '/cart?iduser=' +iduser) // iduser
                .then((res)=>{
                        swal({title: "Delete Cart!",
                            text: "Delete Cart Success",
                            icon: "success",
                            button: "OK"})
                        dispatch({
                            type :"CART_SAVE",
                            payload : res.data
                        })
                        
                })
                .catch((err)=>console.log(err))
                
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>console.log(err))
        }
    }