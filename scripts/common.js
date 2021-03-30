var CM = {}

function isBlank(str) {
    return str === undefined || str === null || str.trim() === ''
}

function isAnyBlank(...str) {
    for(let s in str) {
        if (isBlank(s)) {
            return true
        }
    }
    return false
}

function filterValue() {
    let filterBy = document.getElementById("filterBy").value
    let fromVal = document.getElementById("filterFrom").value
    let toVal = document.getElementById("filterTo").value
    let stockType = document.getElementById("stockType").value
    let removeBy = document.getElementById("removeBy").value

    document.querySelectorAll('tr').forEach(item => {
        item.removeAttribute('class')
        item.removeAttribute('data-scroll-page')
    })

    CM.data.forEach(item => {
        item.node.style.display = "none"
    })

    let fromValInFloat = -1
    let toValInfloat = 10000
    try {
        fromValInFloat = parseFloat(fromVal)
    } catch (ex) {}
    try {
        toValInfloat = parseFloat(toVal)
    } catch (ex) {}

    CM.data.forEach(item => {
        let itemVal = item[filterBy]
        if (fromVal !== '' && itemVal < fromValInFloat) {
            return;
        }
        if (toVal !== '' && itemVal > toValInfloat) {
            return;
        }
        if (stockType === 'noWarrant' && item.id.length !== 3) {
            //hide me
            return;
        }
        if (removeBy === 'whiteInAll' && item.isWriteInAll()) {
            //hide me
            return;
        }
        if (removeBy === 'whiteInBuy' && item.isWhiteInBuy()) {
            //hide me
            return;
        }
        if (removeBy === 'whiteInSold' && item.isWhiteInSold()) {
            //hide me
            return;
        }
        item.node.style = 'inherit'
    })

    document.getElementById("table-body-scroll").style.marginBottom = "auto"
}

function fetchFromDatabase() {
    let infos = {}
    let dataInStr = localStorage.getItem('my-info-boss')
    if (dataInStr !== null) {
        infos = JSON.parse(dataInStr)
    }
    return infos;
}

function saveToDatabase(data) {
    if (data === null) {
        return
    }
    localStorage.setItem('my-info-boss', JSON.stringify(data))
}

function addItemToMyInfo(obj) {
    let arr = fetchFromDatabase()
    arr[obj.id] = obj
    saveToDatabase(arr)
}

function removeItemOutMyInfo(obj) {
    let arr = fetchFromDatabase()
    if (obj.id in arr) {
        delete arr[obj.id]
        saveToDatabase(arr)
    }
}

function newTag(tagName, id, name, className, value, text, placeholder = null) {
    let tag = document.createElement(tagName)
    if (text !== null) {
        tag.textContent = text
    }
    if (className !== null) {
        tag.className = className
    }
    if (id !== null) {
        tag.id = id
    }
    if (value !== null) {
        tag.value = value
    }
    if (name !== null) {
        tag.name = name
    }
    if (placeholder !== null) {
        tag.placeholder = placeholder
    }
    return tag;
}

function getOption(obj) {
    let option = newTag('option', null, null, null, obj.value, obj.text)
    if (obj.selected) {
        option.selected = "selected"
    }
    return option
}

function hideChildren(parentTag, tagName, from, to) {
    parentTag.querySelectorAll(tagName)
        .forEach((tag, tagIndx) => {
            if (tagIndx >= from && tagIndx <= to) {
                tag.style.display = 'none'
            }
        })
}

function changeTheme() {
    let themeType = document.getElementById('displayAs').value
    if (themeType === 'normal') {
        document.querySelectorAll('tr')
            .forEach( (tr, trIndx) => {
                if (trIndx === 0) {
                    hideChildren(tr, 'th', 4,6)
                    return
                }
                if (trIndx === 1) {
                    hideChildren(tr, 'th', 0, 15)
                    return
                }
                hideChildren(tr, 'td', 4, 19)
            })
    } else if (themeType === 'detail'){
        document.querySelectorAll('tr td[style], tr th[style]')
            .forEach((td, tdIdx) => td.removeAttribute('style'))
    }
}

function addLabel(tag, label) {
    if (label === null) {
        return tag
    }
    let bound = document.createElement('div')
    bound.className = 'form-bound'
    let labelTag = document.createElement('span')
    labelTag.className = 'label-tag'
    labelTag.textContent = label
    bound.appendChild(labelTag)
    bound.appendChild(tag)
    return bound
}

