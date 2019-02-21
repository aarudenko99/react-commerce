import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import baseStyles from './base-styles'
import PrivateRoute from '../private-route'
import Header from '../layout/header'
import Content from '../layout/styled-components/content'
import Login from '../views/login/login'
import Home from '../views/home/home'
import Post from '../views/post/post'

const Root = ({store, auth: auth}) => {    
    baseStyles();
    return (<Provider store={store}>
        <Router>
            <Content>
                {
                    auth.logged && <Header/>
                }
                <Fragment>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <PrivateRoute path="/post" component={Post}/>
                        <PrivateRoute path="/" component={Home}/>
                    </Switch>
                </Fragment>
            </Content>
        </Router>
    </Provider>)
};

Root.propTypes = {
    store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Root)