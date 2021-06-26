import React, {useState,useEffect} from 'react';
import {connect,useSelector,useDispatch}  from 'react-redux';
import MainHeader from "../components/MainHeader";
import { LinearProgress, makeStyles } from '@material-ui/core';
import MemoList from "../components/MemoList";
import MemoInsertButton from "../components/MemoInsertButton";
import {TestMemoList} from '../test/TestMemoList';
import MemoMakeModal from '../components/MemoMakeModal';
import PasswordModal from '../components/PasswordModal';
import LogOutModal from '../components/LogOutModal';
import  {LOAD_NEW_MEMO} from '../lib/ActionTypeString';

import  {getReplyData} from '../actions';
import ReplyColumnList  from '../components/ReplyColumnList'
import ReplyColumn from '../components/ReplyColumns';
import { CallMissedSharp } from '@material-ui/icons';

//テスト表示用


const listStyles=makeStyles((theme)=>({
    base: {
        position:'relative',
        top:'60px'
    },

    progress:{
        width: '80%',
        margin: '2px',
    }

}));

//メインページの画面メイン
const ReplyThreadPage=(props)=>{
    const reply_main=useSelector(state=>state.reply_main);
    console.log("reply_main",reply_main);
    const dispatch=useDispatch();

    const classes=listStyles();
    
    useEffect(() => {
        dispatch(getReplyData(props.match.params.id));
        
    }, []);

    useEffect(() => {
        console.log("reply_main",reply_main);
        
    }, [reply_main]);

    const normalSceane=()=>{
        return (
            <div >
                <MainHeader openLogout={()=>{}}/>
                <div className={classes.base}>
    
                {reply_main.past_thread.length!==0 ?
                　　<div><div> 過去の履歴 <div/> <ReplyColumnList   data={ reply_main.past_thread } boxstyle={"thread"} mark={"a"} /></div></div> 
                    :
                     <div/> 
                }
    
                {Object.keys(reply_main.parent_data).length!==0 ? 
                     <div><div> 直近の応答</div><ReplyColumn  data={ reply_main.parent_data } mark={"b"}/></div> 
                :
                     <div/> 
                }
                <div>
                    <ReplyColumn data={reply_main.self_data }  mark={"e"} />
                </div>
                {reply_main.child_data.length!==0 ?　　<div><div> 関連する応答 <div/> <ReplyColumnList   data={ reply_main.child_data } boxstyle={"thread"} mark={"c"}/></div></div> : <div/> }
                {reply_main.future_thread.length!==0 ?　　<div><div> その後の履歴 <div/> <ReplyColumnList   data={ reply_main.future_thread } boxstyle={"thread"}  mark={"d"} /></div></div> : <div/> }
            
            </div>
            </div>
    
    
        )
    }

    return (
        reply_main.load_flg ? normalSceane() :<LinearProgress/> 

    )




}

export default  ReplyThreadPage;