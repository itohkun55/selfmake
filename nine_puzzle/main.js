document.addEventListener('DOMContentLoaded', function () {
    markers=document.querySelectorAll('.marker');

    const main = new PuzzleSet(markers);
});


class PuzzleSet{

    constructor(markers){
        //座標配列
        this.layoutSet=[];
        //マーカーの空白 最初のタイミングでは右隅（９）がない
        this.idleSpace=9;

        this.markers=markers;
        let counter=0;

        for (let m of this.markers){
            
            m.innerHTML=String(counter++);
            m.addEventListener('click',this.pushBlock.bind(this));

        }

        const margin=20;
        const row=0;
        const  col=0;
        for (let i=0;i<9;i++){
            let lb={"l":0,"t":0,"marker":-1};
            lb["l"]=String((100+margin)*(i%3))+"px";
            lb["t"]=String(parseInt((i/3))*(100+margin))+"px";
            if(this.markers[i])  lb["marker"]=this.markers[i].id;
            this.layoutSet.push(lb);
        }

        console.log(this.layoutSet);
        console.log("====");
        

        this._setBlocks();

    }


    _seekDom(id){

        for (let s of this.markers){
            if (s.id==id) return s;
        }

    }

    pushBlock(e){

        let id=parseInt(e.target.id);
        console.log(id);


        let target={};

        //空白地を探す
        let idle_id=-1;
        let push_id=-1;

        let b_idle=false;
        let b_target=false;

        for (let n in this.layoutSet){
            if (this.layoutSet[n]["marker"]==-1){
                idle_id =parseInt(n);
                b_idle=true;
            }else if (this.layoutSet[n]["marker"]==id){
                target=this.layoutSet[n]["marker"];
                push_id=parseInt(n);
                b_target=true;
            }
            if (b_idle && b_target) break;
            
            
        }

        console.log(push_id+":"+idle_id);

        //空白地が押した場所の隣か確認
        //up %3が同じ　/3が１小さい
        console.log(push_id%3!=2);
        console.log(push_id+1==idle_id);
        console.log(push_id+1);
        console.log(idle_id);
        


        if ((idle_id%3==push_id%3 &&  parseInt(idle_id/3)==(parseInt(push_id/3)-1))
        ||  (idle_id%3==push_id%3 &&  parseInt(idle_id/3)==(parseInt(push_id/3)+1))
        ||(push_id%3!=2 &&  push_id+1==idle_id)
        ||(push_id%3!=0 &&  push_id-1==idle_id)){
            
            console.log("get it!"+push_id+":"+idle_id);
            const np=this.layoutSet[push_id]["marker"];
            console.log(np);
            this.layoutSet[push_id]["marker"]= -1;
            
            this.layoutSet[idle_id]["marker"]=np;
            
        }

        console.log(this.layoutSet);
        console.log("---");

        this._setBlocks();

    }

    _setBlocks(){

        let counter=0;
        //console.log(this.layoutSet);

        for( let s of this.layoutSet) {
        
            //console.log(s);
            
            if (s["marker"]==-1){
                console.log("null check");
                counter+=1;
                continue;

            } 
            
            console.log("++++");
            let m =this._seekDom(s["marker"]);

            console.log(m);

            m.style.left=this.layoutSet[counter]["l"];
            m.style.top=this.layoutSet[counter]["t"];
            //console.log(m.style);

            counter+=1;
            console.log(m);
        }

        // for( let m of this.markers) {
        //     //console.log(s);
            
        //     m.innerHTML=String(counter+1);

        //     m.style.left=this.layoutSet[counter]["l"];
        //     m.style.top=this.layoutSet[counter]["t"];
        //     this.layoutSet[counter]["marker"]=m;
        //     console.log(m.style);

        //     counter+=1;
            
        // }

    }


}