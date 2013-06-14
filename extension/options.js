!function(){var $,BookmarksView,Config,HeaderView,KeyConfig,KeyConfigSet,KeyConfigSetView,KeyConfigView,WebFontConfig,endEditing,escape,fk,keyCodes,keys,marginBottom,optionsDisp,resizeTimer,saveData,scHelp,scHelpSect,startEditing,windowOnResize;keyCodes={};keys=null;WebFontConfig={google:{families:["Noto+Sans::latin"]}};optionsDisp={assignOrg:"None",simEvent:"Simurate key event",bookmark:"Bookmark",disabled:"Disabled",through:"Through"};escape=function(html){var entity;entity={"&":"&amp;","<":"&lt;",">":"&gt;"};return html.replace(/[&<>]/g,function(match){return entity[match]})};HeaderView=Backbone.View.extend({scHelpUrl:"https://support.google.com/chrome/answer/157179?hl=",el:"div.header",events:{"click button.addKeyConfig":"onClickAddKeyConfig","change select.kbdtype":"onChangeSelKbd"},initialize:function(options){var kbdtype,selectKbd$,_this=this;keys=keyCodes[kbdtype=this.model.get("kbdtype")].keys;selectKbd$=this.$("select.kbdtype");$.each(keyCodes,function(key,item){return selectKbd$.append('<option value="'+key+'">'+item.name+"</option>")});selectKbd$.val(kbdtype);return this.setScHelp(kbdtype)},onClickAddKeyConfig:function(event){return this.trigger("clickAddKeyConfig",event)},onChangeSelKbd:function(event){this.trigger("changeSelKbd",event);return this.setScHelp(this.$("select.kbdtype").val())},setScHelp:function(kbdtype){if(kbdtype==="JP"){return this.$(".scHelp").text("ショートカットキー一覧").attr("href",this.scHelpUrl+"ja")}else{return this.$(".scHelp").text("Keyboard shortcuts").attr("href",this.scHelpUrl+"en")}}});Config=Backbone.Model.extend({});KeyConfig=Backbone.Model.extend({idAttribute:"proxy",defaults:{mode:"assignOrg"}});KeyConfigSet=Backbone.Collection.extend({model:KeyConfig});KeyConfigView=Backbone.View.extend({kbdtype:null,optionKeys:[],events:{"click .origin,.proxy":"onClickInput","click i.icon-remove":"onClickRemove","click div.mode":"onClickMode","click .selectMode div":"onChangeMode","blur  .selectMode":"onBlurSelectMode","click i.icon-pencil":"onClickEditDesc","submit .memo":"onSubmitMemo","blur  input.memo":"onBlurInputMemo"},initialize:function(options){this.optionKeys=_.keys(optionsDisp);this.model.on({"change:bookmark":this.onChangeBookmark,setFocus:this.onClickInput,remove:this.onRemove},this);return this.model.collection.on({kbdEvent:this.onKbdEvent,changeKbd:this.onChangeKbd,updateOrder:this.onUpdateOrder},this)},render:function(kbdtype){var mode;this.setElement(this.template({options:optionsDisp}));mode=this.model.get("mode");this.setKbdValue(this.$(".proxy"),this.model.id);this.setKbdValue(this.$(".origin"),this.model.get("origin"));this.kbdtype=kbdtype;this.onChangeMode(null,mode);return this},onChangeBookmark:function(){return this.onChangeMode(null,"bookmark")},onRemove:function(){this.model.off(null,null,this);this.off(null,null,null);return this.remove()},onKbdEvent:function(value){var container,input$;input$=this.$("div:focus");if(input$.length>0){if(input$.hasClass("proxy")){if(this.model.id!==value&&this.model.collection.findWhere({proxy:value})){this.trigger("decodeKbdEvent",value,container={});$("#tiptip_content").text('"'+container.result+'" is already exists.');input$.tipTip();return}}this.setKbdValue(input$,value);this.model.set(input$[0].className.match(/(proxy|origin)/)[0],value);this.setDesc();return this.trigger("resizeInput")}},onChangeKbd:function(kbdtype){this.kbdtype=kbdtype;this.setKbdValue(this.$(".proxy"),this.model.id);this.setKbdValue(this.$(".origin"),this.model.get("origin"));return this.setDesc()},onUpdateOrder:function(){return this.model.set("ordernum",this.$el.parent().children().index(this.$el))},onClickEditDesc:function(){var editing,input$,memo;(memo=this.$("div.memo")).toggle();editing=(input$=this.$("form.memo").toggle().find("input")).is(":visible");if(editing){startEditing();return input$.focus().val(memo.text())}else{return this.onSubmitMemo()}},onClickMode:function(){if(this.$(".selectMode").toggle().is(":visible")){this.$(".selectMode").focus();return this.$(".mode").addClass("selecting")}else{return this.$(".mode").removeClass("selecting")}},onChangeMode:function(event,mode){if(event){this.$(".mode").removeClass("selecting");mode=event.currentTarget.className;this.$(".selectMode").hide();if(mode==="bookmark"){this.trigger("showBookmarks",this.model.id);return}}this.model.set("mode",mode);this.$(".mode").removeClass(this.optionKeys.join(" ")).addClass(mode);this.setDispMode(mode);this.setDesc();return this.trigger("resizeInput")},onBlurSelectMode:function(){this.$(".selectMode").hide();return this.$(".mode").removeClass("selecting")},onClickInput:function(event){var target$;if(event){if((target$=$(event.currentTarget)).hasClass("proxy")||target$.hasClass("origin assignOrg")){return target$.focus()}}else{return this.$(".origin").focus()}},onSubmitMemo:function(){this.$("form.memo").hide();this.model.set({memo:this.$("div.memo").show().html(escape(this.$("input.memo").val())).text()});endEditing();return false},onBlurInputMemo:function(){return this.onSubmitMemo()},onClickRemove:function(){return this.trigger("removeConfig",this.model)},setDispMode:function(mode){this.$("div.mode").addClass(mode).find("span").text(optionsDisp[mode]);this.$(".proxy,.origin,.icon-arrow-right").removeClass(this.optionKeys.join(" ")).addClass(mode);if(mode==="assignOrg"){return this.$(".origin").attr("tabIndex","0")}else{return this.$(".origin").removeAttr("tabIndex")}},setKbdValue:function(input$,value){var container;this.trigger("decodeKbdEvent",value,container={});return input$.html(_.map(container.result.split(" + "),function(s){return"<span>"+s+"</span>"}).join("+"))},setDesc:function(){var content,help,i,key,keycombo,lang,mode,tdDesc,test,_i,_ref;(tdDesc=this.$(".desc")).empty();switch(mode=this.model.get("mode")){case"bookmark":tdDesc.append('<div><i class="icon-star"></i></div><div class="bookmark" title="'+this.model.get("bookmark").url+'">'+this.model.get("bookmark").title+"</div>");break;case"assignOrg":case"through":case"disabled":lang=this.kbdtype==="JP"?"ja":"en";if(mode==="assignOrg"){keycombo=this.$(".origin").text()}else{keycombo=this.$(".proxy").text()}keycombo=keycombo.replace(/\s/g,"").toUpperCase();if(!(help=scHelp[keycombo])){if(/^CTRL\+[2-7]$/.test(keycombo)){help=scHelp["CTRL+1"]}}if(help){for(i=_i=0,_ref=help[lang].length;0<=_ref?_i<_ref:_i>_ref;i=0<=_ref?++_i:--_i){test=help[lang][i].match(/(^\w+)\^(.+)/);key=RegExp.$1;content=RegExp.$2;tdDesc.append(this.templateHelp({sectDesc:scHelpSect[key],sectKey:key,scHelp:content})).find(".sectInit").tooltip({position:{my:"left+10 top-60"}})}}}if(tdDesc.html()===""){return tdDesc.append(this.templateMemo({memo:this.model.get("memo")}))}},templateMemo:_.template('<div>\n  <i class="icon-pencil" title="Edit description"></i>\n</div>\n<form class="memo">\n  <input type="text" class="memo">\n</form>\n<div class="memo"><%=memo%></div>'),templateHelp:_.template('<div class="sectInit" title="<%=sectDesc%>"><%=sectKey%></div><div class="content"><%=scHelp%></div>'),template:_.template('<tr>\n  <td>\n    <div class="proxy" tabIndex="0"></div>\n  </td>\n  <td>\n    <i class="icon-arrow-right"></i>\n  </td>\n  <td class="tdOrigin">\n    <div class="origin" tabIndex="0"></div>\n  </td>\n  <td class="options">\n    <div class="mode"><span></span><i class="icon-caret-down"></i></div>\n    <div class="selectMode" tabIndex="0">\n      <% _.each(options, function(name, key) { %>\n      <div class="<%=key%>"><%=name%></div>\n      <% }); %>\n    </div>\n  <td class="desc">\n  </td>\n  <td class="remove">\n    <i class="icon-remove" title="Remove"></i>\n  </td>\n  <td class="blank">&nbsp;</td>\n</tr>')});KeyConfigSetView=Backbone.View.extend({placeholder:"Enter new shortcut key",el:"table.keyConfigSetView",events:{"blur div.addnew":"onBlurAddnew"},initialize:function(options){this.collection.comparator=function(model){return model.get("ordernum")};return this.collection.on({add:this.onAddRender,kbdEvent:this.onKbdEvent},this)},render:function(keyConfigSet){var _this=this;this.$el.append(this.template());this.collection.set(keyConfigSet);this.$("tbody").sortable({delay:300,scroll:true,cursor:"move",update:function(){return _this.userSorted()}});return this},onAddRender:function(model){var keyConfigView,newChild;keyConfigView=new KeyConfigView({model:model});keyConfigView.on("decodeKbdEvent",this.onChildDecodeKbdEvent,this);keyConfigView.on("removeConfig",this.onChildRemoveConfig,this);keyConfigView.on("resizeInput",this.onChildResizeInput,this);keyConfigView.on("showBookmarks",this.onShowBookmarks,this);return this.$("tbody").append(newChild=keyConfigView.render(this.model.get("kbdtype")).$el)},onKbdEvent:function(value){var newitem;if(this.$(".addnew").length===0){return}if(this.collection.findWhere({proxy:value})){$("#tiptip_content").text('"'+this.decodeKbdEvent(value)+'" is already exists.');this.$("div.addnew").tipTip();return}this.$("div.addnew").blur();this.collection.add(newitem=new KeyConfig({proxy:value,origin:value}));this.$("tbody").sortable("enable").sortable("refresh");windowOnResize();this.onChildResizeInput();return newitem.trigger("setFocus")},onChildDecodeKbdEvent:function(value,container){return container.result=this.decodeKbdEvent(value)},onChildRemoveConfig:function(model){this.collection.remove(model);windowOnResize();return this.onChildResizeInput()},onChildResizeInput:function(){var _this=this;this.$(".th_inner").css("left",0);return setTimeout(function(){return _this.$(".th_inner").css("left","")},0)},onShowBookmarks:function(modelId){return this.trigger("showBookmarks",modelId)},onSetBookmark:function(modelId,options){if(options){return this.collection.get(modelId).set({bookmark:options},{silent:true}).trigger("change:bookmark")}},onClickAddKeyConfig:function(event){if(this.$(".addnew").length>0){return}if(this.collection.length>=20){$("#tiptip_content").text("You have reached the maximum number of items. (Max 20 items)");$(event.currentTarget).tipTip({defaultPosition:"right"});return}$(this.templateAddNew({placeholder:this.placeholder})).appendTo(this.$("tbody")).find(".addnew").focus()[0].scrollIntoView();this.$("tbody").sortable("disable");return windowOnResize()},onBlurAddnew:function(){this.$(".addnew").remove();this.$("tbody").sortable("enable");return windowOnResize()},onChangeSelKbd:function(event){var newKbd;keys=keyCodes[newKbd=event.currentTarget.value].keys;this.collection.trigger("changeKbd",newKbd);return this.model.set("kbdtype",newKbd)},decodeKbdEvent:function(value){var keyCombo,keyIdenfiers,modifiers,scanCode;modifiers=parseInt(value.substring(0,2),16);scanCode=value.substring(2);keyIdenfiers=keys[scanCode];keyCombo=[];if(modifiers&1){keyCombo.push("Ctrl")}if(modifiers&2){keyCombo.push("Alt")}if(modifiers&8){keyCombo.push("Win")}if(modifiers&4){keyCombo.push("Shift");keyCombo.push(keyIdenfiers[1]||keyIdenfiers[0])}else{keyCombo.push(keyIdenfiers[0])}return keyCombo.join(" + ")},setTableVisible:function(){if(this.collection.length===0){return this.$el.hide()}else{return this.$el.show()}},userSorted:function(){this.collection.trigger("updateOrder");return this.collection.sort()},getSaveData:function(){this.collection.remove(this.collection.findWhere({proxy:this.placeholder}));return{config:this.model.toJSON(),keyConfigSet:this.collection.toJSON()}},templateAddNew:_.template('<tr class="addnew">\n  <td colspan="3">\n    <div class="proxy addnew" tabIndex="0"><%=placeholder%></div>\n  </td>\n  <td></td><td></td><td></td><td class="blank"></td>\n</tr>'),template:_.template('<thead>\n  <tr>\n    <th>\n      <div class="th_inner">New <i class="icon-arrow-right"></i> Origin shortcut key</div>\n    </th>\n    <th></th>\n    <th></th>\n    <th>\n      <div class="th_inner options">Options</div>\n    </th>\n    <th>\n      <div class="th_inner desc">Description</div>\n    </th>\n    <th></th>\n    <th><div class="th_inner blank">&nbsp;</div></th>\n  </tr>\n</thead>\n<tbody></tbody>')});BookmarksView=Backbone.View.extend({el:".bookmarks",events:{"submit form":"onSubmitForm","click a":"setBookmark","click .icon-remove":"onClickIconRemove"},initialize:function(){this.elBookmark$=this.$(".result");return this.$(".result_outer").niceScroll({cursorwidth:12,cursorborderradius:6,smoothscroll:true,cursoropacitymin:.1,cursoropacitymax:.6})},onClickIconRemove:function(){this.trigger("setBookmark",this.modelId,null);return this.hideBookmarks()},onShowBookmarks:function(id){var height,left;this.modelId=id;height=window.innerHeight-80;left=(window.innerWidth-600)/2;this.el.style.pixelTop=20;this.el.style.pixelLeft=left;this.$(".result_outer").height(height-30);this.$el.height(height).show().find("input.query").focus();this.$(".result_outer").getNiceScroll().show();$(".backscreen").show();return startEditing()},onSubmitForm:function(){var query,_this=this;this.$(".result").empty();query=this.$("input.query").val();chrome.bookmarks.getTree(function(treeNode){return treeNode.forEach(function(node){return _this.digBookmarks(node,query,1)})});windowOnResize();return false},digBookmarks:function(node,query,indent){var _this=this;if(node.title){if(node.children){this.elBookmark$.append('<div class="folder" style="text-indent:'+(indent-1)+'em"><i class="icon-folder-open"></i>'+node.title+"</div>")}else{if(!query||(node.title+" "+node.url).toUpperCase().indexOf(query.toUpperCase())>-1){this.elBookmark$.append('<div style="text-indent:'+indent+'em"><a href="#" title="'+node.url+'" data-id="'+node.id+'">'+node.title+"</a></div>")}}}else{indent--}if(node.children){return node.children.forEach(function(child){return _this.digBookmarks(child,query,indent+1)})}},hideBookmarks:function(){endEditing();this.$(".result_outer").getNiceScroll().hide();$(".backscreen").hide();return this.$el.hide()},setBookmark:function(event){var target;target=$(event.currentTarget);this.trigger("setBookmark",this.modelId,{title:target.text(),url:target.attr("title"),bmId:target.attr("data-id")});return this.hideBookmarks()}});marginBottom=0;resizeTimer=false;windowOnResize=function(){if(resizeTimer){clearTimeout(resizeTimer)}return resizeTimer=setTimeout(function(){var tableHeight;tableHeight=window.innerHeight-document.querySelector(".header").offsetHeight-marginBottom;document.querySelector(".fixed-table-container").style.pixelHeight=tableHeight;$(".fixed-table-container-inner").getNiceScroll().resize();return $(".result_outer").getNiceScroll().resize()},200)};fk=chrome.extension.getBackgroundPage().fk;saveData=fk.getConfig();keyCodes=fk.getKeyCodes();scHelp=fk.getScHelp();scHelpSect=fk.getScHelpSect();startEditing=function(){return fk.startEditing()};endEditing=function(){return fk.endEditing()};$=jQuery;$(function(){var bookmarksView,headerView,keyConfigSetView;headerView=new HeaderView({model:new Config(saveData.config)});headerView.render();keyConfigSetView=new KeyConfigSetView({model:new Config(saveData.config),collection:new KeyConfigSet});keyConfigSetView.render(saveData.keyConfigSet);bookmarksView=new BookmarksView({});headerView.on("clickAddKeyConfig",keyConfigSetView.onClickAddKeyConfig,keyConfigSetView);headerView.on("changeSelKbd",keyConfigSetView.onChangeSelKbd,keyConfigSetView);keyConfigSetView.on("showBookmarks",bookmarksView.onShowBookmarks,bookmarksView);bookmarksView.on("setBookmark",keyConfigSetView.onSetBookmark,keyConfigSetView);chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){switch(request.action){case"kbdEvent":return keyConfigSetView.collection.trigger("kbdEvent",request.value);case"saveConfig":return fk.saveConfig(keyConfigSetView.getSaveData())}});$(window).on("unload",function(){return fk.saveConfig(keyConfigSetView.getSaveData())}).on("resize",function(){return windowOnResize()});windowOnResize();$(".fixed-table-container-inner").niceScroll({cursorwidth:12,cursorborderradius:2,smoothscroll:true,cursoropacitymin:.1,cursoropacitymax:.6});return $(".beta").text("β")})}.call(this);