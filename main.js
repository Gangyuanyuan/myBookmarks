// 1. 初始化数据
var hashA = init()
var keys = hashA['keys']
var hash = hashA['hash']

// 2. 生成键盘
generateKeyboard(keys,hash)

// 3. 监听用户动作
listionToUser(hash)

// 4. 工具函数
function getFromLocalStorage(name){
	return JSON.parse(localStorage.getItem(name) || 'null')
}

function tag(tagName){
	return document.createElement(tagName)      // 用文档创建一个div
}

function createSpan(textContent){
	var span = tag('span')
		span.textContent = textContent          // kbd中span的文本内容
		span.className = "text"
		return span
}

function createButton(id){
	var button = tag('button')
	button.textContent = '编辑'
	button.id = id
	// 为什么下面用target而不用button
	// 因为button是一个容器，存的是变量，每点击一次button中存放的都是循环26次后的赋值
	button.onclick = function(xzkjcnxlkcjlk){  // 监听点击事件（括号里名字随便取）
		var button2 = xzkjcnxlkcjlk['target']  // xzkjcnxlkcjlk['target'] 就是用户点击的元素
		var img2 = button2.previousSibling      // 前一个元素
		var key = button2['id']                // q,w,e,r……
		var x = prompt('给我一个网址')         // 让用户输入一个网址作为x
		hash[key] = x                         // hash变更新网址
		img2.src = 'http://'+x+'/favicon.ico'
		img2.onerror = function(xxx){          // 监听错误
			xxx.target.src = '//i.loli.net/2019/03/14/5c89c4f11de11.png'
		}
		localStorage.setItem('zzz', JSON.stringify(hash))   // 把hash存到zzz里
	}
	return button
}

function createImage(domain){
	var img = tag('img')
	if(domain){
		img.src = 'http://'+domain+'/favicon.ico'
	}else{
		img.src = '//i.loli.net/2019/03/14/5c89c4f11de11.png'
	}
	img.onerror = function(xxx){          // 监听错误
		xxx.target.src = '//i.loli.net/2019/03/14/5c89c4f11de11.png'
	}
	return img
}

function init(){
	var keys = {
		'0':{0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p',length:10},
		'1':{0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l',length:9}, 
		'2':{0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m',length:7},
		'length': 3
	}
	var hash = {
		'q': 'news.qq.com','w': 'weibo.com','e': 'ele.me','t': 'taobao.com','y': 'yinxiang.com',
		'u': 'uc.cn','i': 'iqiyi.com','o': 'opera.com','p':  undefined,'a': '1688.com',
		's': 'sougou.com','f': 'map.baidu.com','h': 'tv.sohu.com','j': 'www.jd.com','l': 'lianjia.com','z': 'zhihu.com',
		'c': 'cctv.com','b': 'baidu.com','n': 'www.suning.com','m': 'www.mcdonalds.com.cn'
	}
	// 取出 localStorage 中 zzz 对应的 hash
	var hashInLocalStorage = getFromLocalStorage('zzz')
	if(hashInLocalStorage){              // 如果存在，则覆盖之前的hash
		hash = hashInLocalStorage
	}
	return {
		"keys": keys,
		"hash": hash
	}
}

function generateKeyboard(keys,hash){
	// 遍历 keys，生成 kbd 标签
	for(var index=0; index<keys['length']; index=index+1){  // index取值 0 1 2
		var div = tag('div')                    
		div.className = 'row'
		main.appendChild(div)        // 为main添加这个子div
		var row = keys[index]        // 第一个数组  第二个数组  第三个数组
		for(var index2=0; index2<row['length']; index2=index2+1){ //index2取值0~9 0~8 0~6
			var span = createSpan(row[index2])

			var button = createButton(row[index2])

			var img = createImage(hash[row[index2]])

			var kbd = tag('kbd')
			kbd.className = 'key'

			kbd.appendChild(span)
			kbd.appendChild(button)
			kbd.appendChild(img)

			div.appendChild(kbd)
		}
	}
}

function listionToUser(hash){
	var inputBar = document.querySelector('form > #text')
	var inputting = false
	inputBar.addEventListener('focus', (e)=>{
		inputting = true
		e.target.placeholder=''
	})
	inputBar.addEventListener('focusout', (e)=>{
		inputting = false
		e.target.placeholder='请输入您要搜索的内容...'
	})

	document.onkeypress = function(keyPress){   // 监听键盘事件
		var key = keyPress['key']                 // 拿到用户按的哪个键 q,w,e,r……
		var website = hash[key]                   // 这个键对应的网站
		var currentKey = document.querySelector('#'+key).parentNode
		currentKey.classList.add('action')
		if(!inputting){
			setTimeout(()=>{
				//location.href = 'http://'+website        // 在当前窗口跳转
				window.open('http://'+website, '_blank')   // 在新窗口打开这个网址
			}, 500)
		}
	}
	document.onkeyup = function(keyUp){
		var key = keyUp['key']
		var currentKey = document.querySelector('#'+key).parentNode
		currentKey.classList.remove('action')
	}
}

// 搜索框搜索功能
var searchButton = document.querySelector('#searchButton')
searchButton.onclick = function(){
	var value = document.getElementById("text").value
	window.open('http://www.baidu.com/s?wd='+value)
}