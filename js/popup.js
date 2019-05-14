'use strict';

const getJSON = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

let debugp = document.getElementById('debug')

let params = {
        'proxy': 'disabled',
        'customproxy': '',
        'domains': [],
        'enabled': false
    },
    json,
    proxyoption = document.getElementById('proxyoption'),
    customproxy = document.getElementById('customproxy'),
    proxydomains = document.getElementById('proxydomains'),
    applybutton = document.getElementById('applybutton')

proxyoption.addEventListener('change', () => {
    let newvalue = proxyoption.options[proxyoption.selectedIndex].value

    if (newvalue == 'disabled') {
        params.enabled = false
    } else {
        params.enabled = true
    }

    if (newvalue == 'custom') {
        customproxy.style.display = "inline"
    } else {
        customproxy.style.display = "none"
    }
})

applybutton.addEventListener('click', () => {
    params.proxy = proxyoption.options[proxyoption.selectedIndex].value
    params.customproxy = customproxy.value
    params.domains = proxydomains.value.split(',').map((item) => {return item.trim()});
    
    localStorage.setItem('proxyconfig', JSON.stringify(params))

    debugp.innerText = JSON.stringify(params)
    
    applyParams()
})

getJSON('https://raw.githubusercontent.com/AkelMaister/chrome_ext_vkliberator/master/proxy.json', (err, data) => {
    if (err)
        console.error("We got error: " + err)
    
    if (localStorage.getItem('proxyconfig') != null)
        params = JSON.parse(localStorage.getItem('proxyconfig'))

    json = JSON.parse(data)
    for (let proxy in json.proxylist) {
        let opt = document.createElement('option');
        opt.value = proxy
        opt.innerText = proxy
        if (params.proxy == proxy)
            opt.selected = true
        proxyoption.appendChild(opt)
    }
    let opt = document.createElement('option');
    opt.value = 'custom'
    opt.innerText = 'Custom Proxy'
    if (params.proxy == 'custom') {
        opt.selected = true
        customproxy.style.display = "inline"
    }
        
    proxyoption.appendChild(opt)

    customproxy.value = params.customproxy
    proxydomains.innerText = params.domains.join(', ')

    applyParams()
})

let getRandom = (a, b) => {
        return Math.floor(Math.random() * (b - a + 1)) + a
    },

    applyParams = () => {
        if (params.enabled) {
            let proxy, cur_ip, cur_type, cur_port, config, tmp_proxy
            if (params.proxy != 'custom') {
                proxy = json.proxylist[params.proxy][getRandom(0, json.proxylist[params.proxy].length - 1)]
            } else {
                proxy = params.customproxy
            }
            tmp_proxy = proxy.split(":");
            cur_ip = tmp_proxy[1]
            cur_type = tmp_proxy[0]
            cur_port = tmp_proxy[2]
            config = {
                mode: "pac_script",
                pacScript: {
                    data: 'function FindProxyForURL(url, host) {var activeProxy="' + cur_type + ' ' + cur_ip + ':' + cur_port + '";var domains=' + JSON.stringify(json.domains.concat(params.domains).filter((el) => {return el != ""})) + ';for(i = 0; i < domains.length; i++){if (shExpMatch(host, domains[i])) {return activeProxy;}}return "DIRECT";}'
                }
            };

            if (chrome.proxy)
            chrome.proxy.settings.set(
                {
                    value: config,
                    scope: 'regular'
                }, () => {console.log("Set proxy to:", cur_type, cur_ip, cur_port)}
            );
        } else {
            if (chrome.proxy)
            chrome.proxy.settings.clear({
                scope: 'regular'
            })
        }
}
