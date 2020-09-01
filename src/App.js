import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout/Layout';

import EditTodo from './containers/EditTodo/EditTodo';
import AddTodo from './containers/AddTodo/AddTodo';
import TodoList from './containers/TodoList/TodoList';

class App extends Component {

  render() {

    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/edit-todo/:id" component={EditTodo} />
                    <Route path="/add-todo" component={AddTodo} />
                    <Route path="/" component={TodoList} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
  }
}

export default App;
