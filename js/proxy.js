'use strict';

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-XXXXXXXX-X']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

const Proxy = {
	proxy: {
		init() {
			console.log("Init start " + Date.now())
			const cleaner = this.clearProxy();
			cleaner.then(() => {
				chrome.proxy.settings.set({
					value: {
						mode: 'pac_script',
						pacScript: {
							url: `https://raw.githubusercontent.com/AkelMaister/chrome_ext_vkliberator/master/proxy.pac`,
							mandatory: false
						}
					},
					scope: 'regular'
				}, () => {
					Proxy.proxy.fixerrors()
				})
			})
			console.log("Init end " + Date.now())
		},
		fixerrors() {
			chrome.proxy.onProxyError.addListener(a => {
				const b = setInterval(() => {
					Proxy.proxy.init(b)
				}, 1e3)
			})
		},
		clearProxy() {
			return new Promise(cleaner => chrome.proxy.settings.clear(
				{scope: 'regular'}, cleaner.bind(this)
			))
        }
	}
}

Proxy.proxy.init();
