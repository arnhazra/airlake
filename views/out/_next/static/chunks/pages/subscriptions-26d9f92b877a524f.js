(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[27],{9882:function(e,r,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/subscriptions",function(){return s(8033)}])},5930:function(e,r,s){"use strict";s.d(r,{Z:function(){return P}});var a=s(5893),t=s(1555),n=s(4184),i=s.n(n),l=s(7294),o=s(6792),c=s(6611),d=s(9602);let u=l.forwardRef(({bsPrefix:e,className:r,variant:s,as:t="img",...n},l)=>{let c=(0,o.vE)(e,"card-img");return(0,a.jsx)(t,{ref:l,className:i()(s?`${c}-${s}`:c,r),...n})});u.displayName="CardImg";var m=s(9059);let x=l.forwardRef(({bsPrefix:e,className:r,as:s="div",...t},n)=>{let c=(0,o.vE)(e,"card-header"),d=(0,l.useMemo)(()=>({cardHeaderBsPrefix:c}),[c]);return(0,a.jsx)(m.Z.Provider,{value:d,children:(0,a.jsx)(s,{ref:n,...t,className:i()(r,c)})})});x.displayName="CardHeader";let f=(0,d.Z)("h5"),v=(0,d.Z)("h6"),h=(0,c.Z)("card-body"),p=(0,c.Z)("card-title",{Component:f}),j=(0,c.Z)("card-subtitle",{Component:v}),b=(0,c.Z)("card-link",{Component:"a"}),Z=(0,c.Z)("card-text",{Component:"p"}),N=(0,c.Z)("card-footer"),E=(0,c.Z)("card-img-overlay"),g=l.forwardRef(({bsPrefix:e,className:r,bg:s,text:t,border:n,body:l,children:c,as:d="div",...u},m)=>{let x=(0,o.vE)(e,"card");return(0,a.jsx)(d,{ref:m,...u,className:i()(r,x,s&&`bg-${s}`,t&&`text-${t}`,n&&`border-${n}`),children:l?(0,a.jsx)(h,{children:c}):c})});g.displayName="Card",g.defaultProps={body:!1};var w=Object.assign(g,{Img:u,Title:p,Subtitle:j,Body:h,Link:b,Text:Z,Header:x,Footer:N,ImgOverlay:E}),T=s(1664),y=s.n(T);let C=e=>{let{id:r,category:s,name:n,price:i}=e;return(0,a.jsx)(t.Z,{xs:6,sm:6,md:4,lg:3,xl:2,className:"mb-4",children:(0,a.jsx)(y(),{href:"/viewdataset?id=".concat(r),children:(0,a.jsxs)(w,{children:[(0,a.jsx)(w.Header,{className:"pt-3",children:(0,a.jsx)("div",{className:"".concat(s.toLowerCase(),"Container pt-4")})}),(0,a.jsxs)(w.Footer,{className:"pt-4 pb-2 ps-4 ".concat(s.toLowerCase(),"Color"),children:[(0,a.jsx)("div",{className:"nameContainer",children:(0,a.jsx)("p",{className:"lead",children:n})}),(0,a.jsx)("p",{className:"smalltext",children:s})]})]})})})};var P=C},7468:function(e,r,s){"use strict";var a=s(5893),t=s(8893);let n=e=>{let{customMessage:r}=e;return(0,a.jsxs)("div",{className:"box text-center",children:[(0,a.jsx)("p",{className:"branding mb-4",children:r||t.Z.ErrorMessage}),(0,a.jsx)("i",{className:"fa-solid fa-circle-exclamation fa-4x"}),(0,a.jsx)("br",{}),(0,a.jsx)("br",{}),(0,a.jsxs)("button",{onClick:()=>window.history.back(),className:"btn mt-2",children:[(0,a.jsx)("i",{className:"fa-solid fa-circle-arrow-left"}),"Go Back"]})]})};r.Z=n},5912:function(e,r){"use strict";var s,a;(a=s||(s={})).POST="POST",a.GET="GET",a.PATCH="PATCH",a.PUT="PUT",a.DELETE="DELETE",a.OPTIONS="OPTIONS",r.Z=s},9039:function(e,r,s){"use strict";var a=s(6154),t=s(8767),n=s(1163),i=s(6501),l=s(8893);r.Z=function(e,r,s,o,c){let d=(0,n.useRouter)(),u=async()=>{let{data:e}=await (0,a.Z)({method:s,url:r,data:o});return e},{error:m,data:x,isLoading:f}=(0,t.useQuery)([e,o,c],()=>u(),{enabled:!0,refetchOnWindowFocus:!0,refetchInterval:6e4,retry:3,retryDelay:2500,onError(r){r.response&&401===r.response.status&&(localStorage.removeItem("accessToken"),d.push("/")),i.Am.error("".concat(l.Z.ToastError," fetching ").concat(e))}});return{error:m,data:x,isLoading:f}}},8033:function(e,r,s){"use strict";s.r(r);var a=s(5893),t=s(682),n=s(4051),i=s(7294),l=s(9548),o=s(7468),c=s(7891),d=s(5930),u=s(9039),m=s(9063),x=s(5912);let f=()=>{var e,r,s,f,v,h;let p=(0,u.Z)("subscriptions",m.Z.datasetSubscriptionEndpoint,x.Z.POST),j=null==p?void 0:null===(e=p.data)||void 0===e?void 0:null===(r=e.subscribedDatasets)||void 0===r?void 0:r.map(e=>(0,a.jsx)(d.Z,{id:e._id,category:e.category,name:e.name,price:e.price},e._id));return(0,a.jsxs)(i.Fragment,{children:[(0,a.jsx)(c.Z,{condition:!p.isLoading,children:(0,a.jsxs)(t.Z,{children:[(0,a.jsx)(c.Z,{condition:(null==p?void 0:null===(s=p.data)||void 0===s?void 0:null===(f=s.subscribedDatasets)||void 0===f?void 0:f.length)>0,children:(0,a.jsx)(n.Z,{className:"mt-4 mb-4",children:j})}),(0,a.jsx)(c.Z,{condition:(null==p?void 0:null===(v=p.data)||void 0===v?void 0:null===(h=v.subscribedDatasets)||void 0===h?void 0:h.length)===0,children:(0,a.jsx)(o.Z,{customMessage:"No Subscriptions"})})]})}),(0,a.jsx)(c.Z,{condition:p.isLoading,children:(0,a.jsx)(l.Z,{})})]})};r.default=f},4051:function(e,r,s){"use strict";var a=s(4184),t=s.n(a),n=s(7294),i=s(6792),l=s(5893);let o=n.forwardRef(({bsPrefix:e,className:r,as:s="div",...a},n)=>{let o=(0,i.vE)(e,"row"),c=(0,i.pi)(),d=(0,i.zG)(),u=`${o}-cols`,m=[];return c.forEach(e=>{let r;let s=a[e];delete a[e],null!=s&&"object"==typeof s?{cols:r}=s:r=s;let t=e!==d?`-${e}`:"";null!=r&&m.push(`${u}${t}-${r}`)}),(0,l.jsx)(s,{ref:n,...a,className:t()(r,o,...m)})});o.displayName="Row",r.Z=o}},function(e){e.O(0,[774,888,179],function(){return e(e.s=9882)}),_N_E=e.O()}]);