import React, {useState,useEffect} from 'react';
import {useDispatch}  from 'react-redux';
import MainHeader from "../components/MainHeader";
import MemoList from "../components/MemoList";
import MemoInsertButton from "../components/MemoInsertButton";
import MemoMakeModal from '../components/MemoMakeModal';
import PasswordModal from '../components/PasswordModal';
import LogOutModal from '../components/LogOutModal';

import  {auth_login_success} from '../actions';

//テスト表示用


//メインページの画面メイン
const MainListPage=(props)=>{

    const dispatch=useDispatch();
    const [logout,setLogOut]=useState(false)

    //ログアウトの画面を開くことはグローバルな状態として持ちたくないので
    //あえてバケツリレーにして、Headerから直でたたくようにしておく
    const openLogOut=(props)=>{
        setLogOut(!logout);

    }
    
    useEffect(() => {
        dispatch(auth_login_success());
        
    }, [])


    return (
        <div>
            <MainHeader openLogout={openLogOut}/>
            {/* テストデータがないと表示できない */}
            <MemoList  />
            <MemoInsertButton/>
            
            <MemoMakeModal />

            <PasswordModal />
            
            <LogOutModal open={logout} onClose={openLogOut} />

        </div>
        


    )

}

export default  MainListPage;