function getSelect(id, name, className, options, onchangecallback, label = null) {
    let select = newTag('select', id, name, className, null, null, null)
    if (onchangecallback !== null) {
        select.onchange = onchangecallback
    }
    options.forEach(option => select.appendChild(getOption(option)))
    if (label !== null) {

    }
    return addLabel(select, label)
}

function getInput(id, name, className, value, text, placeholder, onchangecallback, label = null) {
    let input = newTag('input', id, name, className, value, text, placeholder)
    if (onchangecallback !== null) {
        input.onchange = onchangecallback
    }
    return addLabel(input, label)
}

function getCheckbox(id, name, className, value, text, placeholder, onchangecallback, label = null) {
    let checkbox = newTag('input', id, name, className, value, text, placeholder)
    checkbox.style.display = "inline";
    checkbox.type = "checkbox";
    if (onchangecallback !== null) {
        checkbox.onchange = onchangecallback
    }
    return addLabel(checkbox, label)
}

function getButton(id, name, className, text, callbackonclick = null) {
    let tag = newTag('button', id, name, className, null, text, null)
    if (callbackonclick !== null) {
        tag.onclick = callbackonclick
    }
    return tag;
}

function getFloatByClassName(tag, className) {
    let child = tag.querySelector("." + className)
    if (child === null || child.textContent === '') {
        return -1
    }
    return parseFloat(child.textContent.replaceAll(',', ''))
}

function initRow(tagsConfig) {
    let row = newTag('div', null, null, 'row', null, null)
    tagsConfig.forEach(tag => row.appendChild(tag))
    return row;
}

function initFirstRow() {
    let tags = [
        getSelect('displayAs', 'display-as', 'display-as inpt', [
            {value: 'normal', text: 'Đơn giản', selected: false},
            {value: 'detail', text: 'Chi tiết', selected: true},
        ], changeTheme, 'Chế độ hiển thị: '),
        getSelect('stockType', 'stock-type', 'stock-type inpt', [
            {value: 'all', text: 'Tất cả', selected: true},
            {value: 'noWarrant', text: 'Không có chứng quyền', selected: false},
        ], filterValue, 'Hiển thị: '),
        getSelect('removeBy', 'remove-by', 'remove-by inpt', [
            {value: 'all', text: 'Mặc định', selected: true},
            {value: 'whiteInAll', text: 'Mã không giao dịch', selected: false},
            {value: 'whiteInSold', text: 'Trắng bên bán', selected: false},
            {value: 'whiteInBuy', text: 'Trắng bên mua', selected: false},
        ], filterValue, 'Loại bỏ: '),
        getSelect('filterBy', 'filterBy', 'filter-by inpt', [
            {value: 'ceiling', text: 'Giá trần', selected: false},
            {value: 'floor', text: 'Giá sàn', selected: false},
            {value: 'refPrice', text: 'Giá tham chiếu', selected: true},
            {value: 'highest', text: 'Giá cao nhất', selected: false},
            {value: 'lowest', text: 'Giá thấp nhất', selected: false},
            {value: 'nmTotalTradedQty', text: 'Tổng khối lượng', selected: false},
        ], filterValue, 'Lọc theo:'),
        getInput('filterFrom', 'from', 'w75', null, null, '', filterValue, "Từ: "),
        getInput('filterTo', 'to', 'w75', null, null, '', filterValue, "Đến: "),
        getButton('btnFilter', null, 'btn btn-filter', 'Lọc', filterValue),

        getInput('stockId', 'to', 'w75', null, null, '', null, "Mã CK: "),
        getInput('priceThatBought', 'to', 'w75', null, null, '', null, "Giá đã mua: "),
        getButton('btnAdd', null, 'btn btn-add', 'Thêm mã', addNewStock),
    ]

    return initRow(tags);
}

function getItemfromDataById(id) {
    if (isBlank(id)) {
        return null
    }
    let item = CM.data.filter(item => item.id === id)
    if (item.length <= 0) {
        return
    }
    return item[0]
}

function addNewStock() {
    let stockId = document.getElementById('stockId').value
    let priceThatBoughtInStr = document.getElementById('priceThatBought').value

    if (isAnyBlank(stockId, priceThatBoughtInStr)) {
        return
    }
    let validId = stockId.toUpperCase()

    let priceThatBought = parseFloat(priceThatBoughtInStr)
    let item = getItemfromDataById(validId)

    if (item == null) {
        return
    }

    let obj = {
        id: stockId.toUpperCase(),
        value: priceThatBought,
        lowest: item.best1Offer,
        highest: item.best3Offer,
    }

    addItemToMyInfo(obj)
    document.getElementById('stockId').value = ''
    document.getElementById('priceThatBought').value = ''

    reloadInfo()
}

