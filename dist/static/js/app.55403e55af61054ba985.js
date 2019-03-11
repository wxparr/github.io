webpackJsonp([1],{

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(260)
}
var Component = __webpack_require__(21)(
  /* script */
  __webpack_require__(189),
  /* template */
  __webpack_require__(284),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.




__WEBPACK_IMPORTED_MODULE_0_vue__["default"].config.productionTip = false;

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_2_axios___default.a);

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Home__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Home___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Home__);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app',
  components: {
    Home: __WEBPACK_IMPORTED_MODULE_0__components_Home___default.a
  }
});

/***/ }),

/***/ 190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_pusher_js__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_pusher_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_pusher_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_LineChart__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_LineChart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_LineChart__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






const socket = new __WEBPACK_IMPORTED_MODULE_2_pusher_js___default.a('ca7ab5c69d086e8b9bee', {
  cluster: 'us3',
  encrypted: true
});

const channel = socket.subscribe('finance');

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'home',
  components: { LineChart: __WEBPACK_IMPORTED_MODULE_3__components_LineChart___default.a },
  data() {
    return {
      expense: null,
      income: null,
      date: null,
      expenseamount: null,
      incomeamount: null,
      datacollection: null,
      entrydate: null
    };
  },
  created() {
    this.fetchData();
    this.fillData();
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/finances').then(response => {
        console.log(response.data.data);
        let results = response.data.data;
        let dateresult = results.map(a => a.date);
        let expenseresult = results.map(a => a.expense);
        let incomeresult = results.map(a => a.income);

        this.expense = expenseresult;
        this.income = incomeresult;
        this.date = dateresult;

        this.datacollection = {
          labels: this.date,
          datasets: [{
            label: 'Expense',
            backgroundColor: '#f87979',
            data: this.expense
          }, {
            label: 'Income',
            backgroundColor: '#5bf8bf',
            data: this.income
          }]
        };
      }).catch(error => {
        console.log(error);
      });
    },
    addExpenses() {
      let expense = this.expenseamount;
      let income = this.incomeamount;
      let today = __WEBPACK_IMPORTED_MODULE_1_moment___default()(this.entrydate).format('MMMM Do YYYY');

      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/expense/add', {
        expense: expense,
        income: income,
        date: today
      }).then(response => {
        this.expenseamount = '';
        this.incomeamount = '';
        this.entrydate = '';
        channel.bind('new-expense', function (data) {
          let results = data.newExpense.data;

          let dateresult = results.map(a => a.date);
          let expenseresult = results.map(a => a.expense);
          let incomeresult = results.map(a => a.income);

          this.expense = expenseresult;
          this.income = incomeresult;
          this.date = dateresult;

          this.datacollection = {
            labels: this.date,
            datasets: [{
              label: 'Expense',
              backgroundColor: 'transparent',
              pointBorderColor: '#f87979',
              data: this.expense
            }, {
              label: 'Income',
              backgroundColor: 'transparent',
              pointBorderColor: '#5bf8bf',
              data: this.income
            }]
          };
        });
      }).catch(error => {
        console.log(error);
      });
    },

    fetchData() {
      channel.bind('new-expense', data => {
        let _results = data.newExpense.data;
        let dateresult = _results.map(a => a.date);
        let expenseresult = _results.map(a => a.expense);
        let incomeresult = _results.map(a => a.income);
        this.expense = expenseresult;
        this.income = incomeresult;
        this.date = dateresult;
        this.datacollection = {
          labels: this.date,
          datasets: [{
            label: 'Expense Charts',
            backgroundColor: '#f87979',
            data: this.expense
          }, {
            label: 'Income Charts',
            backgroundColor: '#5bf8bf',
            data: this.income
          }]
        };
      });
    }
  }
});

/***/ }),

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__);


const { reactiveProp } = __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["mixins"];

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["Line"].extend({
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    // this.chartData is created in the mixin
    this.renderChart(this.chartData, this.options);
  }
}));

