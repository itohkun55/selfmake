import React ,{useState,useEffect}  from 'react';
import {useDispatch,useSelector}  from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import MemoColumn from './MemoColumn';
//import {LOAD_NEW_MEMO} from '../lib/ActionTypeString';
import {loadNewMemo} from '../actions';
import {ScrollUpdater} from '../lib/windowScrollControll';
import LinearProgress from '@material-ui/core/LinearProgress';
//このリスト画面自体は通信にはかかわらず、親のコンポーネントからデータを渡す
//このコンポーネント自体はスクロール位置に関係する



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
const MemoList=(props)=>{
    //const dispatch=useDispatch();
    
    const timeline=useSelector(state=>state.memo_main.timeline);
    const endflg=useSelector(state=>state.memo_main.endflg);
    const results=useSelector(state=>state.memo_main.results);
    const [startnum,setStartNum]=useState(0);
    const dispatch = useDispatch();

    
    const setNewTimeLine=()=>{
        setStartNum(startnum+20);
        console.log(" Add Start");
        dispatch(loadNewMemo(startnum));
        //loadNewMemo(startnum);
    };

    // useEffect(()=>{
    //     dispatch(loadNewMemo(startnum));
    // },[]);



    const classes=listStyles();

    return (
        <div className={classes.base}>
            <div>{results}</div>
            <ScrollUpdater scrollFunc={()=>setNewTimeLine(startnum) }  checkParam={timeline} endflg={endflg} buffer={60} />
            {
                timeline.map((d)=>{
                    return (<MemoColumn
                        data={d}
                    />)
                })
            }
            {endflg ?  <div>現在の表示内容は以上です。</div> : <div className={classes.progress}><LinearProgress/></div> }
           

        </div>

    )
}

export default MemoList;
