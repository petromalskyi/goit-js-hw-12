import{i as g,S as y}from"./assets/vendor-46aac873.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const h=document.querySelector("form"),i=document.querySelector(".gallery");h.addEventListener("submit",m);function m(o){o.preventDefault(),i.innerHTML="";const s=o.target.elements.name.value;i.insertAdjacentHTML("afterend",'<span class="loader"></span>'),p(s).then(r=>{if(r.hits.length===0)document.querySelector(".loader").remove(),g.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",messageColor:"#ffffff",titleColor:"#ffffff",iconColor:"#ffffff",backgroundColor:"#B51B1B"});else return v(r.hits)}).catch(r=>console.log(r))}function p(o){return fetch(`https://pixabay.com/api/?key=41437501-0a58a7d6f9b55a91ef815cfe0&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`).then(l=>{if(!l.ok)throw new Error(l.statusText);return l.json()})}function v(o){document.querySelector(".loader").remove();const r=o.reduce((e,{largeImageURL:t,previewURL:a,tags:n,likes:c,views:f,comments:d,downloads:u})=>e+`
      <li class="gallery-item">
        <a class="gallery-link" href="${t}">
            <img
            class="gallery-image"
            src="${a}"
            alt="${n}"
            width="360"
            height="200"
            ;
            />
            <div class="gallery-info">
              <div class="gallery-box">
                <h3 class="gallery-title">likes</h3>
                <p class="gallery-text">${c}</p>
                <!--hit.likes -->
              </div>
              <div class="gallery-box">
                <h3 class="gallery-title">views</h3>
                <p class="gallery-text">${f}</p>
              </div>
              <div class="gallery-box">
                <h3 class="gallery-title">comments</h3>
                <p class="gallery-text">${d}</p>
              </div>
              <div class="gallery-box">
                <h3 class="gallery-title">downloads</h3>
                <p class="gallery-text">${u}</p>
              </div>
            </div>
         </a>
       </li>`,"");i.innerHTML=r,new y(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
