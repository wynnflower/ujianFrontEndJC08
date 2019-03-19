import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom'
import { urlApi } from '../support/urlApi';
import PageNotFound from './pageNotFound';
//import swal from 'sweetalert'

class History extends React.Component{
    state={history:[],id:0}
    componentDidMount(){
        this.getDataApi()
    }
    getDataApi=()=>{
        var id=this.props.id
        Axios.get(urlApi+'/history?iduser='+id)
        .then((res)=>{
            console.log(res.data)
            this.setState({history:res.data,id:id})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    renderHistory=()=>{
        var jsx=this.state.history.map((val)=>{
                return(
                    <tr>
                        <td>{val.id}</td>
                        <td>{val.tglbeli}</td>
                        <td>{val.jambeli}</td>
                        <td>{val.jmlitem}</td>
                        <td>{val.totalharga}</td>
                        <td><Link to={"historydetail/"+val.id}><input type="button" className="btn btn-primary" value="Lihat Detail"/></Link></td>
                        {/* //History Detail > localhost:2000/history?id=val.id */}
                    </tr>
                ) 
        })
        return jsx
    }
    render(){
        if(this.props.nama!==""){
            return(
                <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID History</th>
                                    <th scope="col">Tanggal</th>
                                    <th scope="col">Waktu</th>
                                    <th scope="col">Jumlah Item</th>
                                    <th scope="col">Total Harga</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.renderHistory()}
                            </tbody>
                        </table>
                        
                </div>
            ) 
        } else{
            return(<PageNotFound/>)
        }
        
    }
}
const mapStateToProps =(state)=>{ 
    return {
        nama: state.user.username,
        id:state.user.id
    }
}
export default connect(mapStateToProps)(History)