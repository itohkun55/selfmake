import {
    PUSH_SHOW_MEMO_BUTTON,
    DELETE_MEMO,
    GET_MEMO_REQUEST,
    GET_MEMO_SUCCESS,
    GET_MEMO_FAILURE,
    OPEN_PASSWORD,
    CLOSE_PASSWORD,
    SHOW_REPLY,
    CLOSE_MEMOMAKE,
    LOAD_NEW_MEMO,
    RESET_MEMO,
    USER_LOGIN,
    AUTH_SUCCESS,
    TAGGED_SEARCH,
    TAGGED_START
}  from '../lib/ActionTypeString';

import {TestReplyData} from '../lib/TestReplyThreadData';

import axios from 'axios';


export const tag_start=()=>dispatch=>{
    const tag_list=[
        {id:2,type:1,name:"伊藤正彦"},
        {id:3,type:1,name:"高橋由香"},
        {id:4,type:1,name:"大橋巨泉"},
        {id:6,type:1,name:"鈴木敦"},
        {id:8,type:2,name:"排泄"},
        {id:10,type:2,name:"入浴"},
        {id:11,type:2,name:"食事"},
        {id:15,type:2,name:"徘徊"}
    ];


    dispatch({type:TAGGED_START,tag_list});

}


export const getTaggedData=(ar,startnum)=>dispatch=>{
    let endflg=false;
    const idarray=ar.map((d)=>{ return d.id;});
    //実際はaxiosで通信して 内容を入れ替える
    // const mArray=[
    //     {id}
    // ]
    //ここでは変化の遷移を画面で見せるだけ
    const res=idarray.reduce((cum,ass)=>{
        return ass+cum;
    },0);

    const sc=getTestData(startnum);
    //番号で切り替えられる仕組みは確認したので下の環境のテストは終了
    // const sc=test.filter((d)=>{
    //     return d.id%res===0;
    // });
    console.log(" sc ",sc,startnum);

    //テスト仕様：startNumが7の倍数になったら終了フラグを返す
    if ( startnum!==0 && startnum%7===0 ){
        console.log(" 終了のお知らせ ",startnum);
        sc.pop();
    }            
        const tll=sc.length;
        
        console.log("tll",tll);
        if (  tll===0 ||  tll%20!==0  ) endflg=true;


    dispatch({type:TAGGED_SEARCH,results:sc,startnum,endflg});

};


export const getReplyData=(id)=>dispatch=>{

    //作成するデータの種類
    // 今までのデータ　(単純な過去)　時系列の配列　　デザイン小　
    //　　親になる情報　スレッド情報のparentIdのメモ　Replyのメインのメモのすぐ上に置く　デザイン中
    //　　Relpy自分自身　色々操作できるようにする　デザイン大
    //　子供のメモ　　自分をParentIdとするメモ　下に並べる　デザイン中

    //　単純なその後の経緯　時系列の配列　デザイン小

    //idを渡すとそのデータと同じThreadIdのデータ一覧をまとめてとってくる
    
    const test=TestReplyData;
    //下から親をたどっていく

    const past_thread=[];
    let parent_data={};
    const self_data=test.find((d) => d.id===parseInt(id));
    const child_data=[];
    const future_thread=[];
    console.log(self_data);
    console.log(test);

    test.map((d)=>{
        if(d.id<self_data.id){
            if(self_data.parentId===d.id){
                parent_data=d;
            }else{
                past_thread.push(d);
            }
        }else if( d.id > self_data.id ){
            if(d.parentId===self_data.id){
                child_data.push(d);
            }else{
                future_thread.push(d);
            }
        }
    });

    
    dispatch({type:SHOW_REPLY, self_data,past_thread,parent_data,child_data,future_thread });
};



//export const getSearch=(props)

const getTestData=(startnum,count=20)=>{
    const timeline=[];
    //if (startnum>100 ) return timeline; 

    for(let key=startnum;key<startnum+count;key++) {
        timeline.push(
            {
                id:key,
                key:key,
                threadId:1 ,
                parentId:-1,
                senderName:"name :"+key,
                time:"11月17日",
                hasStar:false,
                read:false,
                detailText:key+"あいうえおかきくけこ,あいうえおかきくけこ,あいうえおかきくけこ,あいうえおかきくけこ,あいうえおかきくけこ,"
            });
    }

    return timeline;

};




