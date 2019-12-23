document.write('div')

// 类型化数组 ==============================
buffer=new ArrayBuffer(8)
// 视图 ====================================
v1=new DataView(buffer)
// v2=new DataView(buffer,0,4)
// v3=new DataView(buffer,4,4)

// 获取值 getUint16
function getBuffer(V){
  var str=""
  for(let i=0,len=V.buffer.byteLength;i<len;i+=2){
    str+=V.getUint16(i)+' '
 }
 return str
}
// 写入body中
function write(v){
  var value
  if(!v.length){value=getBuffer(v)}
  else value=getV(v)
  document.body.innerText=value
}
write(v1)

// 设置值, 默认是10进制，16进制
v1.setUint16(0,'0xff')
v1.setUint16(2,50)
write(v1)

// 类型化视图============================
// int8s=new Int8Array(buffer)
// int16s=new Int16Array(buffer,0)
uint16s=new Uint16Array(buffer,0,4) // 原本长8字节，16位只有一半
uint16s=new Uint16Array(4) // 直接设置长度，实际占用8字节 // Uint16Array(4) [0, 0, 0, 0]

uint16s.set([255,50],0) // 设置值
uint16s=new Uint16Array([10,20,30,40]) // 直接赋值，长度为4 // Uint16Array(4) [10, 20, 30, 40]
function getV(V){
  var str=""
  for(let i=0,len=V.length;i<len;i++){
    str+=V[i]+' '
 }
 return str
}
write(uint16s)