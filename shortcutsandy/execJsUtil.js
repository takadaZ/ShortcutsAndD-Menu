// Generated by CoffeeScript 1.6.3
(function() {
  var FailImmediate, Messenger, scd;

  FailImmediate = (function() {
    function FailImmediate(error) {
      this.error = error;
    }

    FailImmediate.prototype.done = function(callback) {
      return this;
    };

    FailImmediate.prototype.fail = function(callback) {
      callback(new Error(this.error));
      return this;
    };

    return FailImmediate;

  })();

  Messenger = (function() {
    function Messenger() {}

    Messenger.prototype.done = function(callback) {
      this.doneCallback = callback;
      return this;
    };

    Messenger.prototype.fail = function(callback) {
      this.failCallback = callback;
      return this;
    };

    Messenger.prototype.sendMessage = function(action, value1, value2, value3, value4) {
      var _this = this;
      chrome.runtime.sendMessage({
        action: action,
        value1: value1,
        value2: value2,
        value3: value3,
        value4: value4
      }, function(resp) {
        var callback;
        if ((resp != null ? resp.msg : void 0) === "done") {
          if (callback = _this.doneCallback) {
            return setTimeout((function() {
              return callback(resp.data || resp.msg);
            }), 0);
          }
        } else {
          if (callback = _this.failCallback) {
            return setTimeout((function() {
              return callback(resp.msg);
            }), 0);
          }
        }
      });
      return this;
    };

    return Messenger;

  })();

  scd = {
    batch: function(commands) {
      if (commands instanceof Array) {
        return (new Messenger()).sendMessage("batch", commands);
      } else {
        return new FailImmediate("Argument is not Array.");
      }
    },
    send: function(transCode, sleepMSec) {
      var msec;
      msec = 100;
      if (sleepMSec != null) {
        if (isNaN(msec = sleepMSec)) {
          return new FailImmediate(sleepMSec + " is not a number.");
        } else {
          msec = Math.round(sleepMSec);
          if (msec < 0 || msec > 6000) {
            return new FailImmediate("Range of Sleep millisecond is up to 6000-0.");
          }
        }
      }
      return (new Messenger()).sendMessage("callShortcut", transCode, msec);
    },
    keydown: function(transCode, sleepMSec) {
      var msec;
      msec = 100;
      if (sleepMSec != null) {
        if (isNaN(msec = sleepMSec)) {
          return new FailImmediate(sleepMSec + " is not a number.");
        } else {
          msec = Math.round(sleepMSec);
          if (msec < 0 || msec > 6000) {
            return new FailImmediate("Range of Sleep millisecond is up to 6000-0.");
          }
        }
      }
      return (new Messenger()).sendMessage("keydown", transCode, msec);
    },
    sleep: function(sleepMSec) {
      if (sleepMSec != null) {
        if (isNaN(sleepMSec)) {
          return new FailImmediate(sleepMSec + " is not a number.");
        } else {
          sleepMSec = Math.round(sleepMSec);
          if (sleepMSec < 0 || sleepMSec > 6000) {
            return new FailImmediate("Range of Sleep millisecond is up to 6000-0.");
          }
        }
      } else {
        sleepMSec = 100;
      }
      return (new Messenger()).sendMessage("sleep", sleepMSec);
    },
    setClipbd: function(text) {
      return (new Messenger()).sendMessage("setClipboard", text);
    },
    getClipbd: function() {
      return (new Messenger()).sendMessage("getClipboard");
    },
    showNotify: function(title, message, icon, newNotif) {
      if (title == null) {
        title = "";
      }
      if (message == null) {
        message = "";
      }
      if (icon == null) {
        icon = "none";
      }
      if (newNotif == null) {
        newNotif = false;
      }
      return (new Messenger()).sendMessage("showNotification", title, message, icon, newNotif);
    },
    returnValue: {},
    cancel: function() {
      return this.returnValue.cancel = true;
    },
    openUrl: function(url, noActivate, findTitleOrUrl, position) {
      var cid, findtab, params;
      if (noActivate) {
        cid = (new Date).getTime();
      }
      if (findTitleOrUrl) {
        findtab = true;
      }
      params = {
        url: url,
        noActivate: noActivate,
        findStr: findTitleOrUrl,
        findtab: findtab,
        openmode: position,
        commandId: cid
      };
      (new Messenger()).sendMessage("openUrl", params);
      return this.returnValue.cid = cid;
    },
    clearCurrentTab: function() {
      return (new Messenger()).sendMessage("clearCurrentTab");
    },
    getSelection: function() {
      var elActive, range, selection, _ref;
      selection = "";
      if ((elActive = document.activeElement)) {
        if ((_ref = elActive.nodeName) === "TEXTAREA" || _ref === "INPUT") {
          return selection = elActive.value.substring(elActive.selectionStart, elActive.selectionEnd);
        } else {
          if ((range = window.getSelection()).type === "Range") {
            return selection = range.getRangeAt(0).toString();
          }
        }
      }
    },
    setData: function(name, value) {
      return (new Messenger()).sendMessage("setData", name, value);
    },
    getData: function(name) {
      return (new Messenger()).sendMessage("getData", name);
    }
  };

}).call(this);
