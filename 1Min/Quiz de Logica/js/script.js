const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const retryButton = document.getElementById('retry-btn');
const retryMessage = document.getElementById('retry-message');
const sherloduck = document.getElementById('sherloduck-img');
const menubody = document.querySelector('.menu-body');
const copytext = document.getElementById('copymeme');
const optionsButton = document.getElementById('options-btn');
const flags = document.getElementById('flags');
const hora = document.getElementById('data-hora');
const supremeimg = document.getElementById('supremo-img');
const backcolor = document.getElementById('backcolor')

let shuffledQuestions, currentQuestionIndex;
let retryMessageVisible = false; // Variável para controlar a visibilidade da mensagem
let temporizador;

			// Função para formatar 1 em 01
			const zeroFill = n => {
				return ('0' + n).slice(-2);
			}

			// Cria intervalo
			const interval = setInterval(() => {
				// Pega o horário atual
				const now = new Date();

				// Formata a data conforme dd/mm/aaaa hh:ii:ss
				const dataHora = zeroFill(now.getUTCDate()) + '/' + zeroFill((now.getMonth() + 1)) + '/' + now.getFullYear() + ' ' + zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ':' + zeroFill(now.getSeconds());

				// Exibe na tela usando a div#data-hora
				document.getElementById('data-hora').innerHTML = dataHora;
			}, 1000);

var comboGoogleTradutor = null; //Varialvel global

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'pt',
        includedLanguages: 'en,es',
        layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
    }, 'google_translate_element');

    comboGoogleTradutor = document.getElementById("google_translate_element").querySelector(".goog-te-combo");
}

function changeEvent(el) {
    if (el.fireEvent) {
        el.fireEvent('onchange');
    } else {
        var evObj = document.createEvent("HTMLEvents");

        evObj.initEvent("change", false, true);
        el.dispatchEvent(evObj);
    }
}

function trocarIdioma(sigla) {
    if (comboGoogleTradutor) {
        comboGoogleTradutor.value = sigla;
        changeEvent(comboGoogleTradutor);//Dispara a troca
    }
}

var currentHowl = null
 
function createHowl() {
  var number = Math.floor((Math.random() * 14) + 1);
  currentHowl = new Howl({
    src:      ['Sound Effects/pewlotbf-backgroundmusic.mp3'],
    autoplay: false,
    loop:     false,
    volume:   1.0,
    onend:    function() {createHowl().play()}
  });
 
  return currentHowl
}
 
function showValue(newValue) {
  document.getElementById('range').innerHTML=newValue;
  currentHowl.volume(newValue);
}
 
var howl = createHowl();
howl.play();

seletor = document.querySelector("input");

function alterarCor() {
    document.body.style.backgroundColor = seletor.value;
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const soundId = this.dataset.sound;
            const sound = document.getElementById(soundId);

            if (sound) {
                sound.currentTime = 0;
                sound.play();
            }
        });
    });
startButton.addEventListener('click', startGame);
sherloduck.classList.remove('hide');

retryButton.addEventListener('click', () => {
    retryMessage.classList.add('hide');
    answerButtonsElement.classList.remove('hide');
    startGame();
});

document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keydown', handleRetryKeyPress);

answerButtonsElement.classList.add('hide');

optionsButton.addEventListener('click', () => {
    startButton.classList.add('hide');
    sherloduck.classList.add('hide');
    flags.classList.add('hide');
    supremeimg.classList.add('hide');
    optionsButton.classList.add('hide');
    hora.classList.add('hide')
    backcolor.classList.remove('hide')
    document.getElementById('range').classList.remove('hide')
    document.getElementById('volumeSlider').classList.remove('hide');
    document.getElementById('slidertxt').classList.remove('hide');
    document.getElementById('back-btn').classList.remove('hide');
    document.getElementById('colorwheel').classList.remove('hide');
    document.getElementById('options-msg').classList.remove('hide');
});

document.getElementById('back-btn').addEventListener('click', () => { /* Botão de voltar */
    document.getElementById('volumeSlider').classList.add('hide');
    document.getElementById('back-btn').classList.add('hide')
    document.getElementById('range').classList.add('hide')
    backcolor.classList.add('hide')
    supremeimg.classList.remove('hide');
    flags.classList.remove('hide');
    hora.classList.remove('hide');
    document.getElementById('end-game-message').classList.add('hide');
    optionsButton.classList.remove('hide');
    copytext.classList.remove('hide');
    startButton.classList.remove('hide');
    sherloduck.classList.remove('hide');
    document.getElementById('slidertxt').classList.add('hide');
    document.getElementById('colorwheel').classList.add('hide');
    document.getElementById('options-msg').classList.add('hide');
});

function resetTimer() {
    clearInterval(temporizador); // Limpa o temporizador atual
    document.getElementById('timer').innerText = '120'; // Reinicia o temporizador para 120 segundos
    temporizador = null; // Reseta a variável do temporizador
}

function startGame() {
    console.log('Iniciado');
    startButton.classList.add('hide');
    optionsButton.classList.add('hide');
    flags.classList.add('hide');
    supremeimg.classList.add('hide');
    hora.classList.add('hide');
    copytext.classList.add('hide');
    menubody.classList.toggle('hide-border')
    sherloduck.classList.add('hide');
    retryButton.classList.add('hide');
    answerButtonsElement.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    retryMessageVisible = false;
    setCorrectQuestion();
    let tempoRestante = 120;
    

    const temporizador = setInterval(() => {
        tempoRestante--;
        document.getElementById('timer').innerText = tempoRestante;

        if (tempoRestante <= 0 || currentQuestionIndex >= questions.length) {
            clearInterval(temporizador);

            if (currentQuestionIndex >= questions.length) {
                // Se não houver mais perguntas, mostrar a mensagem de fim do jogo
                showEndGameMessage();
            } else {
                // Se o tempo acabou, mostrar a mensagem de erro
                showRetryMessage();
            }
        }
    }, 1000);
}

