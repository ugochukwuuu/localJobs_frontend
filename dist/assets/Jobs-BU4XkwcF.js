import{_ as u,r as l,q as v,c,d as n,e as p,b as a,x as m,F as h,y as f,s as _,o as s,l as g,z as y}from"./index-BzC9oz7R.js";const j={class:"card-container"},k={__name:"Jobs",setup(x){const o=l(!1),t=l([]),i=async()=>{console.log("searching")},d=async()=>{o.value=!0;let{data:r,error:e}=await _.from("jobs").select("*");e?toast.error("Error getting jobs",e):(console.log(r),t.value=r,o.value=!1)};return v(()=>{console.log("jobs"),d()}),(r,e)=>(s(),c("main",null,[o.value?(s(),n(g,{key:0})):p("",!0),a("div",{class:"search-cont d-flex flex-column"},[e[1]||(e[1]=a("h1",null,"Find your jobs easily",-1)),a("div",{class:"search-bar-cont d-flex align-items-center"},[e[0]||(e[0]=m('<div class="title-bar search-div" data-v-9908b82e><i class="pi pi-search" data-v-9908b82e></i><input type="search" name="" id="" class="search-bar" placeholder="Job title or keyword" data-v-9908b82e></div><div class="location-bar search-div" data-v-9908b82e><i class="pi pi-map-marker" data-v-9908b82e></i><input type="search" name="" id="" class="search-bar" placeholder="Location" data-v-9908b82e></div>',2)),a("button",{onClick:i,class:"search-btn cursor"},"Search")])]),a("div",j,[(s(!0),c(h,null,f(t.value,b=>(s(),n(y,{job:b,userRole:"freelancer"},null,8,["job"]))),256))])]))}},J=u(k,[["__scopeId","data-v-9908b82e"]]);export{J as default};
