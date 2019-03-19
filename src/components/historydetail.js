import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { urlApi } from '../support/urlApi';
import swal from 'sweetalert'

class Cart extends React.Component{
    state={cart:[],totalHarga:0}
    componentDidMount(){
        this.getDataApi()
    }
    componentWillReceiveProps(){
        this.getDataApi()
    }
    getDataApi=()=>{
        var idUrl = this.props.match.params.id
        Axios.get(urlApi+'/history/' + idUrl)
        .then((res)=>{
            console.log(res)
            this.setState({cart:res.data.item})
        })
        .catch((err)=>{
            console.log(err)
        })

    }
    
    renderCart=()=>{
        var jsx=this.state.cart.map((val)=>{
                return(
                    <tr>
                        <td>{val.nama}</td>
                        <td>{val.harga}</td>
                        <td>{val.qty}</td>
                        <td>{val.harga * val.qty}</td>
                    </tr>
                ) 
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
    render(){
        if(this.props.nama!==""){
            return(
                <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Produk</th>
                                    <th scope="col">Harga</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3" style={{textAlign:'right',fontSize:'16px',fontWeight:'700'}}>Total Harga</td>
                                    <td>{this.getTotal()}</td>
                                </tr>
                            </tfoot>
                        </table>
                        <Link to="/history">
                        <input type="button" className="btn btn-primary" value="Close"></input>
                        </Link>
                        
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