"use strict";
exports.id = 63;
exports.ids = [63];
exports.modules = {

/***/ 9063:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const apiHost =  false ? 0 : "https://lenstack.vercel.app";
const endPoints = {
    generateAuthCodeEndpoint: `${apiHost}/api/auth/generateauthcode`,
    verifyAuthCodeEndpoint: `${apiHost}/api/auth/verifyauthcode`,
    signOutEndpoint: `${apiHost}/api/auth/signout`,
    checkAuthEndpoint: `${apiHost}/api/auth/checkauth`,
    createTxEndpoint: `${apiHost}/api/wallet/createtx`,
    walletTransactionEndpoint: `${apiHost}/api/wallet/transactions`,
    walletLivePriceEndpoint: `${apiHost}/api/wallet/getliveprice`,
    datasetSortAndFilterOptionsEndpoint: `${apiHost}/api/dataset/getsortandfilteroptions`,
    datasetLibraryEndpoint: `${apiHost}/api/dataset/library`,
    datasetSubscriptionEndpoint: `${apiHost}/api/dataset/mysubscriptions`,
    datasetViewEndpoint: `${apiHost}/api/dataset/viewone`,
    findsimilarDatasets: `${apiHost}/api/dataset/findsimilar`,
    subscribeEndpoint: `${apiHost}/api/subscription/subscribe`,
    checkSubscriptionEndpoint: `${apiHost}/api/subscription/issubscribed`,
    etherScanEndpoint: `https://goerli.etherscan.io/tx`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (endPoints);


/***/ })

};
;