enum endPoints {
    walletTransactionEndpoint = '/api/wallet/transactions',
    walletLivePriceEndpoint = '/api/wallet/getliveprice',
    generateAuthCodeEndpoint = '/api/auth/generateauthcode',
    verifyAuthCodeEndpoint = '/api/auth/verifyauthcode',
    signOutEndpoint = '/api/auth/signout',
    useAuthEndpoint = '/api/auth/useauth',
    createTxEndpoint = '/api/wallet/createtx',
    datasetStoreEndpoint = '/api/dataset/store',
    datasetSubscriptionEndpoint = '/api/dataset/subscriptions',
    datasetViewEndpoint = '/api/dataset/view',
    datasetPreviewDataEndpoint = '/api/dataset/data/preview',
    datasetFilterCategoriesEndpoint = '/api/dataset/filtercategories',
    etherScanEndpoint = 'https://goerli.etherscan.io/tx'
}

export default endPoints