(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[114],{5482:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/datasetlibrary",function(){return a(9709)}])},5930:function(e,t,a){"use strict";a.d(t,{Z:function(){return R}});var s=a(5893),r=a(1555),l=a(4184),d=a.n(l),n=a(7294),i=a(6792),o=a(6611),c=a(9602);let u=n.forwardRef(({bsPrefix:e,className:t,variant:a,as:r="img",...l},n)=>{let o=(0,i.vE)(e,"card-img");return(0,s.jsx)(r,{ref:n,className:d()(a?`${o}-${a}`:o,t),...l})});u.displayName="CardImg";var m=a(9059);let x=n.forwardRef(({bsPrefix:e,className:t,as:a="div",...r},l)=>{let o=(0,i.vE)(e,"card-header"),c=(0,n.useMemo)(()=>({cardHeaderBsPrefix:o}),[o]);return(0,s.jsx)(m.Z.Provider,{value:c,children:(0,s.jsx)(a,{ref:l,...r,className:d()(t,o)})})});x.displayName="CardHeader";let p=(0,c.Z)("h5"),h=(0,c.Z)("h6"),f=(0,o.Z)("card-body"),j=(0,o.Z)("card-title",{Component:p}),Z=(0,o.Z)("card-subtitle",{Component:h}),g=(0,o.Z)("card-link",{Component:"a"}),N=(0,o.Z)("card-text",{Component:"p"}),b=(0,o.Z)("card-footer"),v=(0,o.Z)("card-img-overlay"),C=n.forwardRef(({bsPrefix:e,className:t,bg:a,text:r,border:l,body:n,children:o,as:c="div",...u},m)=>{let x=(0,i.vE)(e,"card");return(0,s.jsx)(c,{ref:m,...u,className:d()(t,x,a&&`bg-${a}`,r&&`text-${r}`,l&&`border-${l}`),children:n?(0,s.jsx)(f,{children:o}):o})});C.displayName="Card",C.defaultProps={body:!1};var y=Object.assign(C,{Img:u,Title:j,Subtitle:Z,Body:f,Link:g,Text:N,Header:x,Footer:b,ImgOverlay:v}),S=a(1664),w=a.n(S);let E=e=>{let{id:t,category:a,name:l,price:d}=e;return(0,s.jsx)(r.Z,{xs:12,sm:12,md:6,lg:4,xl:3,className:"mb-4",children:(0,s.jsx)(w(),{href:"/viewdataset?id=".concat(t),children:(0,s.jsxs)(y,{children:[(0,s.jsx)(y.Header,{className:"pt-3",children:(0,s.jsx)("div",{className:"".concat(a.toLowerCase(),"Container pt-4")})}),(0,s.jsxs)(y.Footer,{className:"pt-4 pb-2 ps-4",children:[(0,s.jsx)("p",{className:"lead",children:l}),(0,s.jsx)("p",{className:"smalltext",children:a}),(0,s.jsx)("button",{className:"chip",children:0===d?"FREE":d+" LST"}),(0,s.jsx)("br",{})]})]})})})};var R=E},9709:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return C}});var s=a(5893),r=a(7294),l=a(682),d=a(4051),n=a(9548),i=a(7891),o=a(6154),c=a(6501),u=a(1163),m=a(9063),x=a(8893);let p=e=>{let{searchQuery:t,selectedFilter:a,selectedSortOption:s,datasetRequestNumber:l}=e,[d,n]=(0,r.useState)({datasets:[],isLoaded:!1}),i=(0,u.useRouter)();return(0,r.useEffect)(()=>{(async()=>{try{let e=await o.Z.post(m.Z.datasetLibraryEndpoint,{selectedSortOption:s,selectedFilter:a,searchQuery:t,datasetRequestNumber:l});n({datasets:e.data.datasets,isLoaded:!0})}catch(e){e.response&&401===e.response.status&&(localStorage.removeItem("accessToken"),i.push("/")),n({...d,isLoaded:!0}),c.ZP.error(x.Z.ToastError)}})()},[s,a,t,l]),d};var h=a(5309),f=a(1555),j=a(4119),Z=a(1358);let g=()=>{let[e,t]=(0,r.useState)({sortOptions:[],filterCategories:[],isLoaded:!1}),a=(0,u.useRouter)();return(0,r.useEffect)(()=>{(async()=>{try{let a=await o.Z.post(m.Z.datasetSortAndFilterOptionsEndpoint);t({...e,sortOptions:a.data.sortOptions,filterCategories:a.data.filterCategories,isLoaded:!0})}catch(s){s.response&&401===s.response.status&&(localStorage.removeItem("accessToken"),a.push("/")),t({...e,isLoaded:!0}),c.ZP.error(x.Z.ToastError)}})()},[]),e},N=()=>{let e=g(),[{datasetRequestState:t},a]=(0,r.useContext)(h.k),l=e.filterCategories.map(e=>(0,s.jsx)("option",{className:"options",value:e,children:e},e)),o=e.sortOptions.map(e=>(0,s.jsx)("option",{className:"options",value:e,children:e},e));return(0,s.jsxs)(r.Fragment,{children:[(0,s.jsx)(i.Z,{condition:e.isLoaded,children:(0,s.jsxs)(d.Z,{className:"g-2 mt-4",children:[(0,s.jsx)(f.Z,{xs:12,sm:12,md:6,lg:4,xl:3,children:(0,s.jsx)(j.Z,{controlId:"floatingSelectGrid",label:"Select Category",children:(0,s.jsx)(Z.Z.Select,{defaultValue:t.selectedFilter,"aria-label":"Floating label select example",onChange:e=>a("setDatasetRequestState",{selectedFilter:e.target.value}),children:l})})}),(0,s.jsx)(f.Z,{xs:12,sm:12,md:6,lg:4,xl:3,children:(0,s.jsx)(j.Z,{controlId:"floatingSelectGrid",label:"Sort By",children:(0,s.jsx)(Z.Z.Select,{defaultValue:t.selectedSortOption,"aria-label":"Floating label select example",onChange:e=>a("setDatasetRequestState",{selectedSortOption:e.target.value}),children:o})})})]})}),(0,s.jsx)(i.Z,{condition:!e.isLoaded,children:(0,s.jsx)(n.Z,{})})]})};var b=a(5930);let v=()=>{let[{datasetRequestState:e},t]=(0,r.useContext)(h.k),a=p(e),o=a.datasets.map(e=>(0,s.jsx)(b.Z,{id:e._id,category:e.category,name:e.name,price:e.price},e._id)),c=()=>{let a=e.datasetRequestNumber-1;t("setDatasetRequestState",{datasetRequestNumber:a})},u=()=>{let a=e.datasetRequestNumber+1;t("setDatasetRequestState",{datasetRequestNumber:a})};return(0,s.jsxs)(r.Fragment,{children:[(0,s.jsx)(i.Z,{condition:a.isLoaded,children:(0,s.jsxs)(l.Z,{children:[(0,s.jsx)(N,{}),(0,s.jsx)(d.Z,{className:"mt-4 mb-4",children:o}),(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsxs)("button",{className:"btn",onClick:c,disabled:0===e.datasetRequestNumber,children:[(0,s.jsx)("i",{className:"fa-solid fa-circle-arrow-left"}),"Prev Page"]}),(0,s.jsxs)("button",{className:"btn",onClick:u,disabled:12!==a.datasets.length,children:["Next Page ",(0,s.jsx)("i",{className:"fa-solid fa-circle-arrow-right"})]})]})]})}),(0,s.jsx)(i.Z,{condition:!a.isLoaded,children:(0,s.jsx)(n.Z,{})})]})};var C=v},4051:function(e,t,a){"use strict";var s=a(4184),r=a.n(s),l=a(7294),d=a(6792),n=a(5893);let i=l.forwardRef(({bsPrefix:e,className:t,as:a="div",...s},l)=>{let i=(0,d.vE)(e,"row"),o=(0,d.pi)(),c=(0,d.zG)(),u=`${i}-cols`,m=[];return o.forEach(e=>{let t;let a=s[e];delete s[e],null!=a&&"object"==typeof a?{cols:t}=a:t=a;let r=e!==c?`-${e}`:"";null!=t&&m.push(`${u}${r}-${t}`)}),(0,n.jsx)(a,{ref:l,...s,className:r()(t,i,...m)})});i.displayName="Row",t.Z=i}},function(e){e.O(0,[774,888,179],function(){return e(e.s=5482)}),_N_E=e.O()}]);