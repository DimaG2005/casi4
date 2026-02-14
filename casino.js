function checkWin(results){
  const rows = 7;
  const cols = 7;
  let totalPoints = 0;
  let jackpotHit = false;
  const winSymbols = []; // сюда складываем выигрышные символы

  // ===== проверка для всех символов =====
  const visited = Array(rows).fill(0).map(()=>Array(cols).fill(false));

  function dfs(r, c, sym, cluster){
    if(r<0 || r>=rows || c<0 || c>=cols) return;
    if(visited[r][c]) return;
    if(results[c][r] !== sym) return;

    visited[r][c] = true;
    cluster.push([r,c]);

    // соседи: вертикаль, горизонталь, диагональ
    dfs(r-1,c,sym,cluster);
    dfs(r+1,c,sym,cluster);
    dfs(r,c-1,sym,cluster);
    dfs(r,c+1,sym,cluster);
    dfs(r-1,c-1,sym,cluster);
    dfs(r-1,c+1,sym,cluster);
    dfs(r+1,c-1,sym,cluster);
    dfs(r+1,c+1,sym,cluster);
  }

  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      if(!visited[r][c]){
        const sym = results[c][r];
        const cluster = [];
        dfs(r,c,sym,cluster);

        if(cluster.length>=4){
          // подсветка
          cluster.forEach(([rr,cc])=>{
            reels[cc].children[rr].classList.add("win-highlight");
            setTimeout(()=>reels[cc].children[rr].classList.remove("win-highlight"),1500);
          });
          // начисляем очки
          let lineMultiplier = 1;
          cluster.forEach(([rr,cc])=>{
            if(results[cc][rr]==="🍭") lineMultiplier++;
          });
          totalPoints += cluster.length*10*lineMultiplier;

          if(cluster.length>=7) jackpotHit = true;
        }
      }
    }
  }

  // ===== сообщение пользователю =====
  if(jackpotHit){
    message.textContent="🎉 JACKPOT!!! 🎉";
    message.classList.add("jackpot");
    jackpotSound.play();
    for(let i=0;i<30;i++){
      const fruit = document.createElement("div");
      fruit.className="falling";
      fruit.style.left=Math.random()*window.innerWidth+"px";
      fruit.style.fontSize=(4+Math.random()*5)+"vw";
      fruit.textContent=symbols[Math.floor(Math.random()*symbols.length)];
      document.body.appendChild(fruit);
      setTimeout(()=>fruit.remove(),2500);
    }
    setTimeout(()=>message.classList.remove("jackpot"),4000);
  } else if(totalPoints>0){
    message.textContent=`Вы выиграли ${totalPoints} очков! 🎉`;
    message.classList.remove("jackpot");
  } else {
    message.textContent="Попробуйте ещё раз!";
    message.classList.remove("jackpot");
  }
}
