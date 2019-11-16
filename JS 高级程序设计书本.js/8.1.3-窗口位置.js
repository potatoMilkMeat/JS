/**
 * 获取窗口位置
 */
var leftPos= (typeof window.screenLeft === 'number') ? window.screenLeft : window.screenX;
var topPos= (typeof window.screenTop === 'number') ? window.screenTop : window.screenY;

/**
 * 打开窗口
 * chrome 默认打开地址栏和状态栏
 * 360浏览器 默认打开带状态栏
 */
window.open('http://www.baidu.com',"_blank","fullscreen=yes,height=800,width=1500,left=0,top=0,resizable=yes")

/**
 * 移动位置 只能对window.open() 打开的页面 才起效果
 */
moveBy(-50,-50) // undefined
moveTo(0,0) // undefined

/**
 * 关闭窗口  只能对window.open() 打开的页面 才起效果
 * 浏览器自己打开的默认页面
 */
window.close()
