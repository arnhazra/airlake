const endPoints = {
    generateAuthCodeEndpoint: `/api/auth/generateauthcode`,
    verifyAuthCodeEndpoint: `/api/auth/verifyauthcode`,
    signOutEndpoint: `/api/auth/signout`,
    checkAuthEndpoint: `/api/auth/checkauth`,
    createTxEndpoint: `/api/wallet/createtx`,
    walletTransactionEndpoint: `/api/wallet/transactions`,
    walletLivePriceEndpoint: `/api/wallet/getliveprice`,
    datasetSortAndFilterOptionsEndpoint: `/api/dataset/getsortandfilteroptions`,
    datasetLibraryEndpoint: `/api/dataset/library`,
    datasetSubscriptionEndpoint: `/api/dataset/mysubscriptions`,
    datasetViewEndpoint: `/api/dataset/viewone`,
    findsimilarDatasets: `/api/dataset/findsimilar`,
    subscribeEndpoint: `/api/subscription/subscribe`,
    checkSubscriptionEndpoint: `/api/subscription/issubscribed`,
    etherScanEndpoint: `https://goerli.etherscan.io/tx`,
}

export default endPoints