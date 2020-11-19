import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import AddGame from './AddGame';
import Games from './Games';

//import ProductList from './ProductList';


export default class Routes extends Component{

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/games' component={Games}/>
                    <Route path='/addgame' component={AddGame}/>
                    <Route path='/' component={Home}/>
                </Switch>
            </BrowserRouter>
        );
    }
}