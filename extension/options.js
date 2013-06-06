// Generated by CoffeeScript 1.6.3
(function() {
  var $, Config, KeyConfig, KeyConfigSet, KeyConfigSetView, KeyConfigView, fk, keyCodes, keys, saveData;

  keyCodes = {};

  keys = null;

  Config = Backbone.Model.extend({});

  KeyConfig = Backbone.Model.extend({
    idAttribute: "disShortcut",
    defaults: {
      disShortcut: "",
      newShortcut: "",
      option: "assignOther"
    }
  });

  KeyConfigSet = Backbone.Collection.extend({
    model: KeyConfig
  });

  KeyConfigView = Backbone.View.extend({
    events: {
      "click input[type='radio']": "onClickRadio",
      "click i.icon-remove": "onClickRemove",
      "keydown input.disShortcut": "onKeydownDisSC"
    },
    initialize: function(options) {
      this.model.on("remove", this.onRemove, this);
      return this.model.collection.on({
        kbdEvent: this.onKbdEvent,
        changeKbd: this.onChangeKbd,
        updateOrder: this.onUpdateOrder
      }, this);
    },
    render: function(kbdtype) {
      var option;
      this.setElement(this.template(this.model.toJSON()));
      option = this.model.get("option");
      this.$("input[value='" + option + "']").attr("checked", "checked").parent().addClass("hilite");
      if (option !== "assignOther") {
        this.$("input.newShortcut").addClass("disabled");
      }
      this.onChangeKbd(kbdtype);
      return this;
    },
    onRemove: function() {
      this.model.off(null, null, this);
      this.off(null, null, null);
      return this.remove();
    },
    onKbdEvent: function(value) {
      var input$, newShortcut$;
      input$ = this.$("input:text:focus");
      if (input$.length > 0) {
        this.setKbdValue(input$, value);
        if (input$[0].className === "disShortcut") {
          if (this.model.id !== value && this.model.collection.findWhere({
            disShortcut: value
          })) {
            $("#tiptip_content").text("\"" + (input$.val()) + "\" is a already exists.");
            this.setKbdValue(input$, this.model.id);
            input$.tipTip();
            return;
          } else if ((newShortcut$ = this.$("input.newShortcut")).val() === "") {
            this.setKbdValue(newShortcut$, value);
            this.model.set("newShortcut", value);
          }
        }
        return this.model.set(input$[0].className, value);
      }
    },
    onChangeKbd: function(kbdtype) {
      this.setKbdValue(this.$("input.disShortcut"), this.model.id);
      return this.setKbdValue(this.$("input.newShortcut"), this.model.get("newShortcut"));
    },
    onUpdateOrder: function() {
      return this.model.set("ordernum", this.$el.parent().children().index(this.$el));
    },
    onClickRadio: function(event) {
      var target$;
      this.$("input[type='radio']").parent().removeClass("hilite");
      target$ = $(event.currentTarget);
      target$.parent().addClass("hilite");
      this.model.set("option", target$.val());
      if (target$.val() === "assignOther") {
        return this.$("input.newShortcut").removeClass("disabled").focus();
      } else {
        return this.$("input.newShortcut").addClass("disabled").blur();
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
      return input$.val(chars.join(" + "));
    },
    template: _.template("<div class=\"innerframe\">\n  <i class=\"icon-remove\" title=\"Remove\"></i>\n  <label>\n    <div class=\"targetCaption\">Target shortcut key:</div>\n    <input type=\"text\" class=\"disShortcut\" readonly>\n  </label>\n  <i class=\"icon-double-angle-right\"></i>\n  <label>\n    <div class=\"radioCaption\">\n      <input type=\"radio\" name=\"options\" class=\"options\" value=\"assignOther\">Assign another shortcut key\n    </div>\n    <input type=\"text\" class=\"newShortcut\" readonly>\n  </label>\n  <label>\n    <div class=\"radioCaption\">\n      <input type=\"radio\" name=\"options\" class=\"options\" value=\"sendDom\">Simulate keydown event\n    </div>\n  </label>\n  <label>\n    <div class=\"radioCaption\">\n      <input type=\"radio\" name=\"options\" class=\"options\" value=\"disabled\">Disabled\n    </div>\n  </label>\n</div>")
  });

  KeyConfigSetView = Backbone.View.extend({
    el: "div.outerframe",
    events: {
      "click button.addKeyConfig": "onClickAddKeyConfig",
      "click button.save": "onClickSave",
      "change select.kbdtype": "onChangeSelKbd"
    },
    initialize: function(options) {
      var kbdtype, selectKbd$,
        _this = this;
      this.collection.comparator = function(model) {
        return model.get("ordernum");
      };
      this.collection.on({
        add: this.onAddRender,
        onKeyEvent: this.onAddRender
      }, this);
      keys = keyCodes[kbdtype = this.model.get("kbdtype")].keys;
      selectKbd$ = this.$("select.kbdtype");
      $.each(keyCodes, function(key, item) {
        return selectKbd$.append("<option value=\"" + key + "\">" + item.name + "</option>");
      });
      return selectKbd$.val(kbdtype);
    },
    render: function(keyConfigSet) {
      this.collection.set(keyConfigSet);
      return this.$el.focus();
    },
    onAddRender: function(model) {
      var keyConfigView, newChild, t, taskView;
      taskView = void 0;
      keyConfigView = new KeyConfigView({
        model: model
      });
      this.$("div.configSetView").append(newChild = keyConfigView.render(this.model.get("kbdtype")).$el);
      t = (new Date()).getTime();
      newChild.find("input.disShortcut").focus().end().find("input:radio").attr("name", "options" + t).end().find("i.icon-double-angle-right").css("top", newChild.height() / 2 - 12);
      return keyConfigView.on("removeConfig", this.onRemoveConfig, this);
    },
    onRemoveConfig: function(model) {
      return this.collection.remove(model);
    },
    onClickAddKeyConfig: function(event) {
      if (this.collection.length >= 20) {
        $("#tiptip_content").text("Registration up to a maximum of 20.");
        $(event.currentTarget).tipTip({
          defaultPosition: "right"
        });
        return;
      }
      this.collection.add(new KeyConfig({}));
      return this.$("div.configSetView").sortable("refresh");
    },
    onChangeSelKbd: function(event) {
      var newKbd;
      keys = keyCodes[newKbd = event.currentTarget.value].keys;
      this.collection.trigger("changeKbd", newKbd);
      return this.model.set("kbdtype", newKbd);
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
    }
  });

  fk = chrome.extension.getBackgroundPage().fk;

  saveData = fk.getConfig();

  keyCodes = fk.getKeyCodes();

  $ = jQuery;

  $(function() {
    var keyConfigSetView;
    keyConfigSetView = new KeyConfigSetView({
      model: new Config(saveData.config),
      collection: new KeyConfigSet()
    });
    keyConfigSetView.render(saveData.keyConfigSet);
    $("div.configSetView").sortable({
      delay: 300,
      cursor: "move",
      update: function() {
        return keyConfigSetView.userSorted();
      }
    });
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
    });
    return $("span.beta").text("\u03B2");
  });

}).call(this);
