//полученик объекта для для вставки поля ввода и кнопки
var body = document.getElementsByTagName('body')[0];
//создание объектов поле ввода и кнопка
var input =  document.createElement('input');
var button = document.createElement('button');
//надпись на кнопке
button.innerHTML = 'OK';
//прикрепить к событию кнопки onclick функцию
button.onclick = knightMove;
//создать параграф 
var p = document.createElement('p');
p.innerHTML = 'Исходное полжение';
// p.style.fontWeight = 'bold';

//добавить созданные элементы в элемент body html
body.appendChild(p);
body.appendChild(input);
body.appendChild(document.createElement('p'))
body.appendChild(button);

//функция выводящая все возможные ходы шахматного коня из заданной позиции
function knightMove () {
	//если поле ввода пусто,ничего не выводить
	if (!input.value)
		return 1;
	//преобразовать положение фигуры к числовым значениям
	var {c,r} = formatEnter(input.value);
	//проверить формат ввода, если не верен вывести предупреждение
	if (isNaN(r)||c<1 || r <1 || c>8 || r>8){
		alert('Неверный формат ввода положения шахматного коня');
		input.value = ""
		return 1;
	}
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
    	let [a ,b]= tmp[i];//[0]= tmp[i][1];
    	// console.log(a, b)
    	if ((a>0) & (b>0) & (a<=8) & (b<=8))
            //преобразует числовой формат положения, в буквенно-числовой
            rez.push(formatOutput(a,b));
	}
	//вывод возможных ходов, коня
	alert (`Возможные варианты хода \n\n\n ${rez}`);
}

function formatOutput(letter, number) {
	//преобразует числовой формат положения фигуры к буквенно-числовому
	return 'ABCDEFGH'[letter-1]+number.toString();
}

function formatEnter (string) {
	//преобразует первый символ строки  в числовое положение фигуры
	let c = 'ABCDEFGH'.indexOf(string.slice(0,1).toUpperCase())+1;
	//преобразует второй символ строки в числовое положение фигуры
	let r = + string.slice(1);
	return {c,r};

}

