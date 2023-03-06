"use strict";(self.webpackChunkview=self.webpackChunkview||[]).push([[280],{3369:function(e,a,s){s.d(a,{Z:function(){return F}});var r=s(1616),t=s(1413),n=s(5987),c=s(6123),i=s.n(c),o=s(7313),d=s(8524),l=s(8864),u=s(6205),m=s(6417),f=["bsPrefix","className","variant","as"],x=o.forwardRef((function(e,a){var s=e.bsPrefix,r=e.className,c=e.variant,o=e.as,l=void 0===o?"img":o,u=(0,n.Z)(e,f),x=(0,d.vE)(s,"card-img");return(0,m.jsx)(l,(0,t.Z)({ref:a,className:i()(c?"".concat(x,"-").concat(c):x,r)},u))}));x.displayName="CardImg";var b=x,v=s(5614),Z=["bsPrefix","className","as"],p=o.forwardRef((function(e,a){var s=e.bsPrefix,r=e.className,c=e.as,l=void 0===c?"div":c,u=(0,n.Z)(e,Z),f=(0,d.vE)(s,"card-header"),x=(0,o.useMemo)((function(){return{cardHeaderBsPrefix:f}}),[f]);return(0,m.jsx)(v.Z.Provider,{value:x,children:(0,m.jsx)(l,(0,t.Z)((0,t.Z)({ref:a},u),{},{className:i()(r,f)}))})}));p.displayName="CardHeader";var h=p,j=["bsPrefix","className","bg","text","border","body","children","as"],N=(0,u.Z)("h5"),g=(0,u.Z)("h6"),y=(0,l.Z)("card-body"),w=(0,l.Z)("card-title",{Component:N}),C=(0,l.Z)("card-subtitle",{Component:g}),P=(0,l.Z)("card-link",{Component:"a"}),k=(0,l.Z)("card-text",{Component:"p"}),E=(0,l.Z)("card-footer"),L=(0,l.Z)("card-img-overlay"),D=o.forwardRef((function(e,a){var s=e.bsPrefix,r=e.className,c=e.bg,o=e.text,l=e.border,u=e.body,f=e.children,x=e.as,b=void 0===x?"div":x,v=(0,n.Z)(e,j),Z=(0,d.vE)(s,"card");return(0,m.jsx)(b,(0,t.Z)((0,t.Z)({ref:a},v),{},{className:i()(r,Z,c&&"bg-".concat(c),o&&"text-".concat(o),l&&"border-".concat(l)),children:u?(0,m.jsx)(y,{children:f}):f}))}));D.displayName="Card",D.defaultProps={body:!1};var R=Object.assign(D,{Img:b,Title:w,Subtitle:C,Body:y,Link:P,Text:k,Header:h,Footer:E,ImgOverlay:L}),S=s(2135),F=function(e){var a=e.id,s=e.category,t=e.name,n=e.price;return(0,m.jsx)(r.Z,{xs:12,sm:12,md:6,lg:4,xl:3,className:"mb-4",children:(0,m.jsx)(S.rU,{to:"/dataset/viewone/".concat(a),children:(0,m.jsxs)(R,{children:[(0,m.jsx)(R.Header,{className:"pt-3",children:(0,m.jsx)("div",{className:"".concat(s.toLowerCase(),"Container pt-4")})}),(0,m.jsxs)(R.Footer,{className:"pt-4 pb-2 ps-4",children:[(0,m.jsx)("p",{className:"lead",children:t}),(0,m.jsx)("p",{className:"smalltext",children:s}),(0,m.jsx)("button",{className:"chip",children:0===n?"FREE":n+" FLG"}),(0,m.jsx)("br",{})]})]})})})}},8230:function(e,a,s){s.r(a),s.d(a,{default:function(){return j}});var r=s(2102),t=s(3849),n=s(7313),c=s(2375),i=s(8768),o=s(5099),d=s(4165),l=s(1413),u=s(5861),m=s(9439),f=s(6573),x=s(8467),b=s(4537),v=s(6056),Z=function(){var e=(0,n.useState)({subscribedDatasets:[],isLoaded:!1}),a=(0,m.Z)(e,2),s=a[0],r=a[1],t=(0,x.s0)(),c=function(){var e=(0,u.Z)((0,d.Z)().mark((function e(){var a;return(0,d.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.Z.post(b.Z.datasetSubscriptionEndpoint);case 3:a=e.sent,r((0,l.Z)((0,l.Z)({},s),{},{subscribedDatasets:a.data.subscribedDatasets,isLoaded:!0})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),401===e.t0.response.status?(localStorage.removeItem("accessToken"),t("/")):(r((0,l.Z)((0,l.Z)({},s),{},{isLoaded:!0})),v.Am.error("Something went wrong"));case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return(0,n.useEffect)((function(){c()}),[]),s},p=s(3369),h=s(6417),j=function(){var e=Z(),a=e.subscribedDatasets.map((function(e){return(0,h.jsx)(p.Z,{id:e._id,category:e.category,name:e.name,price:e.price},e._id)}));return(0,h.jsxs)(n.Fragment,{children:[(0,h.jsx)(o.Z,{condition:e.isLoaded,children:(0,h.jsxs)(r.Z,{children:[(0,h.jsx)(o.Z,{condition:e.subscribedDatasets.length>0,children:(0,h.jsx)(t.Z,{className:"mt-4 mb-4",children:a})}),(0,h.jsx)(o.Z,{condition:0===e.subscribedDatasets.length,children:(0,h.jsx)(i.Z,{customMessage:"No Subscriptions"})})]})}),(0,h.jsx)(o.Z,{condition:!e.isLoaded,children:(0,h.jsx)(c.Z,{})})]})}},3849:function(e,a,s){var r=s(1413),t=s(5987),n=s(6123),c=s.n(n),i=s(7313),o=s(8524),d=s(6417),l=["bsPrefix","className","as"],u=i.forwardRef((function(e,a){var s=e.bsPrefix,n=e.className,i=e.as,u=void 0===i?"div":i,m=(0,t.Z)(e,l),f=(0,o.vE)(s,"row"),x=(0,o.pi)(),b=(0,o.zG)(),v="".concat(f,"-cols"),Z=[];return x.forEach((function(e){var a,s=m[e];delete m[e],a=null!=s&&"object"===typeof s?s.cols:s;var r=e!==b?"-".concat(e):"";null!=a&&Z.push("".concat(v).concat(r,"-").concat(a))})),(0,d.jsx)(u,(0,r.Z)((0,r.Z)({ref:a},m),{},{className:c().apply(void 0,[n,f].concat(Z))}))}));u.displayName="Row",a.Z=u}}]);