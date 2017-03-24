$(document).ready(function() {
  $(".nota").keydown(function(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [
      46,
      8,
      9,
      27,
      13,
      110,
      190
    ]) !== -1 ||
    // Allow: Ctrl/cmd+A
    (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: Ctrl/cmd+C
    (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: Ctrl/cmd+X
    (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: home, end, left, right
    (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });

  $("#submit1").click(function() {
    var finalResult = 0;
    var avarage = getAvarage();

    if (avarage >= 4 && avarage < 7) {

      nota = avarage.toFixed(2);
      $("body").css("background-color", "#FFD740");
      $("footer").css("background-color", "#d5b334");
      $("#title").text("Sua média foi " + nota);
      createTitle2("Você terá que fazer a prova final precisando tirar " + calcHowMuchNeeded(Number(nota)));
      removeThings();

      createFinalSubtitle();
      createFinalNoteInput();
      calcBtn(calcHowMuchNeeded(Number(nota)), finalResult);

    } else if (avarage >= 7 && avarage <= 10) {
      success(avarage.toFixed(2));

    } else if (avarage < 4) {
      fail(avarage.toFixed(2));
    } else {
      invalid();
    }

  });

});

function getAvarage() {
  const notasLength = 5;
  var arr = [];
  var result = 0;
  var counter = 0;

  for (var i = 1; i <= notasLength; i++) {
    arr.push($(`#nota${i}`).val());
  }


  for (i = 0; i < arr.length; i++) {
    if (arr[i] != '') {
      result += Number(arr[i]);
      counter++;
    }
  }

  return (result / counter);
}

function invalid() {
  alert("Você digitou uma nota inválida, tente novamente");
  location.reload();
}

function createTitle2(text) {
  var $title2 = $("<h3>", {
    id: "title2"
  });
  $title2.text(text);
  $("#title").append($title2);
}

function createFinalNoteInput() {
  var $input = $("<input>", {
    id: "notaFinal",
    "class": "form-control nota",
    "maxLength": 4,
    "placeholder": "Nota"
  });
  $(".form-inline").append($input);
}

function createFinalSubtitle() {
  $("#title").append("<h3>Digite sua nota no exame final:</h3>");
}

function createResetBtn() {
  var $button = $("<button>", {
    id: "resetBtn",
    "class": "btn btn-reset btn-lg"
  });
  $button.text("Voltar");
  $button.click(function() {
    location.reload();
  });
  $(".container").append($button);
}

function calcBtn(nota, finalResult) {
  var $button = $("<button>", {
    id: "submitFinal",
    "class": "btn btn-calc btn-lg"
  });
  $button.text("Calcular");
  $button.click(function() {
    notaFinal = $('#notaFinal').val();
    if (notaFinal != '') {
      finalResult = calcFinalNote(nota, notaFinal);
      verifyFinalResult(finalResult.toFixed(2));
    }

  });
  $(".container").append($button);
}

function verifyFinalResult(finalResult) {
  if (finalResult >= 5 && finalResult < 10) {
    success(finalResult);
    $("#notaFinal").remove();
    $("#submitFinal").remove();
  } else if (finalResult < 5 && finalResult >= 0) {
    fail(finalResult);
    $("#notaFinal").remove();
    $("#submitFinal").remove();
  } else {
    invalid();
  }
}

function fail(nota) {
  $("body").css("background-color", "#e53935");
  $("footer").css("background-color", "#bb302d");
  $("#title").text("Sua média foi " + nota);
  createTitle2("Você não passou :(");
  removeThings();
  createResetBtn();
}

function success(nota) {
  $("body").css("background-color", "#388e3c");
  $("footer").css("background-color", "#2a702d");
  $("#title").text("Sua média foi " + nota);
  createTitle2("Parabéns, você passou!");
  removeThings();
  createResetBtn();
}

function removeThings() {
  $("#subtitle").remove();
  $("#nota1").remove();
  $("#nota2").remove();
  $("#nota3").remove();
  $("#nota4").remove();
  $("#nota5").remove();
  $("#submit1").remove();
}

function calcHowMuchNeeded(element) {
  diff = element - 4.0;
  return (6.5 - diff * 1.5).toFixed(2);
}

function calcFinalNote(media, notaFinal) {
  diff = media - notaFinal;
  return Number(5.0 - (diff * 0.4));
}
