const bgMusic = document.getElementById("bgMusic");
const jackpotSound = new Audio('jackpot.mp3'); // отдельный звук для джекпота

const spinBtn = document.getElementById("spinBtn");

spinBtn.addEventListener("click", () => {
  // запускаем фоновую музыку один раз при первом клике
  if(bgMusic.paused){
    bgMusic.play().catch(err => console.log("Музыка не запущена:", err));
  }
  spin(); // запускаем слот
});

function generateLines(reelsCount, rowsCount) {
  let lines = [];
  // горизонтальные линии
  for(let r=0; r<rowsCount; r++){
    let line = [];
    for(let c=0; c<reelsCount; c++) line.push(c);
    lines.push({indices: line, row: r});
  }
  return lines;
}

const lines = generateLines(7, 4); // для 7 катушек и 4 рядов
