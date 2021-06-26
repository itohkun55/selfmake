import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch}  from 'react-redux';
import { Link } from 'react-router-dom';
import  {useWindowDimensions} from '../lib/useWindowDimensions';
import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import  ButtonGroup  from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {OPEN_PASSWORD}  from '../lib/ActionTypeString';
import SearchForm from './SearchForm';


//メモ単画像表示

//現在ログインしているユーザの名前を表示する
//ログインしているユーザーがいなければ施設の名前を表示する

//機能メニューを表示する

const mainheaderStyle = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    loginButtonBefore:{
      animation: "$flash 4s linear infinite",
      background:'gray'


    },
    vbb:{
      background: 'gold',
      borderRadius: 10,
      border: 0,
      color: 'black',
      height: 36,
      padding: '0px 10px',
      spacing:"5px",
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    
    
    vba:{
      background: 'beige',
      borderRadius: 10,
      border: "2px",
      color: 'black',
      height: 36,
      padding: '0px 10px',
      spacing:"5px",
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },


    '@keyframes flash':{
      '0%': {opacity:1},
      '100%': {opacity:1},
      '50%':{ opacity:0.5}
    },
    logOutButton:{
      background:'gray'
    },
    

  }));
  

const MainHeader=(props)=>{
    const classes = mainheaderStyle();
    const login_id = useSelector(state => state.user_login.login_id);
    const [search,showSearch]=useState(false);
    const [searchTarget,setSearchTarget]=useState(null);
  
    const [isMain,setIsMain]=useState(true);

    const [user_name,setUserName]=useState("未設定");
    const user_list=useSelector(state=>state.auth_login.user_list);
    const dispatch=useDispatch();



    const openLogin=()=>{
       dispatch({type:OPEN_PASSWORD});
    };

    const openSearch=()=>{
      showSearch(!search);
    };

    const setSearchMethod=()=>{
      

    }



    useEffect(() => {
      if( user_list.length!==0) {
        const ans=user_list.find(el=>el.id===login_id);
        setUserName(ans.name);
      }
    }, [user_list,login_id]);

    useEffect(()=>{


    },[isMain]);



    

    const { width, height } = useWindowDimensions();
    //今はサイズは適当
    //if (width>500){
        return (
            <div className={classes.root}  >
              <AppBar position="fixed"  ref={(base=>setSearchTarget(base))} >
                <Toolbar>
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon  />
                  </IconButton>
                  <Link to="/"  ><div className={ isMain ?  classes.vbb : classes.vba} disabled={isMain} ><h3>一覧</h3></div></Link>
                  <Link to="tag" ><div  className={ isMain ? classes.vba : classes.vbb} disabled={!isMain}><h5>タグ</h5></div></Link>

                  <IconButton onClick={()=>openSearch()}  ><SearchIcon/></IconButton>
                  {login_id===-1 ? 
                   <Button color="inherit"  className={classes.loginButtonBefore} onClick={()=>dispatch({type:OPEN_PASSWORD})} ><div> Login</div></Button> 
                  :
                    <Button color="inherit"  className={classes.logOutButton}  onClick={()=>props.openLogout()} ><div> LogOut</div></Button>  
                  }
                </Toolbar>
              </AppBar>
              <SearchForm open={search} anchor={searchTarget}/>
            </div>
          );

    //}

}

export default MainHeader;