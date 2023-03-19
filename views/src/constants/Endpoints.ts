const apiHost = process.env.NODE_ENV === 'development' ? 'http://localhost:7000' : 'https://lenstack.vercel.app'

const endPoints = {
    generateAuthCodeEndpoint: `${apiHost}/api/auth/generateauthcode`,
    verifyAuthCodeEndpoint: `${apiHost}/api/auth/verifyauthcode`,
    signOutEndpoint: `${apiHost}/api/auth/signout`,
    checkAuthEndpoint: `${apiHost}/api/auth/checkauth`,
    createTxEndpoint: `${apiHost}/api/createwallettx`,
    walletTransactionEndpoint: `${apiHost}/api/getwallettx`,
    walletLivePriceEndpoint: `${apiHost}/api/getethliveprice`,
    datasetSortAndFilterOptionsEndpoint: `${apiHost}/api/dataset/getsortandfilteroptions`,
    datasetLibraryEndpoint: `${apiHost}/api/dataset/library`,
    datasetSubscriptionEndpoint: `${apiHost}/api/dataset/mysubscriptions`,
    datasetViewEndpoint: `${apiHost}/api/dataset/viewone`,
    findsimilarDatasets: `${apiHost}/api/dataset/findsimilar`,
    subscribeEndpoint: `${apiHost}/api/subscription/subscribe`,
    checkSubscriptionEndpoint: `${apiHost}/api/subscription/issubscribed`,
    etherScanEndpoint: `https://goerli.etherscan.io/tx`,
}

export default endPoints