/***/ }),

/***/ 260:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 261:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 41,
	"./af.js": 41,
	"./ar": 48,
	"./ar-dz": 42,
	"./ar-dz.js": 42,
	"./ar-kw": 43,
	"./ar-kw.js": 43,
	"./ar-ly": 44,
	"./ar-ly.js": 44,
	"./ar-ma": 45,
	"./ar-ma.js": 45,
	"./ar-sa": 46,
	"./ar-sa.js": 46,
	"./ar-tn": 47,
	"./ar-tn.js": 47,
	"./ar.js": 48,
	"./az": 49,
	"./az.js": 49,
	"./be": 50,
	"./be.js": 50,
	"./bg": 51,
	"./bg.js": 51,
	"./bm": 52,
	"./bm.js": 52,
	"./bn": 53,
	"./bn.js": 53,
	"./bo": 54,
	"./bo.js": 54,
	"./br": 55,
	"./br.js": 55,
	"./bs": 56,
	"./bs.js": 56,
	"./ca": 57,
	"./ca.js": 57,
	"./cs": 58,
	"./cs.js": 58,
	"./cv": 59,
	"./cv.js": 59,
	"./cy": 60,
	"./cy.js": 60,
	"./da": 61,
	"./da.js": 61,
	"./de": 64,
	"./de-at": 62,
	"./de-at.js": 62,
	"./de-ch": 63,
	"./de-ch.js": 63,
	"./de.js": 64,
	"./dv": 65,
	"./dv.js": 65,
	"./el": 66,
	"./el.js": 66,
	"./en-SG": 67,
	"./en-SG.js": 67,
	"./en-au": 68,
	"./en-au.js": 68,
	"./en-ca": 69,
	"./en-ca.js": 69,
	"./en-gb": 70,
	"./en-gb.js": 70,
	"./en-ie": 71,
	"./en-ie.js": 71,
	"./en-il": 72,
	"./en-il.js": 72,
	"./en-nz": 73,
	"./en-nz.js": 73,
	"./eo": 74,
	"./eo.js": 74,
	"./es": 77,
	"./es-do": 75,
	"./es-do.js": 75,
	"./es-us": 76,
	"./es-us.js": 76,
	"./es.js": 77,
	"./et": 78,
	"./et.js": 78,
	"./eu": 79,
	"./eu.js": 79,
	"./fa": 80,
	"./fa.js": 80,
	"./fi": 81,
	"./fi.js": 81,
	"./fo": 82,
	"./fo.js": 82,
	"./fr": 85,
	"./fr-ca": 83,
	"./fr-ca.js": 83,
	"./fr-ch": 84,
	"./fr-ch.js": 84,
	"./fr.js": 85,
	"./fy": 86,
	"./fy.js": 86,
	"./ga": 87,
	"./ga.js": 87,
	"./gd": 88,
	"./gd.js": 88,
	"./gl": 89,
	"./gl.js": 89,
	"./gom-latn": 90,
	"./gom-latn.js": 90,
	"./gu": 91,
	"./gu.js": 91,
	"./he": 92,
	"./he.js": 92,
	"./hi": 93,
	"./hi.js": 93,
	"./hr": 94,
	"./hr.js": 94,
	"./hu": 95,
	"./hu.js": 95,
	"./hy-am": 96,
	"./hy-am.js": 96,
	"./id": 97,
	"./id.js": 97,
	"./is": 98,
	"./is.js": 98,
	"./it": 100,
	"./it-ch": 99,
	"./it-ch.js": 99,
	"./it.js": 100,
	"./ja": 101,
	"./ja.js": 101,
	"./jv": 102,
	"./jv.js": 102,
	"./ka": 103,
	"./ka.js": 103,
	"./kk": 104,
	"./kk.js": 104,
	"./km": 105,
	"./km.js": 105,
	"./kn": 106,
	"./kn.js": 106,
	"./ko": 107,
	"./ko.js": 107,
	"./ku": 108,
	"./ku.js": 108,
	"./ky": 109,
	"./ky.js": 109,
	"./lb": 110,
	"./lb.js": 110,
	"./lo": 111,
	"./lo.js": 111,
	"./lt": 112,
	"./lt.js": 112,
	"./lv": 113,
	"./lv.js": 113,
	"./me": 114,
	"./me.js": 114,
	"./mi": 115,
	"./mi.js": 115,
	"./mk": 116,
	"./mk.js": 116,
	"./ml": 117,
	"./ml.js": 117,
	"./mn": 118,
	"./mn.js": 118,
	"./mr": 119,
	"./mr.js": 119,
	"./ms": 121,
	"./ms-my": 120,
	"./ms-my.js": 120,
	"./ms.js": 121,
	"./mt": 122,
	"./mt.js": 122,
	"./my": 123,
	"./my.js": 123,
	"./nb": 124,
	"./nb.js": 124,
	"./ne": 125,
	"./ne.js": 125,
	"./nl": 127,
	"./nl-be": 126,
	"./nl-be.js": 126,
	"./nl.js": 127,
	"./nn": 128,
	"./nn.js": 128,
	"./pa-in": 129,
	"./pa-in.js": 129,
	"./pl": 130,
	"./pl.js": 130,
	"./pt": 132,
	"./pt-br": 131,
	"./pt-br.js": 131,
	"./pt.js": 132,
	"./ro": 133,
	"./ro.js": 133,
	"./ru": 134,
	"./ru.js": 134,
	"./sd": 135,
	"./sd.js": 135,
	"./se": 136,
	"./se.js": 136,
	"./si": 137,
	"./si.js": 137,
	"./sk": 138,
	"./sk.js": 138,
	"./sl": 139,
	"./sl.js": 139,
	"./sq": 140,
	"./sq.js": 140,
	"./sr": 142,
	"./sr-cyrl": 141,
	"./sr-cyrl.js": 141,
	"./sr.js": 142,
	"./ss": 143,
	"./ss.js": 143,
	"./sv": 144,
	"./sv.js": 144,
	"./sw": 145,
	"./sw.js": 145,
	"./ta": 146,
	"./ta.js": 146,
	"./te": 147,
	"./te.js": 147,
	"./tet": 148,
	"./tet.js": 148,
	"./tg": 149,
	"./tg.js": 149,
	"./th": 150,
	"./th.js": 150,
	"./tl-ph": 151,
	"./tl-ph.js": 151,
	"./tlh": 152,
	"./tlh.js": 152,
	"./tr": 153,
	"./tr.js": 153,
	"./tzl": 154,
	"./tzl.js": 154,
	"./tzm": 156,
	"./tzm-latn": 155,
	"./tzm-latn.js": 155,
	"./tzm.js": 156,
	"./ug-cn": 157,
	"./ug-cn.js": 157,
	"./uk": 158,
	"./uk.js": 158,
	"./ur": 159,
	"./ur.js": 159,
	"./uz": 161,
	"./uz-latn": 160,
	"./uz-latn.js": 160,
	"./uz.js": 161,
	"./vi": 162,
	"./vi.js": 162,
	"./x-pseudo": 163,
	"./x-pseudo.js": 163,
	"./yo": 164,
	"./yo.js": 164,
	"./zh-cn": 165,
	"./zh-cn.js": 165,
	"./zh-hk": 166,
	"./zh-hk.js": 166,
	"./zh-tw": 167,
	"./zh-tw.js": 167
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 264;

