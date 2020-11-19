// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"department.json":[function(require,module,exports) {
module.exports = {
  "company": [{
    "id": 0,
    "name": "General manager",
    "parent_id": null
  }, {
    "id": 1,
    "name": "Sales department",
    "parent_id": 0
  }, {
    "id": 2,
    "name": "R&D department",
    "parent_id": 0
  }, {
    "id": 3,
    "name": "Production & supply department",
    "parent_id": 0
  }, {
    "id": 4,
    "name": "Financial department",
    "parent_id": 0
  }, {
    "id": 5,
    "name": "H&R department",
    "parent_id": 0
  }, {
    "id": 6,
    "name": "QC department",
    "parent_id": 3
  }, {
    "id": 7,
    "name": "MFG department",
    "parent_id": 3
  }, {
    "id": 8,
    "name": "Purchase department",
    "parent_id": 3
  }, {
    "id": 9,
    "name": "Planning department",
    "parent_id": 3
  }]
};
},{}],"personnel.json":[function(require,module,exports) {
module.exports = {
  "personnel": [{
    "name": "Keaton Rogers",
    "id_dep": 1
  }, {
    "name": "Jonah Coleman",
    "id_dep": 1
  }, {
    "name": "Simon Adams",
    "id_dep": 1
  }, {
    "name": "Braden Miller",
    "id_dep": 1
  }, {
    "name": "Esteban Miller",
    "id_dep": 1
  }, {
    "name": "Xan Martinez",
    "id_dep": 1
  }, {
    "name": "Willem Edwards",
    "id_dep": 2
  }, {
    "name": "Finlee Nelson",
    "id_dep": 2
  }, {
    "name": "Harrison Wood",
    "id_dep": 2
  }, {
    "name": "Kieran Baker",
    "id_dep": 2
  }, {
    "name": "Zaki Wright",
    "id_dep": 4
  }, {
    "name": "Justin Thompson",
    "id_dep": 4
  }, {
    "name": "Ignace Allen",
    "id_dep": 5
  }, {
    "name": "Varun Brooks",
    "id_dep": 5
  }, {
    "name": "Wiley Bryant",
    "id_dep": 6
  }, {
    "name": "Willis Robinson",
    "id_dep": 6
  }, {
    "name": "Trey Edwards",
    "id_dep": 7
  }, {
    "name": "Nash Bailey",
    "id_dep": 7
  }]
};
},{}],"service.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPersonnel = exports.getDepartments = void 0;

var _department = require("./department.json");

var _personnel = require("./personnel.json");

var getDepartments = function getDepartments() {
  return _department.company;
};

exports.getDepartments = getDepartments;

var getPersonnel = function getPersonnel() {
  return _personnel.personnel;
};

