var tiles = []; /*плитка*/
var freeCell = {y: 3, x: 3}; /*свободная ячейка */
/*для избежания проверки на собранность во время перемешивания*/
var shuffled=false;

/*создать поле*/
function createField() {
	var x, y, cell/*клетка*/;
	for (y = 0; y < 4; ++y) {
		for (x = 0; x < 4; ++x) {
			cell = createCellNull()/*создать пустую ячейку*/;
			cell.y = y;
			cell.x = x;
			setCellOffset(cell); /*установить смещение ячейки*/
			appendCell(cell);/*добавить ячейку к игромому полю*/
		}
	}
};

/*создать пустую ячейку*/
function createCellNull() {
	var cell = document.createElement("div");/*Создаёт новый элемент с заданным тегом*/
	cell.classList.add/*Добавляет элементу указанные классы*/("field__cell" , "field__cell--null");
	return cell;
};
/*создать клеточную плитку */
function createCellTile() {
	var cell = document.createElement("div");/*Создаёт новый элемент с заданным тегом*/
	cell.classList.add/*Добавляет элементу указанные классы*/("field__cell" , "field__cell--tile");
	return cell;
};

/*установить смещение ячейки*/
function setCellOffset(cell) {
    /* px необходимо, так как это значение свойства CSS*/
	cell.style.left = (15 + (15 + 81.25) * cell.x) + "px";
	cell.style.top = (15 + (15 + 81.25) * cell.y) + "px";
};

/*добавить ячейку к игромому полю*/
function appendCell(cell) {
	var field = document.getElementById("field");/*возвращает ссылку на элемент, который имеет атрибут id с указанным значением*/
	field.appendChild(cell);/*добавляет узел в качестве последнего дочернего узла в указанный родительский элемент*/
};

/* создание костяшек*/
function createTiles() {
	var x, y, cell, n;
	for (y = 0; y < 4; ++y) {
		for (x = 0; x < 4; ++x) {
			n=y*4+x+1;
            /* всего костяшек должно быть 15 */
			if (n < 16) {
				cell = createCellTile(); /*создать клеточную плитку */
				cell.y = y;
				cell.x = x;
				cell.innerHTML = n;/*позволяет получить HTML-содержимое элемента в виде строки*/
				setCellOffset(cell); /*установить смещение ячейки*/
				appendCell(cell); /*добавить ячейку к игромому полю*/
				/* добавляем костяжку в массив */
				tiles.push(cell);/*добавляет один или более элементов в конец массива и возвращает новую длину массива*/
			}
		}
	}
}
/*анимация плиток*/ /*length - для определения количества элеметов*/
function animateTiles() {
	var i;
	for (i=0; i<tiles.length; ++i){
		tiles[i].addEventListener("click", tileClick); /* обработчик события при нажатии */
	}
}

function tileClick(event) {
	var bar = event.target, i, tile;
	/* запоминаем старые коррдинаты нажатой ячейки*/
	var oldX = bar.x, oldY = bar.y;
	if (bar.y == freeCell.y) {
		for(i=0; i< tiles.length; ++i){
			tile = tiles[i];
			if(tile.y == bar.y && between(bar.x, freeCell.x, tile.x)) {
				if(bar.x < freeCell.x) tile.x += 1;
				else tile.x -= 1;
				setCellOffset(tile);
			}
			
		}
	
		freeCell = {y: oldY, x: oldX};
	} else if (bar.x == freeCell.x) {
		for(i=0; i< tiles.length; ++i){
			tile = tiles[i];
			if(tile.x == bar.x && between(bar.y, freeCell.y, tile.y)) {
				if(bar.y < freeCell.y) tile.y += 1;
				else tile.y -= 1;
				setCellOffset(tile);
			}
			
		}
	
		freeCell = {y: oldY, x: oldX};
	}
    /* если перемешивание закончено, проверяем, собрана ли головоломка */
	if (shuffled) {
	 checkVictory();
}
}

function shuffleTiles() {
	var i, index;
	for(i = 0; i < 1000; ++i){
	index = Math.floor(Math.random() * tiles.length);
	tiles[index].click();
}
	shuffled = true;

}




function between(a,b,t) {
				return a <= t && t <= b || b <= t && t <= a;
}

function checkVictory() {
	var i, n;
	for(i = 0; i < tiles.length; ++i) {
	 n = tiles[i].y * 4 + tiles[i].x + 1;
        /* нестрогое сравнение, так как innerHTML - строка*/
	 if (tiles[i].innerHTML !=n) return;
}
/*alert("ПОБЕДА!")*/
document.getElementById("modal").classList.add("modal--visible");

}				 

createField();
createTiles();
animateTiles();
shuffleTiles();



