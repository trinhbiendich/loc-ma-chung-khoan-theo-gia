function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
var TD = {
    md5: function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()},
    photos: {},
    urlTypeListMax2Min: ["o","6k","5k","4k","3k","k","h","l","c","z","m","w","n","s","q","t","sq"],
    urlTypeListMin2Max: ["sq","t","q","s","n","w","m","z","c","l","h","k","3k","4k","5k","6k","o"],
    actionType: {
        photoList: "photo list get from page",
        photoListFromAlbum: "photo list get from album",
        mediaInfo: "media info",
        unknow: "unknow type"
    }
};

function apiTypeByContent(obj) {
    if (obj.photos !== undefined && obj.photos.photo !== undefined && obj.photos.photo.length !== 0) {
        return {type: TD.actionType.photoList, data: obj.photos.photo};
    }
    if (obj.photoset !== undefined && obj.photoset.photo !== undefined && obj.photoset.photo.length !== 0) {
        return {type: TD.actionType.photoListFromAlbum, data: obj.photoset.photo};
    }
    if (obj.streams !== undefined && obj.streams.stream !== undefined && obj.streams.stream.length !== 0) {
        return {type: TD.actionType.mediaInfo, data: obj.streams.stream};
    }
    return {type: TD.actionType.unknow, data: null};
}

function getMinUrl(photo) {
    for(let i=0; i<TD.urlTypeListMin2Max.length; i++) {
        if ("url_" + TD.urlTypeListMin2Max[i] in photo) {
            return photo["url_" + TD.urlTypeListMin2Max[i]];
        }
    }
    return "";
}

function getMaxUrl(photo) {
    for(let i=0; i<TD.urlTypeListMax2Min.length; i++) {
        if ("url_" + TD.urlTypeListMax2Min[i] in photo) {
            return photo["url_" + TD.urlTypeListMax2Min[i]];
        }
    }
    return "";
}

function addPhotos(photos, rawData) {
    let html = '';
    let savePhotos = [];
    for (let i=0; i< photos.length; i++) {
        let photo = photos[i];
        if (photo.id in TD.photos) {
            continue;
        }
        photo.maxUrl = getMaxUrl(photo);
        photo.minUrl = getMinUrl(photo);
        photo.originalUrl = `https://www.flickr.com/photos/${photo.owner}/${photo.id}/`;
        photo.title = photo.title || "default title";
        delete photo['description'];
        TD.photos[photo.id] = photo;
        savePhotos.push(photo);

        html += `<tr><td>${photo.id}</td><td>${photo.media}</td>`;
        html += `<td><a href="${photo.originalUrl}" target="_blank">${photo.title}</a></td>`;
        html += `<td><a target="_blank" href="${photo.maxUrl}">${photo.maxUrl}</a></td>`;
        html += `</tr>`;
    }
    $("#databody").append(html);
}

function addMediaInfoIntoPhoto(contentObj) {

}

function processForFlickrAPI(url, data) {
    if (url.indexOf("per_page") <= 0 && url.indexOf("photo_id") <= 0) {
        return;
    }
    data.getContent((content, encoding) => {
        let contentObj = null;
        try {
            contentObj = JSON.parse(content);
        } catch (e) {
            return;
        }

        let obj = apiTypeByContent(contentObj);

        if (obj.type === TD.actionType.photoList || obj.type === TD.actionType.photoList) {
            addPhotos(obj.data, contentObj);
            return;
        }

        if (obj.type === TD.actionType.mediaInfo) {
            addMediaInfoIntoPhoto(obj.data);
            return;
        }
    });
}

chrome.devtools.network.onRequestFinished.addListener(data => {
    let url = data.request.url;
    if (/api\.flickr\.com\/services\/rest/.test(url)) {
        processForFlickrAPI(url, data);
        return;
    }
});
