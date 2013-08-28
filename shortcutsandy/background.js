(function(){var e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j,F,I,q,R=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};s=100,d=null,q={},I={},w={},p=document.getElementById("flexkbd"),x={info:"info.png",warn:"warn.png",err:"err.png",chk:"chk.png",fav:"fav.png",star:"infostar.png",clip:"clip.png",close:"close.png",user:"user.png",users:"users.png",help:"help.png",flag:"flag.png",none:"none.png",cancel:"cancel.png",comment:"comment.png",comments:"comments.png"},j={callbacks:{},completes:{},reset:function(e){return this.completes[e]=!1},register:function(e,t){return this.completes[e]?t():this.callbacks[e]=t},callComplete:function(e){var t;return(t=this.callbacks[e])?t():this.completes[e]=!0}},S=["c","a","s","w"],F=function(e,t){var n,r,i,s,o,u,a,f;s=andy.getKeyCodes()[t].keys,o=parseInt(e.substring(0,2),16),r=[];for(n=a=0,f=S.length;0<=f?a<f:a>f;n=0<=f?++a:--a)o&Math.pow(2,n)&&r.push(S[n]);return u=e.substring(2),i=s[u],"["+r.join("")+"]"+i[0]},b="",l=function(e){var t,n,r,i,s;b="scd.ctxData = '"+(e.selectionText||e.linkUrl||e.srcUrl||e.pageUrl||"").replace(/'/g,"\\'")+"';",s=[];for(t=r=0,i=andy.local.keyConfigSet.length;0<=i?r<i:r>i;t=0<=i?++r:--r){if((n=andy.local.keyConfigSet[t])["new"]===e.menuItemId){a(n["new"]);break}s.push(void 0)}return s},chrome.contextMenus.onClicked.addListener(function(e,t){return l(e)}),h=function(e,t,n,r,i,s,o){var u,a,l,c,h,d,v,m,g,y,b,w,E,S,x,T;if(n){m=0,y=n.match(/\[(\w*?)\](.+)/),y?(v=RegExp.$1,c=RegExp.$2,d=v.toLowerCase().split(""),R.call(d,"c")>=0&&(m=1),R.call(d,"a")>=0&&(m+=2),R.call(d,"s")>=0&&(m+=4),R.call(d,"w")>=0&&(m+=8)):(m=0,c=n),l=andy.local.config.kbdtype,h=andy.getKeyCodes()[l].keys,g=-1;for(u=b=0,S=h.length;0<=S?b<S:b>S;u=0<=S?++b:--b)if(h[u]&&(c===h[u][0]||c===h[u][1])){g=u;break}if(g===-1)throw new Error("Key identifier code '"+c+"' is unregistered code.");if(!(s==="keydown"||m!==0||R.call(function(){T=[];for(var e=59;e<=68;e++)T.push(e);return T}.apply(this),g)>=0||g===87||g===88))throw new Error("Modifier code is not included in '"+n+"'.");r="0"+m.toString(16)+g}else if(!r)throw new Error("Command argument is not found.");if(!s)for(u=E=0,x=andy.local.keyConfigSet.length;0<=x?E<x:E>x;u=0<=x?++E:--E)if((a=andy.local.keyConfigSet[u])["new"]===r){s=a.mode;break}switch(s){case"command":return f(r).done(function(){return t(e,i,o)});case"bookmark":return k(r).done(function(n){return n?j.register(n,function(){return t(e,i,o)}):t(e,i,o)});case"keydown":return setTimeout(function(){return p.CallShortcut(r,8),t(e,i,o)},0);default:return setTimeout(function(){return p.CallShortcut(r,4),t(e,i,o)},0)}},u=$.Deferred().resolve(),chrome.runtime.onMessage.addListener(function(e,t,n){var r;return r=function(e,t){return t>0&&p.Sleep(t),n({msg:"done"}),e.resolve()},u=u.then(function(){var t,i,s;t=$.Deferred(),setTimeout(function(){if(t.state()==="pending")return n({msg:"Command has been killed in a time-out."}),t.reject()},61e3);try{switch(e.action){case"callShortcut":return h(t,r,e.value1,null,e.value2);case"keydown":return h(t,r,e.value1,null,e.value2,"keydown");case"sleep":return setTimeout(function(){return p.Sleep(e.value1),r(t,0)},0);case"setData":return setTimeout(function(){return q[e.value1]=e.value2,r(t,0)},0);case"getData":return setTimeout(function(){return n({msg:"done",data:q[e.value1]||null}),t.resolve()},0);case"setClipboard":return setTimeout(function(){return p.SetClipboard(e.value1),r(t,0)},0);case"getClipboard":return setTimeout(function(){var e,r,i;try{i=p.GetClipboard(),r="done"}catch(s){e=s,i="",r=e.message}return n({msg:r,data:i}),t.resolve()},0);case"showNotification":return B(t,r,e.value1,e.value2,e.value3,e.value4);case"openUrl":return s=e.value1,k(null,s).done(function(e){return e&&s.noActivate&&(d=e,j.callComplete(s.commandId)),r(t,0)});case"clearActiveTab":return setTimeout(function(){return d=null,r(t,0)},0);case"clientOnKeyDown":return setTimeout(function(){var n,i,s,o,u,f,l;if(s=keyIdentifiers[andy.local.config.kbdtype][e.value1]){if(e.value2){if(!(i=s[1]))return;o="04"}else i=s[0],o="00";for(n=f=0,l=keys.length;0<=l?f<l:f>l;n=0<=l?++f:--f)if(keys[n]&&(i===keys[n][0]||i===keys[n][1])){u=n;break}u&&a(o+n)}return r(t,0)},0)}}catch(o){return i=o,setTimeout(function(){return n({msg:i.message}),t.resolve()},0),t.promise()}}),!0}),E='var e,t,scd;e=function(){function e(e){this.error=e}return e.prototype.done=function(e){return this},e.prototype.fail=function(e){return e(new Error(this.error)),this},e}(),t=function(){function e(){}return e.prototype.done=function(e){return this.doneCallback=e,this},e.prototype.fail=function(e){return this.failCallback=e,this},e.prototype.sendMessage=function(e,t,n,r,i){var s=this;return chrome.runtime.sendMessage({action:e,value1:t,value2:n,value3:r,value4:i},function(e){var t;if((e!=null?e.msg:void 0)==="done"){if(t=s.doneCallback)return setTimeout(function(){return t(e.data||e.msg)},0)}else if(t=s.failCallback)return setTimeout(function(){return t(e.msg)},0)}),this},e}(),scd={batch:function(n){return n instanceof Array?(new t).sendMessage("batch",n):new e("Argument is not Array.")},send:function(n,r){var i;i=100;if(r!=null){if(isNaN(i=r))return new e(r+" is not a number.");i=Math.round(r);if(i<0||i>6e3)return new e("Range of Sleep millisecond is up to 6000-0.")}return(new t).sendMessage("callShortcut",n,i)},keydown:function(n,r){var i;i=100;if(r!=null){if(isNaN(i=r))return new e(r+" is not a number.");i=Math.round(r);if(i<0||i>6e3)return new e("Range of Sleep millisecond is up to 6000-0.")}return(new t).sendMessage("keydown",n,i)},sleep:function(n){if(n!=null){if(isNaN(n))return new e(n+" is not a number.");n=Math.round(n);if(n<0||n>6e3)return new e("Range of Sleep millisecond is up to 6000-0.")}else n=100;return(new t).sendMessage("sleep",n)},setClipbd:function(e){return(new t).sendMessage("setClipboard",e)},getClipbd:function(){return(new t).sendMessage("getClipboard")},showNotify:function(e,n,r,i){return e==null&&(e=""),n==null&&(n=""),r==null&&(r="none"),i==null&&(i=!1),(new t).sendMessage("showNotification",e,n,r,i)},returnValue:{},cancel:function(){return this.returnValue.cancel=!0},openUrl:function(e,n,r,i){var s,o,u;return n&&(s=(new Date).getTime()),r&&(o=!0),u={url:e,noActivate:n,findStr:r,findtab:o,openmode:i,commandId:s},(new t).sendMessage("openUrl",u),this.returnValue.cid=s},clearCurrentTab:function(){return(new t).sendMessage("clearCurrentTab")},getSelection:function(){var e,t,n,r;n="";if(e=document.activeElement){if((r=e.nodeName)==="TEXTAREA"||r==="INPUT")return n=e.value.substring(e.selectionStart,e.selectionEnd);if((t=window.getSelection()).type==="Range")return n=t.getRangeAt(0).toString()}},setData:function(e,n){return(new t).sendMessage("setData",e,n)},getData:function(e){return(new t).sendMessage("getData",e)}};',P=function(e){return chrome.tabs.query({active:!0},function(t){return chrome.tabs.sendMessage(t[0].id,e)})},v=function(e){var t;return t=$.Deferred(),d?chrome.tabs.query({},function(e){var n,r,i,s,o;for(r=s=0,o=e.length;0<=o?s<o:s>o;r=0<=o?++s:--s)if(i=(n=e[r]).id===d)break;return i?t.resolve(n,n.windowId):chrome.windows.getCurrent(null,function(e){return chrome.tabs.query({active:!0,windowId:e.id},function(n){return t.resolve(n[0],e.id)})})}):chrome.windows.getCurrent(null,function(e){return chrome.tabs.query({active:!0,windowId:e.id},function(n){return t.resolve(n[0],e.id)})}),t.promise()},y=function(e){var t;return t=$.Deferred(),chrome.windows.getCurrent(null,function(n){return e.windowId=n.id,chrome.tabs.query(e,function(e){return t.resolve(e)})}),t.promise()},m=function(){var e;return e=$.Deferred(),chrome.tabs.query({},function(t){return e.resolve(t)}),e.promise()},g=function(){var e;return e=$.Deferred(),chrome.windows.getAll({populate:!0},function(t){var n;return n=[],t.forEach(function(e){return n=n.concat(e.tabs)}),e.resolve(n)}),e.promise()},C=null,chrome.tabs.onActivated.addListener(function(e){return chrome.tabs.get(e.tabId,function(t){if(t.url.indexOf(chrome.extension.getURL("options.html"))===0){if(!/editable/.test(t.url))return p.StartConfigMode(),C=e.tabId}else{C&&(chrome.tabs.sendMessage(C,{action:"saveConfig"}),C=null);if(andy.local.config.singleKey&&!/^chrome|^about|^https:\/\/chrome.google.com/.test(t.url))return chrome.tabs.sendMessage(t.id,{action:"askAlive"},function(e){if(e!=="hello")return chrome.tabs.executeScript(t.id,{file:"kbdagent.js",allFrames:!1,runAt:"document_end"})})}})}),chrome.windows.onFocusChanged.addListener(function(e){return C?(chrome.tabs.sendMessage(C,{action:"saveConfig"}),C=null):v().done(function(e){if((e!=null?e.url.indexOf(chrome.extension.getURL("options.html")):void 0)===0&&!/editable/.test(e!=null?e.url:void 0))return p.StartConfigMode(),C=e.id})}),chrome.tabs.onUpdated.addListener(function(e,t,n){if(t.status==="complete"){if(n.url.indexOf(chrome.extension.getURL("options.html"))===0)return/editable/.test(n.url)?(p.EndConfigMode(),C=null):(p.StartConfigMode(),C=n.id);j.callComplete(e);if(andy.local.config.singleKey&&!/^chrome|^about|^https:\/\/chrome.google.com/.test(n.url))return chrome.tabs.sendMessage(n.id,{action:"askAlive"},function(e){if(e!=="hello")return chrome.tabs.executeScript(n.id,{file:"kbdagent.js",allFrames:!1,runAt:"document_end"})})}}),a=function(e){var t,n,r,i,o,u,a;d=null,r=function(e,t,n){return t>0&&p.Sleep(t),e.resolve(n+1)},o=[],andy.local.keyConfigSet.forEach(function(t){if(t["new"]===e||t.parentId===e)return o.push(t)}),(t=n=$.Deferred()).promise();for(i=u=0,a=o.length;0<=a?u<a:u>a;i=0<=a?++u:--u)t=t.then(function(e){var t,n,u;t=$.Deferred(),setTimeout(function(){if(t.state()==="pending")return t.reject(),console.log("Command has been killed in a time-out.")},61e3);try{u=o[e];switch(u.mode){case"remap":h(t,r,null,u.origin,s,"keydown",e);break;case"command":f(u["new"]).done(function(n){var s,o,u,a,f,l;if(n)for(i=u=0,a=n.length;0<=a?u<a:u>a;i=0<=a?++u:--u){if(o=(f=n[i])!=null?f.cid:void 0)break;if(s=(l=n[i])!=null?l.cancel:void 0)break}return s?t.reject():o?j.register(o,function(){return r(t,0,e)}):r(t,0,e)});break;case"sleep":setTimeout(function(){return p.Sleep(~~u.sleep),r(t,0,e)},0);break;case"comment":case"through":setTimeout(function(){return r(t,0,e)},0);break;default:h(t,r,null,u["new"],s,u.mode,e)}}catch(a){n=a,setTimeout(function(){return t.reject(),console.log(n.message)},0)}return t.promise()});return n.resolve(0)},T={},T.state="closed",i=function(e,t,n,r,i,s){var o,u;return s?u="s"+(new Date).getTime():u=chrome.runtime.id,(o=x[i])||(o=x.none),chrome.notifications.create(u,{type:"basic",iconUrl:"images/"+o,title:n,message:r,eventTime:6e4},function(){return T.state="opened",e.resolve()})},B=function(e,t,n,r,s,o){return T.state==="opened"&&!o?chrome.notifications.clear(chrome.runtime.id,function(){return i(e,t,n,r,s,o)}):i(e,t,n,r,s,o)},N=function(e,t,n,r){t==null&&(t="last"),r==null&&(r=!1);if(!n){setTimeout(function(){return e.resolve()},0);return}switch(t.toLowerCase()){case"newtab":case"left":case"right":case"first":case"last":return v().done(function(i,s){var o;return t==="first"?o=0:t==="last"||t==="newtab"?o=1e3:t==="left"?o=Math.max(0,i.index):t==="right"&&(o=i.index+1),chrome.tabs.create({url:n,index:o,active:!r},function(t){return e.resolve(t.id)})});case"current":return v().done(function(t,i){return j.reset(t.id),chrome.tabs.update(t.id,{url:n,active:!r},function(t){return e.resolve(t.id)})});case"newwin":return chrome.windows.create({url:n,focused:!r},function(t){return e.resolve(t.tabs[0].id)});case"incognito":return chrome.windows.create({url:n,focused:!r,incognito:!0},function(t){return e.resolve(t!=null?t.tabs[0].id:void 0)});default:return setTimeout(function(){return e.resolve()},0)}},k=function(e,t){var n,r,i,s,o,u,a,f,l,c;n=$.Deferred();for(s=l=0,c=andy.local.keyConfigSet.length;0<=c?l<c:l>c;s=0<=c?++l:--l){o=andy.local.keyConfigSet[s];if(o["new"]===e||t){t||(t=o.bookmark),a=t.openmode,f=t.url,i=t.findtab,r=t.findStr,u=t.noActivate,i||a==="findonly"?v().done(function(e){return m().done(function(t){var i,o,l,c,h,p,d;i=0;for(s=c=0,p=t.length;0<=p?c<p:c>p;s=0<=p?++c:--c)if(t[s].id===e.id){i=s;break}l=[],0<i&&i<t.length-1?l=t.slice(i+1).concat(t.slice(0,i+1)):l=t,o=!1;for(s=h=0,d=l.length;0<=d?h<d:h>d;s=0<=d?++h:--h)if((l[s].title+l[s].url).indexOf(r)!==-1){u?n.resolve(l[s].id):chrome.tabs.update(l[s].id,{active:!0},function(){return n.resolve()}),o=!0;break}if(!o)return N(n,a,f,u)})}):N(n,a,f,u);break}}return n.promise()},A=function(e,t,n){var r;return(r=t[n])?chrome.cookies.remove({url:r.url,name:r.name},function(){return A(e,t,n+1)}):e.resolve()},o=function(e,t,n){var r;return(r=t[n])?chrome.history.deleteUrl({url:r},function(){return o(e,t,n+1)}):e.resolve()},n=function(e,t,r){var i;return(i=t[r])?i.focused?n(e,t,r+1):chrome.windows.remove(i.id,function(){return n(e,t,r+1)}):e.resolve()},t=function(e,t){return y({active:!1,currentWindow:!0,windowType:"normal"},t).done(function(n){var r;return r=[],n.forEach(function(e){if(t(e))return r.push(e.id)}),r.length>0?chrome.tabs.remove(r,function(){return e.resolve()}):e.resolve()})},c=function(e,t,n,r){return chrome.tabs.executeScript(t,{code:n,allFrames:r,runAt:"document_end"},function(t){return e.resolve(t)})},f=function(e){var r,i;return r=$.Deferred(),i=0,andy.local.keyConfigSet.forEach(function(s){var u,a,f;if(s["new"]===e)switch(a=s.command.name){case"createTab":return v().done(function(e,t){return chrome.tabs.create({windowId:t,index:e.index+1},function(e){return j.register(e.id,function(){return r.resolve()})})});case"createTabBG":return v().done(function(e,t){return chrome.tabs.create({windowId:t,index:e.index+1,active:!1},function(e){return j.register(e.id,function(){return r.resolve()})})});case"closeOtherTabs":return t(r,function(){return!0});case"closeTabsRight":case"closeTabsLeft":return v().done(function(e){return i=e.index,a==="closeTabsRight"?t(r,function(e){return e.index>i}):t(r,function(e){return e.index<i})});case"moveTabRight":case"moveTabLeft":return v().done(function(e,t){var n;return n=e.index,a==="moveTabRight"?n+=1:n-=1,n>-1?chrome.tabs.move(e.id,{windowId:t,index:n},function(){return r.resolve()}):r.resolve()});case"moveTabFirst":return v().done(function(e,t){return chrome.tabs.move(e.id,{windowId:t,index:0},function(){return r.resolve()})});case"moveTabLast":return v().done(function(e,t){return chrome.tabs.move(e.id,{windowId:t,index:1e3},function(){return r.resolve()})});case"detachTab":return v().done(function(e,t){return chrome.windows.create({tabId:e.id,focused:!0,type:"normal"},function(){return r.resolve()})});case"attachTab":return v().done(function(e,t){return chrome.windows.getAll({populate:!0},function(t){var n,i,s,o,u,a,f,l,c;for(i=a=0,l=t.length;0<=l?a<l:a>l;i=0<=l?++a:--a)for(s=f=0,c=t[i].tabs.length;0<=c?f<c:f>c;s=0<=c?++f:--f)if(e.id===t[i].tabs[s].id){n=i;break}return(u=t[++n])?o=u.id:o=t[0].id,chrome.tabs.move(e.id,{windowId:o,index:1e3},function(){return chrome.tabs.update(e.id,{active:!0},function(){return r.resolve()})})})});case"duplicateTab":return v().done(function(e,t){return chrome.tabs.duplicate(e.id,function(){return r.resolve()})});case"duplicateTabWin":return v().done(function(e,t){return chrome.tabs.duplicate(e.id,function(e){return chrome.windows.create({tabId:e.id,focused:!0,type:"normal"},function(){return r.resolve()})})});case"pinTab":return v().done(function(e,t){return chrome.tabs.update(e.id,{pinned:!e.pinned},function(){return r.resolve()})});case"switchNextWin":return chrome.windows.getAll(null,function(e){var t,n,i,s;s=[];for(t=n=0,i=e.length;0<=i?n<i:n>i;t=0<=i?++n:--n){if(e[t].focused){t===e.length-1?chrome.windows.update(e[0].id,{focused:!0},function(){return r.resolve()}):chrome.windows.update(e[t+1].id,{focused:!0},function(){return r.resolve()});break}s.push(void 0)}return s});case"switchPrevWin":return chrome.windows.getAll(null,function(e){var t,n,i,s;s=[];for(t=n=0,i=e.length;0<=i?n<i:n>i;t=0<=i?++n:--n){if(e[t].focused){t===0?chrome.windows.update(e[e.length-1].id,{focused:!0},function(){return r.resolve()}):chrome.windows.update(e[t-1].id,{focused:!0},function(){return r.resolve()});break}s.push(void 0)}return s});case"closeOtherWins":return chrome.windows.getAll(null,function(e){return n(r,e,0)});case"pasteText":return setTimeout(function(){return p.PasteText(s.command.content),r.resolve()},0);case"copyText":return v().done(function(e){return chrome.tabs.sendMessage(e.id,{action:"askAlive"},function(t){return t==="hello"?setClipboardWithHistory(r,e.id):chrome.tabs.executeScript(e.id,{file:"kbdagent.js",allFrames:!0,runAt:"document_end"},function(t){return setClipboardWithHistory(r,e.id)})})});case"showHistory":return v().done(function(e){return chrome.tabs.sendMessage(e.id,{action:"askAlive"},function(t){return t==="hello"?showCopyHistory(r,e.id):chrome.tabs.executeScript(e.id,{file:"kbdagent.js",allFrames:!0,runAt:"document_end"},function(t){return showCopyHistory(r,e.id)})})});case"insertCSS":return v().done(function(e){return chrome.tabs.insertCSS(e.id,{code:s.command.content,allFrames:s.command.allFrames},function(){return r.resolve()})});case"execJS":return s.command.coffee?u=w[s["new"]]:u=s.command.content,s.command.useUtilObj&&(u=E+b+u+";scd.returnValue"),v(!0).done(function(e){return s.command.jquery?chrome.tabs.sendMessage(e.id,{action:"askJQuery"},function(t){return t==="hello"?c(r,e.id,u,s.command.allFrames):chrome.tabs.executeScript(e.id,{file:"lib/jquery.min.js",allFrames:s.command.allFrames},function(t){return c(r,e.id,u,s.command.allFrames)})}):c(r,e.id,u,s.command.allFrames)});case"clearHistory":return chrome.browsingData.removeHistory({},function(){return r.resolve()});case"clearHistoryS":return f=s.command.content,chrome.history.search({text:"",startTime:0,maxResults:1e4},function(e){var t,n,i,s,u;t=[];for(i=s=0,u=e.length;0<=u?s<u:s>u;i=0<=u?++s:--s)n=e[i],(n.title+n.url).indexOf(f)!==-1&&t.push(n.url);if(t.length>0)return o(r,t,0)});case"clearCookiesAll":return chrome.browsingData.removeCookies({},function(){return r.resolve()});case"clearCookies":return v().done(function(e){var t,n;return t=e.url.match(/:\/\/(.[^/:]+)/)[1],n=[],chrome.cookies.getAll({},function(e){return e.forEach(function(e){var r,i;if(("."+t).indexOf(e.domain)!==-1)return r=e.secure?"s":"",i="http"+r+"://"+e.domain+e.path,n.push({url:i,name:e.name})}),A(r,n,0)})});case"clearCache":return chrome.browsingData.removeCache({},function(){return r.resolve()})}}),r.promise()},H=function(e){var t,n,r;r=[];if(e)return t=andy.local.config.kbdtype,n=andy.getKeyCodes()[t].keys,e.forEach(function(e){var t;t=~~e["new"].substring(2);if(/^00|^04/.test(e["new"])&&!/^F\d|^Application/.test(n[t]))return null;if(e.batch&&e["new"]&&e.mode!=="through")return r.push([e["new"],e.origin,"batch"].join(";"));if(!/^C/.test(e["new"]))return r.push([e["new"],e.origin,e.mode].join(";"))}),p.SetKeyConfig(r.join("|"))},window.andy={local:null,setLocal:function(){var e,t=this;return e=$.Deferred(),chrome.storage.local.get(null,function(n){return t.local=n,t.local.ctxMenuFolderSet||(t.local.ctxMenuFolderSet=[]),t.local.config?e.resolve():chrome.i18n.getAcceptLanguages(function(e){return/^ja/.test(e)?t.local.config={kbdtype:"JP",lang:"ja"}:t.local.config={kbdtype:"US",lang:"en"},$.Deferred().resolve()})}),e.promise()},saveConfig:function(e){var t=this;return chrome.storage.local.set(e,function(){return t.local=e,H(t.local.keyConfigSet)})},updateCtxMenu:function(e,t,n){return t.id=e,n?t.type="update pause":t.type="update",L($.Deferred(),[t],0)},remakeCtxMenu:function(e){var t,n=this;return t=$.Deferred(),chrome.storage.local.set(e,function(){return n.local=e,r().done(function(){return t.resolve()})}),t.promise()},getKeyCodes:function(){return{US:{keys:keysUS,name:"US 104 Keyboard"},JP:{keys:keysJP,name:"JP 109 Keyboard"}}},getScHelp:function(){return O},getScHelpSect:function(){return _},startEdit:function(){p.EndConfigMode()},endEdit:function(){p.StartConfigMode()},getCtxMenus:function(){},getUndoData:function(e){return I[e]},setUndoData:function(e,t){return I[e]=t},changePK:function(e,t){if(w[e]=w[t])return w[t]=null},coffee2JS:function(e,t){var n;try{return w[e]=CoffeeScript.compile(t,{bare:"on"}),{success:!0}}catch(r){return n=r,w[e]="",{success:!1,err:n.message}}}},window.pluginEvent=function(e,t){switch(e){case"log":return console.log(t);case"configKeyEvent":return P({action:"kbdEvent",value:t});case"bookmark":return k(t);case"command":return a(t);case"batch":return a(t)}},O={},_={},M="https://support.google.com/chrome/answer/157179?hl=",D=function(e,t,n){var r;return r=$(n).find("tr:has(td:first-child:has(strong))"),$.each(r,function(n,r){var i;return i=r.cells[1].textContent.replace(/^\s+|\s$/g,""),Array.prototype.forEach.call(r.childNodes[1].getElementsByTagName("strong"),function(n){var r,s;r=n.textContent.toUpperCase().replace(/\s/g,""),r=r.replace("PGUP","PAGEUP").replace("PGDOWN","PAGEDOWN").replace(/DEL$/,"DELETE").replace(/INS$/,"INSERT").replace("ホーム","HOME").replace("バー","");if((s=O[r])!=null?!s[e]:!void 0)O[r]||(O[r]={}),O[r][e]=[];return O[r][e].push(t+"^"+i)})})},e=function(e,t){var n,r,i;return n=$(e),r=n.find("div.main-section"),i="",Array.prototype.forEach.call(r[0].children,function(e){switch(e.tagName){case"H3":switch(e.textContent){case"Tab and window shortcuts":case"タブとウィンドウのショートカット":i="T";break;case"Google Chrome feature shortcuts":case"Google Chrome 機能のショートカット":i="C";break;case"Address bar shortcuts":case"アドレスバーのショートカット":i="A";break;case"Webpage shortcuts":case"ウェブページのショートカット":i="W";break;case"Text shortcuts":case"テキストのショートカット":i="Tx"}return _[i]=e.textContent;case"TABLE":return D(t,i,e)}})},L=function(e,t,n){var r,i,s,o,u,a,f,l;if(!(o=t[n]))return e.resolve();l=t[n],u=l.id,f=l.type,r=l.caption,i=l.contexts,a=l.parentId,/pause/.test(f)?s={type:"normal",enabled:!1}:s={type:"normal",enabled:!0},r&&(s.title=r,s.contexts=[i]),a!=="route"&&(s.parentId=a);if(/create/.test(f))return s.id=u,chrome.contextMenus.create(s,function(){return L(e,t,n+1)});if(/update/.test(f))return chrome.contextMenus.update(u,s,function(){return L(e,t,n+1)})},r=function(){var e,t,n;if(n=andy.local.keyConfigSet)return e=andy.local.ctxMenuFolderSet,t=$.Deferred(),chrome.contextMenus.removeAll(function(){var r,i;return i=[],n.forEach(function(e){var t;if(t=e.ctxMenu)return t.id=e["new"],t.order=t.order||999,e.mode==="through"?t.type="create pause":t.type="create",i.push(t)}),i.sort(function(e,t){return e.order-t.order}),r=[],i.forEach(function(t){var n,i,s,o,u,a,f;if(t.parentId!=="route"){n=!1;for(s=o=0,a=r.length;0<=a?o<a:o>a;s=0<=a?++o:--o)if(r[s].id===t.parentId){n=!0;break}if(!n)for(s=u=0,f=e.length;0<=f?u<f:u>f;s=0<=f?++u:--u)if(e[s].id===t.parentId){i=e[s],r.push({id:i.id,order:t.order,parentId:"route",type:"create",caption:i.title,contexts:i.contexts});break}}return r.push(t)}),L(t,r,0)}),t.promise()},$(function(){var t;return andy.setLocal().done(function(){var e,t,n,i,s,o;if(n=andy.local.keyConfigSet){H(n),r(),o=[];for(e=i=0,s=n.length;0<=s?i<s:i>s;e=0<=s?++i:--i)(t=n[e]).mode==="command"&&t.command.name==="execJS"&&t.command.coffee?o.push(andy.coffee2JS(t["new"],t.command.content)):o.push(void 0);return o}}),t=function(t){var n;return $.get(M+t).done(function(r){return e(r,t),n.resolve()}),(n=$.Deferred()).promise()},t("ja").done(function(){return t("en").done(function(){return delete O["-"],delete O["+"],O["CTRL+;"]={ja:["W^ページ全体を拡大表示します。"]},O["CTRL+="]={en:["W^Enlarges everything on the page."]},O["CTRL+-"]={en:["W^Makes everything on the page smaller."],ja:["W^ページ全体を縮小表示します。"]}})})})}).call(this);