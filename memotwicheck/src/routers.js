import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import TestMain  from './pages/TestMain';
import MainListPage from './pages/MainListPage';
import TaggedSearchPage from './pages/TaggedSearchPage';
import  ReplyThreadPage  from './pages/ReplyThreadPage';

const PageRouter=(props)=>{

    return (

        <div>
            <Router >
                <Route exact path='/'  > <MainListPage/> </Route>
                <Route exact path='/tag'  > <TaggedSearchPage/> </Route>
                <Route exact path='/test'  > <TestMain/> </Route>
                <Route exact path='/reply/:id'  component={ReplyThreadPage}  />

            </Router>

        </div>
    )

}

export default PageRouter;