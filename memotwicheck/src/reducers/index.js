import {combineReducers} from 'redux';
//import {reducer as formReducer} from 'redux-form';
import  {PUSH_SHOW_MEMO_BUTTON,
        PUSH_NEW_MEMO,
        PUSH_PASSWORD,
        CLOSE_MEMOMAKE,
        LOAD_NEW_MEMO,
        RESET_MEMO,
        USER_LOGIN,
        DONE_LOGOUT ,
        AUTH_SUCCESS, 
        OPEN_PASSWORD,
        CLOSE_PASSWORD,
        TAGGED_START,
        TAGGED_SEARCH,
        SHOW_REPLY
    } from '../lib/ActionTypeString';


const INIT_ACTION={
    type:"NONE",
    user_list:[],
    unit_list:[],
    timeline:[],
    isPrivate:false,
    login_id:"",
    results:[],
    endflg:false
};

//最初の認証時に取得する情報　各種各ユーザー情報など
const INIT_AUTH_STATE={
    user_list:[],
    unit_list:[]
};

const auth_login=(state=INIT_AUTH_STATE,action=INIT_ACTION)=>{
    
    
    switch (action.type) {


        case AUTH_SUCCESS:
            //console.log(action);
    
            return  { ...state,
                user_list:action.user_list,
                unit_list:action.unit_list,
                tag_list:action.tag_list
            }
            
        default:
            return state;
    }
};

const tagged_start=(state=INIT_AUTH_STATE,action=INIT_ACTION)=>{
    
    
    switch (action.type) {


            
        default:
            return state;
    }
};




//各ユーザーのログイン時のやり取り
const INIT_USER_STATE={
    login_id:-1,
    open_password:false,
};

const user_login=(state=INIT_USER_STATE,action=INIT_ACTION)=>{
    switch (action.type) {
        case OPEN_PASSWORD:
            return { ...state, open_password:true };

        case CLOSE_PASSWORD:
            return { ...state, open_password:false };
        case USER_LOGIN:
            return {
                ...state,
                    login_id:action.login_id,
                    open_password:false
            };

        case DONE_LOGOUT:
            return INIT_USER_STATE;

        default:
            return state;
    }
};





//reducerは関数ごとにstateを作る

const INIT_MEMO_MAIN_STATE={
    timeline:[],
    memomake_open:false,
    endflg:false
};


const memo_main=(state=INIT_MEMO_MAIN_STATE,action=INIT_ACTION)=>{
    switch(action.type){
        case RESET_MEMO:
            return {...state,
                timeline:action.timeline,
                results:action.results,
                endflg:false
            }; 
            

        case LOAD_NEW_MEMO:
            const resA=state.timeline.concat().concat(action.timeline);
            //resA.concat(action.timeline);
            //console.log(resA);
        
            return {...state,
                timeline:resA,
                results:action.results,
                endflg:action.endflg
            }; 
            
        case PUSH_SHOW_MEMO_BUTTON:
            //console.log(state);

            return Object.assign({},state,{
                isPrivate:action.isPrivate,
                memomake_open:action.memomake_open}
            );
        case CLOSE_MEMOMAKE:
            return Object.assign({},state,{ memomake_open:false}
            );

        default:
            return state;
    }
};

const INIT_MEMO_STATE="";

//実際にはAPIを叩きに行って、結果を取得し、その内容をリストに持ち込むようにする
const memo=(state=INIT_MEMO_STATE,action)=>{
    switch(action.type){
        case PUSH_NEW_MEMO:
            return action.memo;
        default:
            return state;
    }
};

const INIT_TAGGED_SEARCH={
    tag_list:[],
    results:[]
};

const INIT_REPLY_MAIN={
    self_data:{},
    parent_data:null,
    past_thread:[],
    child_data:[],
    future_thread:[],
    load_flg:false
}

export const reply_main=(state=INIT_REPLY_MAIN,action)=>{
    switch(action.type){
        case SHOW_REPLY:

            return {...state,
                self_data:action.self_data,
                parent_data:action.parent_data,
                past_thread:action.past_thread,
                child_data:action.child_data,
                future_thread:action.future_thread,
                load_flg:true
                
            };
        default:
            return state;

    }
}


export const tagged_main=(state=INIT_TAGGED_SEARCH,action=INIT_ACTION)=>{
    switch(action.type){
        case TAGGED_START:
            //console.log(action);
    
            return  { ...state,
                tag_list:action.tag_list
            };
 

        case TAGGED_SEARCH:
            let results=[];
            if (action.startnum===0){
                results=action.results;
            }else{
                results=state.results.concat().concat(action.results);
            }

            return {...state,
                results:results,
                endflg:action.endflg
            }; 
        default:
            return state;
    }
}


const INIT_PWD_STATE="pwd";

const pwd=(state=INIT_PWD_STATE,action=INIT_ACTION)=>{
    switch (action.type){
        case PUSH_PASSWORD:
            console.log("PWD"+action.pwd)
            return action.pwd;
        default:
            return state; 
    }
};


export default combineReducers({memo_main,memo,pwd,user_login,auth_login,tagged_main,reply_main});