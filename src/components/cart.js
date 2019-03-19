import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import { urlApi } from '../support/urlApi';
import { countLength } from './../1.actions'
import {deleteCart,emptyCart} from './../1.actions'
import swal from 'sweetalert'
import cookie from 'universal-cookie'

const objCookie = new cookie()
class Cart extends React.Component{
    state={cart:[],editItem:{},totalHarga:0}
    componentDidMount(){
        //var cookie = objCookie.get('userDataCart')
        this.getDataApi()
        //this.getDataApi()
        //alert('DidMount')
    }
    componentWillReceiveProps(){
        //this.getDataApi(cookie)
        //this.props.countLength(this.state.cart)
        this.getDataApi()

        
    }
    getDataApi=()=>{
        var id=this.props.id
        //alert(cart.length)
        Axios.get(urlApi+'/cart?iduser='+id)
        .then((res)=>{
            console.log(res)
            this.setState({cart:res.data})  
        })
        .catch((err)=>{
            console.log(err)
        })
        //alert(this.state.cart.length)
    }
    getDataHistory=()=>{
        var allCart=this.state.cart
        var jmlitem=this.state.cart.length
        var iduser=this.props.id
        var tglbeli=new Date()
        var totalharga=this.getTotal()
        var dd = tglbeli.getDate();
        var mm = tglbeli.getMonth() + 1;

        var yyyy = tglbeli.getFullYear();

        var h = tglbeli.getHours();
        var m = tglbeli.getMinutes();
        var s = tglbeli.getSeconds();
        
        if (dd < 10) {
        dd = '0' + dd;
        } 
        if (mm < 10) {
        mm = '0' + mm;
        } 
        var tglbeli = dd + '/' + mm + '/' + yyyy;
        
        var jambeli= h + ' : '+m +' : '+ s
        var item=[]

        console.log(allCart[0])
            for(var i=0;i<allCart.length;i++){
                item.push(allCart[i])
                this.props.deleteCart(allCart[i].id)
                // Axios.delete(urlApi+'/cart/'+allCart[i].id)
                // .then((res)=>{
                //     console.log(res) 
                //     swal({title: "Checkout!",
                //     text: "Checkout Success",
                //     icon: "success",
                //     button: "OK"})
                //     this.setState({cart:[]})
                // })
                // .catch((err)=>{
                //     console.log(err)
                // })
            }
        //this.props.emptyCart()
        this.setState({cart:[]})
        var newHistory={iduser:iduser,tglbeli:tglbeli,jambeli:jambeli,item:item,totalharga:totalharga,jmlitem:jmlitem}
        Axios.post(urlApi+'/history',newHistory)
        .then((res)=>{
            console.log(res) 
            swal({title: "Checkout!",
            text: "Checkout Success",
            icon: "success",
            button: "OK"})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    onCartDelete=(id)=>{
        // Axios.delete(urlApi+'/cart/'+id)
        // .then((res)=>{
        //   console.log(res)
        //   swal({title: "Delete Cart!",
        //         text: "Delete Item di Cart Success",
        //         icon: "success",
        //         button: "OK"})
        //   // this.setState({rows:res.data})
        //   this.getDataApi()
        // })
        // .catch((err)=>{
        //     console.log(err)
        // })
        Axios.get(urlApi+'/cart/'+id)
        .then((res)=>{
            this.props.deleteCart(id)
            
        })
        .catch((err)=>{
            console.log(err)
        })
        this.getDataApi()
        
    }
    onAdd=(val)=>{
        var nambah = val
        nambah.qty = nambah.qty+1
        this.setState({editItem:nambah})
        var newData={nama:nambah.nama,iduser:this.props.id,harga:nambah.harga,qty:nambah.qty,img:nambah.img}
        Axios.put(urlApi+'/cart/'+nambah.id,newData)
        .then((res)=>{
            console.log(res)
            this.getDataApi()
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    onSubtract=(val)=>{
        var ngurang = val
        ngurang.qty = ngurang.qty-1
        this.setState({editItem:ngurang})
        var newData={nama:ngurang.nama,iduser:this.props.id,harga:ngurang.harga,qty:ngurang.qty,img:ngurang.img}
        Axios.put(urlApi+'/cart/'+ngurang.id,newData)
        .then((res)=>{
            console.log(res)
            this.getDataApi()
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    renderCart=()=>{
        // alert('render Cart')
        var jsx=this.state.cart.map((val)=>{
            if (this.props.nama!==""){
                return(
                    <tr>
                        <th style={{textAlign:'center'}}><img src={val.img} width="200" height="100"/></th>
                        <td>{val.nama}</td>
                        <td>{val.harga}</td>
                        <td><button className="btn btn-primary" onClick={()=>{this.onSubtract(val)}}><i class="fas fa-minus"></i></button></td>
                            
                            <td>{val.qty}</td>
                            <td><button className="btn btn-primary" onClick={()=>{this.onAdd(val)}}><i class="fas fa-plus"></i></button></td>
                            <td>{val.harga * val.qty}</td>
                        <td><input type="button" className="btn btn-primary" value="Delete" onClick={()=>{this.onCartDelete(val.id)}}/></td>
                    </tr>
                ) 
            }
            
        })
        return jsx
    }
    getTotal=()=>{
        var total=0
        for(var i=0;i<this.state.cart.length;i++){
            total=total+(this.state.cart[i].qty*this.state.cart[i].harga)
        }
        
        return total
    }
    onCheckout=()=>{

    }
    render(){
        if(this.props.nama!==""){
            return(
                <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Produk</th>
                                    <th scope="col">Harga</th>
                                    <th></th>
                                    <th scope="col">Qty</th>
                                    <th></th>
                                    <th scope="col">Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="6" style={{textAlign:'right',fontSize:'16px',fontWeight:'700'}}>Total Harga</td>
                                    <td>{this.getTotal()}</td>
                                    <td><button className="btn btn-primary" onClick={this.getDataHistory}>Checkout</button></td>
                                </tr>
                            </tfoot>
                        </table>
                        
                </div>
            ) 
        } 
    }
}
const mapStateToProps =(state)=>{ 
    return {
        nama: state.user.username,
        id:state.user.id
        //cart:state.cart.cart
    }
}
export default connect(mapStateToProps,{countLength,deleteCart,emptyCart})(Cart)