function showRetryMessage() {
    retryMessage.classList.remove('hide');
    answerButtonsElement.classList.add('hide');
    retryMessageVisible = true;
    questionElement.classList.add('hide');
    resetTimer(); // Reseta o temporizador
}

function showEndGameMessage() {
    // Adicione aqui o código para mostrar a mensagem de fim do jogo
    // Por exemplo:
    document.getElementById('end-game-message').classList.remove('hide');
    document.getElementById('trophygif').classList.remove('hide');
    document.getElementById('timer').classList.add('hide');
    menubody.classList.toggle('hide-border');

}




function returnToMainMenu() {
    startButton.classList.remove('hide');
    questionContainerElement.classList.add('hide');
    currentQuestionIndex = 0;
    resetState();
}

function handleKeyPress(e) {
    if (e.key === 'r' || e.key === 'R') {
        if (retryMessageVisible) {
            returnToMainMenu();
        }
    }
}

function handleRetryKeyPress(e) {
    if (e.key === 'r' || e.key === 'R') {
        if (retryMessageVisible) {
            retryMessage.classList.add('hide');
            menubody.classList.toggle('hide-border')
            answerButtonsElement.classList.remove('hide');
            startGame();
        }
    }
}

function setCorrectQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainerElement.classList.add('hide');
    questionElement.classList.add('hide');

    setTimeout(() => {
        questionElement.innerText = question.question;
        questionContainerElement.classList.remove('hide');
        questionElement.classList.remove('hide');
    }, 500);

    question.answers.forEach(answer => {
        const img = document.createElement('img');
        img.src = answer.imgSrc;
        img.classList.add('btn');
        if (answer.correct) {
            img.dataset.correct = answer.correct;
        }
        img.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(img);
    });
}

function resetState() {
    clearStatusClass(document.body);
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });

    if (correct) {
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                setCorrectQuestion();
            } else {
                // Fim do jogo
                questionContainerElement.classList.add('hide');
                startButton.innerText = 'Restart';
                document.getElementById('back-btn').classList.remove('hide');

                resetTimer(); // Reseta o temporizador
            }
        }, 1000);
    } else {
        retryMessage.classList.remove('hide');
        answerButtonsElement.classList.add('hide');
        retryMessageVisible = true; // A mensagem está visível
        questionElement.classList.add('hide'); // Oculta questionElement
        questionElementVisible = false; // Atualiza o estado
        resetTimer(); // Reseta o temporizador
    }
}

function handleRetryKeyPress(e) {
    if (e.key === 'r' || e.key === 'R') {
        if (retryMessageVisible) {
            retryMessage.classList.add('hide');
            menubody.classList.toggle('hide-border');
            answerButtonsElement.classList.remove('hide');
            startGame();
            if (!questionElementVisible) {
                questionElement.classList.toggle('hide');
                questionElementVisible = !questionElementVisible;
            }
        }
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Qual é a negação da seguinte afirmação: "O céu está azul"?',
        answers: [
            { imgSrc:'Source/q1ceunao.png', correct: true },
            { imgSrc: 'Source/ntermiados/O-ceu-esta-verde.png', correct: false },
            { imgSrc:'Source/ntermiados/O-ceu-nunca-foi-azul.png', correct: false },
            { imgSrc: 'Source/ntermiados/O-cu-deixou-de-ser-azul.png', correct: false }
        ]
    },
    {
        question: ' Se hoje é segunda-feira, qual é a resposta correta para a afirmação: "Amanhã será quinta-feira"?',
        answers: [
            { imgSrc:'Source/ntermiados/Verdadeiro.png', correct: false },
            { imgSrc: 'Source/ntermiados/Nao-e-possivel-determina.png', correct: false },
            { imgSrc:'Source/ntermiados/Falso.png', correct: true },
            { imgSrc: 'Source/ntermiados/Depende-do-mes.png', correct: false }
        ]
    },
    {
        question: 'Complete a seguinte sequência lógica: 2, 4, 8, __, 32.',
        answers: [
            { imgSrc:'Source/q130.png', correct: false },
            { imgSrc: 'Source/q128.png', correct: false },
            { imgSrc:'Source/q116.png', correct: true },
            { imgSrc: 'Source/q124.png', correct: false }
        ]
    },
    {
        question: 'Se todos os gatos têm rabo, e Miau é um gato, qual é a conclusão lógica correta?',
        answers: [
            { imgSrc:'Source/q1alggatntrabo.png', correct: false },
            { imgSrc: 'Source/ntermiados/Miau-tem-rabo.png', correct: true },
            { imgSrc:'Source/ntermiados/Miau-nao-tem-rabo.png', correct: false },
            { imgSrc: 'Source/ntermiados/Nao-e-possivel-determina.png', correct: false }
        ]
    },
    {
        question: 'Se Maria é mais alta que João e João é mais alto que Carlos, qual das seguintes afirmações é verdadeira?',
        answers: [
            { imgSrc:'Source/ntermiados/Maria-e-mais-alta-que-Ca.png', correct: true },
            { imgSrc: 'Source/ntermiados/Maria-e-mais-baixa-que-C.png', correct: false },
            { imgSrc:'Source/ntermiados/Carlos-e-mais-alto-que-M.png', correct: false },
            { imgSrc: 'Source/ntermiados/Nao-e-possivel-determina.png', correct: false }
        ]
    },
];
});

