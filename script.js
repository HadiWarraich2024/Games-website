let gameSeq=[];
let userSeq=[];
let btns=["red","green","yellow","blue"];

let start=false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("click",function(){
    if(start==false){
        start=true;

        levelUp();
    }
})

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randbtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randbtn);
}

function btnPress(){
    let btn=this;
    btnFlash(btn);
    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    check(userSeq.length-1);
}

function check(idx){
    let index=level-1;
    if (userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
          setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML=`Game Over! Score <b>${level}</b> <br>Press any key to restart...`;
        reset();
    }
}

let allBtns=document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
