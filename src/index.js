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

function onSubmit(submittedAnswer) {
  console.log(submittedAnswer);
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

    onSubmit(submittedAnswer);

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
main();
