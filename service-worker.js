"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","8073b0eb8f601986196c21578c57b07b"],["static/js/main.4cfd1e39.js","4f4ba79c17375ac849764697c8e4e6d3"],["static/media/App.e2d4dad0.sass","e2d4dad0dbc88aa477a7ae3cd661c0cb"],["static/media/Game.60ea191f.sass","60ea191f8d7fd9b81fa888688991b014"],["static/media/GameMenu.0042e010.sass","0042e01004bdc779f906b8cdbe89def9"],["static/media/Hangman.398baf1f.sass","398baf1f5f751709a13470ebab047016"],["static/media/Letter.a4bd782c.sass","a4bd782cd8eec833ca675e845f20add7"],["static/media/MissedLetters.7e3cf207.sass","7e3cf2072e85918313e24d09585c2016"],["static/media/Result.f5b4ef11.sass","f5b4ef11dffb64a609083be8f302d68e"],["static/media/bar.d63c541b.png","d63c541bdba3c35998842412c1dc6a87"],["static/media/corpus.a0ed449f.png","a0ed449fdb3a1ee7a38966c007b6d811"],["static/media/head.cc2fe300.png","cc2fe300908b62cc4d70bebdebc90745"],["static/media/index.7ca28abc.sass","7ca28abc1627044ae6e54f69e045e2de"],["static/media/left-arm.c41b4080.png","c41b408007e3d78b479e2d1ddd340cfb"],["static/media/left-foot.a7431eb0.png","a7431eb0b5e1e6842472e5cffd507514"],["static/media/left-hand.21efd067.png","21efd067c57e00fc77f54e2718ec1510"],["static/media/left-leg.aa280815.png","aa2808155138feddd8f0a970b7b93598"],["static/media/neck.88b2d3ed.png","88b2d3ed676b1ec0f93daa27bfc8471f"],["static/media/right-arm.b6709fba.png","b6709fba6a276ec738d8d45d1814df65"],["static/media/right-hand.ea7797c5.png","ea7797c5df8c28217643e67392115ae4"],["static/media/right-leg.8cc96677.png","8cc966770ecb452af82b80bff8eecebc"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),c]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);t=urlsToCacheKeys.has(a);t||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/Hangman-Game/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});