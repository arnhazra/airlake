const apiHost = process.env.NODE_ENV === 'development' ? 'http://localhost:7000' : 'https://evolake.vercel.app'

const endPoints = {
    generateAuthCodeEndpoint: `${apiHost}/api/generateauthcode`,
    verifyAuthCodeEndpoint: `${apiHost}/api/verifyauthcode`,
    checkAuthEndpoint: `${apiHost}/api/verifycurrentaccount`,
    signOutEndpoint: `${apiHost}/api/signout`,
    createTransactionEndpoint: `${apiHost}/api/createtransaction`,
    getTransactionsEndpoint: `${apiHost}/api/gettransactions`,
    datasetFiltersEndpoint: `${apiHost}/api/getdatasetfilters`,
    datasetLibraryEndpoint: `${apiHost}/api/getdatasetlibrary`,
    datasetSubscriptionEndpoint: `${apiHost}/api/getmysubscriptions`,
    datasetViewEndpoint: `${apiHost}/api/viewdataset`,
    findsimilarDatasets: `${apiHost}/api/findsimilardatasets`,
    datasetPreview: `${apiHost}/api/datasetpreview`,
    datasetFullview: `${apiHost}/api/datasetfullview`,
    subscribeEndpoint: `${apiHost}/api/subscribe`,
    checkSubscriptionEndpoint: `${apiHost}/api/checksubscriptionstatus`,
    etherScanEndpoint: `https://sepolia.etherscan.io/tx`,
}

export default endPoints