Blob.prototype.slice(0,32,"GBK")

function blobSlice(blob, startByte, length,contentType){
  return Blob.prototype.slice.call(blob,startByte,length,contentType);
}

var reader = new FileReader();
var files= document.getElementById('myFile').files;
var blob = blobSlice(files[0],0,32,"GBK");
if(blob){
  reader.readAsText(blob,"GBK");
  reader.onerror=(error)=>{ console.error(error); };
  reader.onload=(val)=>{ console.log('解析成功',val,reader.result); };
}