const apiHost = process.env.NODE_ENV === 'development' ? 'http://localhost:7000' : 'https://lenstack.vercel.app'

const endPoints = {
    generateAuthCodeEndpoint: `${apiHost}/api/auth/generateauthcode`,
    verifyAuthCodeEndpoint: `${apiHost}/api/auth/verifyauthcode`,
    signOutEndpoint: `${apiHost}/api/auth/signout`,
    checkAuthEndpoint: `${apiHost}/api/auth/checkauth`,
    createTxEndpoint: `${apiHost}/api/createwallettx`,
    walletTransactionEndpoint: `${apiHost}/api/getwallettx`,
    walletLivePriceEndpoint: `${apiHost}/api/getethliveprice`,
    datasetSortAndFilterOptionsEndpoint: `${apiHost}/api/getdatasetsortandfilters`,
    datasetLibraryEndpoint: `${apiHost}/api/getdatasetlibrary`,
    datasetSubscriptionEndpoint: `${apiHost}/api/getmysubscriptions`,
    datasetViewEndpoint: `${apiHost}/api/viewdataset`,
    findsimilarDatasets: `${apiHost}/api/findsimilardatasets`,
    datasetPreview: `${apiHost}/api/datasetpreview`,
    datasetFullview: `${apiHost}/api/datasetfullview`,
    subscribeEndpoint: `${apiHost}/api/subscribe`,
    checkSubscriptionEndpoint: `${apiHost}/api/checksubscriptionstatus`,
    etherScanEndpoint: `https://goerli.etherscan.io/tx`,
}

export default endPoints