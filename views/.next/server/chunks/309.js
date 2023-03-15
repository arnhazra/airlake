"use strict";
exports.id = 309;
exports.ids = [309];
exports.modules = {

/***/ 5309:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "k": () => (/* binding */ GlobalContext),
  "Z": () => (/* binding */ globalStateProvider)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./src/context/globalReducer.ts
const GlobalReducer = (state, action)=>{
    switch(action.type){
        case "setUserState":
            return {
                ...state,
                userState: {
                    ...state.userState,
                    ...action.payload
                }
            };
        case "setDatasetRequestState":
            return {
                ...state,
                datasetRequestState: {
                    ...state.datasetRequestState,
                    ...action.payload
                }
            };
        default:
            return state;
    }
};

;// CONCATENATED MODULE: ./src/context/globalStateProvider.tsx



const initialState = {
    userState: {
        userid: "",
        name: ""
    },
    datasetRequestState: {
        searchQuery: "",
        selectedFilter: "All",
        selectedSortOption: "Freshness"
    }
};
const GlobalContext = /*#__PURE__*/ (0,external_react_.createContext)([
    initialState,
    ()=>undefined
]);
const GlobalStateProvider = ({ children  })=>{
    const [state, _dispatch] = (0,external_react_.useReducer)(GlobalReducer, initialState);
    const dispatch = (0,external_react_.useCallback)((type, ...payload)=>{
        _dispatch({
            type,
            payload: payload[0]
        });
    }, []);
    const values = (0,external_react_.useMemo)(()=>[
            state,
            dispatch
        ], [
        state
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx(GlobalContext.Provider, {
        value: values,
        children: children
    });
};
/* harmony default export */ const globalStateProvider = (GlobalStateProvider);


/***/ })

};
;