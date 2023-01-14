enum endPoints {
    walletTransactionEndpoint = '/api/wallet/transactions',
    walletLivePriceEndpoint = '/api/wallet/getliveprice',
    generateAuthCodeEndpoint = '/api/auth/generateauthcode',
    verifyAuthCodeEndpoint = '/api/auth/verifyauthcode',
    signOutEndpoint = '/api/auth/signout',
    useAuthEndpoint = '/api/auth/useauth',
    createTxEndpoint = '/api/wallet/createtx',
    etherScanEndpoint = 'https://goerli.etherscan.io/tx'
}

export default endPoints