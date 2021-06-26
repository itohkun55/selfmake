import React from 'react';
import {useDispatch}  from 'react-redux';
import {Fab,Menu,MenuItem}  from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';

//import {pushNewMemo}  from '../actions';
import {PRIVATE,TEAM,PUSH_SHOW_MEMO_BUTTON} from '../lib/ActionTypeString';
import { EmailOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    fabButton:{
        position:"fixed",
        bottom:10,
        right:10,
        zIndex:100

    }


  }));
  

const MemoInsertButton=(props)=>{
    const dispatch=useDispatch();

    //どこをクリックしても消せるようにしたいのでstateはreduxに振る
    const [bmenu,showMenu]=React.useState(null);

    const onClick=(event)=>{
        showMenu(event.currentTarget);
    };

    const menuPushEvent =(isPrivate,e )=>{
        e.preventDefault();
        showMenu(null);
        //props.pushNewMemo(pOrT)
        dispatch({type:PUSH_SHOW_MEMO_BUTTON,isPrivate:isPrivate,memomake_open:true});
    };
    const onClose=(event)=>{
        showMenu(null);
    };
    

    const classes = useStyles();
    return(
        <div >
            <Fab 
            className={classes.fabButton}
            onClick={onClick}
            color="primary" 
            aria-label="add"
            aria-haspopup="true">
                <AddIcon/>
            </Fab>

            <Menu
            
                onClose={onClose}
                className={classes.menu}
                id="simple-menu"
                anchorEl={bmenu}
                keepMounted
                open={Boolean(bmenu)}

            >
                <MenuItem onClick={(e)=>menuPushEvent(TEAM,e)} ><VerticalAlignTopIcon color="primary" size="large" /></MenuItem>
                <MenuItem onClick={(e)=>menuPushEvent(PRIVATE,e)} ><RecordVoiceOverIcon color="primary" size="large" /></MenuItem>
                <MenuItem onClick={(e)=>menuPushEvent(PRIVATE,e)} ><EmailOutlined color="primary" size="large" /></MenuItem>
            </Menu>
        </div>

    )
}

export default MemoInsertButton;

//export default connect(null,{pushNewMemo})(MemoInsertButton);

