import React ,{useState}  from 'react';
import {useDispatch,useSelector}  from 'react-redux';
import TagSearchPanel from './TagSearchPanel';
import MemoColumn from './MemoColumn';
import { makeStyles} from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {ScrollUpdater} from '../lib/windowScrollControll';
import { getTaggedData } from '../actions';

//このリスト画面自体は通信にはかかわらず、親のコンポーネントからデータを渡す
//このコンポーネント自体はスクロール位置に関係する



const listStyles=makeStyles((theme)=>({
    base: {
        position:'relative',
        top:'60px'
    }

}))


const TagSearchList=(props)=>{
    //const dispatch=useDispatch();
    
    const results=useSelector(state=>state.tagged_main.results);
    const endflg=useSelector(state=>state.tagged_main.endflg);
    const tagCandicate=useSelector(state=>state.tagged_main.tag_list);
    const [startnum,setStartNum]=useState(0);
    const dispatch = useDispatch();
    const classes=listStyles();

    const setNewTagList=(num)=>{
        setStartNum(num+20);
        dispatch(getTaggedData(tagCandicate, num));

    };





    return (
        <div>
        <ScrollUpdater scrollFunc={()=>setNewTagList(startnum)} checkParam={results} endflg={endflg} buffer={60}/>
        <div className={classes.base}>
            
            <TagSearchPanel/>
            {
                results.length!==0 ?
                    results.map((d)=>{
                        return (<MemoColumn
                            data={d}

                        />)

                })
                :       
                    <div> 該当する検索結果は存在しません。<br/>タグを新規選択するか、現在選択のタグを外してください。 </div>

            }

            {endflg ?  <div>現在の表示内容は以上です。</div> : <div className={classes.progress}><LinearProgress/></div> }
        </div>
        </div>

    )
}

export default TagSearchList;
