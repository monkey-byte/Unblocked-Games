/*!
 * phaser-super-storage - version 1.0.4 
 * A cross platform storage plugin for Phaser
 *
 * OrangeGames
 * Build at 02-10-2017
 * Released under MIT License 
 */

var PhaserSuperStorage;
! function(a) {
    var b;
    ! function(a) {
        var b = function() {
            function a(a) {
                void 0 === a && (a = ""), this.namespace = "", this.forcePromises = !1, this.setNamespace(a)
            }
            return Object.defineProperty(a.prototype, "length", {
                get: function() {
                    return null !== this.getNameSpaceMatches() ? this.getNameSpaceMatches().length : 0
                },
                enumerable: !0,
                configurable: !0
            }), a.prototype.key = function(a) {
                var b = this.getNameSpaceMatches()[a],
                    c = this.getCookiesForNameSpace()[b] || null;
                return this.forcePromises ? this.promisefy(c) : c
            }, a.prototype.getItem = function(a) {
                var b = this.getCookiesForNameSpace()[a] || null;
                return this.forcePromises ? this.promisefy(b) : b
            }, a.prototype.setItem = function(a, b) {
                if (document.cookie = encodeURIComponent(this.namespace + a) + "=" + encodeURIComponent(b) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/", this.forcePromises) return this.promisefy(null)
            }, a.prototype.removeItem = function(a) {
                if (document.cookie = encodeURIComponent(this.namespace + a) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/", this.forcePromises) return this.promisefy(null)
            }, a.prototype.clear = function() {
                var a = this.getCookiesForNameSpace();
                for (var b in a) a.hasOwnProperty(b) && this.removeItem(b);
                if (this.forcePromises) return this.promisefy(null)
            }, a.prototype.setNamespace = function(a) {
                if (a && (this.namespace = a + ":", this.reg = new RegExp("^" + this.namespace + "[a-zA-Z0-9]*", "g")), this.forcePromises) return this.promisefy(a)
            }, a.prototype.getNameSpaceMatches = function() {
                var a = this,
                    b = decodeURIComponent(document.cookie).split("; ");
                return b.filter(function(b) {
                    return null !== b.match(a.reg) && b.match(a.reg).length > 0
                })
            }, a.prototype.getCookiesForNameSpace = function() {
                var a = this,
                    b = {};
                return this.getNameSpaceMatches().forEach(function(c) {
                    var d = c.replace(a.namespace, "").split("=");
                    b[d[0]] = d[1]
                }), b
            }, a.prototype.promisefy = function(a) {
                return new Promise(function(b, c) {
                    b(a)
                })
            }, a
        }();
        a.CookieStorage = b
    }(b = a.StorageAdapters || (a.StorageAdapters = {}))
}(PhaserSuperStorage || (PhaserSuperStorage = {}));
var PhaserSuperStorage;
! function(a) {
    var b;
    ! function(a) {
        var b = function() {
            function a() {
                this.namespace = "", this.keys = []
            }
            return Object.defineProperty(a.prototype, "forcePromises", {
                get: function() {
                    return !0
                },
                set: function(a) {},
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(a.prototype, "length", {
                get: function() {
                    return this.keys.length
                },
                enumerable: !0,
                configurable: !0
            }), a.prototype.key = function(a) {
                return this.promisefy(this.keys[a])
            }, a.prototype.getItem = function(a) {
                var b = this;
                return new Promise(function(c, d) {
                    NativeStorage.getItem(b.namespace + a, function(a) {
                        c(a)
                    }, function(a) {
                        2 === a.code ? c(null) : d(a)
                    })
                })
            }, a.prototype.setItem = function(a, b) {
                var c = this;
                return a.length < 1 ? void console.error("CordovaStorage: Key cannot be an empty string!") : new Promise(function(d, e) {
                    NativeStorage.setItem(c.namespace + a, b, function() {
                        c.keys.indexOf(a) < 0 && (c.keys.push(a), c.save()), d(null)
                    }, function(a) {
                        e(a)
                    })
                })
            }, a.prototype.removeItem = function(a) {
                var b = this;
                return new Promise(function(c, d) {
                    NativeStorage.remove(b.namespace + a, function() {
                        var d = b.keys.indexOf(a);
                        d >= 0 && (b.keys.splice(d, 1), b.save()), c(null)
                    }, function(a) {
                        d(a)
                    })
                })
            }, a.prototype.clear = function() {
                var a = this;
                return new Promise(function(b, c) {
                    for (var d = 0, e = 0; e < a.keys.length; e++) NativeStorage.remove(a.namespace + a.keys[e], function() {
                        ++d >= a.keys.length && (a.keys = [], a.save(), b(null))
                    }, function(a) {
                        c(a)
                    })
                })
            }, a.prototype.setNamespace = function(a) {
                var b = this;
                return void 0 === a && (a = ""), this.namespace = a + ":", this.keys = [], new Promise(function(a, c) {
                    b.load().then(a)["catch"](a)
                })
            }, a.prototype.promisefy = function(a) {
                return new Promise(function(b, c) {
                    b(a)
                })
            }, a.prototype.load = function() {
                var a = this;
                return new Promise(function(b, c) {
                    NativeStorage.getItem(a.namespace, function(c) {
                        a.keys = JSON.parse(c), b(null)
                    }, function(a) {
                        c(a)
                    })
                })
            }, a.prototype.save = function() {
                NativeStorage.setItem(this.namespace, JSON.stringify(this.keys), function() {}, function(a) {
                    console.warn("CordovaStorage: Failed to save keys of namespace.")
                })
            }, a
        }();
        a.CordovaStorage = b
    }(b = a.StorageAdapters || (a.StorageAdapters = {}))
}(PhaserSuperStorage || (PhaserSuperStorage = {}));
var PhaserSuperStorage;
! function(a) {
    var b;
    ! function(b) {
        var c = function() {
            function b(a, b) {
                void 0 === a && (a = ""), void 0 === b && (b = "*"), this.namespace = "", this.expectedOrigin = "", this.storageLength = 0, this.enabled = !1, "" !== a && this.setNamespace(a), this.expectedOrigin = b
            }
            return Object.defineProperty(b.prototype, "forcePromises", {
                get: function() {
                    return !0
                },
                set: function(a) {},
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(b.prototype, "length", {
                get: function() {
                    return this.storageLength
                },
                enumerable: !0,
                configurable: !0
            }), b.prototype.init = function() {
                var b = this;
                return this.sendMessage({
                    command: a.StorageCommand.init
                }).then(function() {
                    b.enabled = !0
                })
            }, b.prototype.key = function(b) {
                return this.sendMessage({
                    command: a.StorageCommand.key,
                    value: b
                })
            }, b.prototype.getItem = function(b) {
                return this.sendMessage({
                    command: a.StorageCommand.getItem,
                    key: b
                })
            }, b.prototype.setItem = function(b, c) {
                return this.sendMessage({
                    command: a.StorageCommand.setItem,
                    key: b,
                    value: c
                })
            }, b.prototype.removeItem = function(b) {
                return this.sendMessage({
                    command: a.StorageCommand.removeItem,
                    key: b
                })
            }, b.prototype.clear = function() {
                return this.sendMessage({
                    command: a.StorageCommand.clear
                })
            }, b.prototype.setNamespace = function(b) {
                return this.sendMessage({
                    command: a.StorageCommand.setNamespace,
                    value: b
                })
            }, b.prototype.sendMessage = function(b) {
                var c, d = this;
                b.command === a.StorageCommand.init && (c = !1);
                var e = new MessageChannel;
                return new Promise(function(f, g) {
                    d.enabled || b.command === a.StorageCommand.init || g("Messaging not enabled!"), b.command === a.StorageCommand.init && setTimeout(function() {
                        c || g("Unable to get a response in time")
                    }, 1e3), e.port1.onmessage = function(b) {
                        console.log("Frame received message", b);
                        var e = a.StorageUtils.validateMessage(b.data);
                        switch (e.command === a.StorageCommand.init && (c = !0), void 0 !== e.status && "ok" === e.status || g(e.value), void 0 !== e.length && (d.storageLength = e.length), e.command) {
                            case a.StorageCommand.setNamespace:
                                d.namespace = e.value + ":";
                            case a.StorageCommand.getItem:
                            case a.StorageCommand.length:
                            case a.StorageCommand.key:
                                f(e.value);
                                break;
                            case a.StorageCommand.setItem:
                            case a.StorageCommand.removeItem:
                            case a.StorageCommand.clear:
                            case a.StorageCommand.init:
                                f(e.status);
                                break;
                            default:
                                g(e.value)
                        }
                    }, (d.enabled || b.command === a.StorageCommand.init) && (console.log("Sending message to parent: ", b), window.parent.postMessage(b, d.expectedOrigin, [e.port2]))
                })
            }, b
        }();
        b.IframeStorage = c
    }(b = a.StorageAdapters || (a.StorageAdapters = {}))
}(PhaserSuperStorage || (PhaserSuperStorage = {}));
var PhaserSuperStorage;
! function(a) {
    var b;
    ! function(b) {
        var c = function() {
            function b(a) {
                void 0 === a && (a = ""), this.namespace = "", this.forcePromises = !1, this.setNamespace(a)
            }
            return Object.defineProperty(b.prototype, "length", {
                get: function() {
                    var b = Object.keys(localStorage);
                    return a.StorageUtils.nameSpaceKeyFilter(b, this.namespace).length
                },
                enumerable: !0,
                configurable: !0
            }), b.prototype.key = function(a) {
                return this.forcePromises ? this.promisefy(this._key, arguments) : this._key(a)
            }, b.prototype._key = function(b) {
                var c = Object.keys(localStorage),
                    d = a.StorageUtils.nameSpaceKeyFilter(c, this.namespace),
                    e = localStorage.getItem(d[b]);
                return e
            }, b.prototype.getItem = function(a) {
                return this.forcePromises ? this.promisefy(this._getItem, arguments) : this._getItem(a)
            }, b.prototype._getItem = function(a) {
                return localStorage.getItem(this.namespace + a)
            }, b.prototype.setItem = function(a, b) {
                return this.forcePromises ? this.promisefy(this._setItem, arguments) : this._setItem(a, b)
            }, b.prototype._setItem = function(a, b) {
                return localStorage.setItem(this.namespace + a, b)
            }, b.prototype.removeItem = function(a) {
                return this.forcePromises ? this.promisefy(this._removeItem, arguments) : this._removeItem(a)
            }, b.prototype._removeItem = function(a) {
                return localStorage.removeItem(this.namespace + a)
            }, b.prototype.clear = function() {
                return this.forcePromises ? this.promisefy(this._clear, arguments) : this._clear()
            }, b.prototype._clear = function() {
                for (var b = Object.keys(localStorage), c = a.StorageUtils.nameSpaceKeyFilter(b, this.namespace), d = 0; d < c.length; d++) localStorage.removeItem(c[d])
            }, b.prototype.setNamespace = function(a) {
                return this.forcePromises ? this.promisefy(this._setNameSpace, arguments) : this._setNameSpace(a)
            }, b.prototype._setNameSpace = function(a) {
                a && (this.namespace = a + ":")
            }, b.prototype.promisefy = function(a, b) {
                var c = this;
                return new Promise(function(d, e) {
                    d(a.apply(c, b))
                })
            }, b
        }();
        b.LocalStorage = c
    }(b = a.StorageAdapters || (a.StorageAdapters = {}))
}(PhaserSuperStorage || (PhaserSuperStorage = {}));
var PhaserSuperStorage;
! function(a) {
    var b = function() {
        function b(c) {
            if (void 0 !== c) Object.defineProperty(c, "storage", {
                value: this
            });
            else {
                if (null !== b.instance) return b.instance;
                b.instance = this
            }
            a.StorageUtils.isLocalStorageSupport() ? this.setAdapter(new a.StorageAdapters.LocalStorage) : this.setAdapter(new a.StorageAdapters.CookieStorage)
        }
        return b.prototype.setAdapter = function(a) {
            this.storage = a
        }, Object.defineProperty(b.prototype, "forcePromises", {
            get: function() {
                return this.storage.forcePromises
            },
            set: function(a) {
                this.storage.forcePromises = a
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(b.prototype, "length", {
            get: function() {
                return null === this.storage ? 0 : this.storage.length
            },
            enumerable: !0,
            configurable: !0
        }), b.prototype.setNamespace = function(a) {
            if (null !== this.storage) return this.storage.setNamespace(a)
        }, b.prototype.key = function(a) {
            return null === this.storage ? "" : this.storage.key(a)
        }, b.prototype.getItem = function(a) {
            return null === this.storage ? null : this.storage.getItem(a)
        }, b.prototype.setItem = function(a, b) {
            if (null !== this.storage) return this.storage.setItem(a, b)
        }, b.prototype.removeItem = function(a) {
            if (null !== this.storage) return this.storage.removeItem(a)
        }, b.prototype.clear = function() {
            if (null !== this.storage) return this.storage.clear()
        }, b.instance = null, b
    }();
    a.StoragePlugin = b
}(PhaserSuperStorage || (PhaserSuperStorage = {})), void 0 !== window.Phaser && Phaser.Utils.mixinPrototype(PhaserSuperStorage.StoragePlugin, Phaser.Plugin);
var PhaserSuperStorage;
! function(a) {
    ! function(a) {
        a[a.init = 0] = "init", a[a.setItem = 1] = "setItem", a[a.getItem = 2] = "getItem", a[a.removeItem = 3] = "removeItem", a[a.clear = 4] = "clear", a[a.setNamespace = 5] = "setNamespace", a[a.length = 6] = "length", a[a.key = 7] = "key", a[a.error = 8] = "error"
    }(a.StorageCommand || (a.StorageCommand = {}));
    var b = (a.StorageCommand, function() {
        function a() {}
        return a.isLocalStorageSupport = function() {
            try {
                if ("object" == typeof localStorage) return localStorage.setItem("testingLocalStorage", "foo"), localStorage.removeItem("testingLocalStorage"), !0
            } catch (a) {
                return !1
            }
            return !1
        }, a.validateMessage = function(a) {
            return a.hasOwnProperty("command") ? a : null
        }, a.nameSpaceKeyFilter = function(a, b) {
            return a.filter(function(a) {
                return a.substring(0, b.length) === b
            })
        }, a
    }());
    a.StorageUtils = b
}(PhaserSuperStorage || (PhaserSuperStorage = {}));
