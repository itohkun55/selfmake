//各メモの表示を行う


//初期状態メモヘッダーのみ表示

//ヘッダーから開閉イベントを受けたら詳細をアニメーションで展開する

import React ,{useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {Collapse,IconButton,Box}  from '@material-ui/core';

import ExpandMoreIcon  from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CheckBoxOutlineBlankTwoToneIcon from '@material-ui/icons/CheckBoxOutlineBlankTwoTone';
import CheckBoxTwoToneIcon from '@material-ui/icons/CheckBoxTwoTone';


import ReplyTwoToneIcon from '@material-ui/icons/ReplyTwoTone';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

//重要
import StarBorderTwoToneIcon from '@material-ui/icons/StarBorderTwoTone';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';


import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({

    memo:{            
        width: '90%',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1, 2, 0),
        border: '1px solid #000',
      },

      
      ulbutton:{
        display:"flex",
        listStyle:"none",
        align:"flex-end",  
    },
    menuButton:{
        spacing:'10px',
    },



    icons:{
        justifyContent: "flex-end",
        
    },

    headertext:{
        justifyContent: "flex-start",
        
    },

    libutton:{
        margin:10
    },

    textarea:{
       // width:"100%",
       // height:100
    }

  }));



const MemoColumn=({data})=>{
    //console.log(props);
    const TEXT_LIMIT=40;

    
    const setHeaderText=(txt)=>{
        return txt.substring(0,TEXT_LIMIT)+"....";
    };
    const classes=useStyles();
    const [maintext,setMainText] =useState(setHeaderText(data.detailText));
    const [isLong,setIsLong]=useState(false);
    const [isRedirect,setIsRedirect]=useState(false);

    const [expanded ,setExpanded]=useState(false);
    const [hasStar, setHasStar] = useState(data.hasStar);
    const [read, setRead] = useState(data.read);

    useEffect(()=>{
        if( data.detailText.length>TEXT_LIMIT ) setIsLong(true);
        
    });


    /*
        開く機能とRelpyへのジャンプのルール
　　
        縮めないもの→クリックでReplyにリダイレクト

        縮めるもの　→　クリックで開く　→　さらにクリックでリダイレクト
        　　開くと閉じるボタンがONになるため、それをクリックで閉じる
    */

    const onExpanded=()=>{
        if(!expanded){
            setMainText(data.detailText);
        }else{
            setMainText(setHeaderText(data.detailText) );
        }

        setExpanded(!expanded);

    };

    const onRedirect=()=>{
        if ( isLong && !expanded ){
            setMainText(data.detailText);
            setExpanded(true);
        }else{
            setIsRedirect(true);
        }
    }

    const onStarClick=()=>{
        setHasStar(!hasStar);
        //後はidとstar情報をサーバーに送るアクション

    };

    const onReadClick=()=>{
        setRead(!read);
        //後はidとread情報をサーバーに送るアクション

    };



    return (
        <div>
            {isRedirect ?
                <Redirect to={"/reply/"+  data.id} />: <div/>
            }

                <Box className={classes.memo}>
                    <div className={classes.ulbutton} >
                        <span className={classes.headertext}>
                            {data.senderName}:{data.time} 
                        </span>
                        <span className={classes.icons}>
                            <IconButton onClick={onStarClick}>
                                {hasStar ? (<CheckBoxTwoToneIcon/>  ):( <CheckBoxOutlineBlankTwoToneIcon/>)}
                            </IconButton>
                            
                        </ span>
                      
                        <span className={classes.icons} >
                            <IconButton onClick={onReadClick} >
                                {read ? ( <StarTwoToneIcon/> ):( <StarBorderTwoToneIcon/> )}
                            </IconButton>
                        
                        </span>

                        {isLong ?
                            <div className={classes.icons} >
                                <IconButton onClick={onExpanded} >
                                    {expanded ? ( <ExpandLessIcon/> ):( <ExpandMoreIcon/> )}
                                </IconButton>    
                            </div>
                            :
                            <div/>

                        }
                        
                          
    
                    </div>
                          
                    <Collapse in={expanded} collapsedHeight={60}> 
                        <div onClick={onRedirect} className={classes.ulbutton}>
                            <div className={classes.textarea}>{maintext}</div>
                            
                        </div>
                        <div className={classes.ulbutton} >
                            <div>
                                <IconButton edge="start" color="inherit"  className={classes.menuButton} ><ReplyTwoToneIcon size="small"/></IconButton>
                                <IconButton edge="start" ize="small" color="inherit"  ><AddCircleOutlineTwoToneIcon size="small"/></IconButton>
                                <IconButton edge="start" size="small" color="inherit"  ><DeleteOutlinedIcon size="small"/></IconButton>
                            </div>
                        </div>
                    </Collapse>
                    
     
                </Box>
        </div>
    )

}

export default MemoColumn;