/**
 * table
 */
// 创建table
var table= document.createElement('table');
table.border=1;
table.width='100%';

// 创建tbody
var tbody= document.createElement('tbody');
table.appendChild(tbody);

// 创建第一行
var row1=document.createElement('tr');
tbody.appendChild(row1);

var cell1_1 = document.createElement('td');
cell1_1.appendChild(document.createTextNode('Cell 1-1'));
row1.appendChild(cell1_1);

var cell2_1= document.createElement('td');
cell2_1.appendChild(document.createTextNode('Cell 2-1'));
row1.appendChild(cell2_1);

// 创建第二行
var row2=document.createElement('tr');
tbody.appendChild(row2);

var cell1_2 = document.createElement('td');
cell1_2.appendChild(document.createTextNode('Cell 1-2'));
row2.appendChild(cell1_2);

var cell2_2= document.createElement('td');
cell2_2.appendChild(document.createTextNode('Cell 2-2'));
row2.appendChild(cell2_2);

// 加入到body 中
document.body.appendChild(table)

/**
 * table
 */
var table= document.createElement('table');
table.border=1;
table.width='100%';

var tbody= document.createElement('tbody');
table.appendChild(tbody);

tbody.insertRow(0);
tbody.rows[0].insertCell(0);
table.rows[0].cells[0].appendChild(document.createTextNode('Cell 1-1'));
tbody.rows[0].insertCell(1);
table.rows[0].cells[1].appendChild(document.createTextNode('Cell 2-1'));

tbody.insertRow(1);
tbody.rows[1].insertCell(0);
table.rows[1].cells[0].appendChild(document.createTextNode('Cell 1-2'));
tbody.rows[1].insertCell(1);
table.rows[1].cells[1].appendChild(document.createTextNode('Cell 2-2'));

document.body.appendChild(table)

table.createCaption()
table.caption.appendChild(document.createTextNode('我是标题'))