function createQuestionElement(questElement, optionsElement, quizQuestion) {
  questElement.textContent = quizQuestion.question;
  optionsElement.innerHTML = "";
  quizQuestion.options.forEach((opt) => {
    const option = document.createElement("span");
    option.classList.add("option");
    option.textContent = opt;
    optionsElement.appendChild(option);
  });

  optionsElement.childNodes.forEach((option) => {
    option.addEventListener("click", function () {
      this.style.backgroundColor = "#51e2ff";
      this.style.color = "#213a62";
      let index = 0;
      optionsElement.childNodes.forEach((opt) => {
        if (opt !== this) {
          opt.removeAttribute("style");
        } else {
          chosenAnswerIndex = index;
        }
        ++index;
      });
    });
  });
}

function startTimer() {
  const submitBtn = document.querySelector(SUBMIT_BTN_SELECTOR);
  const timerElement = document.querySelector(TIMER_ELEMENT_SELECTOR);
  let timerInterval = null;
  let timerCounter = 10;
  timerInterval = setInterval(() => {
    timerCounter -= 1;
    timerElement.textContent = `00:0${timerCounter}`;
    if (timerCounter == 0) {
      clearInterval(timerInterval);
      submitBtn?.click();
    }
  }, 1000);
  return timerInterval;
}

function showOverlay(submittedAnswer) {
  let correctElement = document.querySelector(
    "#overlay > .ov-container > .correct"
  );
  let wrongElement = document.querySelector(
    "#overlay > .ov-container > .wrong"
  );
  let noneElement = document.querySelector("#overlay > .ov-container > .none");

  if (submittedAnswer == Answer.CORRECT) {
    correctElement.style = "display: block;";
    wrongElement.style = "display: none;";
    noneElement.style = "display: none;";
  } else if (submittedAnswer == Answer.WRONG) {
    correctElement.style = "display: none;";
    wrongElement.style = "display: block;";
    noneElement.style = "display: none;";
  } else if (submittedAnswer == Answer.NONE) {
    correctElement.style = "display: none;";
    wrongElement.style = "display: none;";
    noneElement.style = "display: block;";
  }

  const overlay = document.getElementById("overlay");
  overlay.classList.add("show");
  isOverlayShown = true;
}

function hideOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("show");
  isOverlayShown = false;
}

function onQuizComplete() {
  const submitBtn = document.querySelector(SUBMIT_BTN_SELECTOR);
  submitBtn.textContent = "RESTART";
}

function main() {
  const questElement = document.querySelector(QUESTION_ELEMENT_SELECTOR);
  const optionsElement = document.querySelector(OPTIONS_ELEMENT_SELECTOR);
  const questions = getQuestions(quizQuestions);
  createQuestionElement(
    questElement,
    optionsElement,
    questions[questionCounter]
  );

  let timerId = null;
  const submitBtn = document.querySelector(SUBMIT_BTN_SELECTOR);
  submitBtn?.addEventListener("click", function () {
    console.log("clicked");

    let submittedAnswer = Answer.WRONG;
    if (chosenAnswerIndex === null) {
      submittedAnswer = Answer.NONE;
    } else if (chosenAnswerIndex === questions[questionCounter].answer) {
      submittedAnswer = Answer.CORRECT;
    }

    /* On Submitting Answer */
    console.log(submittedAnswer);
    showOverlay(submittedAnswer);
    setTimeout(() => {
      hideOverlay();

      questionCounter += 1;
      if (questionCounter > 4) {
        quizComplete = true;
      }
      if (quizComplete) {
        onQuizComplete();
        return;
      }
      createQuestionElement(
        questElement,
        optionsElement,
        questions[questionCounter]
      );
      clearInterval(timerId);
      timerId = startTimer();
      chosenAnswerIndex = null;
    }, 2000);
  });

  startTimer();
}

const QUESTION_ELEMENT_SELECTOR = "#root_box > .question";
const OPTIONS_ELEMENT_SELECTOR = "#root_box > .options";
const TIMER_ELEMENT_SELECTOR = "#root_box .timer";
const SUBMIT_BTN_SELECTOR = "#root_box .submit";
let quizComplete = false;
let questionCounter = 0;
const Answer = {
  NONE: -1,
  WRONG: 0,
  CORRECT: 1,
};
let chosenAnswerIndex = null;
let isOverlayShown = false;
main();