function getTable(headerConfig, bodyConfig) {
    let table = newTag('table', 'myTable', null, 'my-table', null, null)
    if (headerConfig !== null) {
        let thead = newTag('thead', null, null, null, null, null)
        headerConfig.forEach(tag => thead.appendChild(tag))
        table.appendChild(thead)
    }
    let tbody = newTag('tbody', 'my-body-info', null, null, null, null)
    bodyConfig.forEach(tag => {
        tbody.appendChild(tag)
    })
    table.appendChild(tbody)
    return table;
}

function getATag(id, className, text, href = 'javascript:;', callbackonclick = null, target = null) {
    let aTag = newTag('a', id, null, className, null, text)
    aTag.href = href
    if (target != null) {
        aTag.target = target
    }
    if (callbackonclick !== null) {
        aTag.onclick = callbackonclick
    }
    return aTag
}

function getTrTag(tds, className = null) {
    let trTag = newTag('tr', null, null, className, null, null)
    tds.forEach(item => {
        let tdTag = newTag(item.type, item.id, null, item.class, null, item.text)
        if (item.eventName !== undefined) {
            tdTag[item.eventName] = item.event
        }
        if (item.children !== undefined && item.children !== null) {
            item.children.forEach(child => tdTag.appendChild(child))
        }
        trTag.appendChild(tdTag)
    })
    return trTag;
}

function initTrsTagFromTrade() {
    if (CM.trade === null || Object.keys(CM.trade).length === 0 ) {
        return []
    }
    let trs = []
    for (id in CM.trade) {
        let validId = id.toUpperCase()
        let tradeItem = CM.trade[id]
        let className = 'highlightable ' + (tradeItem.value <= tradeItem.lowest ? 'bg-up' : 'bg-down')
        let percent = Math.round((tradeItem.value - tradeItem.lowest) * 100) / 100
        let tds = [
            { type: 'td', id: `stockId-${validId}`, name: null, class: '', value: null, text: '', eventName: 'onclick', event: () => {
                let trsTag = document.getElementById(validId);
                let firstTd = trsTag.getElementsByTagName("td")[0];
                    firstTd.click();
                }, children: [
                    getATag(null, null, `${validId}`, `https://iboard.ssi.com.vn/chart/?symbol=${validId}&language=vi&theme=dark`, null, '_blank')
                ] },
            { type: 'td', id: `myPrice-${validId}`, name: null, class: className, value: null, text: tradeItem.value },
            { type: 'td', id: `percentVal-${validId}`, name: null, class: '', value: null, text: percent },
            { type: 'td', id: `lowestPrice-${validId}`, name: null, class: '', value: null, text: tradeItem.lowest },
            { type: 'td', id: `highestPrice-${validId}`, name: null, class: '', value: null, text: tradeItem.highest },
            { type: 'td', id: `action-${validId}`, name: null, class: '', value: null, text: '', children: [
                getATag(null, null, 'remove', 'javascript:;', () => {
                    removeItemOutMyInfo(tradeItem)
                    reloadInfo()
                    }) ] },
        ]
        trs.push(getTrTag(tds))
    }
    return  trs
}

function initSecondRow() {
    let tags = [
        getTable([
            getTrTag([
                {type: 'th', id: null, name: null, class: null, value: null, text: 'Mã CK'},
                {type: 'th', id: null, name: null, class: null, value: null, text: 'Giá mua'},
                {type: 'th', id: null, name: null, class: null, value: null, text: 'Lệch so với giá bán thấp nhất'},
                {type: 'th', id: null, name: null, class: null, value: null, text: 'Giá bán thấp nhất'},
                {type: 'th', id: null, name: null, class: null, value: null, text: 'Giá bán cao nhất'},
                {type: 'th', id: null, name: null, class: null, value: null, text: '#'},
            ])
        ], initTrsTagFromTrade())
    ]

    return initRow(tags);
}


function addContainer() {
    let container = newTag('div', 'filterForm', 'filterForm', 'filter-form', null, null)

    container.appendChild(initFirstRow())
    container.appendChild(initSecondRow())
    document.body.appendChild(container)
}

