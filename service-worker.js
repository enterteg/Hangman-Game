"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","df7075669ba6b66c19dcd91e750d6d98"],["static/css/main.63daadbd.css","5009848c665f6a99c2e78bacb954f692"],["static/js/main.82871162.js","3deb288136f7a39a3fbe7566f9fcaf88"],["static/media/AllerDisplay.4cf80f22.ttf","4cf80f22e2f9d7f0b9bd2381d6c5886c"],["static/media/bar.d63c541b.png","d63c541bdba3c35998842412c1dc6a87"],["static/media/corpus.a0ed449f.png","a0ed449fdb3a1ee7a38966c007b6d811"],["static/media/head.cc2fe300.png","cc2fe300908b62cc4d70bebdebc90745"],["static/media/left-arm.c41b4080.png","c41b408007e3d78b479e2d1ddd340cfb"],["static/media/left-foot.a7431eb0.png","a7431eb0b5e1e6842472e5cffd507514"],["static/media/left-hand.21efd067.png","21efd067c57e00fc77f54e2718ec1510"],["static/media/left-leg.aa280815.png","aa2808155138feddd8f0a970b7b93598"],["static/media/neck.88b2d3ed.png","88b2d3ed676b1ec0f93daa27bfc8471f"],["static/media/right-arm.b6709fba.png","b6709fba6a276ec738d8d45d1814df65"],["static/media/right-hand.ea7797c5.png","ea7797c5df8c28217643e67392115ae4"],["static/media/right-leg.8cc96677.png","8cc966770ecb452af82b80bff8eecebc"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var a=new Request(n,{credentials:"same-origin"});return fetch(a).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);t=urlsToCacheKeys.has(n);t||(n=addDirectoryIndex(n,"index.html"),t=urlsToCacheKeys.has(n));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(n=new URL("/Hangman-Game/index.html",self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});