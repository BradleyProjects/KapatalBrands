;/*FB_PKG_DELIM*/

__d("EventEmitterWithValidation",["BaseEventEmitter"],(function(a,b,c,d,e,f){"use strict";a=function(a){babelHelpers.inheritsLoose(b,a);function b(b,c){var d;d=a.call(this)||this;d.$EventEmitterWithValidation1=Object.keys(b);d.$EventEmitterWithValidation2=Boolean(c);return d}var c=b.prototype;c.emit=function(b){if(this.$EventEmitterWithValidation1.indexOf(b)===-1){if(this.$EventEmitterWithValidation2)return;throw new TypeError(g(b,this.$EventEmitterWithValidation1))}return a.prototype.emit.apply(this,arguments)};return b}(b("BaseEventEmitter"));function g(a,b){a='Unknown event type "'+a+'". ';a+="Known event types: "+b.join(", ")+".";return a}e.exports=a}),null);
__d("mixInEventEmitter",["invariant","EventEmitterWithHolding","EventEmitterWithValidation","EventHolder"],(function(a,b,c,d,e,f,g,h){"use strict";function a(a,b,c){b||h(0,3159);var d=a.prototype||a;d.__eventEmitter&&h(0,3160);a=a.constructor;a&&(a===Object||a===Function||h(0,3161));d.__types=babelHelpers["extends"]({},d.__types,b);d.__ignoreUnknownEvents=Boolean(c);Object.assign(d,i)}var i={emit:function(a,b,c,d,e,f,g){return this.__getEventEmitter().emit(a,b,c,d,e,f,g)},emitAndHold:function(a,b,c,d,e,f,g){return this.__getEventEmitter().emitAndHold(a,b,c,d,e,f,g)},addListener:function(a,b,c){return this.__getEventEmitter().addListener(a,b,c)},once:function(a,b,c){return this.__getEventEmitter().once(a,b,c)},addRetroactiveListener:function(a,b,c){return this.__getEventEmitter().addRetroactiveListener(a,b,c)},listeners:function(a){return this.__getEventEmitter().listeners(a)},removeAllListeners:function(){this.__getEventEmitter().removeAllListeners()},removeCurrentListener:function(){this.__getEventEmitter().removeCurrentListener()},releaseHeldEventType:function(a){this.__getEventEmitter().releaseHeldEventType(a)},__getEventEmitter:function(){if(!this.__eventEmitter){var a=new(c("EventEmitterWithValidation"))(this.__types,this.__ignoreUnknownEvents),b=new(c("EventHolder"))();this.__eventEmitter=new(c("EventEmitterWithHolding"))(a,b)}return this.__eventEmitter}};g["default"]=a}),98);
__d("NavigationMetricsCore",["mixInEventEmitter","pageID"],(function(a,b,c,d,e,f,g){var h={NAVIGATION_DONE:"NAVIGATION_DONE",EVENT_OCCURRED:"EVENT_OCCURRED"},i={tti:"tti",e2e:"e2e",all_pagelets_loaded:"all_pagelets_loaded",all_pagelets_displayed:"all_pagelets_displayed"},j=0,k={},l=function(){function a(){this.eventTimings={tti:null,e2e:null,all_pagelets_loaded:null,all_pagelets_displayed:null},this.lid=c("pageID")+":"+j++,this.extras={}}var b=a.prototype;b.getLID=function(){return this.lid};b.setRequestStart=function(a){this.start=a;return this};b.setTTI=function(a){this.eventTimings.tti=a;this.$1(i.tti,a);return this};b.setE2E=function(a){this.eventTimings.e2e=a;this.$1(i.e2e,a);return this};b.setExtra=function(a,b){this.extras[a]=b;return this};b.setDisplayDone=function(a){this.eventTimings.all_pagelets_displayed=a;this.setExtra("all_pagelets_displayed",a);this.$1(i.all_pagelets_displayed,a);return this};b.setAllPageletsLoaded=function(a){this.eventTimings.all_pagelets_loaded=a;this.setExtra("all_pagelets_loaded",a);this.$1(i.all_pagelets_loaded,a);return this};b.setServerLID=function(a){this.serverLID=a;return this};b.$1=function(a,b){var c={};k!=null&&this.serverLID!=null&&k[this.serverLID]!=null&&(c=k[this.serverLID]);c=babelHelpers["extends"]({},c,{event:a,timestamp:b});m.emitAndHold(h.EVENT_OCCURRED,this.serverLID,c);return this};b.doneNavigation=function(){var a=babelHelpers["extends"]({start:this.start,extras:this.extras},this.eventTimings);if(this.serverLID&&k[this.serverLID]){var b=this.serverLID;Object.assign(a,k[b]);delete k[b]}m.emitAndHold(h.NAVIGATION_DONE,this.lid,a)};return a}(),m={Events:h,postPagelet:function(a,b,c){},siteInit:function(a){a(l)},setPage:function(a){if(!a.serverLID)return;k[a.serverLID]={page:a.page,pageType:a.page_type,pageURI:a.page_uri,serverLID:a.serverLID}},getFullPageLoadLid:function(){throw new Error("getFullPageLoadLid is not implemented on this site")}};c("mixInEventEmitter")(m,h);a=m;g["default"]=a}),98);
__d("NavigationMetrics",["Arbiter","BigPipeInstance","NavigationMetricsCore","PageEvents","performance"],(function(a,b,c,d,e,f,g){var h="0";c("NavigationMetricsCore").getFullPageLoadLid=function(){return h};c("NavigationMetricsCore").siteInit(function(a){var b=new a(),e=!0;c("Arbiter").subscribe(d("BigPipeInstance").Events.init,function(f,g){var i=e?b:new a();e&&(h=g.lid);e=!1;i.setServerLID(g.lid);f=g.arbiter;f.subscribe(d("BigPipeInstance").Events.tti,function(a,b){a=b.ts;i.setTTI(a)});f.subscribe(c("PageEvents").AJAXPIPE_SEND,function(a,b){a=b.ts;i.setRequestStart(a)});f.subscribe(c("PageEvents").AJAXPIPE_ONLOAD,function(a,b){a=b.ts;i.setE2E(a).doneNavigation()});f.subscribe(d("BigPipeInstance").Events.displayed,function(a,b){a=b.ts;i.setDisplayDone(a)});f.subscribe(d("BigPipeInstance").Events.loaded,function(a,b){a=b.ts;i.setAllPageletsLoaded(a)})});c("Arbiter").subscribe(c("PageEvents").BIGPIPE_ONLOAD,function(a,d){a=d.ts;e=!1;b.setRequestStart(c("performance").timing&&c("performance").timing.navigationStart).setE2E(a).doneNavigation()})});g["default"]=c("NavigationMetricsCore")}),98);
__d("ArbiterMixin",["Arbiter","guid"],(function(a,b,c,d,e,f,g){var h="arbiter$"+c("guid")(),i=Object.prototype.hasOwnProperty;a={_getArbiterInstance:function(){return i.call(this,h)?this[h]:this[h]=new(c("Arbiter"))()},inform:function(a,b,c){return this._getArbiterInstance().inform(a,b,c)},subscribe:function(a,b,c){return this._getArbiterInstance().subscribe(a,b,c)},subscribeOnce:function(a,b,c){return this._getArbiterInstance().subscribeOnce(a,b,c)},unsubscribe:function(a){this._getArbiterInstance().unsubscribe(a)},unsubscribeCurrentSubscription:function(){this._getArbiterInstance().unsubscribeCurrentSubscription()},releaseCurrentPersistentEvent:function(){this._getArbiterInstance().releaseCurrentPersistentEvent()},registerCallback:function(a,b){return this._getArbiterInstance().registerCallback(a,b)},query:function(a){return this._getArbiterInstance().query(a)}};b=a;g["default"]=b}),98);
__d("Banzai",["cr:1642797"],(function(a,b,c,d,e,f,g){g["default"]=b("cr:1642797")}),98);
__d("QueryString",[],(function(a,b,c,d,e,f){function g(a){var b=[];Object.keys(a).sort().forEach(function(c){var d=a[c];if(d===void 0)return;if(d===null){b.push(c);return}b.push(encodeURIComponent(c)+"="+encodeURIComponent(String(d)))});return b.join("&")}function a(a,b){b===void 0&&(b=!1);var c={};if(a==="")return c;a=a.split("&");for(var d=0;d<a.length;d++){var e=a[d].split("=",2),f=decodeURIComponent(e[0]);if(b&&Object.prototype.hasOwnProperty.call(c,f))throw new URIError("Duplicate key: "+f);c[f]=e.length===2?decodeURIComponent(e[1]):null}return c}function b(a,b){return a+(a.indexOf("?")!==-1?"&":"?")+(typeof b==="string"?b:g(b))}c={encode:g,decode:a,appendToUrl:b};f["default"]=c}),66);
__d("SessionName",["SessionNameConfig"],(function(a,b,c,d,e,f){e.exports={getName:function(){return b("SessionNameConfig").seed}}}),null);
__d("mixin",[],(function(a,b,c,d,e,f){function a(){var a=function(){},b=0,c;while(b<0||arguments.length<=b?void 0:arguments[b]){c=b<0||arguments.length<=b?void 0:arguments[b];for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a.prototype[d]=c[d]);b+=1}return a}f["default"]=a}),66);
__d("getCrossOriginTransport",["invariant","ExecutionEnvironment","err"],(function(a,b,c,d,e,f,g){function h(){if(!b("ExecutionEnvironment").canUseDOM)throw b("err")("getCrossOriginTransport: %s","Cross origin transport unavailable in the server environment.");try{var a=new XMLHttpRequest();!("withCredentials"in a)&&typeof XDomainRequest!=="undefined"&&(a=new XDomainRequest());return a}catch(a){throw b("err")("getCrossOriginTransport: %s",a.message)}}h.withCredentials=function(){var a=h();"withCredentials"in a||g(0,5150);var b=a.open;a.open=function(){b.apply(this,arguments),this.withCredentials=!0};return a};e.exports=h}),null);
__d("ZeroRewrites",["URI","ZeroRewriteRules","getCrossOriginTransport","getSameOriginTransport","isFacebookURI"],(function(a,b,c,d,e,f){var g,h={rewriteURI:function(a){if(!b("isFacebookURI")(a)||h._isWhitelisted(a))return a;var c=h._getRewrittenSubdomain(a);c!==null&&c!==void 0&&(a=a.setSubdomain(c));return a},getTransportBuilderForURI:function(a){return h.isRewritten(a)?b("getCrossOriginTransport").withCredentials:b("getSameOriginTransport")},isRewriteSafe:function(a){if(Object.keys(b("ZeroRewriteRules").rewrite_rules).length===0||!b("isFacebookURI")(a))return!1;var c=h._getCurrentURI().getDomain(),d=new(g||(g=b("URI")))(a).qualify().getDomain();return c===d||h.isRewritten(a)},isRewritten:function(a){a=a.getQualifiedURI();if(Object.keys(b("ZeroRewriteRules").rewrite_rules).length===0||!b("isFacebookURI")(a)||h._isWhitelisted(a))return!1;var c=a.getSubdomain(),d=h._getCurrentURI(),e=h._getRewrittenSubdomain(d);return a.getDomain()!==d.getDomain()&&c===e},_isWhitelisted:function(a){a=a.getPath();a.endsWith("/")||(a+="/");return b("ZeroRewriteRules").whitelist&&b("ZeroRewriteRules").whitelist[a]===1},_getRewrittenSubdomain:function(a){a=a.getQualifiedURI().getSubdomain();return b("ZeroRewriteRules").rewrite_rules[a]},_getCurrentURI:function(){return new(g||(g=b("URI")))("/").qualify()}};e.exports=h}),null);
__d("asyncToGeneratorRuntime",["Promise"],(function(a,b,c,d,e,f){"use strict";function g(a,c,d,e,f,g,h){try{var i=a[g](h),j=i.value}catch(a){d(a);return}i.done?c(j):b("Promise").resolve(j).then(e,f)}function a(a){return function(){var c=this,d=arguments;return new(b("Promise"))(function(b,e){var f=a.apply(c,d);function h(a){g(f,b,e,h,i,"next",a)}function i(a){g(f,b,e,h,i,"throw",a)}h(void 0)})}}f.asyncToGenerator=a}),66);
__d("regeneratorRuntime",["Promise"],(function(a,b,c,d,e,f){"use strict";var g=Object.prototype.hasOwnProperty,h=typeof Symbol==="function"&&(typeof Symbol==="function"?Symbol.iterator:"@@iterator")||"@@iterator",i=e.exports;function j(a,b,c,d){b=Object.create((b||q).prototype);d=new z(d||[]);b._invoke=w(a,c,d);return b}i.wrap=j;function k(a,b,c){try{return{type:"normal",arg:a.call(b,c)}}catch(a){return{type:"throw",arg:a}}}var l="suspendedStart",m="suspendedYield",n="executing",o="completed",p={};function q(){}function r(){}function s(){}var t=s.prototype=q.prototype;r.prototype=t.constructor=s;s.constructor=r;r.displayName="GeneratorFunction";function a(a){["next","throw","return"].forEach(function(b){a[b]=function(a){return this._invoke(b,a)}})}i.isGeneratorFunction=function(a){a=typeof a==="function"&&a.constructor;return a?a===r||(a.displayName||a.name)==="GeneratorFunction":!1};i.mark=function(a){Object.setPrototypeOf?Object.setPrototypeOf(a,s):Object.assign(a,s);a.prototype=Object.create(t);return a};i.awrap=function(a){return new u(a)};function u(a){this.arg=a}function v(a){function c(c,f){var g=a[c](f);c=g.value;return c instanceof u?b("Promise").resolve(c.arg).then(d,e):b("Promise").resolve(c).then(function(a){g.value=a;return g})}typeof process==="object"&&process.domain&&(c=process.domain.bind(c));var d=c.bind(a,"next"),e=c.bind(a,"throw");c.bind(a,"return");var f;function g(a,d){var e=f?f.then(function(){return c(a,d)}):new(b("Promise"))(function(b){b(c(a,d))});f=e["catch"](function(a){});return e}this._invoke=g}a(v.prototype);i.async=function(a,b,c,d){var e=new v(j(a,b,c,d));return i.isGeneratorFunction(b)?e:e.next().then(function(a){return a.done?a.value:e.next()})};function w(a,b,c){var d=l;return function(e,f){if(d===n)throw new Error("Generator is already running");if(d===o){if(e==="throw")throw f;return B()}while(!0){var g=c.delegate;if(g){if(e==="return"||e==="throw"&&g.iterator[e]===void 0){c.delegate=null;var h=g.iterator["return"];if(h){h=k(h,g.iterator,f);if(h.type==="throw"){e="throw";f=h.arg;continue}}if(e==="return")continue}h=k(g.iterator[e],g.iterator,f);if(h.type==="throw"){c.delegate=null;e="throw";f=h.arg;continue}e="next";f=void 0;var i=h.arg;if(i.done)c[g.resultName]=i.value,c.next=g.nextLoc;else{d=m;return i}c.delegate=null}if(e==="next")d===m?c.sent=f:c.sent=void 0;else if(e==="throw"){if(d===l){d=o;throw f}c.dispatchException(f)&&(e="next",f=void 0)}else e==="return"&&c.abrupt("return",f);d=n;h=k(a,b,c);if(h.type==="normal"){d=c.done?o:m;var i={value:h.arg,done:c.done};if(h.arg===p)c.delegate&&e==="next"&&(f=void 0);else return i}else h.type==="throw"&&(d=o,e="throw",f=h.arg)}}}a(t);t[h]=function(){return this};t.toString=function(){return"[object Generator]"};function x(a){var b={tryLoc:a[0]};1 in a&&(b.catchLoc=a[1]);2 in a&&(b.finallyLoc=a[2],b.afterLoc=a[3]);this.tryEntries.push(b)}function y(a){var b=a.completion||{};b.type="normal";delete b.arg;a.completion=b}function z(a){this.tryEntries=[{tryLoc:"root"}],a.forEach(x,this),this.reset(!0)}i.keys=function(a){var b=[];for(var c in a)b.push(c);b.reverse();return function c(){while(b.length){var d=b.pop();if(d in a){c.value=d;c.done=!1;return c}}c.done=!0;return c}};function A(a){if(a){var b=a[h];if(b)return b.call(a);if(typeof a.next==="function")return a;if(!isNaN(a.length)){var c=-1;b=function b(){while(++c<a.length)if(g.call(a,c)){b.value=a[c];b.done=!1;return b}b.value=void 0;b.done=!0;return b};return b.next=b}}return{next:B}}i.values=A;function B(){return{value:void 0,done:!0}}z.prototype={constructor:z,reset:function(a){this.prev=0;this.next=0;this.sent=void 0;this.done=!1;this.delegate=null;this.tryEntries.forEach(y);if(!a)for(a in this)a.charAt(0)==="t"&&g.call(this,a)&&!isNaN(+a.slice(1))&&(this[a]=void 0)},stop:function(){this.done=!0;var a=this.tryEntries[0];a=a.completion;if(a.type==="throw")throw a.arg;return this.rval},dispatchException:function(a){if(this.done)throw a;var b=this;function c(c,d){f.type="throw";f.arg=a;b.next=c;return!!d}for(var d=this.tryEntries.length-1;d>=0;--d){var e=this.tryEntries[d],f=e.completion;if(e.tryLoc==="root")return c("end");if(e.tryLoc<=this.prev){var h=g.call(e,"catchLoc"),i=g.call(e,"finallyLoc");if(h&&i){if(this.prev<e.catchLoc)return c(e.catchLoc,!0);else if(this.prev<e.finallyLoc)return c(e.finallyLoc)}else if(h){if(this.prev<e.catchLoc)return c(e.catchLoc,!0)}else if(i){if(this.prev<e.finallyLoc)return c(e.finallyLoc)}else throw new Error("try statement without catch or finally")}}},abrupt:function(a,b){for(var c=this.tryEntries.length-1;c>=0;--c){var d=this.tryEntries[c];if(d.tryLoc<=this.prev&&g.call(d,"finallyLoc")&&this.prev<d.finallyLoc){var e=d;break}}e&&(a==="break"||a==="continue")&&e.tryLoc<=b&&b<=e.finallyLoc&&(e=null);d=e?e.completion:{};d.type=a;d.arg=b;e?this.next=e.finallyLoc:this.complete(d);return p},complete:function(a,b){if(a.type==="throw")throw a.arg;a.type==="break"||a.type==="continue"?this.next=a.arg:a.type==="return"?(this.rval=a.arg,this.next="end"):a.type==="normal"&&b&&(this.next=b)},finish:function(a){for(var b=this.tryEntries.length-1;b>=0;--b){var c=this.tryEntries[b];if(c.finallyLoc===a){this.complete(c.completion,c.afterLoc);y(c);return p}}},"catch":function(a){for(var b=this.tryEntries.length-1;b>=0;--b){var c=this.tryEntries[b];if(c.tryLoc===a){var d=c.completion;if(d.type==="throw"){var e=d.arg;y(c)}return e}}throw new Error("illegal catch attempt")},delegateYield:function(a,b,c){this.delegate={iterator:A(a),resultName:b,nextLoc:c};return p}}}),null);