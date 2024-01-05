import{S as E,a as g,i as h}from"./assets/vendor-56025df1.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&d(a)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();const $=document.querySelector("form"),f=document.querySelector(".gallery"),s=document.querySelector(".js-btn-load");let u="",i=1,l=40,n="";$.addEventListener("submit",k);s.addEventListener("click",S);const C=new E(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});function S(){i+=1,s.classList.toggle("hidden"),s.insertAdjacentHTML("afterend",'<span class="loader"></span>'),n=document.querySelector(".loader"),p(u).then(t=>{if(t.hits.length)t.totalHits-(i-1)*l<=l?(l=t.totalHits-i*l,b()):s.classList.remove("hidden");else{y();return}return m(t.hits)}).catch(t=>console.log(t))}function k(t){t.preventDefault(),f.innerHTML="",i=1,l=40,u=t.target.elements.name.value,s.insertAdjacentHTML("afterend",'<span class="loader"></span>'),n=document.querySelector(".loader"),p(u).then(o=>{if(o.hits.length)o.totalHits-(i-1)*l<=l?(l=o.totalHits-i*l,b()):s.classList.remove("hidden");else{y();return}return m(o.hits)}).catch(o=>console.log(o))}async function p(t){const o="41437501-0a58a7d6f9b55a91ef815cfe0";return g.defaults.baseURL="https://pixabay.com/api",(await g.get(`/?key=${o}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${l}&page=${i}`)).data}function m(t){const o=t.reduce((c,{largeImageURL:d,previewURL:e,tags:r,likes:a,views:v,comments:L,downloads:x})=>c+`
      <li class="gallery-item">
        <a class="gallery-link" href="${d}">
            <img
            class="gallery-image"
            src="${e}"
            alt="${r}"
            width="360"
            height="200"
            ;
            />
            <div class="gallery-info">
              <div class="gallery-box">
                <h3 class="gallery-title">likes</h3>
                <p class="gallery-text">${a}</p>
                <!--hit.likes -->
              </div>
              <div class="gallery-box">
                <h3 class="gallery-title">views</h3>
                <p class="gallery-text">${v}</p>
              </div>
              <div class="gallery-box">
                <h3 class="gallery-title">comments</h3>
                <p class="gallery-text">${L}</p>
              </div>
              <div class="gallery-box">
                <h3 class="gallery-title">downloads</h3>
                <p class="gallery-text">${x}</p>
              </div>
            </div>
         </a>
       </li>`,"");f.insertAdjacentHTML("beforeend",o),C.refresh(),n.remove(),window.scrollBy({top:f.getBoundingClientRect().height,left:0,behavior:"smooth"})}function y(){s.classList.add("hidden"),n.remove(),h.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",messageColor:"#ffffff",titleColor:"#ffffff",iconColor:"#ffffff",backgroundColor:"#B51B1B"})}function b(){s.classList.add("hidden"),n.remove(),h.warning({title:"Caution",message:"We're sorry, but you've reached the end of search results.",position:"topRight",messageColor:"#000000",titleColor:"#000000",iconColor:"#000000",backgroundColor:"#06bb3c"})}
//# sourceMappingURL=commonHelpers.js.map
