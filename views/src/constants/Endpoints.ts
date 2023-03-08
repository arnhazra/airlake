enum endpointHostName {
    development = 'http://localhost:7000',
    production = 'https://lenstack.vercel.app'
}
const currentEndpointHostName = process.env.NODE_ENV === 'production' ? endpointHostName.production : endpointHostName.development

const endPoints = {
    generateAuthCodeEndpoint: `${currentEndpointHostName}/api/auth/generateauthcode`,
    verifyAuthCodeEndpoint: `${currentEndpointHostName}/api/auth/verifyauthcode`,
    signOutEndpoint: `${currentEndpointHostName}/api/auth/signout`,
    checkAuthEndpoint: `${currentEndpointHostName}/api/auth/checkauth`,
    createTxEndpoint: `${currentEndpointHostName}/api/wallet/createtx`,
    walletTransactionEndpoint: `${currentEndpointHostName}/api/wallet/transactions`,
    walletLivePriceEndpoint: `${currentEndpointHostName}/api/wallet/getliveprice`,
    datasetSortAndFilterOptionsEndpoint: `${currentEndpointHostName}/api/dataset/getsortandfilteroptions`,
    datasetLibraryEndpoint: `${currentEndpointHostName}/api/dataset/library`,
    datasetSubscriptionEndpoint: `${currentEndpointHostName}/api/dataset/mysubscriptions`,
    datasetViewEndpoint: `${currentEndpointHostName}/api/dataset/viewone`,
    findsimilarDatasets: `${currentEndpointHostName}/api/dataset/findsimilar`,
    subscribeEndpoint: `${currentEndpointHostName}/api/subscription/subscribe`,
    checkSubscriptionEndpoint: `${currentEndpointHostName}/api/subscription/issubscribed`,
    etherScanEndpoint: `https://goerli.etherscan.io/tx`,
}

export default endPoints