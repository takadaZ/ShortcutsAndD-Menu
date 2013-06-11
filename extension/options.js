// Generated by CoffeeScript 1.6.3
(function() {
  var $, Config, HeaderView, KeyConfig, KeyConfigSet, KeyConfigSetView, KeyConfigView, WebFontConfig, fk, keyCodes, keys, marginBottom, resizeTimer, saveData, scHelp, scHelpSect, windowOnResize;

  keyCodes = {};

  keys = null;

  WebFontConfig = {
    google: {
      families: ['Noto+Sans::latin']
    }
  };

  HeaderView = Backbone.View.extend({
    el: "div.header",
    events: {
      "click button.addKeyConfig": "onClickAddKeyConfig",
      "change select.kbdtype": "onChangeSelKbd"
    },
    initialize: function(options) {
      var kbdtype, selectKbd$,
        _this = this;
      keys = keyCodes[kbdtype = this.model.get("kbdtype")].keys;
      selectKbd$ = this.$("select.kbdtype");
      $.each(keyCodes, function(key, item) {
        return selectKbd$.append("<option value=\"" + key + "\">" + item.name + "</option>");
      });
      return selectKbd$.val(kbdtype);
    },
    onClickAddKeyConfig: function(event) {
      return this.trigger("clickAddKeyConfig", event);
    },
    onChangeSelKbd: function(event) {
      return this.trigger("changeSelKbd", event);
    }
  });

  Config = Backbone.Model.extend({});

  KeyConfig = Backbone.Model.extend({
    idAttribute: "proxy",
    defaults: {
      proxy: "",
      origin: "",
      mode: "assignOrg"
    }
  });

  KeyConfigSet = Backbone.Collection.extend({
    model: KeyConfig
  });

  KeyConfigView = Backbone.View.extend({
    kbdtype: null,
    events: {
      "click div.checkbox": "onClickCheck",
      "click input.origin": "onClickInputOrigin",
      "click i.icon-remove": "onClickRemove"
    },
    initialize: function(options) {
      this.model.on({
        setFocus: this.onSetFocus,
        remove: this.onRemove
      }, this);
      return this.model.collection.on({
        kbdEvent: this.onKbdEvent,
        changeKbd: this.onChangeKbd,
        updateOrder: this.onUpdateOrder
      }, this);
    },
    render: function(kbdtype) {
      var mode;
      this.setElement(this.template(this.model.toJSON()));
      mode = this.model.get("mode");
      this.$("i." + mode).addClass("hilite");
      if (mode !== "assignOrg") {
        this.$("input.origin").attr("disabled", "disabled");
      }
      this.onChangeKbd(kbdtype);
      this.setHelp();
      return this;
    },
    onSetFocus: function() {
      return this.$("input.proxy").focus();
    },
    onRemove: function() {
      this.model.off(null, null, this);
      this.off(null, null, null);
      return this.remove();
    },
    onKbdEvent: function(value) {
      var input$, origin$;
      input$ = this.$("input:text:focus");
      if (input$.length > 0) {
        this.setKbdValue(input$, value);
        if (input$[0].className === "proxy") {
          if (this.model.id !== value && this.model.collection.findWhere({
            proxy: value
          })) {
            $("#tiptip_content").text("\"" + (input$.val()) + "\" is already exists.");
            if (this.model.id) {
              this.setKbdValue(input$, this.model.id);
            } else {
              input$.val("").removeAttr("data-entry");
            }
            input$.tipTip();
            return;
          } else if ((origin$ = this.$("input.origin")).val() === "") {
            this.setKbdValue(origin$, value);
            this.model.set("origin", value);
          }
        }
        this.model.set(input$[0].className, value);
        return this.setHelp();
      }
    },
    onChangeKbd: function(kbdtype) {
      this.kbdtype = kbdtype;
      this.setKbdValue(this.$("input.proxy"), this.model.id);
      this.setKbdValue(this.$("input.origin"), this.model.get("origin"));
      return this.setHelp();
    },
    onUpdateOrder: function() {
      return this.model.set("ordernum", this.$el.parent().children().index(this.$el));
    },
    onClickCheck: function(event) {
      var target$, value;
      this.$("i.icon-ok").removeClass("hilite");
      target$ = $(event.currentTarget).find("i");
      target$.addClass("hilite");
      value = target$[0].className.replace(/icon-ok\s|\shilite/g, "");
      this.model.set("mode", value);
      if (value === "assignOrg") {
        this.$("input.origin").removeAttr("disabled");
      } else {
        this.$("input.origin").attr("disabled", "disabled").blur();
      }
      return this.setHelp();
    },
    onClickInputOrigin: function(event) {
      if (!/assignOrg/.test(this.$("i.hilite")[0].className)) {
        return $(event.currentTarget).blur();
      }
    },
    onClickRemove: function() {
      return this.trigger("removeConfig", this.model);
    },
    setKbdValue: function(input$, value) {
      var chars, keyIdenfiers, modifiers, scanCode;
      if (!value) {
        input$.val("");
        return;
      }
      modifiers = parseInt(value.substring(0, 2), 16);
      scanCode = value.substring(2);
      keyIdenfiers = keys[scanCode];
      chars = [];
      if (modifiers & 1) {
        chars.push("Ctrl");
      }
      if (modifiers & 2) {
        chars.push("Alt");
      }
      if (modifiers & 8) {
        chars.push("Meta");
      }
      if (modifiers & 4) {
        chars.push("Shift");
        chars.push(keyIdenfiers[1] || keyIdenfiers[0]);
      } else {
        chars.push(keyIdenfiers[0]);
      }
      return input$.val(chars.join(" + ")).attr("data-entry", "true");
    },
    setHelp: function() {
      var help, i, keycombo, lang, mode, test, _i, _ref, _results;
      this.$("td.desc").empty();
      if ((mode = this.model.get("mode")) === "simEvent") {

      } else {
        lang = this.kbdtype === "JP" ? "ja" : "en";
        if (mode === "assignOrg") {
          keycombo = this.$("input.origin").val();
        } else {
          keycombo = this.$("input.proxy").val();
        }
        keycombo = (keycombo.replace(/\s/g, "")).toUpperCase();
        if (!(help = scHelp[keycombo])) {
          if (/^CTRL\+[2-7]$/.test(keycombo)) {
            help = scHelp["CTRL+1"];
          }
        }
        if (help) {
          _results = [];
          for (i = _i = 0, _ref = help[lang].length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            test = help[lang][i].match(/(^\w+)\^(.+)/);
            _results.push(this.$("td.desc").append($("<div class=\"sectInit\" title=\"" + scHelpSect[RegExp.$1] + "\">" + RegExp.$1 + "</div><div class=\"content\">" + RegExp.$2 + "</div>")));
          }
          return _results;
        }
      }
    },
    template: _.template("<tr>\n  <td>\n    <input type=\"text\" class=\"proxy\" placeholder=\"Enter new shortcut key\" readonly>\n  </td>\n  <td>\n    <i class=\"icon-double-angle-right\"></i>\n  </td>\n  <td>\n    <input type=\"text\" class=\"origin\" placeholder=\"Enter orgin shortcut key\" readonly>\n  </td>\n  <td class=\" chkItem\">\n    <div class=\"checkbox\"><i class=\"icon-ok assignOrg\"></i></div>\n  </td>\n  <td class=\" chkItem\">\n    <div class=\"checkbox\"><i class=\"icon-ok simEvent\"></i></div>\n  </td>\n  <td class=\" chkItem\">\n    <div class=\"checkbox\"><i class=\"icon-ok disabled\"></i></div>\n  </td>\n  <td class=\"desc\">\n  </td>\n  <td class=\"remove\">\n    <i class=\"icon-remove\" title=\"Remove\"></i>\n  </td>\n  <td class=\"blank\">&nbsp;</td>\n</tr>")
  });

  KeyConfigSetView = Backbone.View.extend({
    el: "table.keyConfigSetView",
    initialize: function(options) {
      this.collection.comparator = function(model) {
        return model.get("ordernum");
      };
      return this.collection.on({
        add: this.onAddRender,
        onKeyEvent: this.onAddRender
      }, this);
    },
    render: function(keyConfigSet) {
      var _this = this;
      this.$el.append(this.template());
      this.collection.set(keyConfigSet);
      this.$("tbody").sortable({
        delay: 300,
        scroll: true,
        cursor: "move",
        update: function() {
          return _this.userSorted();
        }
      });
      this.setTableVisible();
      return $("button").focus().blur();
    },
    onAddRender: function(model) {
      var keyConfigView, newChild, taskView;
      taskView = void 0;
      keyConfigView = new KeyConfigView({
        model: model
      });
      this.$("tbody").append(newChild = keyConfigView.render(this.model.get("kbdtype")).$el);
      newChild.find("input.proxy").focus().end();
      newChild[0].scrollIntoView(true);
      keyConfigView.on("removeConfig", this.onRemoveConfig, this);
      return this.setTableVisible();
    },
    onRemoveConfig: function(model) {
      this.collection.remove(model);
      this.setTableVisible();
      return windowOnResize();
    },
    onClickAddKeyConfig: function(event) {
      var emptyModel;
      if (emptyModel = this.collection.get("")) {
        emptyModel.trigger("setFocus");
        return;
      }
      if (this.collection.length >= 20) {
        $("#tiptip_content").text("You have reached the maximum number of items. (Max 20 items)");
        $(event.currentTarget).tipTip({
          defaultPosition: "right"
        });
        return;
      }
      this.collection.add(new KeyConfig({}));
      this.$("tbody").sortable("refresh");
      return windowOnResize();
    },
    onChangeSelKbd: function(event) {
      var newKbd;
      keys = keyCodes[newKbd = event.currentTarget.value].keys;
      this.collection.trigger("changeKbd", newKbd);
      return this.model.set("kbdtype", newKbd);
    },
    setTableVisible: function() {
      if (this.collection.length === 0) {
        return this.$el.hide();
      } else {
        return this.$el.show();
      }
    },
    userSorted: function() {
      this.collection.trigger("updateOrder");
      return this.collection.sort();
    },
    getSaveData: function() {
      return {
        config: this.model.toJSON(),
        keyConfigSet: this.collection.toJSON()
      };
    },
    setCanvasHeader: function() {
      var ctx, fillText, fx, lx, strokeLine;
      fx = 0;
      lx = 9.5;
      fillText = function(ctx, text, fy) {
        ctx.moveTo(lx, fy + 6);
        ctx.lineTo(lx, 150);
        ctx.lineWidth = 1;
        ctx.fillStyle = "#999999";
        return ctx.stroke();
      };
      strokeLine = function(ctx, fy) {
        ctx.moveTo(lx, fy + 7);
        ctx.lineTo(lx, 150);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#666666";
        return ctx.stroke();
      };
      ctx = this.$("canvas.check1")[0].getContext("2d");
      strokeLine(ctx, 90);
      ctx = this.$("canvas.check2")[0].getContext("2d");
      strokeLine(ctx, 110);
      ctx = this.$("canvas.check3")[0].getContext("2d");
      return strokeLine(ctx, 130);
    },
    template: _.template("<thead>\n  <tr>\n    <th><div class=\"th_inner\">New shortcut key <i class=\"icon-double-angle-right\"></i> Origin shortcut key</div></th>\n    <th></th>\n    <th></th>\n    <th>\n      <div class=\"th_inner assignOrg\">Assign orgin shortcut key</div>\n      <canvas class=\"check1\" width=\"200\"></canvas>\n    </th>\n    <th>\n      <div class=\"th_inner simEvent\">Simurate key event</div>\n      <canvas class=\"check2\" width=\"200\"></canvas>\n    </th>\n    <th>\n      <div class=\"th_inner disable\">Disabled</div>\n      <canvas class=\"check3\" width=\"200\"></canvas>\n    </th>\n    <th></th>\n    <th></th>\n    <th><div class=\"th_inner blank\">&nbsp;</div></th>\n  </tr>\n</thead>\n<tbody></tbody>")
  });

  marginBottom = 0;

  resizeTimer = false;

  windowOnResize = function() {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    return resizeTimer = setTimeout((function() {
      var tableHeight;
      tableHeight = window.innerHeight - document.querySelector("div.header").offsetHeight - marginBottom;
      document.querySelector("div.fixed-table-container").style.pixelHeight = tableHeight;
      return $("div.fixed-table-container-inner").getNiceScroll().resize();
    }), 200);
  };

  fk = chrome.extension.getBackgroundPage().fk;

  saveData = fk.getConfig();

  keyCodes = fk.getKeyCodes();

  scHelp = fk.getScHelp();

  scHelpSect = fk.getScHelpSect();

  $ = jQuery;

  $(function() {
    var headerView, keyConfigSetView;
    headerView = new HeaderView({
      model: new Config(saveData.config)
    });
    headerView.render();
    keyConfigSetView = new KeyConfigSetView({
      model: new Config(saveData.config),
      collection: new KeyConfigSet()
    });
    keyConfigSetView.render(saveData.keyConfigSet);
    headerView.on("clickAddKeyConfig", keyConfigSetView.onClickAddKeyConfig, keyConfigSetView);
    headerView.on("changeSelKbd", keyConfigSetView.onChangeSelKbd, keyConfigSetView);
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      switch (request.action) {
        case "kbdEvent":
          return keyConfigSetView.collection.trigger("kbdEvent", request.value);
        case "saveConfig":
          return fk.saveConfig(keyConfigSetView.getSaveData());
      }
    });
    $(window).on("unload", function() {
      return fk.saveConfig(keyConfigSetView.getSaveData());
    }).on("resize", function() {
      return windowOnResize();
    }).on("load", function() {
      return keyConfigSetView.setCanvasHeader();
    });
    windowOnResize();
    $("div.fixed-table-container-inner").niceScroll({
      cursorwidth: 12,
      cursorborderradius: 2,
      smoothscroll: false,
      cursoropacitymin: .1,
      cursoropacitymax: .6
    });
    return $("span.beta").text("\u03B2");
  });

}).call(this);
