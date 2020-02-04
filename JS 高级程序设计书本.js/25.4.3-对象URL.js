// blobURL

// 返回值是str，指向内存地址
// window.URL.createObjectURL(blob File | source | stream)

// 需要手动释放内存
// window.URL.revokeObjectURL(url)

document.write('<input type="file" id="input"><div style="width: 300px;height:100px;background: #f2f2f2;" id="droptarget">拖拽，支持一个文件</div><div id="output"></div>');
var input = document.getElementById('input'),files,reader = new FileReader(),url
    output= document.getElementById('output');

input.addEventListener('change', filesChange);
function filesChange(event){
  files = event.target.files;
  url = window.URL.createObjectURL(files[0]);

  if(url){
    if(/image/.test(files[0].type)) output.innerHTML = '<img src="'+url+'">';
    else if(/text/.test(files[0].type)){
      reader.readAsText(files[0], "GBK");
      reader.onerror=(error)=>{ console.error(error); };
      reader.onload=(val)=>{ console.log('解析成功',val); output.innerText = reader.result;};
    }
  }else output.innerHTML = '你的浏览器不支持 对象URL';
}


// window.URL.revokeObjectURL(url)
// output.innerHTML = '<img src="'+url+'">'
// GET blob:http://localhost:5000/b3cb2de0-6afb-4597-9394-423c8fda6995 net::ERR_FILE_NOT_FOUND

// 文件拖拽
var droptarget= document.getElementById('droptarget');

function handleEvent(event){
  event.preventDefault(); // 阻止浏览器默认打开文件
  if(event.type ==="drop"){
    var f= event.dataTransfer.files[0]; // 获取文件
    droptarget.innerHTML = f.name + '【'+f.type + '，'+ f.size+ 'bytes 】';
  }
}
droptarget.addEventListener("dragenter", handleEvent);
droptarget.addEventListener("dragover", handleEvent);
droptarget.addEventListener("drop", handleEvent);