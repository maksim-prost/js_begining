const ACCURACY = 100000 //точность выводимой суммы
//после загрзки объекта window выполняю функцию init
window.onload = init;

function init(){
	//получаю объекты документа: кнопка и массив полей ввода   
	var button = document.getElementById('button');
	var numbers = document.getElementsByClassName('number')
	//к событию кнопки нажатие мыши прикрепляем функцию
	button.onclick = () =>{
		let sum = 0
		//скдадывает значение в полях ввода
		for (let i of numbers){
			sum +=  +i.value 
		}
		//выводит результат вычислений
		alert (`Сумма  равняется ${Math.round(sum*ACCURACY)/ACCURACY}`)
	};
}
