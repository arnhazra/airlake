enum endPoints {
    walletTransactionEndpoint = '/api/wallet/transactions',
    walletLivePriceEndpoint = '/api/wallet/getliveprice',
    generateAuthCodeEndpoint = '/api/auth/generateauthcode',
    verifyAuthCodeEndpoint = '/api/auth/verifyauthcode',
    signOutEndpoint = '/api/auth/signout',
    useAuthEndpoint = '/api/auth/useauth',
    createTxEndpoint = '/api/wallet/createtx',
    datasetStoreEndpoint = '/api/dataset/store',
    datasetSubscriptionEndpoint = '/api/dataset/mysubscriptions',
    datasetViewEndpoint = '/api/dataset/viewone',
    findsimilarDatasets = '/api/dataset/findsimilar',
    datasetFilterCategoriesEndpoint = '/api/dataset/filtercategories',
    datasetSortOptionsEndpoint = '/api/dataset/sortoptions',
    etherScanEndpoint = 'https://goerli.etherscan.io/tx',
    subscribeEndpoint = '/api/subscription/subscribe',
    checkSubscriptionEndpoint = '/api/subscription/issubscribed'
}

export default endPoints