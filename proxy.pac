function FindProxyForURL(url, host) {
        var primarySrv = 'PROXY s2.telvanil.ru:10010;PROXY s1.telvanil.ru:10010;' // achbnjfnclogjcmjllgdjgdgmpfjiejk
//      var secondarySrv = 'PROXY 213.196.52.20:18090; PROXY 213.196.52.28:18090; PROXY 213.196.55.204:18090;' // loikkjdamgepaljggmelgggpgdhhglgk
//      var secondarySrv = 'PROXY 213.196.52.20:18090; PROXY 213.196.55.204:18090; PROXY 213.196.52.28:18090; HTTPS frpxa.com:443; HTTPS brwpks.com:443; HTTPS pksfr.com:443; HTTPS brwpx.com:443;' // loikkjdamgepaljggmelgggpgdhhglgk (new)
        var secondarySrv = 'PROXY 213.196.52.180:1084; PROXY 213.196.53.28:1084; PROXY 213.196.53.36:1084; PROXY 213.196.53.68:1084; PROXY 213.196.54.60:1084; PROXY 88.212.244.244:1084; PROXY 213.196.52.20:1084;'
        var thirdSrv = 'PROXY hola.safe-proxy.com:1084; PROXY imhole.safe-proxy.com:1084;'  // coahpcpgfnnaddeelpphpifmgfobflog
        var forthSrv = 'HTTPS frpxa.com:443; HTTPS brwpks.com:443; HTTPS pksfr.com:443, HTTPS brwpx.com:443' // ffaadgkifbehfhecaljdpaecbpmpjnkm

//      var proxyChain = secondarySrv + fifthSrv + primarySrv + thirdSrv + forthSrv
        var proxyChain = secondarySrv
        
        var re = /\s*;\s*/;
        var proxystring = proxyChain.substring(0, proxyChain.length - 1)
        var proxyarr = proxystring.split(re)
        var proxy = proxyarr[Math.floor(Math.random() * proxyarr.length)];
        
        var domains = ["2ch.hk","adfox.net","adfox.ru","ad.mail.ru","allods.com","allods.ru","allodsteam.ru","apivk.com","appsmail.ru",
                       "attachmail.ru","attachmy.com","autoi.ru","auto.ru","autoru.tv","avto.ru","beep.car","beepcar.ru","beepcarstatic.ru",
                       "bem.info","bk.ru","cdnmail.ru","clck.ly","clck.ru","cldmail.ru","clickhouse.tech","clickhouse.yandex",
                       "clouder.pics","cloud.yandex","comparesearches.com","datacloudmail.ru","dclub.ru","deliveryclub.ru","distribmail.ru",
                       "donationalerts.ru","driver.yandex","drweb.com","dwar.ru","ecir2013.org","fie.org","giftomaster.com",
                       "giftomatic.org","gmru.net","ic2ster.com","icqapi.com","icq.com","icqmail.com","icq.net","iframe-toloka.com",
                       "imgsmail.ru","inbox.ru","iseeku.com","iseekyou.com","jugger.ru",".kaspersky.","kaspersky.ua","kinopoisk.ru",
                       "list.ru","livejournal.ru","loginza.ru","mailapps.me","mail.ru","mail.ua","mail.yandex","maps.me","mediator.media",
                       "metabar.ru","mk-beta.ru","mk-dev.ru","mk-prod.ru","mk-stress.ru","mk-test.ru","moikrug.ru","mradx.net",
                       "multiship.ru","myadx.net","mycdn.me","my.com","narod.ru","nic.yandex","nota-claim.ru","notaclaim.ru",
                       "odnoklassniki.com.ua","odnoklassniki.ru","odnoklassniki.ua","oh-uh.net","ok.com","ok.me","ok.ru","o.life",
                       "owamail.ru","parapa.ru","pifagor.io","pokespy.info","pokerspy.info","polkrf.ru","portal.mail.ru","preview-adfox.ru",
                       "pricelabs.ru","rostaxi.org","ruscorpora.ru","russianaicup.ru","russiancodecup.ru","russiancryptocup.com",
                       "russiancryptocup.ru","russiandesigncup.ru","russiandevcup.ru","russianmlcup.ru","rutube.ru","seosan.io","shad.yandex",
                       "skyforge.com","skyforge.ru","smaper.com","staticmy.com","std-cpp.ru","stdcpp.ru","tarantool.io","tarantool.org",
                       "terrabank.ru","terrhq.ru","territory.ru","timezero.ru","travel.yandex","userapi.com","vk.cc","vk-cdn.me","vk-cdn.net",
                       ".vk.com","vk.com","vk.me","vkforms.ru","vkontakte.ru","vkuservideo.com","vkuservideo.net","warface.com","warface.tv","webvisor.com",
                       "webvisor.org","www.yandex","xn--80abviyi.xn--p1ai","xn--d1acpjx3f.xn--p1ai","yaani.ru","ya.cc","yadi.sk",
                       "yadisk.cc","yamoney.ru","yandex",".yandex","yandex-ad.cn","yandexadexchange.net","yandex.aero","yandex-amp.net",
                       "yandex.az","yandex.by","yandex.cloud","yandex.co.il","yandex.com","yandex.com.am","yandex.com.ge",
                       "yandex.com.ru","yandex.com.tr","yandex.com.ua","yandexdatafactory.com","yandexdatafactory.ru",
                       "yandexdataschool.com","yandexdataschool.ru","yandex.de","yandex.ee","yandex.fr","yandex.jobs","yandex.kg",
                       "yandex.kz","yandex-launcher.com","yandexlauncher.com","yandex.lt","yandex.lv","yandexlyceum.ru","yandex.md",
                       "yandex.mobi","yandex.net","yandex.ru","yandex-school.ru","yandex.st","yandex.tj","yandex.tm","yandextrafik.com.tr",
                       "yandex.travel","yandex.ua","yandex.uz","yaprobki.ru","ya.ru","yastatic.net","yastat.net","yate.ch",
                       "yavideoad.ru","ydf-conference.com","yndx.net","youla.io","youla.ru","z5h64q92x9.net","codeforces.com",
                       "st.codeforces.com","gentoo.ru"]
   
        for(var i = 0;i<domains.length;i++) {
                if(shExpMatch(host, '*'+domains[i]+'*'))
                        return proxy
        }
        return "DIRECT"
}
