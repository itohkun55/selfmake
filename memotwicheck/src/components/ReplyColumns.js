//各メモの表示を行う


//初期状態メモヘッダーのみ表示

//ヘッダーから開閉イベントを受けたら詳細をアニメーションで展開する

import React ,{useEffect, useState} from 'react';
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

      
    memoSub:{            
        width: '80%',
        right:'20px',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1, 2, 0),
        border: '1px solid #000',
      },

      
    memoChild:{            
        width: '85%',
        right:'20px',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1, 2, 0),
        border: '1px solid #555555',
      },

    memoParent:{            
        width: '85%',
        //right:'20px',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1, 2, 0),
        border: '1px solid #555555',
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



const ReplyColumn=({data,boxstyle,mark})=>{
    const TEXT_LIMIT=15;
    const dd=data;
    //console.log(mark);
    console.log(dd);
    console.log(dd.detailText);
    
    
    const setHeaderText=(txt)=>{
        //if (typeof txt ==="undefined") console.log("txt undefined ");
        return txt.substring(0,TEXT_LIMIT)+"....";
    };
    const classes=useStyles();
    const [maintext,setMainText] =useState(setHeaderText(dd.detailText));

    const [expanded ,setExpanded]=useState(false);
    const [hasStar, setHasStar] = useState(dd.hasStar);
    const [read, setRead] = useState(dd.read);
    const [bstyle,setBoxStyle]=useState(classes.memo);


    const onExpanded=()=>{
        if(!expanded){
            setMainText(dd.detailText);
        }else{
            setMainText(setHeaderText(dd.detailText) );
        }

        setExpanded(!expanded);

    };

    const onStarClick=()=>{
        setHasStar(!hasStar);
        //後はidとstar情報をサーバーに送るアクション

    };

    const onReadClick=()=>{
        setRead(!read);
        //後はidとread情報をサーバーに送るアクション

    };

    useEffect(()=>{
        //console.log(props);
        switch(boxstyle){
            case "thread":
                 setBoxStyle(classes.memoSub);
                break;
            case "parent":

                setBoxStyle(classes.memoParent);
                break;
            
            case "child" :
                setBoxStyle(classes.memoChild);
                break;
            default:
                setBoxStyle(classes.memo);
                break;

        }

        //console.log("style then",boxstyle);
    });



    return (
        <div>

                <Box  className={bstyle}>
                    <div className={classes.ulbutton} >
                        <span className={classes.headertext}>
                            {dd.senderName}:{dd.time} 
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

                        <div className={classes.icons} >
                                <IconButton onClick={onExpanded} >
                                    {expanded ? ( <ExpandLessIcon/> ):( <ExpandMoreIcon/> )}
                                </IconButton>    
                            </div>
                          
    
                    </div>
                          
                    <Collapse in={expanded} collapsedHeight={30}> 
                        <div onClick={onExpanded} className={classes.ulbutton}>
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

export default ReplyColumn;