import{S as p,a as c,i as u}from"./assets/vendor-56025df1.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function l(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=l(e);fetch(e.href,o)}})();const t={formEl:document.querySelector("form"),listEl:document.querySelector(".gallery"),loadMoreEl:document.querySelector(".js-btn-load"),loaderEl:document.querySelector(".loader")},r={perPage:40,userEntered:"",currentPage:1,messageError:"",messageWarning:""};t.formEl.addEventListener("submit",v);t.loadMoreEl.addEventListener("click",b);const E=new p(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});async function b(){r.currentPage+=1,t.loadMoreEl.classList.toggle("hidden"),t.loaderEl.classList.remove("hidden"),g()}async function v(s){if(s.preventDefault(),r.userEntered=s.currentTarget.elements.name.value.trim(),r.userEntered===""){s.currentTarget.elements.name.value="",r.messageWarning="Enter some value in this field.",f();return}r.currentPage=1,t.loaderEl.classList.remove("hidden");const a=Array.from(t.listEl.childNodes);if(a.length)for(const l of a)l.remove();console.log(t.listEl.childNodes),g(),s.currentTarget.elements.name.value=""}async function g(){try{const s=await L(r.userEntered);if(!s.hits.length){r.messageError="Sorry, there are no images matching your search query. Please try again!",d();return}return s.totalHits/(r.perPage*r.currentPage)<=1?(r.messageWarning="We're sorry, but you've reached the end of search results.",f()):t.loadMoreEl.classList.remove("hidden"),P(s.hits)}catch(s){r.messageError=s,d()}}async function L(s){const a="41437501-0a58a7d6f9b55a91ef815cfe0";return c.defaults.baseURL="https://pixabay.com/api",(await c.get(`/?key=${a}&q=${r.userEntered}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${r.perPage}&page=${r.currentPage}`)).data}function P(s){const a=s.reduce((l,{largeImageURL:n,webformatURL:e,tags:o,likes:i,views:m,comments:h,downloads:y})=>l+`
      <li class="gallery-item">
        <a class="gallery-link" href="${n}">
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
                <p class="gallery-text">${i}</p>
              </div>
              <div class="gallery-box">
                <h3 class="gallery-title">views</h3>
                <p class="gallery-text">${m}</p>
              </div>
              <div class="gallery-box">
                <h3 class="gallery-title">comments</h3>
                <p class="gallery-text">${h}</p>
              </div>
              <div class="gallery-box">
                <h3 class="gallery-title">downloads</h3>
                <p class="gallery-text">${y}</p>
              </div>
            </div>
         </a>
       </li>`,"");t.listEl.insertAdjacentHTML("beforeend",a),E.refresh(),t.loaderEl.classList.add("hidden"),window.scrollBy({top:t.listEl.getBoundingClientRect().height,left:0,behavior:"smooth"})}function d(){t.loadMoreEl.classList.add("hidden"),t.loaderEl.classList.add("hidden"),u.error({title:"Error",message:r.messageError,position:"topRight",messageColor:"#ffffff",titleColor:"#ffffff",iconColor:"#ffffff",backgroundColor:"#B51B1B"})}function f(){t.loadMoreEl.classList.add("hidden"),t.loaderEl.classList.add("hidden"),u.warning({title:"Caution",message:r.messageWarning,position:"topRight",messageColor:"#000000",titleColor:"#000000",iconColor:"#000000",backgroundColor:"#06bb3c"})}
//# sourceMappingURL=commonHelpers.js.map
