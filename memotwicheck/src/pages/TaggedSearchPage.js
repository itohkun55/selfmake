import React, {useState,useEffect} from 'react';
import {useSelector,useDispatch}  from 'react-redux';
import MainHeader from "../components/MainHeader";
import TagSearchList from "../components/TagSearchList";
import MemoInsertButton from "../components/MemoInsertButton";
import MemoMakeModal from '../components/MemoMakeModal';
import PasswordModal from '../components/PasswordModal';
import LogOutModal from '../components/LogOutModal';
import {tag_start} from '../actions';
import  {LOAD_NEW_MEMO} from '../lib/ActionTypeString';

//テスト表示用


//メインページの画面メイン
const TaggedSearchPage=(props)=>{

    const dispatch=useDispatch();
    const [logout,setLogOut]=useState(false)

    //ログアウトの画面を開くことはグローバルな状態として持ちたくないので
    //あえてバケツリレーにして、Headerから直でたたくようにしておく
    const openLogOut=(props)=>{
        setLogOut(!logout);

    }
    
    useEffect(() => {
        
        dispatch(tag_start());
        
        

    }, []);


    return (
        <div>
            <MainHeader openLogout={openLogOut}/>
            {/* テストデータがないと表示できない */}
            <TagSearchList/>
            <MemoInsertButton/>
            
            <MemoMakeModal />

            <PasswordModal />
            
            <LogOutModal open={logout} onClose={openLogOut} />

        </div>
        


    )

}

export default  TaggedSearchPage;