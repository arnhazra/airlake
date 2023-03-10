const apiOrigin = process.env.NODE_ENV === 'development' ? 'http://localhost:7000' : 'https://lenstack.vercel.app'

const endPoints = {
    generateAuthCodeEndpoint: `${apiOrigin}/api/auth/generateauthcode`,
    verifyAuthCodeEndpoint: `${apiOrigin}/api/auth/verifyauthcode`,
    signOutEndpoint: `${apiOrigin}/api/auth/signout`,
    checkAuthEndpoint: `${apiOrigin}/api/auth/checkauth`,
    createTxEndpoint: `${apiOrigin}/api/wallet/createtx`,
    walletTransactionEndpoint: `${apiOrigin}/api/wallet/transactions`,
    walletLivePriceEndpoint: `${apiOrigin}/api/wallet/getliveprice`,
    datasetSortAndFilterOptionsEndpoint: `${apiOrigin}/api/dataset/getsortandfilteroptions`,
    datasetLibraryEndpoint: `${apiOrigin}/api/dataset/library`,
    datasetSubscriptionEndpoint: `${apiOrigin}/api/dataset/mysubscriptions`,
    datasetViewEndpoint: `${apiOrigin}/api/dataset/viewone`,
    findsimilarDatasets: `${apiOrigin}/api/dataset/findsimilar`,
    subscribeEndpoint: `${apiOrigin}/api/subscription/subscribe`,
    checkSubscriptionEndpoint: `${apiOrigin}/api/subscription/issubscribed`,
    etherScanEndpoint: `https://goerli.etherscan.io/tx`,
}

export default endPoints