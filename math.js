let score = 0;
function generateQuestion() {
  const start = Math.floor(Math.random() * 97) + 1;
  const sequence = [start, start + 1, start + 2];
  const missingIndex = Math.floor(Math.random() * 3);
  const correctAnswer = sequence[missingIndex];
  const displaySequence = sequence.map((num, index) =>
    index === missingIndex ? '<span class="drop-zone" id="dropZone"></span>' : num
  );
  $("#question").html(displaySequence.join(", "));
  const options = [correctAnswer];
  while (options.length < 4) {
    const rand = Math.floor(Math.random() * 100) + 1;
    if (!options.includes(rand)) options.push(rand);
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
  $("#dropZone")
    .on("dragover", function (e) {
      e.preventDefault();
    })
    .on("drop", function (e) {
      e.preventDefault();
      const dropped = parseInt(e.originalEvent.dataTransfer.getData("text"));
      if (dropped === correctAnswer) {
        $(this).text(dropped).addClass("correct");
        score++;
        $("#score").text(score);
      } else {
        $(this).text(dropped).addClass("incorrect");
      }
      $(".option").attr("draggable", false);
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
