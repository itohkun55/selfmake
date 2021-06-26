import React from 'react';

// import TestHooks  from './TestHooks';
// import TestMemoInsertButton  from './TestMemoInsertButton';
// import TestMakeMemoModal  from './TestMemoMakeModal';
// import TestMemoDeleteModal  from './TestMemoDeleteModal';
// import {TestMemoColumn} from './TestMemoColumn';
// import {TestMainHeader} from './TestMainHeader';
//import TestPasswordModal from '../test/TestPasswordModal';
//import TestLogoutModal from '../test/TestLogoutModal';
//import TestSearchForm from '../test/TestSearchForm';
import TestMemoThread from '../test/TestMemoThread';
// import TestFollowColumn from './TestFollowColumn';
// import TestFollowList from './TestFollowList';
// import {TestMemoList} from './TestMemoList';
// import TestAuthAction  from './TestAuthAction';
//import { TestTagSearchPanel } from '../test/TestTagSearcPanel';
import { TestTagSearchList } from '../test/TestTagSearcList';
import TestReplyColumnList from '../test/TestReplyColumnList';


const TestMain=(props)=>{

    return (
        <div>
            <h1>Test Main</h1>
            {/* <TestAuthAction/> 
             <TestMemoInsertButton/>
            <TestMakeMemoModal/>
             
            <TestPasswordModal/>
            <TestMemoColumn/>
            <TestMemoDeleteModal/>
            <TestMemoList/>
            <TestTagSearchPanel/>
            <TestTagSearchList/>*/}
            <TestReplyColumnList/>
            {/*<TestSearchForm/>
            <TestMainHeader/> 
            <TestFollowColumn/>
            <TestFollowList/>*/}
        </div>
    )


}

export default TestMain;