/***/ }),

/***/ 281:
/***/ (function(module, exports) {

module.exports = {"_from":"vue-chartjs@^2.6.3","_id":"vue-chartjs@2.8.7","_inBundle":false,"_integrity":"sha512-XNNCQHwP1zUe739q0h0DdObx7qC+umJ50P8N4uab4N964rHSSq7sbRAdyoevObI3K2eYuCTLhnzjA1F90uQwtQ==","_location":"/vue-chartjs","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"vue-chartjs@^2.6.3","name":"vue-chartjs","escapedName":"vue-chartjs","rawSpec":"^2.6.3","saveSpec":null,"fetchSpec":"^2.6.3"},"_requiredBy":["/"],"_resolved":"https://registry.npmjs.org/vue-chartjs/-/vue-chartjs-2.8.7.tgz","_shasum":"bcd1cda1a1ef8ed80581638a02cf88182d437d09","_spec":"vue-chartjs@^2.6.3","_where":"/Users/wesleyparr/projects/vue/chart/my-chart","author":{"name":"Jakub Juszczak","email":"jakub@posteo.de"},"babel":{"presets":["es2015"]},"browserify":{"transform":["babelify"]},"bugs":{"url":"https://github.com/apertureless/vue-chartjs/issues"},"bundleDependencies":false,"contributors":[{"name":"Thorsten Lünborg","url":"https://github.com/LinusBorg"},{"name":"Juan Carlos Alonso","url":"https://github.com/jcalonso"}],"dependencies":{"lodash.merge":"^4.6.0"},"deprecated":false,"description":"Vue.js wrapper for chart.js for creating beautiful charts.","devDependencies":{"babel-cli":"^6.24.1","babel-core":"^6.25.0","babel-loader":"^7.0.0","babel-plugin-transform-object-assign":"^6.22.0","babel-plugin-transform-runtime":"^6.23.0","babel-preset-es2015":"^6.24.1","babel-preset-stage-2":"^6.24.1","babel-runtime":"^6.23.0","chai":"^3.5.0","chart.js":"^2.7.0","chromedriver":"^2.28.0","connect-history-api-fallback":"^1.1.0","cross-env":"^3.2.4","cross-spawn":"^5.1.0","css-loader":"^0.28.0","eslint":"^3.19.0","eslint-config-standard":"^10.2.1","eslint-friendly-formatter":"^2.0.7","eslint-loader":"^1.7.1","eslint-plugin-html":"^2.0.1","eslint-plugin-import":"^2.2.0","eslint-plugin-node":"^4.2.2","eslint-plugin-promise":"^3.5.0","eslint-plugin-standard":"^3.0.1","eventsource-polyfill":"^0.9.6","express":"^4.15.2","extract-text-webpack-plugin":"^1.0.1","file-loader":"^0.10.1","function-bind":"^1.0.2","html-webpack-plugin":"^2.28.0","http-proxy-middleware":"^0.17.4","inject-loader":"^3.0.0","isparta-loader":"^2.0.0","jasmine-core":"^2.5.2","json-loader":"^0.5.4","karma":"^1.5.0","karma-coverage":"^1.1.1","karma-jasmine":"^1.0.2","karma-mocha":"^1.2.0","karma-phantomjs-launcher":"^1.0.4","karma-sinon-chai":"^1.2.0","karma-sourcemap-loader":"^0.3.7","karma-spec-reporter":"0.0.30","karma-webpack":"1.8.1","lolex":"^1.6.0","mocha":"^3.1.0","nightwatch":"^0.9.14","ora":"^1.2.0","phantomjs-prebuilt":"^2.1.13","selenium-server":"^3.3.1","shelljs":"^0.7.7","sinon":"^2.1.0","sinon-chai":"^2.9.0","url-loader":"^0.5.8","vue":"^2.4.4","vue-hot-reload-api":"^2.1.0","vue-html-loader":"^1.2.4","vue-loader":"^12.2.2","vue-style-loader":"^3.0.1","vue-template-compiler":"^2.4.2","webpack":"^1.13.2","webpack-dev-middleware":"^1.10.1","webpack-hot-middleware":"^2.17.1","webpack-merge":"1.1.1"},"engines":{"node":">=6.9.0"},"files":["src","dist","es"],"greenkeeper":{"ignore":["extract-text-webpack-plugin","karma-webpack","webpack","webpack-merge"]},"homepage":"http://vue-chartjs.org","jsnext:main":"es/index.js","keywords":["ChartJs","Vue","Visualisation","Wrapper","Charts"],"license":"MIT","main":"dist/vue-chartjs.js","maintainers":[{"name":"Jakub Juszczak","email":"jakub@posteo.de","url":"http://www.jakubjuszczak.de"}],"module":"es/index.js","name":"vue-chartjs","peerDependencies":{"chart.js":"^2.7.0","vue":"^2.4.4"},"repository":{"type":"git","url":"git+ssh://git@github.com/apertureless/vue-chartjs.git"},"scripts":{"build":"yarn run release && yarn run build:es","build:es":"cross-env BABEL_ENV=es babel src --out-dir es","dev":"node build/dev-server.js","e2e":"node test/e2e/runner.js","lint":"eslint --ext .js,.vue src test/unit/specs test/e2e/specs","prepublish":"yarn run lint && yarn run test && yarn run build","release":"webpack --progress --hide-modules --config  ./build/webpack.release.js && NODE_ENV=production webpack --progress --hide-modules --config  ./build/webpack.release.min.js && webpack --progress --hide-modules --config  ./build/webpack.release.full.js && NODE_ENV=production webpack --progress --hide-modules --config  ./build/webpack.release.full.min.js","test":"npm run unit","unit":"karma start test/unit/karma.conf.js --single-run"},"unpkg":"dist/vue-chartjs.full.min.js","version":"2.8.7"}

/***/ }),

/***/ 282:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(261)
}
var Component = __webpack_require__(21)(
  /* script */
  __webpack_require__(190),
  /* template */
  __webpack_require__(285),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-61dfcaa9",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 283:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(21)(
  /* script */
  __webpack_require__(191),
  /* template */
  null,
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 284:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('home')], 1)
},staticRenderFns: []}

