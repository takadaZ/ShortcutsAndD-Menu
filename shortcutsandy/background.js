(function(){var e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};i=100,h=document.getElementById("flexkbd"),H={callbacks:{},completes:{},reset:function(e){return this.completes[e]=!1},register:function(e,t){return this.completes[e]?t():this.callbacks[e]=t},callComplete:function(e){var t;return(t=this.callbacks[e])?t():this.completes[e]=!0}},c=function(e,t,n,r,i,s,o){var u,a,l,c,p,d,v,m,g,y,b,w,E,S,T,N;if(n){m=0,y=n.match(/\[(\w*?)\](.+)/),y?(v=RegExp.$1,c=RegExp.$2,d=v.toLowerCase().split(""),j.call(d,"c")>=0&&(m=1),j.call(d,"a")>=0&&(m+=2),j.call(d,"s")>=0&&(m+=4),j.call(d,"w")>=0&&(m+=8)):(m=0,c=n),l=andy.local.config.kbdtype,p=andy.getKeyCodes()[l].keys,g=-1;for(u=b=0,S=p.length;0<=S?b<S:b>S;u=0<=S?++b:--b)if(p[u]&&(c===p[u][0]||c===p[u][1])){g=u;break}if(g===-1)throw new Error("Key identifier code '"+c+"' is unregistered code.");if(!(s==="keydown"||m!==0||j.call(function(){N=[];for(var e=59;e<=68;e++)N.push(e);return N}.apply(this),g)>=0||g===87||g===88))throw new Error("Modifier code is not included in '"+n+"'.");r="0"+m.toString(16)+g}else if(!r)throw new Error("Command argument is not found.");if(!s)for(u=E=0,T=andy.local.keyConfigSet.length;0<=T?E<T:E>T;u=0<=T?++E:--E)if((a=andy.local.keyConfigSet[u])["new"]===r){s=a.mode;break}switch(s){case"command":return f(r).done(function(){return t(e,i,o)});case"bookmark":return x(r).done(function(n){return n?H.register(n,function(){return t(e,i,o)}):t(e,i,o)});case"keydown":return setTimeout(function(){return h.CallShortcut(r,8),t(e,i,o)},0);default:return setTimeout(function(){return h.CallShortcut(r,4),t(e,i,o)},0)}},u=function(e,t,n){var r,i,s,o,u,a,f;o=function(e,t,n){return e.resolve(n+1)},(i=s=$.Deferred()).promise(),r=t.value1;for(u=a=0,f=r.length;0<=f?a<f:a>f;u=0<=f?++a:--a)i=i.then(function(t){var i,s,u,a;s=$.Deferred();try{if(isNaN(i=r[t]))c(s,o,i,null,0,null,t);else{a=Math.round(i);if(!(-1<a&&a<6e4))throw new Error("Range of Sleep millisecond is up to 6000-0.");setTimeout(function(){return h.Sleep(a),s.resolve(t+1)},0)}}catch(f){u=f,s.reject(),n({msg:u.message}),e.resolve()}return s.promise()});return i=i.then(function(){return n({msg:"done"}),e.resolve()}),s.resolve(0)},b=["c","a","s","w"],B=function(e,t){var n,r,i,s,o,u,a,f;s=andy.getKeyCodes()[t].keys,o=parseInt(e.substring(0,2),16),r=[];for(n=a=0,f=b.length;0<=f?a<f:a>f;n=0<=f?++a:--a)o&Math.pow(2,n)&&r.push(b[n]);return u=e.substring(2),i=s[u],"["+r.join("")+"]"+i[0]},g="",l=function(e){var t,n,r,i,s;g="scd.ctxData = '"+(e.selectionText||e.linkUrl||e.srcUrl||e.pageUrl||"").replace(/'/g,"\\'")+"';",s=[];for(t=r=0,i=andy.local.keyConfigSet.length;0<=i?r<i:r>i;t=0<=i?++r:--r){if((n=andy.local.keyConfigSet[t])["new"]===e.menuItemId){a(n["new"]);break}s.push(void 0)}return s},chrome.contextMenus.onClicked.addListener(function(e,t){return l(e)}),o=$.Deferred().resolve(),chrome.runtime.onMessage.addListener(function(e,t,n){var r;return r=function(e,t){return t>0&&h.Sleep(t),n({msg:"done"}),e.resolve()},o=o.then(function(){var t,i;t=$.Deferred(),setTimeout(function(){if(t.state()==="pending")return n({msg:"Command has been killed in a time-out."}),t.resolve()},61e3);try{switch(e.action){case"batch":u(t,e,n);break;case"callShortcut":c(t,r,e.value1,null,e.value2);break;case"keydown":c(t,r,e.value1,null,e.value2,"keydown");break;case"sleep":setTimeout(function(){return h.Sleep(e.value1),r(t,0)},0);break;case"setClipboard":setTimeout(function(){return h.SetClipboard(e.value1),r(t,0)},0);break;case"getClipboard":setTimeout(function(){var e,r,i;try{i=h.GetClipboard(),r="done"}catch(s){e=s,i="",r=e.message}return n({msg:r,text:i}),t.resolve()},0)}}catch(s){i=s,n({msg:i.message}),t.resolve()}return t.promise()}),!0}),y='var e,t,scd;e=function(){function e(e){this.error=e}return e.prototype.done=function(e){return this},e.prototype.fail=function(e){return e(new Error(this.error)),this},e}(),t=function(){function e(){}return e.prototype.done=function(e){return this.doneCallback=e,this},e.prototype.fail=function(e){return this.failCallback=e,this},e.prototype.sendMessage=function(e,t,n,r){var i=this;return chrome.runtime.sendMessage({action:e,value1:t,value2:n,value3:r},function(e){var t;if((e!=null?e.msg:void 0)==="done"){if(t=i.doneCallback)return setTimeout(function(){return t(e.text||e.msg)},0)}else if(t=i.failCallback)return setTimeout(function(){return t(e.msg)},0)}),this},e}(),scd={batch:function(n){return n instanceof Array?(new t).sendMessage("batch",n):new e("Argument is not Array.")},send:function(n,r){var i;i=100;if(r!=null){if(isNaN(i=r))return new e(r+" is not a number.");i=Math.round(r);if(i<0||i>6e3)return new e("Range of Sleep millisecond is up to 6000-0.")}return(new t).sendMessage("callShortcut",n,i)},keydown:function(n,r){var i;i=100;if(r!=null){if(isNaN(i=r))return new e(r+" is not a number.");i=Math.round(r);if(i<0||i>6e3)return new e("Range of Sleep millisecond is up to 6000-0.")}return(new t).sendMessage("keydown",n,i)},sleep:function(n){if(n!=null){if(isNaN(n))return new e(n+" is not a number.");n=Math.round(n);if(n<0||n>6e3)return new e("Range of Sleep millisecond is up to 6000-0.")}else n=100;return(new t).sendMessage("sleep",n)},clipbd:function(e){return(new t).sendMessage("setClipboard",e)},getClipbd:function(){return(new t).sendMessage("getClipboard")},returnValue:!0,cancel:function(){return this.returnValue=!1}};',O=function(e){return chrome.tabs.query({active:!0},function(t){return chrome.tabs.sendMessage(t[0].id,e)})},p=function(){var e;return e=$.Deferred(),chrome.windows.getCurrent(null,function(t){return chrome.tabs.query({active:!0,windowId:t.id},function(n){return e.resolve(n[0],t.id)})}),e.promise()},m=function(e){var t;return t=$.Deferred(),chrome.windows.getCurrent(null,function(n){return e.windowId=n.id,chrome.tabs.query(e,function(e){return t.resolve(e)})}),t.promise()},d=function(){var e;return e=$.Deferred(),chrome.tabs.query({},function(t){return e.resolve(t)}),e.promise()},v=function(){var e;return e=$.Deferred(),chrome.windows.getAll({populate:!0},function(t){var n;return n=[],t.forEach(function(e){return n=n.concat(e.tabs)}),e.resolve(n)}),e.promise()},S=null,chrome.tabs.onActivated.addListener(function(e){return chrome.tabs.get(e.tabId,function(t){if(t.url.indexOf(chrome.extension.getURL("options.html"))===0)return h.StartConfigMode(),S=e.tabId;if(S)return chrome.tabs.sendMessage(S,{action:"saveConfig"}),S=null})}),chrome.windows.onFocusChanged.addListener(function(e){return S?(chrome.tabs.sendMessage(S,{action:"saveConfig"}),S=null):p().done(function(e){if(e.url.indexOf(chrome.extension.getURL("options.html"))===0)return h.StartConfigMode(),S=e.id})}),chrome.tabs.onUpdated.addListener(function(e,t,n){if(t.status==="complete")return n.url.indexOf(chrome.extension.getURL("options.html"))===0?h.StartConfigMode():H.callComplete(e)}),a=function(e){var t,n,r,s,o,u,a;r=function(e,t,n){return t>0&&h.Sleep(t),e.resolve(n+1)},o=[],andy.local.keyConfigSet.forEach(function(t){if(t["new"]===e||t.parentId===e)return o.push(t)}),(t=n=$.Deferred()).promise();for(s=u=0,a=o.length;0<=a?u<a:u>a;s=0<=a?++u:--u)t=t.then(function(e){var t,n,u;t=$.Deferred(),setTimeout(function(){if(t.state()==="pending")return t.reject(),console.log("Command has been killed in a time-out.")},61e3);try{u=o[e];switch(u.mode){case"remap":c(t,r,null,u.origin,i,"keydown",e);break;case"command":f(u["new"]).done(function(n){var i,o,u;i=!1;if(n)for(s=o=0,u=n!=null?n.length:void 0;0<=u?o<u:o>u;s=0<=u?++o:--o)if(!n[s]){i=!0;break}return i?t.reject():r(t,0,e)});break;case"sleep":setTimeout(function(){return h.Sleep(~~u.sleep),r(t,0,e)},0);break;case"comment":case"through":setTimeout(function(){return r(t,0,e)},0);break;default:c(t,r,null,u["new"],i,u.mode,e)}}catch(a){n=a,t.reject(),console.log(n.message)}return t.promise()});return n.resolve(0)},w={},w.state="closed",chrome.notifications.onButtonClicked.addListener(function(e,t){var n;if(e===chrome.runtime.id)return n=JSON.parse(localStorage.copyHistory||null)||[],h.PasteText(n[t]),chrome.notifications.clear(chrome.runtime.id,function(){return w.state="closed"})}),chrome.notifications.onClosed.addListener(function(e,t){if(e===chrome.runtime.id)return w.state="closed"}),P=function(){var e,t,n;return t=JSON.parse(localStorage.copyHistory||null)||[],e=[],t.forEach(function(t){if(t)return e.push({title:t,message:"msg"})}),(n=w.state)==="opened"||n==="created"?chrome.notifications.clear(chrome.runtime.id,function(){return chrome.notifications.create(chrome.runtime.id,{type:"list",iconUrl:"images/key_bindings.png",message:"Select text to paste",eventTime:6e4,title:"Copy history",items:e},function(){return w.state="opened"})}):chrome.notifications.create(chrome.runtime.id,{type:"list",iconUrl:"images/key_bindings.png",message:"Select text to paste",eventTime:6e4,title:"Copy history",items:e},function(){return w.state="opened"})},D=function(e,t){return P(),e.resolve()},M=function(e,t){return setTimeout(function(){if(e.state()==="pending")return e.resolve()},200),chrome.tabs.sendMessage(t,{action:"copyText"},function(t){var n,r,i,s;if(t!==""){h.SetClipboard(t),n=JSON.parse(localStorage.copyHistory||null)||[];for(r=i=0,s=n.length;0<=s?i<s:i>s;r=0<=s?++i:--i)if(n[r]===t){n.splice(r,1);break}n.unshift(t),n.length>20&&n.pop(),localStorage.copyHistory=JSON.stringify(n),w.state==="opened"&&P()}return e.resolve()})},E=function(e,t,n){switch(t){case"newtab":return chrome.tabs.create({url:n},function(t){return e.resolve(t.id)});case"current":return chrome.tabs.query({active:!0},function(t){return H.reset(t[0].id),chrome.tabs.update(t[0].id,{url:n},function(t){return e.resolve(t.id)})});case"newwin":return chrome.windows.create({url:n},function(t){return e.resolve(t.id)});case"incognito":return chrome.windows.create({url:n,incognito:!0},function(t){return e.resolve(t.id)});default:return e.resolve()}},x=function(e){var t;return t=$.Deferred(),andy.local.keyConfigSet.forEach(function(n){var r,i,s,o,u;if(n["new"]===e)return u=n.bookmark,s=u.openmode,o=u.url,i=u.findtab,r=u.findStr,i||s==="findonly"?p().done(function(e){return d().done(function(n){var i,u,a,f,l,c,h,p;i=0;for(a=l=0,h=n.length;0<=h?l<h:l>h;a=0<=h?++l:--l)if(n[a].id===e.id){i=a;break}f=[],0<i&&i<n.length-1?f=n.slice(i+1).concat(n.slice(0,i+1)):f=n,u=!1;for(a=c=0,p=f.length;0<=p?c<p:c>p;a=0<=p?++c:--c)if((f[a].title+f[a].url).indexOf(r)!==-1){chrome.tabs.update(f[a].id,{active:!0},function(){return t.resolve()}),u=!0;break}if(!u)return E(t,s,o)})}):E(t,s,o)}),t.promise()},N=function(e,t,n){var r;return(r=t[n])?chrome.cookies.remove({url:r.url,name:r.name},function(){return N(e,t,n+1)}):e.resolve()},s=function(e,t,n){var r;return(r=t[n])?chrome.history.deleteUrl({url:r},function(){return s(e,t,n+1)}):e.resolve()},n=function(e,t,r){var i;return(i=t[r])?i.focused?n(e,t,r+1):chrome.windows.remove(i.id,function(){return n(e,t,r+1)}):e.resolve()},t=function(e,t){return m({active:!1,currentWindow:!0,windowType:"normal"},t).done(function(n){var r;return r=[],n.forEach(function(e){if(t(e))return r.push(e.id)}),r.length>0?chrome.tabs.remove(r,function(){return e.resolve()}):e.resolve()})},f=function(e){var r,i;return r=$.Deferred(),i=0,andy.local.keyConfigSet.forEach(function(o){var u,a,f;if(o["new"]===e)switch(a=o.command.name){case"createTab":return p().done(function(e,t){return chrome.tabs.create({windowId:t,index:e.index+1},function(e){return H.register(e.id,function(){return r.resolve()})})});case"createTabBG":return p().done(function(e,t){return chrome.tabs.create({windowId:t,index:e.index+1,active:!1},function(e){return H.register(e.id,function(){return r.resolve()})})});case"closeOtherTabs":return t(r,function(){return!0});case"closeTabsRight":case"closeTabsLeft":return p().done(function(e){return i=e.index,a==="closeTabsRight"?t(r,function(e){return e.index>i}):t(r,function(e){return e.index<i})});case"moveTabRight":case"moveTabLeft":return p().done(function(e,t){var n;return n=e.index,a==="moveTabRight"?n+=1:n-=1,n>-1?chrome.tabs.move(e.id,{windowId:t,index:n},function(){return r.resolve()}):r.resolve()});case"moveTabFirst":return p().done(function(e,t){return chrome.tabs.move(e.id,{windowId:t,index:0},function(){return r.resolve()})});case"moveTabLast":return p().done(function(e,t){return chrome.tabs.move(e.id,{windowId:t,index:1e3},function(){return r.resolve()})});case"detachTab":return p().done(function(e,t){return chrome.windows.create({tabId:e.id,focused:!0,type:"normal"},function(){return r.resolve()})});case"attachTab":return p().done(function(e,t){return chrome.windows.getAll({populate:!0},function(t){var n,i,s,o,u,a,f,l,c;for(i=a=0,l=t.length;0<=l?a<l:a>l;i=0<=l?++a:--a)for(s=f=0,c=t[i].tabs.length;0<=c?f<c:f>c;s=0<=c?++f:--f)if(e.id===t[i].tabs[s].id){n=i;break}return(u=t[++n])?o=u.id:o=t[0].id,chrome.tabs.move(e.id,{windowId:o,index:1e3},function(){return chrome.tabs.update(e.id,{active:!0},function(){return r.resolve()})})})});case"duplicateTab":return p().done(function(e,t){return chrome.tabs.duplicate(e.id,function(){return r.resolve()})});case"duplicateTabWin":return p().done(function(e,t){return chrome.tabs.duplicate(e.id,function(e){return chrome.windows.create({tabId:e.id,focused:!0,type:"normal"},function(){return r.resolve()})})});case"pinTab":return p().done(function(e,t){return chrome.tabs.update(e.id,{pinned:!e.pinned},function(){return r.resolve()})});case"switchNextWin":return chrome.windows.getAll(null,function(e){var t,n,i,s;s=[];for(t=n=0,i=e.length;0<=i?n<i:n>i;t=0<=i?++n:--n){if(e[t].focused){t===e.length-1?chrome.windows.update(e[0].id,{focused:!0},function(){return r.resolve()}):chrome.windows.update(e[t+1].id,{focused:!0},function(){return r.resolve()});break}s.push(void 0)}return s});case"switchPrevWin":return chrome.windows.getAll(null,function(e){var t,n,i,s;s=[];for(t=n=0,i=e.length;0<=i?n<i:n>i;t=0<=i?++n:--n){if(e[t].focused){t===0?chrome.windows.update(e[e.length-1].id,{focused:!0},function(){return r.resolve()}):chrome.windows.update(e[t-1].id,{focused:!0},function(){return r.resolve()});break}s.push(void 0)}return s});case"closeOtherWins":return chrome.windows.getAll(null,function(e){return n(r,e,0)});case"pasteText":return setTimeout(function(){return h.PasteText(o.command.content),r.resolve()},0);case"copyText":return p().done(function(e){return chrome.tabs.sendMessage(e.id,{action:"askAlive"},function(t){return t==="hello"?M(r,e.id):chrome.tabs.executeScript(e.id,{file:"kbdagent.js",allFrames:!0,runAt:"document_end"},function(t){return M(r,e.id)})})});case"showHistory":return p().done(function(e){return chrome.tabs.sendMessage(e.id,{action:"askAlive"},function(t){return t==="hello"?D(r,e.id):chrome.tabs.executeScript(e.id,{file:"kbdagent.js",allFrames:!0,runAt:"document_end"},function(t){return D(r,e.id)})})});case"insertCSS":return p().done(function(e){return chrome.tabs.insertCSS(e.id,{code:o.command.content,allFrames:o.command.allFrames},function(){return r.resolve()})});case"execJS":return u=o.command.content,o.command.useUtilObj&&(u=y+g+u+";scd.returnValue"),p().done(function(e){return chrome.tabs.executeScript(e.id,{code:u,allFrames:o.command.allFrames,runAt:"document_end"},function(e){return r.resolve(e)})});case"clearHistory":return chrome.browsingData.removeHistory({},function(){return r.resolve()});case"clearHistoryS":return f=o.command.content,chrome.history.search({text:"",startTime:0,maxResults:1e4},function(e){var t,n,i,o,u;t=[];for(i=o=0,u=e.length;0<=u?o<u:o>u;i=0<=u?++o:--o)n=e[i],(n.title+n.url).indexOf(f)!==-1&&t.push(n.url);if(t.length>0)return s(r,t,0)});case"clearCookiesAll":return chrome.browsingData.removeCookies({},function(){return r.resolve()});case"clearCookies":return p().done(function(e){var t,n;return t=e.url.match(/:\/\/(.[^/:]+)/)[1],n=[],chrome.cookies.getAll({},function(e){return e.forEach(function(e){var r,i;if(("."+t).indexOf(e.domain)!==-1)return r=e.secure?"s":"",i="http"+r+"://"+e.domain+e.path,n.push({url:i,name:e.name})}),N(r,n,0)})});case"clearCache":return chrome.browsingData.removeCache({},function(){return r.resolve()})}}),r.promise()},_=function(e){var t;t=[];if(e)return e.forEach(function(e){if(e.batch&&e["new"]&&e.mode!=="through")return t.push([e["new"],e.origin,"batch"].join(";"));if(!/^C/.test(e["new"]))return t.push([e["new"],e.origin,e.mode].join(";"))}),h.SetKeyConfig(t.join("|"))},window.andy={local:null,setLocal:function(){var e,t=this;return localStorage.flexkbd?(this.local=JSON.parse(localStorage.flexkbd||null)||{},this.local.config||(this.local.config={kbdtype:"JP"}),this.local.ctxMenuFolderSet||(this.local.ctxMenuFolderSet=[]),delete localStorage.flexkbd,$.Deferred().resolve()):(e=$.Deferred(),chrome.storage.local.get(null,function(n){return n.config||(n.config={kbdtype:"JP"}),n.ctxMenuFolderSet||(n.ctxMenuFolderSet=[]),t.local=n,e.resolve()}),e.promise())},saveConfig:function(e){var t=this;return chrome.storage.local.set(e,function(){return t.local=e,_(t.local.keyConfigSet)})},updateCtxMenu:function(e,t,n){return t.id=e,n?t.type="update pause":t.type="update",T($.Deferred(),[t],0)},remakeCtxMenu:function(e){var t,n=this;return t=$.Deferred(),chrome.storage.local.set(e,function(){return n.local=e,r().done(function(){return t.resolve()})}),t.promise()},getKeyCodes:function(){return{JP:{keys:keysJP,name:"JP 109 Keyboard"},US:{keys:keysUS,name:"US 104 Keyboard"}}},getScHelp:function(){return C},getScHelpSect:function(){return L},startEdit:function(){return h.EndConfigMode()},endEdit:function(){return h.StartConfigMode()},getCtxMenus:function(){}},window.pluginEvent=function(e,t){switch(e){case"log":return console.log(t);case"configKeyEvent":return O({action:"kbdEvent",value:t});case"bookmark":return x(t);case"command":return f(t);case"batch":return a(t)}},C={},L={},k="https://support.google.com/chrome/answer/157179?hl=",A=function(e,t,n){var r;return r=$(n).find("tr:has(td:first-child:has(strong))"),$.each(r,function(n,r){var i;return i=r.cells[1].textContent.replace(/^\s+|\s$/g,""),Array.prototype.forEach.call(r.childNodes[1].getElementsByTagName("strong"),function(n){var r,s;r=n.textContent.toUpperCase().replace(/\s/g,""),r=r.replace("PGUP","PAGEUP").replace("PGDOWN","PAGEDOWN").replace(/DEL$/,"DELETE").replace(/INS$/,"INSERT").replace("ホーム","HOME").replace("バー","");if((s=C[r])!=null?!s[e]:!void 0)C[r]||(C[r]={}),C[r][e]=[];return C[r][e].push(t+"^"+i)})})},e=function(e,t){var n,r,i;return n=$(e),r=n.find("div.main-section"),i="",Array.prototype.forEach.call(r[0].children,function(e){switch(e.tagName){case"H3":switch(e.textContent){case"Tab and window shortcuts":case"タブとウィンドウのショートカット":i="T";break;case"Google Chrome feature shortcuts":case"Google Chrome 機能のショートカット":i="C";break;case"Address bar shortcuts":case"アドレスバーのショートカット":i="A";break;case"Webpage shortcuts":case"ウェブページのショートカット":i="W";break;case"Text shortcuts":case"テキストのショートカット":i="Tx"}return L[i]=e.textContent;case"TABLE":return A(t,i,e)}})},T=function(e,t,n){var r,i,s,o,u,a,f,l;if(!(o=t[n]))return e.resolve();l=t[n],u=l.id,f=l.type,r=l.caption,i=l.contexts,a=l.parentId,/pause/.test(f)?s={type:"normal",enabled:!1}:s={type:"normal",enabled:!0},r&&(s.title=r,s.contexts=[i]),a!=="route"&&(s.parentId=a);if(/create/.test(f))return s.id=u,chrome.contextMenus.create(s,function(){return T(e,t,n+1)});if(/update/.test(f))return chrome.contextMenus.update(u,s,function(){return T(e,t,n+1)})},r=function(){var e,t,n;if(n=andy.local.keyConfigSet)return e=andy.local.ctxMenuFolderSet,t=$.Deferred(),chrome.contextMenus.removeAll(function(){var r,i;return i=[],n.forEach(function(e){var t;if(t=e.ctxMenu)return t.id=e["new"],t.order=t.order||999,e.mode==="through"?t.type="create pause":t.type="create",i.push(t)}),i.sort(function(e,t){return e.order-t.order}),r=[],i.forEach(function(t){var n,i,s,o,u,a,f;if(t.parentId!=="route"){n=!1;for(s=o=0,a=r.length;0<=a?o<a:o>a;s=0<=a?++o:--o)if(r[s].id===t.parentId){n=!0;break}if(!n)for(s=u=0,f=e.length;0<=f?u<f:u>f;s=0<=f?++u:--u)if(e[s].id===t.parentId){i=e[s],r.push({id:i.id,order:t.order,parentId:"route",type:"create",caption:i.title,contexts:i.contexts});break}}return r.push(t)}),T(t,r,0)}),t.promise()},$(function(){var t;return andy.setLocal().done(function(){var e;if(e=andy.local.keyConfigSet)return _(e),r()}),t=function(t){var n;return $.get(k+t).done(function(r){return e(r,t),n.resolve()}),(n=$.Deferred()).promise()},t("ja").done(function(){return t("en").done(function(){return delete C["-"],delete C["+"],C["CTRL+;"]={ja:["W^ページ全体を拡大表示します。"]},C["CTRL+="]={en:["W^Enlarges everything on the page."]},C["CTRL+-"]={en:["W^Makes everything on the page smaller."],ja:["W^ページ全体を縮小表示します。"]}})})})}).call(this);