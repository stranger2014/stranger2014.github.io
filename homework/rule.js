var canvas=document.getElementById("canv");
var cellsize=10;
var num_cell_row=50;
var num_cell_col=50;
var cellstatus=[];
var ctx=canvas.getContext('2d');
var generation=0;
var timeinterval=100;
var t;
var ispause=true;
function drawcell(isalive,x,y){
    var posx=cellsize*x;
    var posy=cellsize*y;
    if(isalive){
        
        
        ctx.fillStyle="yellow";
        ctx.fillRect(posx,posy,cellsize,cellsize);
        ctx.strokeStyle="red";
        ctx.strokeRect(posx+1,posy+1,cellsize-2,cellsize-2);
        
    }
    else{
        //alert("shit")
       ctx.fillStyle="green"; 
        
        ctx.fillRect(posx,posy,cellsize,cellsize);
        
    }
}

function stateturn(x,y){
    var state=cellstatus[[x,y]];
    if(state){
        cellstatus[[x,y]]=0;
    }
    else
        cellstatus[[x,y]]=1;
}


function lifegamerules(x,y,cellstatus){
    //var cellaround=[];
    //alert("debug")
    var num=0;
    var curstate=cellstatus[[x,y]];
    if(x==0){
        if(y==0){
            if(cellstatus[[x+1,y]])
                num++;
            if(cellstatus[[x+1,y+1]])
                num++;
            if(cellstatus[[x,y+1]])
                num++;
        }
        else if(y==num_cell_row-1){
            if(cellstatus[[x-1,y+1]])
                num++;
            if(cellstatus[[x-1,y]])
                num++;
            if(cellstatus[[x,y+1]])
                num++;
        }
        else{
            if(cellstatus[[x-1,y]])
                num++;
            if(cellstatus[[x+1,y]])
                num++;
            if(cellstatus[[x-1,y+1]])
                num++;
            if(cellstatus[[x,y+1]])
                num++;
            if(cellstatus[[x+1,y+1]])
                num++;
        }
    }
    else if(x==num_cell_col-1){
        if(y==0){
            if(cellstatus[[x,y-1]])
                num++;
            if(cellstatus[[x+1,y+1]])
                num++;
            if(cellstatus[[x,y+1]])
                num++;
        }
        else if(y==num_cell_row-1){
            if(cellstatus[[x-1,y-1]])
                num++;
            if(cellstatus[[x-1,y]])
                num++;
            if(cellstatus[[x,y-1]])
                num++;
        }
        else{
            if(cellstatus[[x-1,y]])
                num++;
            if(cellstatus[[x+1,y]])
                num++;
            if(cellstatus[[x-1,y-1]])
                num++;
            if(cellstatus[[x,y-1]])
                num++;
            if(cellstatus[[x+1,y-1]])
                num++;
        }
    }
    
    else if(y==0)
    {
        if(cellstatus[[x-1,y]])
            num++;
        if(cellstatus[[x-1,y+1]])
            num++;
        if(cellstatus[[x,y+1]])
            num++;
        if(cellstatus[[x+1,y]])
            num++;
        if(cellstatus[[x+1,y+1]])
            num++;
        
    }
    
    else if(y==num_cell_row-1){
        if(cellstatus[[x-1,y-1]])
            num++;
        if(cellstatus[[x-1,y]])
            num++;
        if(cellstatus[[x,y-1]])
            num++;
        if(cellstatus[[x+1,y-1]])
            num++;
        if(cellstatus[[x+1,y]])
            num++;
    }
    
    else{
        if(cellstatus[[x-1,y-1]])
            num++;
        if(cellstatus[[x-1,y]])
            num++;
        if(cellstatus[[x-1,y+1]])
            num++;
        if(cellstatus[[x,y-1]])
            num++;
        if(cellstatus[[x,y+1]])
            num++;
        if(cellstatus[[x+1,y-1]])
            num++;
        if(cellstatus[[x+1,y]])
            num++;
        if(cellstatus[[x+1,y+1]])
            num++;
    }/**/
    
    if(cellstatus[[x,y]]){
        if(num==2||num==3){
            return 1;
        }
        else return 0;
    }
    else{
        if(num==3) return 1;
        else return 0;
    }
   // alert('this is rule');
}
//module.exports=lifegamerules;
function init(){
    for(i=0;i<num_cell_row;i++)
        for(j=0;j<num_cell_col;j++)
            cellstatus[[i,j]]=0;
    start.disabled=false;
    pause.disabled=true;
    end.disabled=true;
    gen.textContent=generation;
    for(x=0;x<num_cell_row;x++)
        for(y=0;y<num_cell_col;y++){
            drawcell(0,x,y);
        }
}
function oninterval(){
    var nextstatus=[];
    for(x=0;x<num_cell_row;x++)
        for(y=0;y<num_cell_col;y++){
            nextstatus[[x,y]]=lifegamerules(x,y,cellstatus);
        }
    //alert(nextstatus)
    for(x=0;x<num_cell_row;x++)
        for(y=0;y<num_cell_col;y++){
            cellstatus[[x,y]]=nextstatus[[x,y]];
            drawcell(cellstatus[[x,y]],x,y);
        }
    generation++;
    document.getElementById("gen").textContent=generation;
    //alert("ok")
    if(!ispause)
        t=setTimeout(oninterval,timeinterval);
    
}
function onclkstart(){
    var num=0;
    for(i=0;i<num_cell_row;i++)
        for(j=0;j<num_cell_col;j++){
            if(cellstatus[[i,j]]){
                num++;
            }
        }
    if(num==0){
        alert("no cell is alive right now");
        return;
    }
    
    document.getElementById("start").disabled=true;
    pause.disabled=false;
    end.disabled=false;
    ispause=false;
    oninterval();
          
}
function onclkpause(){
    ispause=true;
    start.disabled=false;
    pause.disabled=true;
    end.disabled=false;
}
function onclkend(){
    ispause=true;
    start.disabled=false;
    pause.disabled=true;
    end.disabled=true;
    clearTimeout(t);
    generation=0;
    init();
}
canvas.onmousedown=function(e){
    var ex,ey,x,y;
    if(e.offsetX){
        ex=e.offsetX;
        ey=e.offsetY;
        x=Math.floor(ex/cellsize);
        y=Math.floor(ey/cellsize);
        stateturn(x,y);
        //alert(x+" "+y+" "+cellstatus[[x,y]]);
        drawcell(cellstatus[[x,y]],x,y);
    }
}

window.addEventListener("load",init,true);
