import react,{useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';

import Chip from '@material-ui/core/Chip';
import {Card} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {getTaggedData} from '../actions';

const useStyles=makeStyles((theme)=>({

    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
        },
      },

}));



const TagSearchPanel=(props)=>{

    const classes=useStyles();

    const [selected,setSelected]=useState([]);
    const tagCandicate=useSelector(state=>state.tagged_main.tag_list);
    //const tagCandicate=props.data;
    const dispatch = useDispatch();

    const onClick=(data)=>{
        let nowselected=[];

        if (selected.some((el)=>el===data)){
            nowselected=selected.reduce((prev,current)=>{
                if( current !== data){
                    prev.push(current);
                }
                return prev;
             },[]);
        }else{
            nowselected=[...selected,data];
        }
        
        setSelected(nowselected);


        dispatch(getTaggedData(nowselected,0));
    };

    return (
        <div className={classes.root}>
            <Card>

            {
                tagCandicate.map((d)=>{
                    return (

                        <Chip    
                            variant={selected.some((el)=>el===d) ? 'outlined': 'default' }
                            color={d.type=== 1 ? "secondary" : d.type=== 2 ? "primary" : "default" }
                            label={d.name}
                            clickable
                            onClick={(e)=>onClick(d)}
                        />
    
                    )
                })
            }
            </Card>
        </div>

    )
        



};

export default TagSearchPanel;