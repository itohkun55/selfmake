import React from 'react';
import MemoColumn from '../components/MemoColumn';

export const TestMemoColumn=(props)=>{

    return (
        <div>
            
            <hr/>
                <MemoColumn
                
                   senderName={"7番街で"}
                
                    hasStar={true}
                    read={false}
                    detailText={"あの件は大丈夫ですよ。あの件は大丈夫ですよ。\nあの件は大丈夫ですよ。\nあの件は大丈夫ですよ。あの件は大丈夫ですよ。あの件は大丈夫ですよ。"}
                
                
                />
            
            <hr/>   
        </div>
    )

}