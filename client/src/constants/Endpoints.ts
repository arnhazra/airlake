const apiHost = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://airlake.vercel.app'

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
    userDetailsEndpoint: `${apiHost}/api/user/user`,
    signOutEndpoint: `${apiHost}/api/user/signout`,
    subscribeEndpoint: `${apiHost}/api/user/subscribe`,
    unsubscribeEndpoint: `${apiHost}/api/user/unsubscribe`,
    walletBalanceEndpoint: `${apiHost}/api/getwalletbalance`,
    etherScanEndpoint: `https://sepolia.etherscan.io/tx`,
    infuraEndpoint: `https://polygon-mumbai.infura.io/v3/fcb2c26ca13f46a591ed0822c3565c50`
}

export default endPoints