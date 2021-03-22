var XCM = {};

XCM.loadJS = function(url, implementationCode, location){
    let scriptTag = document.createElement('script');
    scriptTag.src = chrome.extension.getURL(url);
    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;
    location.appendChild(scriptTag);
};

XCM.loadStyle = function(url, implementationCode, location){
    let linkTag = document.createElement('link');
    linkTag.rel  = 'stylesheet';
    linkTag.type = 'text/css';
    linkTag.href = chrome.extension.getURL(url);
    linkTag.media = 'all';
    linkTag.onload = implementationCode;
    linkTag.onreadystatechange = implementationCode;
    location.appendChild(linkTag);
};

function loadJquery() {
    if (window.jQuery || window.$) {
        return;
    }
    XCM.loadJS('//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js', function (){
        console.log("load jquery done");
    }, document.body);
}

document.addEventListener('DOMContentLoaded', function() {
    XCM.loadStyle("styles/main.css", function () {
        console.log("load main.css done")
    }, document.head);
    XCM.loadJS("scripts/common.js", function (){
        console.log("load common.js done")
    }, document.body);
});

chrome.runtime.onMessage.addListener(function(req, sender, sendResponse){
    console.log(req.obj);
    sendResponse({status: "okay"});
});