function initData() {
    CM.data = []

    document.querySelectorAll("#table-body-scroll > tr").forEach(trItem => {
        let id = trItem.id
        CM.data.push({
            id: trItem.id,
            name: trItem.querySelector(".stockSymbol").getAttribute("data-tooltip"),
            ceiling: getFloatByClassName(trItem, 'ceiling'),
            floor: getFloatByClassName(trItem, "floor"),

            best3Bid: getFloatByClassName(trItem, "best3Bid"),
            best3BidVol: getFloatByClassName(trItem, "best3BidVol"),
            best2Bid: getFloatByClassName(trItem, "best2Bid"),
            best2BidVol: getFloatByClassName(trItem, "best2BidVol"),
            best1Bid: getFloatByClassName(trItem, "best1Bid"),
            best1BidVol: getFloatByClassName(trItem, "best1BidVol"),

            matchedPrice: getFloatByClassName(trItem, "matchedPrice"),
            matchedVolume: getFloatByClassName(trItem, "matchedVolume"),

            best1Offer: getFloatByClassName(trItem, "best1Offer"),
            best1OfferVol: getFloatByClassName(trItem, "best1OfferVol"),
            best2Offer: getFloatByClassName(trItem, "best2Offer"),
            best2OfferVol: getFloatByClassName(trItem, "best2OfferVol"),
            best3Offer: getFloatByClassName(trItem, "best3Offer"),
            best3OfferVol: getFloatByClassName(trItem, "best3OfferVol"),

            refPrice: getFloatByClassName(trItem, "refPrice"),
            highest: getFloatByClassName(trItem, "highest"),
            lowest: getFloatByClassName(trItem, "lowest"),
            nmTotalTradedQty: getFloatByClassName(trItem, "nmTotalTradedQty"),
            node: trItem,
            isWhiteInBuy: function() {
                return this.best1Bid <= 0 && this.best2Bid <= 0 && this.best3Bid <= 0;
            },
            isWhiteInSold: function () {
                return this.best1Offer <= 0 && this.best2Offer <= 0 && this.best3Offer <= 0;
            },
            isWriteInAll: function () {
                return this.isWhiteInBuy() && this.isWhiteInSold();
            }
        })
    })
}

function updateTextForNode(id, val) {
    let node = document.getElementById(id)
    if (node == null) {
        return
    }
    node.textContent = val
}

function updateClassForNode(id, val) {
    let node = document.getElementById(id)
    if (node == null) {
        return
    }
    node.className = val
}

function reloadInfo() {
    initData()

    for (id in CM.trade) {
        let validId = id.toUpperCase()
        let tradeItem = CM.trade[id]
        let item = getItemfromDataById(validId)
        if (item == null) {
            continue
        }
        let className = 'highlightable ' + (tradeItem.value >= item.best1Offer ? 'bg-down' : 'bg-up')
        updateClassForNode(`myPrice-${validId}`, className)
        let percent = Math.round((tradeItem.value - item.best1Offer) * 100) / 100
        updateTextForNode(`percentVal-${validId}`, percent)
        updateTextForNode(`lowestPrice-${validId}`, item.best1Offer)
        updateTextForNode(`highestPrice-${validId}`, item.best3Offer)
    }
}


CM.trade = fetchFromDatabase()

/// main here
addContainer()


let span = newTag('span', 'countDown', null, 'count-down', null, 'Vui lòng đợi 10 giây')
document.body.appendChild(span)

let curVal = 10
let pid = setInterval(() => {
    curVal--
    document.getElementById('countDown').textContent = `Vui lòng đợi ${curVal} giây`
}, 1000)

setTimeout(() => {
    document.querySelector(".sidebar").remove()
    document.getElementById("target").remove()
    document.getElementsByTagName("header")[0].remove()
    //document.getElementById("header-price-table").style.top = "0px"
    //document.querySelector(".tableContainer").style.paddingTop = "120px"
    //document.getElementById("header-fixed-table").style.top = "81px"
    //document.getElementById("table-table-scroll").style.marginTop = "15px"

    //document.querySelectorAll("#header-fixed > tr:first-child > th:nth-child(n+5):nth-child(n)").forEach(item => (item).remove())
    //document.querySelector("#header-row").remove()
    //document.querySelectorAll("#header-row > th:nth-child(n+1):nth-child(n)").forEach(item => (item).remove())
    //document.querySelectorAll(".priceCell, .priceChange, .priceChangePercent, .nmTotalTradedQty, .highest, .lowest, .buyForeignQtty, .sellForeignQtty, .remainForeignQtty").forEach(item => (item).remove())
    //document.querySelectorAll("td").forEach(item => item.removeAttribute("width"))
    //document.querySelectorAll("colgroup").forEach(item => item.remove())
    document.querySelectorAll('.tableContainer tr').forEach(item => {
        item.removeAttribute('class')
        item.removeAttribute('data-scroll-page')
    })

    reloadInfo()

    changeTheme()

    clearInterval(pid)
    document.getElementById('countDown').style.display = 'none'
}, 10000)

let pid2 = setInterval(() => {
    //update status
    reloadInfo()
}, 5000)