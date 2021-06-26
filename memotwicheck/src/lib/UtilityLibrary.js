//共通で使いそうな関数をまとめておく　stateとかは取らず　共通のデータ構造にのみ依存するように作っておく

export const getUserName=(user_list,id)=>{
    const us=user_list.find(u=>u.id===id);
    return u.name;
}