export const inputTest=props=>dispatch=>{
    console.log("TEST ACTION");
    dispatch({type:'TEST_FORM'});
    
};

//最初の認証終了時(想定）のアクション
//本来は色々引数があるはず

export const auth_login_success=props=>dispatch=>{
    const auth_obj={};

    const user_list=[
        {name:"あいうえお",id:1,key:1,pwd:"12345"},
        {name:"かきくけこ",id:2,key:2,pwd:"12345"},
        {name:"さそさそさそさそ",id:15,key:3,pwd:"99999"},
        {name:"ままままままーや",id:1234,key:4,pwd:"44444"},
        {name:"おいどんは何も知りもはん",id:1900,key:5,pwd:"12345"},

    ];

    //未設定用データ　これはログイン処理作成後も追加させる
    user_list.push({name:"未設定",id:-1});

    const unit_list=[
        {name:"1番街",id:1,key:1},
        {name:"地獄の3丁目",id:2,key:2},
        {name:"第6ダクト",id:3,key:3},
        {name:"ままままままーや",id:4,key:4},
        {name:"おいどんは何も知りもはん",id:5,key:5},

    ];


    dispatch({type:AUTH_SUCCESS,user_list,unit_list});

};


//
export const login_start=(login_id,password)=>dispatch=>{
    //実際はサーバーとの認証処理を行い再度データを取り出す

    dispatch({type:USER_LOGIN,login_id,password});
};


//メモを新規追加して送信し、その結果を戻す
export const pushNewMemo=(memo,isPrivate)=>dispatch=>{
    console.log("PUSH NEW MEMO");

    const nd={
        key:2200,
        senderName:"新規データ",
        time:"11月23日",
        hasStar:false,
        read:false,
        detailText:"これは新規データなのですですですですですですですですです"
    };

    const timeline=[nd].concat(getTestData(0));


    dispatch({type:RESET_MEMO,timeline});
};







//現在まで表示したデータの次のメモデータを取得して表示する
export const loadNewMemo=startnum=>dispatch=>{
    console.log(" LOAD NEW MEMO  "+startnum);


    const timeline=getTestData(startnum);

    let endflg=false;

    axios.get('http://127.0.0.1:8000/api/sample')
        .then(results=>{
            console.log(results);
            const tll=timeline.length;
            //取得したタイムラインが空か規定に足りなかった場合、終了フラグを打つ
            if (  tll===0 ||  tll%20!==0  ) endflg=true;

            dispatch({type:LOAD_NEW_MEMO,timeline,results,endflg});
        }).catch(error=>{
            console.log(error);

        //テスト仕様：startNumが7の倍数になったら終了フラグを返す
        if ( startnum!==0 && startnum%7===0 ){
            console.log(" 終了のお知らせ ",startnum);
            timeline.pop();
        }            
            const tll=timeline.length;
            
            console.log(tll);
            if (  tll===0 ||  tll%20!==0  ) endflg=true;


            dispatch({type:LOAD_NEW_MEMO,timeline,endflg, error});
        });
    
    
};


export const closeModal=props=>dispatch=>{
    dispatch({type:CLOSE_MEMOMAKE});
};

// export const deleteMemo=id=>dispatch=>{
//     dispatch({type:DELETE_MEMO,id});
// }

// export const getMemoRequest=()=>{
//     return {
//         type:GET_MEMO_REQUEST
//     }
// }

// export const getMemoSuccess=()=>{
//     return {
//         type:GET_MEMO_REQUEST
//     }
// }

// export const getMemo=(userId,fromDate,toDate,isPrivate)=>{
//     return dispatch =>{
//         dispatch(authStart());
//         axios    
//             .post("http://127.0.0.1:8000/rest-auth/registration/", {
//                 username: username,
//                 email:email,
//                 password1: password1,
//                 password2:password2
//             })
//             .then(res => {
//                 const token = res.data.key;
//                 const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
//                 localStorage.setItem("token", token);
//                 localStorage.setItem("expirationDate", expirationDate);
//                 dispatch(authSuccess(token));
//                 dispatch(checkAuthTimeout(3600));
//             })
//             .catch(err => {
//                 dispatch(authFail(err));
//             });
//     };

// }
