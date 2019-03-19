import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import { urlApi } from '../support/urlApi';
import { AddCart } from './../1.actions'
import swal from 'sweetalert'

class Cart extends React.Component{
    state={cart:[],username:"",editItem:{},totalHarga:0}
    componentDidMount(){
        this.getDataApi()
    }
    componentWillReceiveProps(){
        this.getDataApi()
    }
    getDataApi=()=>{
        var nama=this.props.nama
        Axios.get(urlApi+'/cart?username='+nama)
        .then((res)=>{
            console.log(res)
            this.setState({cart:res.data,username:nama})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    getDataHistory=()=>{
        var allCart=this.state.cart
        var username=this.props.nama
        var tglbeli=new Date()
        var item=[]
        console.log(allCart[0])
            for(var i=0;i<allCart.length;i++){
                item.push(allCart[i])
                Axios.delete(urlApi+'/cart/'+allCart[i].id)
                .then((res)=>{
                    console.log(res) 
                    swal({title: "Checkout!",
                    text: "Checkout Success",
                    icon: "success",
                    button: "OK"})
                    this.setState({cart:[]})
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        var newHistory={username:username,tglbeli:tglbeli,item:item}
        Axios.post(urlApi+'/history',newHistory)
        .then((res)=>{
            console.log(res) 
            swal({title: "Add History!",
            text: "Add History Success",
            icon: "success",
            button: "OK"})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    onCartDelete=(id)=>{
        Axios.delete(urlApi+'/cart/'+id)
        .then((res)=>{
          console.log(res)
          swal({title: "Delete Cart!",
                text: "Delete Item di Cart Success",
                icon: "success",
                button: "OK"})
          // this.setState({rows:res.data})
          this.getDataApi()
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    onAdd=(val)=>{
        var nambah = val
        nambah.qty = nambah.qty+1
        this.setState({editItem:nambah})
        var newData={nama:nambah.nama,username:this.props.nama,harga:nambah.harga,qty:nambah.qty,img:nambah.img}
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
        var newData={nama:ngurang.nama,username:this.props.nama,harga:ngurang.harga,qty:ngurang.qty,img:ngurang.img}
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
        return(
            <div>
                {total}
            </div>
        )
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
    }
}
export default connect(mapStateToProps)(Cart)