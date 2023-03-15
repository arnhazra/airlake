(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 3339:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ NavBarComponent)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./src/context/globalStateProvider.tsx + 1 modules
var globalStateProvider = __webpack_require__(5309);
;// CONCATENATED MODULE: external "lodash.debounce"
const external_lodash_debounce_namespaceObject = require("lodash.debounce");
var external_lodash_debounce_default = /*#__PURE__*/__webpack_require__.n(external_lodash_debounce_namespaceObject);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__(358);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./src/components/ReactIfComponent.tsx
var ReactIfComponent = __webpack_require__(7891);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./src/components/NavBarComponent.tsx








const NavBar = ()=>{
    const [, dispatch] = (0,external_react_.useContext)(globalStateProvider/* GlobalContext */.k);
    const router = (0,router_.useRouter)();
    const [isAuthenticated, setAuthenticated] = (0,external_react_.useState)(false);
    const searchChangeHandler = (event)=>{
        dispatch("setDatasetRequestState", {
            searchQuery: event.target.value
        });
        router.push("/dataset/library");
    };
    const debouncedChangeHandler = (0,external_react_.useMemo)(()=>external_lodash_debounce_default()(searchChangeHandler, 1000), []);
    (0,external_react_.useEffect)(()=>{
        console.log("hello");
        if (localStorage.hasOwnProperty("accessToken")) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, [
        router.pathname
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(ReactIfComponent/* default */.Z, {
                condition: isAuthenticated,
                children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Navbar, {
                    className: "navbar-authorized",
                    variant: "dark",
                    expand: "lg",
                    style: {
                        zoom: 0.85
                    },
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Container, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/dataset/library",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Navbar.Brand, {
                                    style: {
                                        fontSize: "1.3rem"
                                    },
                                    children: "Lenstack"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Navbar.Toggle, {
                                "aria-controls": "navbarScroll"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Navbar.Collapse, {
                                id: "navbarScroll",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Nav, {
                                        className: "me-auto my-2 my-lg-0",
                                        style: {
                                            maxHeight: "8rem"
                                        },
                                        navbarScroll: true,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                href: "/dataset/subscriptions",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Navbar.Brand, {
                                                    children: "Subscriptions"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                href: "/exchange/transactions",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Navbar.Brand, {
                                                    children: "Wallet"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                href: "/account",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Navbar.Brand, {
                                                    children: "Account"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form, {
                                        className: "d-flex",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Form.Control, {
                                            type: "text",
                                            placeholder: "Search Library",
                                            className: "searchbar-navbar",
                                            maxLength: 40,
                                            "aria-label": "Search",
                                            onChange: debouncedChangeHandler
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(ReactIfComponent/* default */.Z, {
                condition: !isAuthenticated,
                children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Navbar, {
                    className: "navbar-unauthorized",
                    variant: "dark",
                    expand: "lg",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Container, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Navbar.Brand, {
                                    style: {
                                        fontSize: "1.3rem"
                                    },
                                    children: "Lenstack"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Navbar.Toggle, {}),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Navbar.Collapse, {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Nav, {
                                    className: "ms-auto",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: "/auth",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Navbar.Brand, {
                                                children: "Get Started"
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            href: "https://www.linkedin.com/in/arnhazra/",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Navbar.Brand, {
                                                children: "Creator"
                                            })
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const NavBarComponent = (NavBar);


/***/ }),

/***/ 9456:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z": () => (/* binding */ unprotectedRoutes)
/* harmony export */ });
const unprotectedRoutes = [
    "/",
    "/auth"
];


/***/ }),

/***/ 1891:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9648);
/* harmony import */ var _constants_Endpoints__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9063);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6201);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _context_globalStateProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5309);
/* harmony import */ var _constants_UnprotectedRoutes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9456);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_1__, react_hot_toast__WEBPACK_IMPORTED_MODULE_3__]);
([axios__WEBPACK_IMPORTED_MODULE_1__, react_hot_toast__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const useChcekAuth = ()=>{
    const [, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_globalStateProvider__WEBPACK_IMPORTED_MODULE_5__/* .GlobalContext */ .k);
    const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
        isLoaded: false
    });
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!_constants_UnprotectedRoutes__WEBPACK_IMPORTED_MODULE_6__/* .unprotectedRoutes.includes */ .z.includes(router.pathname)) {
            (async ()=>{
                try {
                    const response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].post(_constants_Endpoints__WEBPACK_IMPORTED_MODULE_2__/* ["default"].checkAuthEndpoint */ .Z.checkAuthEndpoint);
                    dispatch("setUserState", {
                        userid: response.data.user._id,
                        name: response.data.user.name
                    });
                    setState({
                        isLoaded: true
                    });
                } catch (error) {
                    if (error.response) {
                        if (error.response.status === 401) {
                            localStorage.removeItem("accessToken");
                            dispatch("setUserState", {
                                isLoaded: true
                            });
                            setState({
                                isLoaded: true
                            });
                            router.push("/");
                        } else {
                            setState({
                                isLoaded: true
                            });
                            react_hot_toast__WEBPACK_IMPORTED_MODULE_3__["default"].error("Something went wrong");
                        }
                    } else {
                        localStorage.removeItem("accessToken");
                        react_hot_toast__WEBPACK_IMPORTED_MODULE_3__["default"].error("Something went wrong");
                        setState({
                            isLoaded: true
                        });
                        router.push("/");
                    }
                }
            })();
        } else {
            setState({
                isLoaded: true
            });
        }
    }, [
        router.pathname
    ]);
    return state;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useChcekAuth);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3631:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_NavBarComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3339);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ReactIfComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7891);
/* harmony import */ var _components_LoadingComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9548);
/* harmony import */ var _hooks_useCheckAuth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1891);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6201);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_hooks_useCheckAuth__WEBPACK_IMPORTED_MODULE_5__, react_hot_toast__WEBPACK_IMPORTED_MODULE_6__]);
([_hooks_useCheckAuth__WEBPACK_IMPORTED_MODULE_5__, react_hot_toast__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const Layout = ({ children  })=>{
    const checkAuth = (0,_hooks_useCheckAuth__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("nav", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_NavBarComponent__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {})
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ReactIfComponent__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                        condition: checkAuth.isLoaded,
                        children: children
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ReactIfComponent__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                        condition: !checkAuth.isLoaded,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_LoadingComponent__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {})
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.Toaster, {
                        position: "bottom-center",
                        containerClassName: "toaster"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9212:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layouts_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3631);
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9090);
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_globals_sass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5802);
/* harmony import */ var _styles_globals_sass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_sass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9648);
/* harmony import */ var _context_globalStateProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5309);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_layouts_Layout__WEBPACK_IMPORTED_MODULE_1__, axios__WEBPACK_IMPORTED_MODULE_4__]);
([_layouts_Layout__WEBPACK_IMPORTED_MODULE_1__, axios__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






axios__WEBPACK_IMPORTED_MODULE_4__["default"].interceptors.request.use((request)=>{
    request.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return request;
});
function App({ Component , pageProps  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_context_globalStateProvider__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_layouts_Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("header", {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                        children: "Lenstack"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                    ...pageProps
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9090:
/***/ (() => {



/***/ }),

/***/ 5802:
/***/ (() => {



/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 358:
/***/ ((module) => {

"use strict";
module.exports = require("react-bootstrap");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9648:
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ }),

/***/ 6201:
/***/ ((module) => {

"use strict";
module.exports = import("react-hot-toast");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [664,63,478,309], () => (__webpack_exec__(9212)));
module.exports = __webpack_exports__;

})();