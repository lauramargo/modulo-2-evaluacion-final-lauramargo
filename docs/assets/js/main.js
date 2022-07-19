"use strict";const textUser=document.querySelector(".js-textUser"),btnSearch=document.querySelector(".js-btnSearch"),btnReset=document.querySelector(".js-btnReset"),ul=document.querySelector(".js-results"),favList=document.querySelector(".js-favorites");let seriesAnime=[],favorites=[];function handleDeleteEach(e){const t=parseInt(e.currentTarget.id),s=favorites.findIndex(e=>e.mal_id===t);-1!==s&&(favorites.splice(s,1),renderFavoriteList(),localStorage.setItem("data",JSON.stringify(favorites)))}const listenerTrash=()=>{const e=document.querySelectorAll(".js_trash");for(const t of e)t.addEventListener("click",handleDeleteEach)},renderFavoriteList=()=>{let e=[];for(const t of favorites)e+=`<li class='js-favs' id= '${t.mal_id}' >`,"https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"!==t.images.jpg.image_url?e+=`<div class="image-container"><img src='${t.images.jpg.image_url}'class="image"></div>`:e+='<div class="image-container"><img src=\'https://via.placeholder.com/210x295/ffffff/666666/?text=no-photo\'class="image"></div>',e+=`<h2 class='_title'>${t.title}</h2>`,e+=`<button class=' js_trash' id='${t.mal_id}'><i class='trashIcon  fa-solid fa-trash-can' ></i></button>`,e+="</img></li>";favList.innerHTML=e,listenerTrash()};function handleClick(e){const t=e.currentTarget.id,s=parseInt(t),i=seriesAnime.find(e=>e.mal_id===s),a=favorites.findIndex(e=>e.mal_id===s);-1===a?favorites.push(i):favorites.splice(a,1),renderSeries(),renderFavoriteList(),localStorage.setItem("data",JSON.stringify(favorites))}function listenerFav(){const e=document.querySelectorAll(".js-fav");for(const t of e)t.addEventListener("click",handleClick)}btnSearch.addEventListener("click",e=>{e.preventDefault(),showApi()});const showApi=()=>{const e=textUser.value;fetch("https://api.jikan.moe/v4/anime?q="+e).then(e=>e.json()).then(e=>{seriesAnime=e.data,renderSeries()})};function download(){const e=JSON.parse(localStorage.getItem("data"));e&&(favorites=e,renderFavoriteList())}download();const deleteAllFavs=document.querySelector(".js_deleteFavs");function handleDeleteAll(e){e.preventDefault(),favList.innerHTML="",""!==ul.innerHTML&&(ul.classList="",renderSeries())}deleteAllFavs.addEventListener("click",handleDeleteAll);const btnResetAll=document.querySelector(".js-btnReset");function handleResetAll(e){e.preventDefault(),favList.innerHTML="",ul.innerHTML="",localStorage.removeItem("data",JSON.stringify(favorites)),textUser.value=""}btnResetAll.addEventListener("click",handleResetAll);const renderSeries=()=>{let e="",t="";for(const s of seriesAnime){t=-1!==favorites.findIndex(e=>s.mal_id===e.mal_id)?"favourite":"",e+=`<li class='js-fav ${t}' id= '${s.mal_id}' >`,"https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"!==s.images.jpg.image_url?e+=`<div class="image-container2"><img src='${s.images.jpg.image_url}'class="image2"></div>`:e+='<div class="image-container2"><img src=\'https://via.placeholder.com/210x295/ffffff/666666/?text=no-photo\'class="image2"></div>',e+=`<h2 class='${t}_title2'>${s.title}</h2>`,e+="</img></li>"}ul.innerHTML=e,listenerFav()};