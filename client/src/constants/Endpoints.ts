const apiHost = process.env.NODE_ENV === 'development' ? 'http://localhost:7000' : 'https://lenstack.vercel.app'

const endPoints = {
    generateAuthCodeEndpoint: `${apiHost}/api/generateauthcode`,
    verifyAuthCodeEndpoint: `${apiHost}/api/verifyauthcode`,
    checkAuthEndpoint: `${apiHost}/api/checkauth`,
    signOutEndpoint: `${apiHost}/api/signout`,
    createTransactionEndpoint: `${apiHost}/api/createtransaction`,
    getTransactionsEndpoint: `${apiHost}/api/transactions`,
    datasetFiltersEndpoint: `${apiHost}/api/datasetfilters`,
    dataplatformEndpoint: `${apiHost}/api/dataplatform`,
    datasetSubscriptionEndpoint: `${apiHost}/api/subscriptions`,
    datasetViewEndpoint: `${apiHost}/api/viewdataset`,
    findsimilarDatasets: `${apiHost}/api/findsimilardatasets`,
    metadataapi: `${apiHost}/api/metadataapi`,
    dataapi: `${apiHost}/api/dataapi`,
    subscribeEndpoint: `${apiHost}/api/subscribe`,
    unsubscribeEndpoint: `${apiHost}/api/unsubscribe`,
    checkSubscriptionEndpoint: `${apiHost}/api/checksubscriptionstatus`,
    etherScanEndpoint: `https://sepolia.etherscan.io/tx`,
}

export default endPoints