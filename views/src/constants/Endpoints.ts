
const endPoints = {
    walletTransactionEndpoint: `/api/wallet/transactions`,
    walletLivePriceEndpoint: `/api/wallet/getliveprice`,
    generateAuthCodeEndpoint: `/api/auth/generateauthcode`,
    verifyAuthCodeEndpoint: `/api/auth/verifyauthcode`,
    signOutEndpoint: `/api/auth/signout`,
    verifyAuthEndpoint: `/api/auth/verifyauth`,
    createTxEndpoint: `/api/wallet/createtx`,
    datasetLibraryEndpoint: `/api/dataset/library`,
    datasetSubscriptionEndpoint: `/api/dataset/mysubscriptions`,
    datasetViewEndpoint: `/api/dataset/viewone`,
    findsimilarDatasets: `/api/dataset/findsimilar`,
    datasetFilterCategoriesEndpoint: `/api/dataset/filtercategories`,
    datasetSortOptionsEndpoint: `/api/dataset/sortoptions`,
    etherScanEndpoint: `https://goerli.etherscan.io/tx`,
    subscribeEndpoint: `/api/subscription/subscribe`,
    checkSubscriptionEndpoint: `/api/subscription/issubscribed`,
    getRecommendedDatasetEndpoint: `/api/dataset/viewrecommended`
}

export default endPoints