exports.getPersonnel = getPersonnel;
},{"./department.json":"department.json","./personnel.json":"personnel.json"}],"main.js":[function(require,module,exports) {
"use strict";

var _service = require("./service");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var departments = (0, _service.getDepartments)();
var personnel = (0, _service.getPersonnel)();
var personnelParamsMap = {
  name: "Name",
  id_dep: "ID dep",
  id: "ID"
}; // Функция Создает структурированный массив Родитель - ребенок

function makeTree(arr) {
  var copyArr = makeArrayCopy(arr);

  for (var i = 0; i < copyArr.length; i++) {
    var parent = copyArr[i];

    for (var j = 0; j < copyArr.length; j++) {
      var potentialChild = copyArr[j];

      if (parent.id === potentialChild.parent_id) {
        if (!parent.children) {
          parent.children = [];
        }

        parent.children.push(potentialChild);
      }
    }
  }

  return copyArr.filter(function (item) {
    return item.parent_id === null;
  });
} //------------------------------------------------------------------------


var jsTree = makeTree(departments); // запускаем функцию построения ДОМ дерева 

makeDOMTree(jsTree, document.getElementsByClassName('list')[0]); // Функия создает ДОМ дерево 

function makeDOMTree(collection, parentDOMEL) {
  if (collection.length) {
    for (var i = 0; i < collection.length; i++) {
      var treeItem = collection[i];
      var liEl = document.createElement('li'); //Проверка есть ли у элемента дети, если есть добавляем '+'

      if (treeItem.children) {
        liEl.appendChild(getBulltEl());
      }

      var spanEl = document.createElement('span');
      spanEl.classList.add('depName');
      spanEl.innerText = treeItem.name;
      spanEl.dataset.id = treeItem.id;
      liEl.appendChild(spanEl); // создаем кнопки редактирования элементов ()

      var controlEleContainer = document.createElement('div');
      controlEleContainer.classList.add('inline_block');
      var addEl = document.createElement('span');
      addEl.dataset.action = "add";
      addEl.innerText = "add";
      var editEl = document.createElement('span');
      editEl.dataset.action = "edit";
      editEl.innerText = "edit";
      controlEleContainer.appendChild(addEl);
      controlEleContainer.appendChild(editEl);
      liEl.appendChild(controlEleContainer);
      parentDOMEL.appendChild(liEl);

      if (treeItem.children && treeItem.children.length) {
        var ulEl = document.createElement('ul');
        liEl.appendChild(ulEl);
        makeDOMTree(treeItem.children, ulEl);
      } else {
        var deleteEl = document.createElement('span');
        deleteEl.innerText = "delete";
        deleteEl.dataset.action = "delete";
        controlEleContainer.appendChild(deleteEl);
      }
    }
  }
} //-----------------------------------------------------------
// Функия при нажатии на edit (переименование депортамента)


function editDept(deptEl) {
  var deptName = deptEl.innerText;
  var newDepName = prompt('Please ented valid dept name:', deptName);

  if (newDepName === null) {
    return;
  }

  if (newDepName === '') {
    alert('Name is not valid');
    editDept(deptEl);
    return;
  }

  deptEl.innerText = newDepName;
} //---------------------------------------------------
// Функия при нажатии на delete (удаление депортамента)


function deleteDept(deptId) {
  var yes = confirm('Do you really want to delete dept?');

  if (yes) {
    departments = departments.filter(function (_ref) {
      var id = _ref.id;
      return id !== deptId;
    });

    var _jsTree = makeTree(departments);

    var treeContainer = document.getElementById('dom_tree');
    var tree = document.getElementsByClassName('list')[0];
    treeContainer.removeChild(tree);
    var newTree = document.createElement('ul');
    newTree.classList.add('list');
    treeContainer.appendChild(newTree);
    makeDOMTree(_jsTree, newTree);
  }
} //---------------------------------------------------
// Функия при нажатии на add (добавление депортамента)


function addDept(parentDeptId) {
  var newDepName = prompt('Please ented valid dept name:', '');

  if (newDepName === null) {
    return;
  }

  if (newDepName === '') {
    alert('Name is not valid');
    addDept(parentDeptId);
    return;
  }

  var newDept = {
    id: generateId(),
    name: newDepName,
    parent_id: parentDeptId
  };
  departments.push(newDept);
  var jsTree = makeTree(departments);
  var treeContainer = document.getElementById('dom_tree');
  var tree = document.getElementsByClassName('list')[0];
  treeContainer.removeChild(tree);
  var newTree = document.createElement('ul');
  newTree.classList.add('list');
  treeContainer.appendChild(newTree);
  makeDOMTree(jsTree, newTree);
} // выводит в консоль текст элемента 


document.getElementById('dom_tree').addEventListener('click', function (event) {
  // при нажатии на кнопки редактирования выводит 
  if (event.target.tagName === 'SPAN') {
    if (event.target.dataset.action) {
      var action = event.target.dataset.action;
      var deptEl = event.target.parentElement.previousElementSibling;

      switch (action) {
        case 'edit':
          {
            editDept(deptEl);
            break;
          }

        case 'delete':
          {
            deleteDept(+deptEl.dataset.id);
            break;
          }

        case 'add':
          {
            addDept(+deptEl.dataset.id);
            break;
          }
      }
    } else {
      // Надатие на название департамента.
      console.log(departments);
      console.log(event.target.dataset.id);
    }

    return;
  } // ----------------------------------------------------------------
  // настройка кнопки скрывать элементы + и - 


  if (event.target.tagName === 'I') {
    event.target.classList.toggle('collapsed');
    var children = event.target.parentElement.children;

    if (children && children.length) {
      for (var i = 0; i < children.length; i++) {
        if (children[i].tagName === 'UL') {
          children[i].classList.toggle('hidden');
        }
      }
    }
  }
}); //--------------------------------------------------------

function getBulltEl() {
  var bulletEl = document.createElement('i'); //icon
  //     bulletEl.innerHTML = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  //     <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
  //   </svg>`;

  bulletEl.classList.add('collapsed');
  return bulletEl;
} //Создаем копию исходных данных (массива)


function makeArrayCopy(arr) {
  return arr.map(function (item) {
    return _objectSpread({}, item);
  });
} //------------------------------------------------------------------------
// создает зандомный ID


var generateId = function generateId() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
  var result = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charsLength = chars.length;

  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }

  return result;
}; //Строим таблицу 


var tableContainer = document.getElementsByClassName('table_container')[0];
var usersTable = makeTable(personnel);
tableContainer.appendChild(usersTable);

function makeTable(personnel) {
  var tableEl = document.createElement('table');
  var tableHead = document.createElement('thead');
  var trHeadEl = document.createElement('tr');

  for (var key in personnelParamsMap) {
    var col = personnelParamsMap[key];
    var th = document.createElement('th');
    th.innerHTML = col;
    trHeadEl.appendChild(th);
  }

  tableHead.appendChild(trHeadEl);
  tableEl.appendChild(tableHead);
  var tableBody = document.createElement('tbody');
  personnel.forEach(function (user) {
    var trEl = document.createElement('tr');

    for (var _key in personnelParamsMap) {
      var td = document.createElement('td');

      if (_key in user) {
        td.innerHTML = user[_key];
      }

      trEl.appendChild(td);
    }

    tableBody.appendChild(trEl);
  });
  tableEl.appendChild(tableBody);
  return tableEl;
}
},{"./service":"service.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62692" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map