import urlPathName from '../config'

const endPoints = {
    walletTransactionEndpoint: `${urlPathName}/api/wallet/transactions`,
    walletLivePriceEndpoint: `${urlPathName}/api/wallet/getliveprice`,
    generateAuthCodeEndpoint: `${urlPathName}/api/auth/generateauthcode`,
    verifyAuthCodeEndpoint: `${urlPathName}/api/auth/verifyauthcode`,
    signOutEndpoint: `${urlPathName}/api/auth/signout`,
    verifyAuthEndpoint: `${urlPathName}/api/auth/verifyauth`,
    createTxEndpoint: `${urlPathName}/api/wallet/createtx`,
    datasetLibraryEndpoint: `${urlPathName}/api/dataset/library`,
    datasetSubscriptionEndpoint: `${urlPathName}/api/dataset/mysubscriptions`,
    datasetViewEndpoint: `${urlPathName}/api/dataset/viewone`,
    findsimilarDatasets: `${urlPathName}/api/dataset/findsimilar`,
    datasetFilterCategoriesEndpoint: `${urlPathName}/api/dataset/filtercategories`,
    datasetSortOptionsEndpoint: `${urlPathName}/api/dataset/sortoptions`,
    etherScanEndpoint: `https://goerli.etherscan.io/tx`,
    subscribeEndpoint: `${urlPathName}/api/subscription/subscribe`,
    checkSubscriptionEndpoint: `${urlPathName}/api/subscription/issubscribed`,
    getRecommendedDatasetEndpoint: `${urlPathName}/api/dataset/viewrecommended`
}

export default endPoints