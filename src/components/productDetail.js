import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import { connect } from 'react-redux'
import {addToCart} from './../1.actions'
import swal from 'sweetalert'
import cookie from 'universal-cookie'

const objCookie=new cookie()
class ProductDetail extends React.Component{
    state = {product : {}}
    componentDidMount(){
        this.getDataApi()
    }
    getDataApi = () => {
        var idUrl = this.props.match.params.terserah
        Axios.get(urlApi+'/products/' + idUrl)
        .then((res) => {
            this.setState({product : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    qtyValidation =() => {
        var qty = this.refs.inputQty.value
        if(qty < 1) {
            this.refs.inputQty.value = 1
        }
    }
    addToCart=()=>{
        var iduser=this.props.iduser
        var nama = this.state.product.nama
        var harga=parseInt(this.state.product.harga)  
        if(this.state.product.discount > 0){
           var harga=parseInt(this.state.product.harga -(this.state.product.harga*this.state.product.discount/100)) 
        }
        var img=this.state.product.img
        var qty=parseInt(this.refs.inputQty.value)
        var newData={iduser:iduser,nama:nama,harga:harga,img:img,qty:qty}
        this.props.addToCart(newData)
        // Axios.get(urlApi+'/cart?iduser='+iduser+'&nama='+nama)
        // .then((res)=>{
        //     console.log(res)
        //     if(res.data.length>0){
        //         newData.qty=res.data[0].qty + newData.qty
        //         Axios.put(urlApi+'/cart/'+res.data[0].id,newData)
        //         .then((res)=>{
        //             console.log(res)
        //             swal({title: "Add to Cart!",
        //             text: "Add to Cart Success",
        //             icon: "success",
        //             button: "OK"})
        //             objCookie.set('userDataCart',iduser,{path:'/'})
        //         })
        //         .catch((err)=>{
        //             console.log(err)
        //         })
        //     }else{
        //         Axios.post('http://localhost:2000/cart',newData)
        //         .then((res)=>{
        //             console.log(res)
        //             swal({title: "Add to Cart!",
        //             text: "Add to Cart Success",
        //             icon: "success",
        //             button: "OK"})
        //             objCookie.set('userDataCart',iduser,{path:'/'})
        //         })
        //         .catch((err)=>{
        //             console.log(err)
        //         })
        //     }
        //     //cookie
        //     objCookie.set('userDataCart',iduser,{path:'/'})
        // })
        // .catch((err)=>{
        //     console.log(err)
        // })
    }
     render(){
        var {nama,img,discount,deskripsi,harga} = this.state.product
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                    <div className="card" style={{width: '100%'}}>
                        <img className="card-img-top" src={img} alt="Card image cap" />
                        <div className="card-body">
                        </div>
                    </div>
                    </div>

                    <div className='col-md-8'>
                        <h1 style={{color:'#4C4C4C'}}>{nama}</h1>
                        <div style={{backgroundColor:'#D50000',
                                     width:"50px",
                                     height:'22px',
                                     color : 'white',
                                     textAlign:'center',
                                     display:'inline-block'}} >
                            {discount}%
                        </div>
                        <span style={{fontSize:'12px',
                                      fontWeight:'600',
                                      color:'#606060',
                                      marginLeft:'10px',
                                      textDecoration:'line-through'}}> Rp. {harga} </span>

                        <div style={{fontSize:'24px',
                                     fontWeight : '700',
                                     color:'#FF5722',
                                     marginTop:'20px'}}>Rp. {harga - (harga * (discount/100))}</div>

                        <div className='row'>
                            <div className='col-md-2'>
                                <div style={{marginTop:'15px',
                                        color:'#606060',
                                        fontWeight:'700',
                                        fontSize:'14px'}}>Jumlah</div>
                                <input type='number' disabled onChange={this.qtyValidation} ref='inputQty' min={1} defaultValue={1} className='form-control' style={{width : '60px',
                                                                                              marginTop:'10px'}} />
                            </div>
                            <div className='col-md-6'>
                                <div style={{marginTop:'15px',
                                            color:'#606060',
                                            fontWeight:'700',
                                            fontSize:'14px'}}>Catatan Untuk Penjual (Opsional)
                                </div>
                                <input type='text' style={{marginTop:'13px'}} placeholder='Contoh Warna Putih, Ukuran XL, Edisi Kedua' className='form-control'/>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-md-8'>
                                <p style={{color:'#606060',fontStyle:'italic'}}>{deskripsi}</p>
                            </div>

                        </div>
                        {this.props.username === "" 
                        ?
                            <div className='row mt-4'>
                                <input type='button' disabled className='btn border-secondary col-md-2' value='Add To Wishlist' />
                                <input type='button' disabled className='btn btn-primary col-md-3' value='Beli Sekarang' />
                                <input type='button' disabled className='btn btn-success col-md-3' value='Masukan Ke Keranjang' />
                            </div>
                        :
                            <div className='row mt-4'>
                                <input type='button' className='btn border-secondary col-md-2' value='Add To Wishlist' />
                                <input type='button' className='btn btn-primary col-md-3' value='Beli Sekarang' />
                                <input type='button' className='btn btn-success col-md-3' value='Masukan Ke Keranjang' onClick={this.addToCart}/>
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username,
        iduser:state.user.id
    }
}

export default connect(mapStateToProps,{addToCart})(ProductDetail);
