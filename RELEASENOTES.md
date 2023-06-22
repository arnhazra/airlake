# Airlake Release Notes

## [v4.0]
* Switched to Polygon from Sepolia Testnet
* Native currency is now MATIC
* Users can directly subscribe using native currency without the ERC-20 token purchase
* ERC-20 token purchase will happen internally
* Added backup database 

## [v3.9]
* Started integrating direct ethereum pay instead of custom ERC-20
* Appstate replacing Globalstate

## [v3.8]
* UI Performance enhancements
* API Structural changes

## [v3.7]
* Minor changes and bug fixes

## [v3.6]
* UI enhancements

## [v3.5]
* Subscription based full platform access
* No more multiple subscriptions needed for multiple datasets

## [v3.4]
* Replaced local storage with session storage for authorization
* UI enhancements
* Modals for Payment UI using Ethereum Payment
* Subscription Modals

## [v3.3]
* New integrated Transaction system with wallet
* Restructured UI and API app with new components
* Validations moved to new directory
* Auto wallet address generation on signup

## [v3.2]
* Design Changes
* New Card UI - Replaced Photos with Svg

## [v3.1]
* Typescript migration for Express Server app.
* Restructured project to new monorepo architecture.
* Added new build steps in Github Actions Pipeline.

## [v3.0]
* Code Refactoring.
* Refund on sell NFT.
* New UI.
* Added Github Actions CI-CD Pipeline.

## [v2.9]
* Code Refactoring.
* Combined transfer amount inside NFT mint function.
* Dataset Unsubscribe & NFT Transfer.

## [v2.8]
* Added Create NFT functionality when subscribing to a dataset.
* View NFT feature and added a new field in subscription model.

## [v2.7]
* New UI of view dataset page.
* Added dataset ratings.
* Added card in view dataset page.

## [v2.6]
* Fixed issues.
* New sorting algorithm.

## [v2.5]
* Renamed Preview Datasets & Fullview datasets API to Metadata & Data API.
* Restructured home page.
* Minor Performance optimizations on datalibrary page.

## [v2.4]
* Redesign.
* Minor Bug Fixes and Performance Improvements.
* Exposed Data Preview & Fullview API instead of redirection.

## [v2.3]
* Introduced AFT Swap Protocol to replace the buycoin and sellcoin page.
* Integrated React query for realtime data fetching & advanced mechanisms.
* Introduced new useFetch & useFetchRealtime hook to replace other hooks.
* Conducted code refactoring for better performance.

## [v2.2]
* Created a new Account Controller and Router.
* Introduced a new Verifycurrentaccount route to replace the legacy Checkauth route.
* Moved Verifycurrentaccount and Signout methods from Auth controller to Account controller.
* Deprecated wallet router and moved its methods to the account router.
* Merged Walletpage content with new Accountpage and updated transactions to be listed on the account page.
* Conducted code refactoring for better performance.

## [v2.1]
* Restructured the architecture of the platform.
* Migrated to the Sepolia testnet on Ethereum Blockchain.

## [v2.0]
* Added a new UI Dark Full.
* Improved datasets with full data and updated offset values.
* Increased the number of items displayed per page to 24.
* Added auto-scroll to the top when paginated and introduced a new sorting algorithm.

## [v1.9]
* Introduced a new UI Dark Beta.
* Removed the live price API.

## [v1.8]
* Added limit and offset to the new datasetlibrary API for better performance.
* Introduced a new Dataset datasetlibrary API.

## [v1.7]
* Implemented a new Dataset query model to replace Fuzzy search for better performance.
* Created a new lazy loading mechanism for faster initial load.

## [v1.6]
* Improved API architecture for production deployment to serve static assets better.
* Added new query parameters for dataset view.

## [v1.5]
* Introduced new API endpoint URIs and UI routes for the new architecture.

## [v1.4]
* Migrated to Next.js from Create React App.
* Changed some hooks for better performance optimizations.

## [v1.3]
* Integrated Fuzzy search algorithm to improve the user experience.
* Replaced HS256 with RS512 JWT, which uses Public and Private keys for better security.

## [v1.2]
* Debounced search to improve performance.
* Integrated React suspense for high-performance initial load.

## [v1.1]
* Integrated Redis for faster authorization checks, storing auth tokens, and replaced MongoDB as the earlier option.
* Enabled Single and Multi-device signouts.

## [v1.0]
* Airlake offers premium data sets to users.
* Used MongoDB for Users, Transactions Datasets Management.
* Employed Web3 JS - Ethereum blockchain for Web3 transactions.
* Used Express JS as a framework on top of Node JS for API - Microservices.
* Employed React as a UI library.
* Used Google OAuth2 with nodemailer for OTP-based 2-factor authentication.
