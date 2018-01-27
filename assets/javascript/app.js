// Array questions and answers
var triviaQuestions = [{
    question: "What is Fergie's real name?",
    answerList: ["A. Fergie is her real name", "B. Ann Stacy Fergie", "C. Stacie Ann Ferguson", "D. None of the above"],
    answer: 2
}, {
    question: "Which was Eminem's most controversal song?",
    answerList: ["A. We Made You", "B. Stan", "C. The Storm", "D. The Real Slim Shady"],
    answer: 2
}, {
    question: "What was the name of Destiny's Child's first album?",
    answerList: ["A. Destiny's Child", "B. Survivor", "C. The Writings On the Wall", "D. None of the above"],
    answer: 0
}, {
    question: "Who was the first female artist to debut on the Billboard album chart at number one?",
    answerList: ["A. Mariah Carey", "B. Sade", "C. Madonna", "D. Whitney Houston"],
    answer: 3
}, {
    question: "What Michael Jackson album is the second best-selling album ever?",
    answerList: ["A. Dangerous", "B. Thriller", "C. Bad", "D. Off the Wall"],
    answer: 1
}, {
    question: "T-Pain: I'm a buy you a ________",
    answerList: ["A. Diamond", "B. House", "C. Drank ", "D. Car"],
    answer: 2

}, {
    question: "What is Jay-z’s real name? ",
    answerList: ["A. Kobe Bryant", "B. Shawn Carter", "C. Usher Raymond", "D. Curtis Jackson"],
    answer: 1
}, {
    question: "What singer recorded Age Ain’t Nothing But a Number and One in A Million before her tragic death in 2001?",
    answerList: ["A. Britney Spears", "B. Jessica Simpsons", "C. Rihanna", "D. Aaliyah"],
    answer: 3
}, {
    question: "Which Kardashian married to Kayne West?",
    answerList: ["A. Kim Kardashian", "B. Kourtney Kardashian", "C. Khloé Kardashian", "D. Robert Kardashian"],
    answer: 0
}, {
    question: "Who sings the song Shape of You?",
    answerList: ["A. Charlie Puth", "B. Bruno Mars", "C. Ed Sheeran", "D. Justin Bieber"],
    answer: 2

}];

var imagesArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
    correct: "Correct!",
    incorrect: "Wrong!",
    endTime: "Out of time!",
    finished: "Well done! Let's see how well you did."
}

// start button
$('#startBtn').on('click', function() {
    $(this).hide();
    reset();
});

// start over button
$('#startOverBtn').on('click', function() {
    $(this).hide();
    reset();
});


//clear our message, correct answer, and image every time load a new question.
function newQuestion() {
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#images').empty();
    // answered = true;

    //sets up new questions & answerList
    // show number of questions out of the total questions
    $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
    // display questions in html
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    // looping through the answerlist for mulpitle choice
    for (var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({ 'data-index': i });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }

    // after clicking on an answer the timer will pause then goes to the answer page
    countdown();
    $('.thisChoice').on('click', function() {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

// timer
function countdown() {
    seconds = 30;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

// clear the pages
function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty();
    $('.question').empty();

    // Going through the questions and answers
    var correctAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var correctAnswerIndex = triviaQuestions[currentQuestion].answer;
    $('#images').html('<img src = "assets/images/' + imagesArray[currentQuestion] + '.gif" width = "300px">');

    //checks to see correct, incorrect, or unanswered
    if ((userSelect == correctAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $('#message').html(messages.correct);

    } else if ((userSelect != correctAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + correctAnswerText);

    } else {
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + correctAnswerText);
        answered = true;
    }

    if (currentQuestion == (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 3000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 3000);
    }
}

// Reset
function reset() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

// scoreboard
function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#images').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html("<button class = 'btn btn-primary btn-lg btn block' id='startOverBtn'>Start Over</button>");
}