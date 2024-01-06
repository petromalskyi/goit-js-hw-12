import{S as w,a as g,i as h}from"./assets/vendor-56025df1.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&d(a)}).observe(document,{childList:!0,subtree:!0});function c(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(e){if(e.ep)return;e.ep=!0;const o=c(e);fetch(e.href,o)}})();const E=document.querySelector("form"),f=document.querySelector(".gallery"),s=document.querySelector(".js-btn-load"),i=40;let u="",n=1,l="";E.addEventListener("submit",S);s.addEventListener("click",C);const $=new w(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});async function C(){n+=1,s.classList.toggle("hidden"),s.insertAdjacentHTML("afterend",'<span class="loader"></span>'),l=document.querySelector(".loader");try{const t=await y(u);if(t.hits.length)t.totalHits-(n-1)*i<=i?b():s.classList.remove("hidden");else{m();return}return p(t.hits)}catch(t){console.log(t)}}async function S(t){t.preventDefault(),f.innerHTML="",n=1,u=t.currentTarget.elements.name.value,s.insertAdjacentHTML("afterend",'<span class="loader"></span>'),l=document.querySelector(".loader");try{const r=await y(u);if(r.hits.length)r.totalHits-(n-1)*i<=i?b():s.classList.remove("hidden");else{m();return}return p(r.hits)}catch(r){console.log(r)}}async function y(t){const r="41437501-0a58a7d6f9b55a91ef815cfe0";return g.defaults.baseURL="https://pixabay.com/api",(await g.get(`/?key=${r}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${i}&page=${n}`)).data}function p(t){const r=t.reduce((c,{largeImageURL:d,webformatURL:e,tags:o,likes:a,views:v,comments:L,downloads:x})=>c+`
      <li class="gallery-item">
        <a class="gallery-link" href="${d}">
            <img
            class="gallery-image"
            src="${e}"
            alt="${o}"
            width="360"
            height="200"
            />
            <div class="gallery-info">
              <div class="gallery-box">
                <h3 class="gallery-title">likes</h3>
                <p class="gallery-text">${a}</p>
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
       </li>`,"");f.insertAdjacentHTML("beforeend",r),$.refresh(),l&&l.remove(),window.scrollBy({top:f.getBoundingClientRect().height,left:0,behavior:"smooth"})}function m(){s.classList.add("hidden"),l&&l.remove(),h.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",messageColor:"#ffffff",titleColor:"#ffffff",iconColor:"#ffffff",backgroundColor:"#B51B1B"})}function b(){s.classList.add("hidden"),l&&l.remove(),h.warning({title:"Caution",message:"We're sorry, but you've reached the end of search results.",position:"topRight",messageColor:"#000000",titleColor:"#000000",iconColor:"#000000",backgroundColor:"#06bb3c"})}
//# sourceMappingURL=commonHelpers.js.map
