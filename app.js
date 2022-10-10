// тоглоомын бүх газарт ашиглах глобаль хувьсагчдыг энд зарлая
//Тоглоом дууссан эсэсхийг хадгалах төлөвийн хувьсагч
var isNewGame;

// Аль тоглогч шоо шидэх вэ гэдгийг энд хадгална.
var activePlayer;
// Хоёр тоглогчийн цуглуулсан оноонууд
var scores;
// Идэвхтэй тоглогчийн цуглуулж байгаа ээлжийн оноо.
var roundScore;
// Шоо Зургийг үзүүлэх элемент элементийг DOM-оос хайж олоод энд хадгалъя
var diceDom = document.querySelector(".dice");
var ylahScore = prompt("Та ялах оноогоо оруулна уу?");

// Тоглоомыг эхлүүлнэ.
initGame();

// Тоглоомыг шинээр эхлэхэд бэлгэнэ.
function initGame(){
    // Тоглоом эхэллээ гэдэг төлөвт оруулна.
    isNewGame = true;
    // Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, Хоёрдугаар тоглогчийг 1 гэж тэмдэглэе.
    activePlayer = 0; 
    // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
    scores = [0, 0];    
    // Тоглогчийн ээжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
    roundScore = 0;
 
    // Программ эхлэхэд бэлтгэе.
    document.getElementById("score-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    
    // Тоглогчдын нэрийг буцааж гаргах.
    document.getElementById("name-0").textContent = "Тоглогч-1";
    document.getElementById("name-1").textContent = "Тоглогч-2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");

    diceDom.style.display = "none";
}

// Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click",
function(){
    if(isNewGame){
        //  1-6 доторх санамсаргүй нэг тоо гаргаж авна.
    var diceNumber = Math.floor(Math.random()*6) + 1;

    // Шооны зургийг вэб дээр гаргаж ирнэ.
    diceDom.style.display = "block";

    // Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ.
    diceDom.src = "dice-" + diceNumber + ".png";

    // Буусан тоо 1-ээс ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
    if(diceNumber !==1 ){
        //1-ээс ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө.
        roundScore = roundScore + diceNumber;
        document.getElementById("current-" + activePlayer).textContent = roundScore;
    }else{
        // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.

        // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
        switchToNextPlayer();
    }
    }else{
        alert("Тоглоом дууссан байна. Шинээр тоглох товчийг дарж шинээр эхлэнэ үү");
    }
});

// HOLD Товчны эвент листенер.
document.querySelector(".btn-hold").addEventListener("click", function(){
   if(isNewGame){
     // Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нь нэмж өгнө.
     scores[activePlayer] = scores[activePlayer] + roundScore;

     // Дэлгэц дээр оноог нь өөрчилнө.
     document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
 
     // уг тоглогч хожсон эсэхийг (оноо нь 100-ё их эсэх )шалгах.
     if(scores[activePlayer] >= ylahScore){
         // Тоглоомыг дууссан төлөвт оруулна.
         isNewGame = false;
         //  ялагч гэсэн текстийг нэрнийх нь оронд гаргана
         document.getElementById("name-" + activePlayer).textContent = "ЯЛСАН!!!";
         document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
         document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
     }else{
     // Тоглогчийн ээлжийг солино.
     switchToNextPlayer();
     }
   }
   else{
    alert("Тоглоом дууссан байна. Шинээр тоглох товчийг дарж шинээр эхлэнэ үү");
}
});
// энэ цункц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлнэ.
function switchToNextPlayer(){
    // Ээлжийн оноог нь 0 болгоно.
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = "0";
    // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;
    // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ.
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    // Улаанаа цэгийг шилжүүлэх 
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    // Шоог түр алга болгоно.
    diceDom.style.display = "none";
}

//  New Game буюу Шинэ тоглоом эхлүүлэх товчний эвент листенер.
document.querySelector(".btn-new").addEventListener("click", initGame);
