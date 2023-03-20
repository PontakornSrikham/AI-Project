window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  var alphabet2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  //var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var geusses2 = [];
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'
  var shl=0;
  var AIcounter;
  var test=0;
  var bestScore;
  var AIchoose;
  var AIChooseWord;



  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");



  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
      
    }
  }
    
  
  // Select Catagory
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "The Chosen Category Is Premier League Football Teams";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Chosen Category Is Films";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "The Chosen Category Is Cities";
    }
  }

  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Create AIguesses ul
  result2 = function () {
    wordHolder2 = document.getElementById('hold');
    correct2 = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct2.setAttribute('id', 'my-word');
      guess2 = document.createElement('li');
      guess2.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess2.innerHTML = "-";
        space = 1;
      } else {
        guess2.innerHTML = "_";
      }

      geusses2.push(guess2);
      wordHolder2.appendChild(correct2);
      correct2.appendChild(guess2);
    }
  }
  
  // Show lives
   comments = function () {
    showLives.innerHTML = "You have " + lives + " lives!";
    if (lives < 1) {
      showLives.innerHTML = "Game Over!<br><br>The Answer is : " + word;
      shl=1;
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
        shl=1;
      }
    }
    for (var i = 0; i < geusses2.length; i++) {
      if (AIcounter + space === geusses2.length) {
        showLives.innerHTML = "AI Win!<br><br>The Answer is : " + word;
        shl=1;
      }
    }
  }

      // Animate man
  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  }

  
   // Hangman
  canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };
  
  head = function(){
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI*2, true);
    context.stroke();
  }
    
  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
}

   frame1 = function() {
     draw (0, 150, 150, 150);
   };
   
   frame2 = function() {
     draw (10, 0, 10, 600);
   };
  
   frame3 = function() {
     draw (0, 5, 70, 5);
   };
  
   frame4 = function() {
     draw (60, 5, 60, 15);
   };
  
   torso = function() {
     draw (60, 36, 60, 70);
   };
  
   rightArm = function() {
     draw (60, 46, 100, 50);
   };
  
   leftArm = function() {
     draw (60, 46, 20, 50);
   };
  
   rightLeg = function() {
     draw (60, 70, 100, 100);
   };
  
   leftLeg = function() {
     draw (60, 70, 20, 100);
   };
  
  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1];

  var bestletter = [ ];
  
  //Choose alphabets of word in function minimax
  function split(Aiwords){
      var back = [];
      
      for(var i=0; i < Aiwords.length; i++){
          if(alphabet2.indexOf(Aiwords[i]) !== -1){
            back = Aiwords[i];
            console.log("test:   "+back[i]);
            return back;
          }
      }
  }


  // OnClick Function
   check = function () {
    list.onclick = function () {
      if(shl==0){
        var geuss = (this.innerHTML);
        //AI function
        AI = function(){
          if(test == 0){
          AIchoose = makeAIMove(categories, geusses, geuss);
          
          }
          console.log("letter: "+bestletter);
          
          AIChooseWord = split(AIchoose);
          //AIChooseWord = AIchoose[Math.floor(Math.random()*AIchoose.length)];
          console.log("AIChooseWord: "+AIChooseWord);

          // Pop out alphabet that AI used
          var aipopout = alphabet2.indexOf(AIChooseWord);
              

          if(aipopout !== -1){
              alphabet2.splice(aipopout, 1);
          }
          if(lives<1){
            shl=1;
          }
          return AIChooseWord;
        }
        let AIRandomDelete = AI();
        console.log("ai: "+AIRandomDelete);
        console.log("lives of Ai: "+AIcounter);
        console.log("function ai: %------------------------------------%");

        //Pop out alphabet that player used
        var popout= alphabet.indexOf(geuss);
        if(popout !== -1){
          alphabet.splice(popout, 1);
        }
        console.log(alphabet2);
        this.setAttribute("class", "active");
        this.onclick = null

        //Check alphabet and word if it true
        for (var i = 0; i < word.length; i++) {
          if (word[i] === geuss) {
            geusses[i].innerHTML = geuss;
            counter += 1;
          }
           else if (word[i] === AIRandomDelete) {
            geusses2[i].innerHTML = "X";
              AIcounter += 1;
          }
        }

        //Check alphabet and word if it false
        var j = (word.indexOf(geuss));
        if (j === -1) {
          lives -= 1;
          comments();
          animate();
        } else {
          comments();
        }
      }
    }
  }

  //Function that AI think before use minimax
  function makeAIMove(cat, guessedLetters, train) {
    
    //let n = guessedLetters.length;
    var cont = [ ];
    var k=0;

    for(var i = 0; i < cat.length; i++){
      for(var j = 0;j < cat[i].length; j++){
        if(cat[i][j].length === guessedLetters.length){
          cont[k] = cat[i][j];
          k++;
        }
      }
    }
    
    //console.log("guessedLetters: "+guessedLetters);
  //  console.log("function makeAIMove: ******************************");
    console.log("cat: "+cont);
    //console.log("train: "+ train);
    if(cont.length > 1 && test == 0){
      bestScore = minimax(cont,train);
    }else if(test == 0){ //กรณีเหลือแค่ word เดียว ให้ AI เลือกคำจากตัวนั้นแทนเลย 
      bestScore = cont[0];
    }
    
    // Make the AI move
    //guessedLetters.add(bestLetter);
    console.log("bestLetter: "+ bestScore);
    return bestScore;
  }
  
//*******************************************************************************************

  function minimax(cat, train){
    console.log("function minimax: -------------------------");
    var words = [];
    
    var wordran;
    var wordran2;

    //var find = cat[0][Math.floor(Math.random()*cat.length)];
    
    var findw = word.indexOf(train);
    if(findw == -1 && test == 0){
      wordran = cat[Math.floor(Math.random() * cat.length)];
      wordran2 = wordran[Math.floor(Math.random() * wordran.length)];
      
      findw =  word.indexOf(wordran2);

    }
    // findw --> findwords 

    

    //เข้าไป check ใน คลัง words ว่ามีหรือป่าว 
    for(var i = 0; i< cat.length; i++){
      // check ว่าตำแหน่งตรงกันไหม
      // console.log("cat["+i+"][findw]: "+ cat[i][findw]);
      // console.log("word[findw]: "+ word[findw]);

      if(findw != -1 && cat[i][findw] == word[findw]){
        words = cat[i];
        console.log("minimax words: "+ words);
        test = 1;
        return words;

      }
    }

    //กรณีถ้าไม่เจอ จะให้ทำการ Random สุ่มเอา
    
    wordran = cat[Math.floor(Math.random() * cat.length)];
    console.log("wordran: "+wordran);
    // wordran จะได้เป็น word มาแทน

    // wordran2 = wordran[Math.floor(Math.random() * wordran.length)];
    // wordan 2 จะได้เป็น letters 
    //console.log("wordran2: "+wordran2);
  

    return wordran; // return เป็น words 

}


  // Play
  play = function () {
    categories = [
        ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
        ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
        ["manchester", "milan", "madrid", "amsterdam", "prague"]
    ];

    alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

    alphabet2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();
    shl=0;
    test = 0;


    geusses = [ ];
    geusses2 = [];
    lives = 10;
    counter = 0;
    AIcounter = 0;
    space = 0;
    result();
    result2();
    comments();
    selectCat();
    canvas();
  }

  play();
  
  // Hint

    hint.onclick = function() {

      hints = [
        ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
        ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
        ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: - " +  hints [catagoryIndex][hintIndex];
  };

   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    correct2.parentNode.removeChild(correct2);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    
    play();
  }
}