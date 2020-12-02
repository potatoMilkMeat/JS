var a ='li.@mode @choose @lase[data-mode=@mode]>' +
         'a#nav_@mode.nav-@mode[href=@url title=@text]>'  +
             'i.nav-icon-@mode+span{@text}';

function regX(match, $1,$2,$3,$4,$5){
  console.log('*** ', match);
  window.arr =[]
  arr.push($1,$2,$3,$4,$5);
  console.log(arr);
}

function getPart(str){
  part = str
    .replace(/^\s+\s+$/g, '')
    .replace(/^\s+\s+$/g, '')
    .replace(/^\s+(>)\s+/g, '$1')
    .split('>');  

}
function reg_str(str){
  str.replace(/^(\w+)([^\{\}]*)?(\{([@\w]+)\})?(.*?)$/, regX);
}


getPart(a);
for(var i=0,len=part.length;i<len;i++){
  reg_str(part[i]);
}

