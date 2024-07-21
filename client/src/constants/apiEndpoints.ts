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
  polygonScanEndpoint: `https://mumbai.polygonscan.com/tx`,
  infuraEndpoint: `https://arcStack.vercel.app/api/products/blockchain/gateway/669c819d4c724b8c028ca677?client_id=4541c236-8e22-4d9c-8402-460925d7b7a9&client_secret=7413efd1-e7ef-4709-93cf-1d154ecdffef`
}

export default endPoints