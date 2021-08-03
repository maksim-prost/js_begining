const NUMBER_STRING = 4;
const NUMBER_COLUMN = 4;
const SIZE_CELL =  '50 px';
var STOP_GAME = 8;
//список используемых цветов
var tableColor = ['red', 'yellow', 'lime', 'green', 'aqua', 'teal', 'blue', 'fuchsia ','red', 'yellow', 'lime', 'green', 'aqua', 'teal', 'blue', 'fuchsia ']
// глобальная переменная, хранящая количество секунд, прошедших с момента нажатия ссылки
var COUNT=0;
// глобальная переменная, хранящая идентификатор таймера
var TIMER;
//'координаты' предыдущей ячейки
var prev_i=-1, prev_j=-1;
//создаю объект таблица заданого размера NUMBER_STRING х NUMBER_COLUMN для каждой ячеки
//задаю размер ячейки
//задаю обработку события нажатия мыши
var table = document.getElementsByTagName('table')[0];
table.border = 'inherit';
for (let i = 0; i <  NUMBER_STRING; i++) {
	string = document.createElement('tr')
	for (let j = 0; j <  NUMBER_COLUMN; j++) {
		cell = document.createElement('th')
		cell.height =  SIZE_CELL;
		cell.width =  SIZE_CELL;
		cell.onclick = function () {findPair(i,j);};
		string.appendChild(cell)
	table.appendChild(string)
	}
}


var timerShow = document.getElementsByTagName('p')[0];
var startButton = document.getElementsByTagName('button')[0];
startButton.onclick = startCOUNT;

//функция перемешивает массив
function shuffle(array) {
  let m = array.length, i;
  // Пока элементы не перемешаны
  while (m) {
    //Выбираем случайный элемент
    i = Math.floor(Math.random() * m--);
    // Меняем местами с текущим
    [array[m] ,array[i]] = [array[i],array[m]];
  }
}

function findPair(i,j){
	// если таймер не запущен функция не выполняется
	if (!COUNT) return 1;
	// ячека окрашивается в свой цвет
	table.rows[i].cells[j].style.background = tableColor[i*NUMBER_STRING + j];
	// если есть окрашенная непарная ячейка и это не текущая ячейка и цвета ячеек совпадают, то
	if (prev_i >=0 && (prev_i != i || prev_j != j) &&
		tableColor[i*NUMBER_STRING + j] == tableColor[prev_i*NUMBER_STRING + prev_j]){
		// отключаю обработку нажатия кнопки на ячейки
		table.rows[i].cells[j].onclick = function () {};
		table.rows[prev_i].cells[prev_j].onclick = function () {};
		//все ячеки отрыты? останаливаю таймер, вывожу сообщение
		if (!--STOP_GAME){
			clearTimeout(TIMER);
			alert(`Вы выиграли, затраченное время ${timerShow.innerHTML}`);
		}
		//устанавливаю, что открытых одиночных ячеек нет
		prev_i=-1;
		prev_j=-1;
	}
	//есть окрашеная ячека, но цвета не совпадают? окрашиваю предыдущую ячейку в белый цвет
	else if (prev_i >=0) {
		//table.rows[i].cells[j].style.background = 'white';
		table.rows[prev_i].cells[prev_j].style.background = 'white';
		prev_i=i//-1;
		prev_j=j//-1;
	}
	//нет окрашенных ячеек? запоминаю "координаты" текущей
	else{
		prev_i=i;
		prev_j=j;
	}
	
}	
//функция проверяет !COUNT по правилу лжи, если оно истинно, перемешивает цвета
// проверяет выражение !TIMER по правилу лжи, если оно истинно, 
//то вызывает функцию timeCount() иначе перезагружает страницу

function startCOUNT() {
	if (!COUNT)
		shuffle(tableColor);
	if (!TIMER){
		button.innerHTML = "Новая игра";
	 	timeCount();
	}
	else
		window.location.reload();
}
//функция, выполняет следующее:
//1 - выводит значения переменной COUNT в элемент timerShow
//2 - увеличивает значения переменной на 1
//3 - запускает таймер, который вызовет функцию timeCount() через 1/1000 секунды

function timeCount() {
	timerShow.innerHTML = formatTime(COUNT)
	COUNT++;
	TIMER = window.setTimeout( timeCount,1);
}
//функция переводит милисекунды в минуты + секунды
function formatTime(ms) {
		let m, s;
		m = Math.floor(ms/60/1000);//минуты
		s = (ms/1000)%60;//секунды
		return `${m}:${s}`;
	}
