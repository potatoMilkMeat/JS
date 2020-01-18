/**
 * FileList {0: File, length: 1}
 * File 对象
 *    lastModified:1566643883066  // new Date(1566643883066)
 *    lastModifiedDate: Sat Aug 24 2019 18:51:23 GMT+0800 (中国标准时间) // lastModifiedDate.getTime()
 *    name
 *    size
 *    type
 *    webkitRelativePath: ''
 */
var myFile = document.getElementById('myFile'), files, type, txt, div = document.getElementById('txt'),progress=document.getElementById('progress');

function formatSize(val) {
  return val > 1024 * 1024 ? val / (1024 * 1024) + "MB" : val > 1024 ? val / 1024 + 'KB' : val + 'B'
}

function filesAdd(event) {
  var files = event.target.files,
    i = -1,
    l = files.length,
    txt = '';

  while (++i < l) {
    var f = files[i]
    txt += f.name + "\n    类型：" + f.type + ",  大小：" + formatSize(f.size) + "  \n";

    // 处理图片
    if(/image/.test(f.type)){
      reader.readAsDataURL(f)
      type = 'image'
    }
    if(/text/.test(f.type)){
      reader.readAsText(f)
      type = 'text'
    }
  }
  div.innerText = txt
}


myFile.addEventListener('change', filesAdd)

/**
 * FileReader 类型
 *    result
 *    error 【code: 1表示未找到文件；2安全新错误；3读取中断；4文件不可读；编码错误；】
 *    readyState: 0,
 *    onabort: null
 *    onerror: null
 *    onload: null
 *    onloadend: null
 *    onloadstart: null
 *    onprogress: null
 */
function appendEle(){
  if(type === 'image'){
    var img = document.createElement('img');
    img.src = reader.result;
    img.with = '92px';
  }else if(type === 'text'){
    var div = document.createElement('div');
    div.innerText= reader.result;
  }else return

  document.body.appendChild(img || div);
}

function loading(event){
  if(event.lengthComputable){
    console.log((Math.round(event.loaded *10000 / event.total) /100) + '%');
  }
}

reader = new FileReader();
reader.onload=appendEle;
reader.onprogress = loading;
// reader.readAsText(files[0], 'utf-8'); // 文本读取，并以encoding 编码 默认为“utf-8”类型


