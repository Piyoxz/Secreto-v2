let playing = false
let timeremaining;
let score;
let x;
let y;
let z; let z1; let choiceRandom;
// if we click start game/ reset game button 
document.getElementById('startReset').onclick = function(){
  if(playing==true){
    // if we are playing
    location.reload()
  }else{
    // if we are not playing 
    playing = true;
    hide("gameover")
    show("timeremaining")
    document.getElementById('startReset').innerHTML = "Reset Game"
   score= 0;
   // score box valuee
   document.getElementById('scorevalue').innerHTML= score
   timeremaining=60
   countdown()
   generateQA()
  }
}
// to start a countdown
function countdown(){
  let countdown = setInterval(function(){
    // if the time value is greater than zero
    if(timeremaining>0){
      timeremaining--;
    document.getElementById('timeremainingvalue').innerHTML=timeremaining
    }else{
      //if time value is zero
      stopcountdown()
      show("gameover")
      document.getElementById('startReset').innerHTML = "Start Game"
      document.getElementById("gameover").innerHTML = "<p> GAME IS OVER</p><br><p>YOUR SCORE IS "+score +"</p>"
      playing = false
    }
  },1000)
}
// stop countdown function
function stopcountdown(){
  clearInterval(countdown)
}
//function to generate question and answers
function generateQA(){
  // to generate random number named x
  x = Math.round(1+Math.random()*9)
  // to genrate random number named y
  y = Math.round(1+Math.random()*9)
  //product of x and y
  z = x * y
  document.getElementById("question").innerHTML = x + '&times;' + y
  //to position z(answer) in its respective answer
  choiceRandom = Math.round(1+Math.random()*3)
  document.getElementById('box'+choiceRandom).innerHTML = z
  let wronganwsers = [z]
  for(let i= 1;i<5;i++){
    //to generate random wrong answers
   do{
    x = Math.round(1+Math.random()*9)
    y = Math.round(1+Math.random()*9)
    z1 = x * y
   }
   while(wronganwsers.indexOf(z1)>-1)
   wronganwsers.push(z1)
  if(i!= choiceRandom){
    document.getElementById('box'+i).innerHTML = z1 
  }
  } 
}

// to check if wrong/right answer is clicked 
for(let i=1;i<5;i++){
  document.getElementById("box"+i).onclick = function(){
    // if we are playing, playing is equal true
    if(playing == true){
       if(this.innerHTML==z){
         //if the right anwser is clicked 
         show("correct")
         hide("wrong")
         setTimeout(function(){
          hide("correct")
         hide("wrong") 
         },1000)
         score++
         document.getElementById('scorevalue').innerHTML= score
         generateQA()
       }
       else{
         //if the wrong answer is clicked 
         hide("correct")
         show("wrong")
         setTimeout(function(){
          hide("correct")
         hide("wrong") 
         },1000)
         generateQA()
       }
    } else {
      alert('Click Start Game to play');
    }
  }
}
// to show an html element
function show(id){
  document.getElementById(id).style.display="block"
}
// to hide an html element
function hide(id){
  document.getElementById(id).style.display="none"
}
