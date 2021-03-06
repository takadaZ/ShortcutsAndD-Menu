// Generated by CoffeeScript 1.6.3
(function() {
  window.db = {};

  db.IndexedDB = (function() {
    function IndexedDB(options) {
      var indexedDB, open_req, schema_name, schema_version,
        _this = this;
      schema_name = options.schema_name, schema_version = options.schema_version, this.keyPath = options.keyPath;
      indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
      this.storeName = schema_name;
      this.db;
      open_req = indexedDB.open(schema_name, schema_version);
      open_req.onerror = function(evt) {
        return console.log("Database error code: " + evt.target.errorCode);
      };
      open_req.onsuccess = function(evt) {
        if (typeof _this.db === "undefined") {
          return _this.db = open_req.result;
        }
      };
      open_req.onupgradeneeded = function(evt) {
        var store;
        if (typeof _this.db === "undefined") {
          _this.db = open_req.result;
        }
        if (_this.db.objectStoreNames.contains(_this.storeName)) {
          _this.db.deleteObjectStore(_this.storeName);
        }
        store = _this.db.createObjectStore(_this.storeName, {
          keyPath: _this.keyPath,
          autoIncrement: false
        });
        return store.createIndex(_this.keyPath, true);
      };
    }

    IndexedDB.prototype.put = function(items) {
      var dfd, store, _items,
        _this = this;
      dfd = $.Deferred();
      _items = (items instanceof Array ? items : [items]);
      store = this.db.transaction([this.storeName], "readwrite").objectStore(this.storeName);
      $.each(_items, function(i, _item) {
        var cursor_req, req_add;
        cursor_req = store.openCursor(_item[_this.keyPath]);
        cursor_req.onsuccess = function(evt) {};
        req_add = store.put(_item);
        req_add.onsuccess = function(evt) {
          return dfd.resolve();
        };
        return req_add.onerror = function(evt) {
          return dfd.reject("Unable to save");
        };
      });
      return dfd.promise();
    };

    IndexedDB.prototype.get = function(id) {
      var cursor_req, dfd, store;
      dfd = $.Deferred();
      store = this.db.transaction([this.storeName], "readonly").objectStore(this.storeName);
      cursor_req = store.get(id);
      cursor_req.onsuccess = function(e) {
        return dfd.resolve(e.target.result);
      };
      cursor_req.onerror = function(event) {
        return dfd.reject("Unable to get record");
      };
      return dfd.promise();
    };

    IndexedDB.prototype.pop = function() {
      return this.getAll(1);
    };

    IndexedDB.prototype.getAll = function(maximum) {
      var cursor_req, dfd, result, store;
      dfd = $.Deferred();
      if (maximum === "undefined" || maximum === null || maximum === 0) {
        maximum = 10;
      }
      result = [];
      store = this.db.transaction([this.storeName], "readonly").objectStore(this.storeName);
      cursor_req = store.openCursor(null, "prev");
      cursor_req.onsuccess = function(e) {
        var dbResult;
        dbResult = e.target.result;
        if (dbResult && result.length < maximum) {
          result.push(dbResult.value);
          return dbResult["continue"]();
        } else {
          return dfd.resolve(result);
        }
      };
      cursor_req.onerror = function(event) {
        return dfd.reject("Unable to get records");
      };
      return dfd.promise();
    };

    IndexedDB.prototype["delete"] = function(id) {
      var dfd, onError, onSuccess, req_del, store;
      dfd = $.Deferred();
      store = this.db.transaction([this.storeName], "readwrite").objectStore(this.storeName);
      req_del = store["delete"](id);
      req_del.onsuccess = onSuccess = function(event) {
        return dfd.resolve();
      };
      req_del.onerror = onError = function(event) {
        return dfd.reject("Unable to delete record");
      };
      return dfd.promise();
    };

    return IndexedDB;

  })();

  if (typeof Backbone !== "undefined" && Backbone !== null) {
    Backbone.sync = function(method, model, options) {
      var is_collection, store;
      is_collection = model.hasOwnProperty("length");
      store = (is_collection ? model.model.store : model.constructor.store);
      switch (method) {
        case "read":
          if (is_collection) {
            return store.getAll(options["maximum"]).done(function(records) {
              return options.success(records);
            }).fail(function() {
              return options.error();
            });
          } else {
            return store.get(model.toJSON()["id"]).done(function(record) {
              return options.success(record);
            }).fail(function() {
              return options.error();
            });
          }
          break;
        case "create":
        case "update":
          return store.put(model.toJSON()).done(function() {
            return options.success();
          }).fail(function() {
            return options.error();
          });
        case "delete":
          return store["delete"](model.toJSON()["id"]).done(function() {
            return options.success();
          }).fail(function() {
            return options.error();
          });
      }
    };
  }

}).call(this);