/***/ }),

/***/ 285:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "hello"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('h2', {
    staticClass: "title"
  }, [_vm._v("Budget Tracker")]), _vm._v(" "), _c('h3', {
    staticClass: "subtitle"
  }, [_vm._v("Expense and Income")]), _vm._v(" "), _c('line-chart', {
    attrs: {
      "chart-data": _vm.datacollection
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('form', {
    staticClass: "form",
    on: {
      "submit": function($event) {
        $event.preventDefault();
        return _vm.addExpenses($event)
      }
    }
  }, [_c('h4', [_vm._v("Add New Entry")]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Expenses")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.expenseamount),
      expression: "expenseamount"
    }],
    staticClass: "form-control",
    attrs: {
      "placeholder": "How much did you spend?",
      "type": "number",
      "required": ""
    },
    domProps: {
      "value": (_vm.expenseamount)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.expenseamount = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Income")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.incomeamount),
      expression: "incomeamount"
    }],
    staticClass: "form-control",
    attrs: {
      "placeholder": "How much did you earn?",
      "type": "number",
      "required": ""
    },
    domProps: {
      "value": (_vm.incomeamount)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.incomeamount = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Date")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.entrydate),
      expression: "entrydate"
    }],
    staticClass: "form-control",
    attrs: {
      "placeholder": "Date",
      "type": "date",
      "required": ""
    },
    domProps: {
      "value": (_vm.entrydate)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.entrydate = $event.target.value
      }
    }
  })]), _vm._v(" "), _vm._m(0)])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-group"
  }, [_c('button', {
    staticClass: "btn btn-primary"
  }, [_vm._v("Add New Entry")])])
}]}

/***/ })

},[188]);
//# sourceMappingURL=app.55403e55af61054ba985.js.map