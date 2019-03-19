import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Product from './components/productList'
import ManageProduct from './components/admin/manageProduct'
import PageNotFound from './components/pageNotFound'
import ProductDetail from './components/productDetail'
import ScrollToTop from './components/scrollToTop'
import History from './components/history'
import HistoryDetail from './components/historydetail'
import Cart from './components/cart'
import { Route ,withRouter, Switch } from 'react-router-dom' 
import {connect} from 'react-redux'
import cookie from 'universal-cookie'
import { keepLogin } from './1.actions'
import { keepCart } from './1.actions'
import {cookieChecked} from './1.actions'
import { countLength } from './1.actions'
import './App.css';

// withRouter => Untuk tersambung ke Reducer dengan connect, 
// tapi di dalam komponen ada routing

const objCookie = new cookie()
class App extends Component {
  componentDidMount(){
    var terserah = objCookie.get('userData')
    if(terserah !== undefined){
      this.props.keepLogin(terserah)
    } else{
      this.props.cookieChecked()
    }
    var idcart = objCookie.get('userDataCart')
    if(idcart !== undefined){
      this.props.keepCart(idcart)
      
    } else{
      this.props.cookieChecked()
    }
  }
  
  render() {
    if (this.props.cookie){
      return (
        <div>
            <Navbar/>
            <ScrollToTop>
              <Switch>
                  <Route path='/' component={Home} exact/>
                  <Route path='/login' component={Login} exact/>
                  <Route path='/register' component={Register} exact/>
                  <Route path='/product' component={Product} exact/>
                  <Route path='/manage' component={ManageProduct} exact/>
                  <Route path='/cart' component={Cart} exact/>
                  <Route path='/history' component={History} exact/>
                  <Route path='/historydetail/:id' component={HistoryDetail} exact/>
                  <Route path='/product-detail/:terserah' component={ProductDetail} exact/>
                  <Route path='*' component={PageNotFound} exact/>
              </Switch>
            </ScrollToTop>
        </div>
      );
    } else{
      return(<div>Loading...</div>)
    }
    
  }
}

const mapStateToProps =(state)=>{ 
  return {
      cookie: state.user.cookie,
      id:state.user.id
  }
}

export default withRouter(connect(mapStateToProps , {keepLogin,keepCart,cookieChecked,countLength})(App));
