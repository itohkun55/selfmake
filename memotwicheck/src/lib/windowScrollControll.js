import React from 'react';
import {throttle} from 'lodash';

export const ScrollUpdater=(props)=>{

    //実行関数　setNewTimeLine

    //監視パラメータ　timeline
    

    const checkInEnd=throttle(() => {
        const m1=Math.round(window.innerHeight + document.documentElement.scrollTop);
        
        if (
            Math.round(window.innerHeight + document.documentElement.scrollTop)  !==  Math.round(document.documentElement.scrollHeight)
        ) {
            return;
        }
        if (!props.endflg)  props.scrollFunc();
    
        }, 200
    );
    
    
    React.useEffect(()=>{
        props.scrollFunc();
    },[]);
    
    React.useEffect(() => {
        
        window.removeEventListener('scroll', checkInEnd);
        window.addEventListener('scroll', checkInEnd);
        
    
        return () => {
        window.removeEventListener('scroll', checkInEnd);
        
        };
        //propsの中身は随時更新しないと同じ初期値を使いまわすことになる
    }, [props.checkParam]); // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <div/>
    )

}

