(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[745],{8535:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/viewdataset",function(){return a(3806)}])},5930:function(e,t,a){"use strict";a.d(t,{Z:function(){return A}});var n=a(5893),s=a(1555),i=a(4184),r=a.n(i),o=a(7294),l=a(6792),d=a(6611),c=a(9602);let u=o.forwardRef(({bsPrefix:e,className:t,variant:a,as:s="img",...i},o)=>{let d=(0,l.vE)(e,"card-img");return(0,n.jsx)(s,{ref:o,className:r()(a?`${d}-${a}`:d,t),...i})});u.displayName="CardImg";var p=a(9059);let m=o.forwardRef(({bsPrefix:e,className:t,as:a="div",...s},i)=>{let d=(0,l.vE)(e,"card-header"),c=(0,o.useMemo)(()=>({cardHeaderBsPrefix:d}),[d]);return(0,n.jsx)(p.Z.Provider,{value:c,children:(0,n.jsx)(a,{ref:i,...s,className:r()(t,d)})})});m.displayName="CardHeader";let y=(0,c.Z)("h5"),v=(0,c.Z)("h6"),b=(0,d.Z)("card-body"),f=(0,d.Z)("card-title",{Component:y}),x=(0,d.Z)("card-subtitle",{Component:v}),h=(0,d.Z)("card-link",{Component:"a"}),T=(0,d.Z)("card-text",{Component:"p"}),j=(0,d.Z)("card-footer"),Z=(0,d.Z)("card-img-overlay"),w=o.forwardRef(({bsPrefix:e,className:t,bg:a,text:s,border:i,body:o,children:d,as:c="div",...u},p)=>{let m=(0,l.vE)(e,"card");return(0,n.jsx)(c,{ref:p,...u,className:r()(t,m,a&&`bg-${a}`,s&&`text-${s}`,i&&`border-${i}`),children:o?(0,n.jsx)(b,{children:d}):d})});w.displayName="Card",w.defaultProps={body:!1};var N=Object.assign(w,{Img:u,Title:f,Subtitle:x,Body:b,Link:h,Text:T,Header:m,Footer:j,ImgOverlay:Z}),g=a(1664),C=a.n(g);let E=e=>{let{id:t,category:a,name:i,price:r}=e;return(0,n.jsx)(s.Z,{xs:6,sm:6,md:4,lg:3,xl:2,className:"mb-4",children:(0,n.jsx)(C(),{href:"/viewdataset?id=".concat(t),children:(0,n.jsxs)(N,{children:[(0,n.jsx)(N.Header,{className:"pt-3",children:(0,n.jsx)("div",{className:"".concat(a.toLowerCase(),"Container pt-4")})}),(0,n.jsxs)(N.Footer,{className:"pt-4 pb-2 ps-4 ".concat(a.toLowerCase(),"Color"),children:[(0,n.jsx)("div",{className:"nameContainer",children:(0,n.jsx)("p",{className:"lead",children:i})}),(0,n.jsx)("p",{className:"smalltext",children:a})]})]})})})};var A=E},7468:function(e,t,a){"use strict";var n=a(5893),s=a(8893);let i=e=>{let{customMessage:t}=e;return(0,n.jsxs)("div",{className:"box text-center",children:[(0,n.jsx)("p",{className:"branding mb-4",children:t||s.Z.ErrorMessage}),(0,n.jsx)("i",{className:"fa-solid fa-circle-exclamation fa-4x"}),(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),(0,n.jsxs)("button",{onClick:()=>window.history.back(),className:"btn mt-2",children:[(0,n.jsx)("i",{className:"fa-solid fa-circle-arrow-left"}),"Go Back"]})]})};t.Z=i},3700:function(e,t){"use strict";var a,n;(n=a||(a={})).tokenContractAddress="0xF2692150983b28E20075c855Bad60403885412C8",n.vendorContractAddress="0xBeb84d61d6aC0cBd396AAf488996e78928544A74",t.Z=a},5912:function(e,t){"use strict";var a,n;(n=a||(a={})).POST="POST",n.GET="GET",n.PATCH="PATCH",n.PUT="PUT",n.DELETE="DELETE",n.OPTIONS="OPTIONS",t.Z=a},2291:function(e,t,a){"use strict";a.d(t,{r:function(){return n}});let n=[{inputs:[],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"spender",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"spender",type:"address"}],name:"allowance",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"approve",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"decimals",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"subtractedValue",type:"uint256"}],name:"decreaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"addedValue",type:"uint256"}],name:"increaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"totalSupply",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transfer",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transferFrom",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"}]},1627:function(e,t,a){"use strict";var n=a(6154),s=a(8767),i=a(1163),r=a(6501),o=a(8893);t.Z=function(e,t,a,l,d){let c=(0,i.useRouter)(),u=async()=>{let{data:e}=await (0,n.Z)({method:a,url:t,data:l});return e},{error:p,data:m,isLoading:y}=(0,s.useQuery)([e,l,d],()=>u(),{enabled:!0,refetchOnWindowFocus:!1,retry:3,retryDelay:2500,onError(t){t.response&&401===t.response.status&&(localStorage.removeItem("accessToken"),c.push("/")),r.Am.error("".concat(o.Z.ToastError," fetching ").concat(e))}});return{error:p,data:m,isLoading:y}}},3806:function(e,t,a){"use strict";a.r(t);var n=a(5893),s=a(7294),i=a(682),r=a(4051),o=a(7918),l=a.n(o),d=a(9548),c=a(7891),u=a(6154),p=a(2291),m=a(3700),y=a(9063),v=a(6501),b=a(5930),f=a(1163),x=a(8893),h=a(1627),T=a(5912),j=a(7468);let Z=new(l())(l().givenProvider),w=()=>{var e,t,a,o,l,w,N,g,C;let E=(0,f.useRouter)(),{id:A}=E.query,[P,S]=(0,s.useState)(Math.random().toString()),[k,M]=(0,s.useState)(""),O=(0,h.Z)("view dataset",y.Z.datasetViewEndpoint,T.Z.POST,{datasetId:A}),_=(0,h.Z)("similar datasets",y.Z.findsimilarDatasets,T.Z.POST,{datasetId:A}),L=(0,h.Z)("subscription status",y.Z.checkSubscriptionEndpoint,T.Z.POST,{datasetId:A},P),$=async()=>{if(0===O.data.price)try{await u.Z.post("".concat(y.Z.subscribeEndpoint),{datasetId:A}),S(Math.random().toString())}catch(e){v.Am.error(x.Z.ToastError)}else try{if(void 0!==window.ethereum)try{let e=await window.ethereum.request({method:"eth_requestAccounts"});M(e[0]);let t=new Z.eth.Contract(p.r,m.Z.tokenContractAddress);await t.methods.transfer(m.Z.tokenContractAddress,Z.utils.toWei(O.data.price.toString(),"ether")).send({from:k}),await u.Z.post("".concat(y.Z.subscribeEndpoint),{datasetId:A}),S(Math.random().toString())}catch(e){v.Am.error("Unable to connect to metamask")}else v.Am.error("Please install metamask")}catch(e){v.Am.error("Please install metamask")}},I=null==_?void 0:null===(e=_.data)||void 0===e?void 0:null===(t=e.similarDatasets)||void 0===t?void 0:t.map(e=>(0,n.jsx)(b.Z,{id:e._id,category:e.category,name:null==e?void 0:e.name,price:null==e?void 0:e.price},e._id)),R=()=>{navigator.clipboard.writeText("".concat(y.Z.metadataapi,"/").concat(A)),v.Am.success("Copied to Clipboard")},D=()=>{var e;navigator.clipboard.writeText("".concat(y.Z.dataapi,"/").concat(A,"/").concat(null==L?void 0:null===(e=L.data)||void 0===e?void 0:e.subscriptionId)),v.Am.success("Copied to Clipboard")};return(0,n.jsxs)(s.Fragment,{children:[(0,n.jsxs)(c.Z,{condition:!(null==L?void 0:L.isLoading)&&!(null==O?void 0:O.isLoading)&&!(null==_?void 0:_.isLoading),children:[(0,n.jsx)(c.Z,{condition:!O.error,children:(0,n.jsxs)(i.Z,{className:"mt-4",children:[(0,n.jsxs)("div",{className:"jumbotron",children:[(0,n.jsx)("p",{className:"display-6 text-capitalize",children:null==O?void 0:null===(a=O.data)||void 0===a?void 0:a.name}),(0,n.jsx)("p",{className:"lead",children:null==O?void 0:null===(o=O.data)||void 0===o?void 0:o.description}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("button",{className:"btn",children:[null==O?void 0:null===(l=O.data)||void 0===l?void 0:l.category," ",(0,n.jsx)("i",{className:"fa-solid fa-layer-group"})]}),(0,n.jsxs)("button",{className:"btn",children:[(null==O?void 0:null===(w=O.data)||void 0===w?void 0:w.price)===0?"FREE":"".concat(null==O?void 0:null===(N=O.data)||void 0===N?void 0:N.price," ELT")," ",(0,n.jsx)("i",{className:"fa-brands fa-connectdevelop"})]})]}),(0,n.jsxs)(c.Z,{condition:!(null==L?void 0:null===(g=L.data)||void 0===g?void 0:g.isSubscribed),children:[(0,n.jsxs)("button",{className:"btn",onClick:$,children:["Subscribe",(0,n.jsx)("i",{className:"fa-solid fa-circle-plus"})]}),(0,n.jsxs)("button",{className:"btn",onClick:R,children:["Metadata API ",(0,n.jsx)("i",{className:"fa-solid fa-copy"})]})]}),(0,n.jsx)(c.Z,{condition:null==L?void 0:null===(C=L.data)||void 0===C?void 0:C.isSubscribed,children:(0,n.jsxs)("button",{className:"btn",onClick:D,children:["Data API ",(0,n.jsx)("i",{className:"fa-solid fa-copy"})]})})]}),(0,n.jsxs)(r.Z,{children:[(0,n.jsx)("p",{className:"lead text-center text-white mb-4",children:"Similar Datasets"}),I]})]})}),(0,n.jsx)(c.Z,{condition:O.error,children:(0,n.jsx)(j.Z,{})})]}),(0,n.jsx)(c.Z,{condition:(null==L?void 0:L.isLoading)||(null==O?void 0:O.isLoading)||(null==_?void 0:_.isLoading),children:(0,n.jsx)(d.Z,{})})]})};t.default=w},4051:function(e,t,a){"use strict";var n=a(4184),s=a.n(n),i=a(7294),r=a(6792),o=a(5893);let l=i.forwardRef(({bsPrefix:e,className:t,as:a="div",...n},i)=>{let l=(0,r.vE)(e,"row"),d=(0,r.pi)(),c=(0,r.zG)(),u=`${l}-cols`,p=[];return d.forEach(e=>{let t;let a=n[e];delete n[e],null!=a&&"object"==typeof a?{cols:t}=a:t=a;let s=e!==c?`-${e}`:"";null!=t&&p.push(`${u}${s}-${t}`)}),(0,o.jsx)(a,{ref:i,...n,className:s()(t,l,...p)})});l.displayName="Row",t.Z=l}},function(e){e.O(0,[543,774,888,179],function(){return e(e.s=8535)}),_N_E=e.O()}]);