let score = 0;
const numberWords = {
  1: "ONE", 2: "TWO", 3: "THREE", 4: "FOUR", 5: "FIVE",
  6: "SIX", 7: "SEVEN", 8: "EIGHT", 9: "NINE", 10: "TEN"
};
function generateQuestion() {
  const number = Math.floor(Math.random() * 10) + 1;
  const word = numberWords[number];
  const maxMissing = Math.min(4, word.length - 1);
  const missingCount = Math.floor(Math.random() * maxMissing) + 1;
  const missingIndices = [];
  while (missingIndices.length < missingCount) {
    const idx = Math.floor(Math.random() * word.length);
    if (!missingIndices.includes(idx)) missingIndices.push(idx);
  }
  const correctLetters = {};
  const displayWord = word.split("").map((char, i) => {
    if (missingIndices.includes(i)) {
      correctLetters[i] = char;
      return '<span class="drop-zone" data-index="' + i + '"></span>';
    } else {
      return char;
    }
  }).join("");
  $("#question").html(number + " - " + displayWord);
  const options = Object.values(correctLetters);
  while (options.length < 6) {
    const randChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    if (!options.includes(randChar)) options.push(randChar);
  }
  options.sort(() => Math.random() - 0.5);
  $("#options").empty();
  options.forEach((opt) => {
    const $opt = $('<div class="option" draggable="true">' + opt + '</div>');
    $opt.on("dragstart", function (e) {
      e.originalEvent.dataTransfer.setData("text/plain", opt);
    });
    $("#options").append($opt);
  });
  $(".drop-zone").each(function () {
    const $zone = $(this);
    const index = parseInt($zone.attr("data-index"));
    const correctLetter = correctLetters[index];
    $zone.on("dragover", function (e) {
      e.preventDefault();
    }).on("drop", function (e) {
      e.preventDefault();
      const dropped = e.originalEvent.dataTransfer.getData("text");
      if (dropped === correctLetter) {
        $zone.text(dropped).addClass("correct");
        score++;
        $("#score").text(score);
      } else {
        $zone.text(dropped).addClass("incorrect");
      }
      $zone.off("drop").off("dragover");
    });
  });
}
$("#nextBtn").on("click", function () {
  generateQuestion();
});
$('#homebtn').click(function() {
	window.location.href = `index.html`;
});
$(document).ready(function () {
  generateQuestion();
});
