import{S as y,a as c,i as u}from"./assets/vendor-56025df1.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const t={formEl:document.querySelector("form"),listEl:document.querySelector(".gallery"),loadMoreEl:document.querySelector(".js-btn-load"),loaderEl:document.querySelector(".loader")},r={perPage:40,userEntered:"",currentPage:1,messageError:"",messageWarning:""};t.formEl.addEventListener("submit",b);t.loadMoreEl.addEventListener("click",E);const p=new y(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});async function E(){r.currentPage+=1,t.loadMoreEl.classList.toggle("hidden"),t.loaderEl.classList.remove("hidden"),g()}async function b(a){a.preventDefault(),r.currentPage=1,t.loaderEl.classList.remove("hidden"),t.listEl.innerHTML="",r.userEntered=a.currentTarget.elements.name.value,g(),a.currentTarget.elements.name.value=""}async function g(){try{const a=await v(r.userEntered);if(!a.hits.length){r.messageError="Sorry, there are no images matching your search query. Please try again!",d();return}return a.totalHits/(r.perPage*r.currentPage)<=1?(r.messageWarning="We're sorry, but you've reached the end of search results.",P()):t.loadMoreEl.classList.remove("hidden"),L(a.hits)}catch(a){r.messageError=a,d()}}async function v(a){const o="41437501-0a58a7d6f9b55a91ef815cfe0";return c.defaults.baseURL="https://pixabay.com/api",(await c.get(`/?key=${o}&q=${r.userEntered}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${r.perPage}&page=${r.currentPage}`)).data}function L(a){const o=a.reduce((i,{largeImageURL:n,webformatURL:e,tags:s,likes:l,views:f,comments:m,downloads:h})=>i+`
      <li class="gallery-item">
        <a class="gallery-link" href="${n}">
            <img
            class="gallery-image"
            src="${e}"
            alt="${s}"
            width="360"
            height="200"
            />
            <div class="gallery-info">
              <div class="gallery-box">
                <h3 class="gallery-title">likes</h3>
                <p class="gallery-text">${l}</p>
              </div>
              <div class="gallery-box">
                <h3 class="gallery-title">views</h3>
                <p class="gallery-text">${f}</p>
              </div>
              <div class="gallery-box">
                <h3 class="gallery-title">comments</h3>
                <p class="gallery-text">${m}</p>
              </div>
              <div class="gallery-box">
                <h3 class="gallery-title">downloads</h3>
                <p class="gallery-text">${h}</p>
              </div>
            </div>
         </a>
       </li>`,"");t.listEl.insertAdjacentHTML("beforeend",o),p.refresh(),t.loaderEl.classList.add("hidden"),window.scrollBy({top:t.listEl.getBoundingClientRect().height,left:0,behavior:"smooth"})}function d(){t.loadMoreEl.classList.add("hidden"),t.loaderEl.classList.add("hidden"),u.error({title:"Error",message:r.messageError,position:"topRight",messageColor:"#ffffff",titleColor:"#ffffff",iconColor:"#ffffff",backgroundColor:"#B51B1B"})}function P(){t.loadMoreEl.classList.add("hidden"),t.loaderEl.classList.add("hidden"),u.warning({title:"Caution",message:r.messageWarning,position:"topRight",messageColor:"#000000",titleColor:"#000000",iconColor:"#000000",backgroundColor:"#06bb3c"})}
//# sourceMappingURL=commonHelpers.js.map
