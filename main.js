document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("Whats Youer Name?");
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};
let duration = 1000;
// Creat Array From Game Blocks
let blocks = document.querySelectorAll(".memory-game-blocks .game-block");
//Create Range Of Keys
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  //Add Click Event
  block.addEventListener("click", function () {
    //Trigger The Flip Block Function
    flipBlock(block);
  });
});
// Flip Block Funtion
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let allFlippedBlocks = [...blocks].filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking Function
    stopClicking();
    // Check Matched Blocks Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    if (document.querySelectorAll(".has-match").length === 20)
      document.getElementById("win").play();
  }
}
// Stop Clicking Function
function stopClicking() {
  document.querySelector(".memory-game-blocks").classList.add("no-clicking");
  setTimeout(() => {
    document
      .querySelector(".memory-game-blocks")
      .classList.remove("no-clicking");
  }, duration);
}
// Check Matched Blocks Function
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technolgy === secondBlock.dataset.technolgy) {
    document.getElementById("success").play();
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    /////
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
  } else {
    document.getElementById("fail").play();
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

// Shuffle Function
function shuffle(arr) {
  let current = arr.length,
    temp,
    random;
  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);
    //Decrease Length By One
    current--;
    // [1] Save Current Element In Stash
    temp = arr[current];
    // [2] Current Element = Random Element
    arr[current] = arr[random];
    // [3] Random Element = Get Element From Stash
    arr[random] = temp;
  }
  return arr;
}
