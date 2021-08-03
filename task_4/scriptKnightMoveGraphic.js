const NUMBER_STRING = 8;//количество строк шахматной доски
const NUMBER_COLUMN = 8;//столбцов
const SIZE_CELL =  '50 px';//размер ячейки
const COLOR_POSSIBLE_MOVE = 'green';//цвет подсветки возможных ходов
const COLOR_CURRENT_POSITION = 'blue'//цвет подсветки текущего положения фигуры
const TIME_LIGHT = 10;//время подсветки возможных ходовё
var lighhting;//какие ячейки сейчас подсвеченны
var body = document.getElementsByTagName('body')[0];//получить html элемент body, для добавления нужных элементов 
var table =  document.createElement('table');//создаем элемент таблица, добавляем нужные свойства
table.border = 'inherit';

//создаю объект таблица заданого размера NUMBER_STRING х NUMBER_COLUMN для каждой ячеки
//задаю размер, цвет  ячейки
//задаю обработку события нажатия мыши
for (let i = 0; i <  NUMBER_STRING; i++) {
	string = document.createElement('tr')
	for (let j = 0; j <  NUMBER_COLUMN; j++) {
		// if ((i+j)%2)
		let	cell = document.createElement('th')
		cell.height =  SIZE_CELL;
		cell.width =  SIZE_CELL;
		cell.style.background = colorCell(i,j); //%2 ? 'black':'white';
		cell.onclick = function () {knightMove(i,j);};
		string.appendChild(cell)
	table.appendChild(string)
	}
}
//добавляю таблицу в объект body
body.appendChild(table);

//в зависимости от положения ячейки возвращает ее цвет
function colorCell(i,j) {
	return (i+j)%2 ? 'black':'white';
}

function knightMove (c,r) {
	//создает все возможные ходы шахматного коня в том числе за пределы шахмотной доски
	var tmp=[] 
    tmp.push([c+2,r+1]);
    tmp.push([c+2,r-1]);
    tmp.push([c-2,r+1]);
    tmp.push([c-2,r-1]);
    tmp.push([c+1,r+2]);
    tmp.push([c-1,r+2]);
    tmp.push([c+1,r-2]);
    tmp.push([c-1,r-2]);
    var rez = [];
     // из всех возможных ходов шахматного коня оставляет те, что в пределах шахматной доски
    for (let i = 7; i >= 0; i--) {
    	let [a ,b] = tmp[i];
    	if ((a>=0) & (b>=0) & (a<8) & (b<8))
            rez.push([a,b]);
	}
	//если есть подсвеченные ячейки вызывает функцию для отключения подсветки
	// if (typeof lighhting != 'undefined')
	if (!!lighhting)
		lighhtingMovesOff(lighhting.c,lighhting.r,lighhting.arrayPosition);
	//вызывает функцию подсветки возможных ходов шахматного коня
	lighhtingMoves(c,r,rez);
	//через заданное время вызывает функцию для отключения подсветки возможных ходов
	window.setTimeout( 'lighhtingMovesOff(lighhting.c,lighhting.r,lighhting.arrayPosition)',TIME_LIGHT*1000)

	
}
//функции по предаваемым значениям присваивают, ячейкам таблицы необходимые цвета
function lighhtingMoves(c,r,arrayPosition) {
	table.rows[c].cells[r].style.background = COLOR_CURRENT_POSITION;
	for (let posit of arrayPosition ){
		let [c,r] =posit;
		table.rows[c].cells[r].style.background = COLOR_POSSIBLE_MOVE;
	}
	//запоминаю какие ячеки сейчас подсвеченны
	lighhting ={c,r,arrayPosition};
}
function lighhtingMovesOff(c,r,arrayPosition) {
	table.rows[c].cells[r].style.background = colorCell(c,r);
	for (let posit of arrayPosition ){
		let [c,r] =posit;
		table.rows[c].cells[r].style.background = colorCell(c,r);;
	}
	lighhting = null;
}