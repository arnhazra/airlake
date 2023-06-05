const apiHost = process.env.NODE_ENV === 'development' ? 'http://localhost:7000' : 'https://lenstack.vercel.app'

const endPoints = {
    datasetFiltersEndpoint: `${apiHost}/api/dataset/filters`,
    findDatasetsEndpoint: `${apiHost}/api/dataset/finddatasets`,
    datasetViewEndpoint: `${apiHost}/api/dataset/viewdataset`,
    findsimilarDatasets: `${apiHost}/api/dataset/findsimilardatasets`,
    metadataapi: `${apiHost}/api/dataset/metadataapi`,
    dataapi: `${apiHost}/api/dataset/dataapi`,
    createTransactionEndpoint: `${apiHost}/api/transaction/create`,
    getTransactionsEndpoint: `${apiHost}/api/transaction/getlistbyuser`,
    generateAuthCodeEndpoint: `${apiHost}/api/user/generateauthcode`,
    verifyAuthCodeEndpoint: `${apiHost}/api/user/verifyauthcode`,
    checkAuthEndpoint: `${apiHost}/api/user/verifyuser`,
    signOutEndpoint: `${apiHost}/api/user/signout`,
    subscribeEndpoint: `${apiHost}/api/user/subscribe`,
    unsubscribeEndpoint: `${apiHost}/api/user/unsubscribe`,
    walletBalanceEndpoint: `${apiHost}/api/getwalletbalance`,
    etherScanEndpoint: `https://sepolia.etherscan.io/tx`,
    infuraEndpoint: `https://sepolia.infura.io/v3/8e718b45dd2b4425bc1e785e56bde9c4`
}

export default endPoints