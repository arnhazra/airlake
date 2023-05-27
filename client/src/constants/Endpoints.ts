const apiHost = process.env.NODE_ENV === 'development' ? 'http://localhost:7000' : 'https://lenstack.vercel.app'

const endPoints = {
    generateAuthCodeEndpoint: `${apiHost}/api/generateauthcode`,
    verifyAuthCodeEndpoint: `${apiHost}/api/verifyauthcode`,
    checkAuthEndpoint: `${apiHost}/api/verifyuser`,
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
    walletBalanceEndpoint: `${apiHost}/api/getwalletbalance`,
    etherScanEndpoint: `https://sepolia.etherscan.io/tx`,
    infuraEndpoint: `https://sepolia.infura.io/v3/8e718b45dd2b4425bc1e785e56bde9c4`
}

export default endPoints