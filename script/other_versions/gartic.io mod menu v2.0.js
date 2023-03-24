// ==UserScript==
// @name         gartic.io mod menu
// @name:tr      gartic.io mod menüsü
// @name:az      gartic.io mod menyusu
// @name:ar      قائمة تعديل gartic.io
// @name:br      menu de mod gartic.io
// @namespace    http://tampermonkey.net/
// @version      2.0
// @homepageURL  https://github.com/anonimbiri/gartic.io-hack
// @supportURL   https://github.com/anonimbiri/gartic.io-hack/issues
// @description    drawing bot, answer assistant and many more features
// @description:tr çizim botu, cevap yardımcısı ve daha birçok özellik
// @description:az rəsm bot, cavab köməkçisi və bir çox digər xüsusiyyətlər
// @description:ar رسم بوت ، مساعد الإجابة والعديد من الميزات
// @description:br bot de desenho, assistente de resposta e muitos outros recursos
// @author       Anonim Biri
// @match        https://gartic.io/*
// @icon         https://i.imgur.com/nTF84Id.png
// @require https://greasyfork.org/scripts/462013-abnormal-menu/code/Abnormal%20Menu.js?version=1162637
// @grant        none
// @run-at       document-start
// ==/UserScript==

/*------------------------------------------------------------------------------
TR: Dil bölümü
EN: Language section
------------------------------------------------------------------------------*/

let LANG = navigator.language || navigator.languages[0] || 'en';
let LOCALE = {
    en: {
        mod_menu: "Mod Menu",
        draw: "Draw",
        drawing_bot: "Drawing Bot",
        open_menu_key: "Open Menu Key",
        drag_or_click: "Drag or Click",
        language_list: "Language List",
        turkish: "Turkish",
        english: "English",
        arabic: "Arabic",
        azerbaijani: "Azerbaijani",
        portuguese: "Portuguese",
        brazilian_portuguese: "Brazilian Portuguese",
        anti_afk: "Anti AFK",
        auto_report: "Auto Report",
        auto_skip: "Auto Skip",
        auto_kick: "Auto Kick",
        auto_answer: "Auto Answer",
        rainbow_drawing: "Rainbow Drawing",
        disabled: "Disabled",
        enabled: "Enabled",
        feature_is: "{option} feature is {status}",
        select_image: "Please select an image",
        drawing_started: "Drawing started",
        drawing_completed: "Drawing completed"
    },
    tr: {
        mod_menu: "Mod Menü",
        draw: "Çiz",
        drawing_bot: "Çizim Botu",
        open_menu_key: "Menü Açma Tuşu",
        drag_or_click: "Sürükle Bırak veya Tıkla",
        language_list: "Dil Listesi",
        turkish: "Türkçe",
        english: "İngilizce",
        arabic: "Arapça",
        azerbaijani: "Azerice",
        portuguese: "Portekizce",
        brazilian_portuguese: "Brezilya Portekizcesi",
        anti_afk: "Anti AFK",
        auto_report: "Otomatik Rapor",
        auto_skip: "Otomatik Geç",
        auto_kick: "Otomatik At",
        auto_answer: "Otomatik Cevap",
        rainbow_drawing: "Gökkuşağı Çizimi",
        disabled: "Devre Dışı",
        enabled: "Etkin",
        feature_is: "{option} özelliği {status} durumunda",
        select_image: "Lütfen resim seçin",
        drawing_started: "Çizim başladı",
        drawing_completed: "Çizim işlemi bitti"
    },
    az: {
        mod_menu: "Mod Menyu",
        draw: "Cəkil",
        drawing_bot: "Çəkil Botu",
        open_menu_key: "Menyu Açma Düyməsi",
        drag_or_click: "Sürüklə və ya Tıkla",
        language_list: "Dil Siyahısı",
        turkish: "Türkcə",
        english: "İngiliscə",
        arabic: "Ərəbcə",
        azerbaijani: "Azərbaycan dili",
        portuguese: "Portuqal dili",
        brazilian_portuguese: "Braziliya portuqal dili",
        anti_afk: "AFK Anti",
        auto_report: "Avtomatik hesabat",
        auto_skip: "Avtomatik keç",
        auto_kick: "Avtomatik at",
        auto_answer: "Avtomatik cavab",
        rainbow_drawing: "Gökboya çəkmə",
        disabled: "Deaktiv",
        enabled: "Aktiv",
        feature_is: "{option} xüsusiyyəti {status} halında",
        select_image: "Zəhmət olmasa şəkil seçin",
        drawing_started: "Çəkmə başladı",
        drawing_completed: "Çəkmə tamamlandı"
    },
    ar: {
        mod_menu: "Mod Menu",
        draw: "Draw",
        drawing_bot: "Drawing Bot",
        open_menu_key: "Open Menu Key",
        drag_or_click: "Drag or Click",
        language_list: "Language List",
        turkish: "Turkish",
        english: "English",
        arabic: "Arabic",
        azerbaijani: "Azerbaijani",
        portuguese: "Portuguese",
        brazilian_portuguese: "Brazilian Portuguese",
        anti_afk: "Anti AFK",
        auto_report: "Auto Report",
        auto_skip: "Auto Skip",
        auto_kick: "Auto Kick",
        auto_answer: "Auto Answer",
        rainbow_drawing: "Rainbow Drawing",
        disabled: "Disabled",
        enabled: "Enabled",
        feature_is: "{option} feature is {status}",
        select_image: "Please select an image",
        drawing_started: "Drawing started",
        drawing_completed: "Drawing completed"
    },
    pt_br: {
        mod_menu: "Mod Menu",
        draw: "Draw",
        drawing_bot: "Drawing Bot",
        open_menu_key: "Open Menu Key",
        drag_or_click: "Drag or Click",
        language_list: "Language List",
        turkish: "Turkish",
        english: "English",
        arabic: "Arabic",
        azerbaijani: "Azerbaijani",
        portuguese: "Portuguese",
        brazilian_portuguese: "Brazilian Portuguese",
        anti_afk: "Anti AFK",
        auto_report: "Auto Report",
        auto_skip: "Auto Skip",
        auto_kick: "Auto Kick",
        auto_answer: "Auto Answer",
        rainbow_drawing: "Rainbow Drawing",
        disabled: "Disabled",
        enabled: "Enabled",
        feature_is: "{option} feature is {status}",
        select_image: "Please select an image",
        drawing_started: "Drawing started",
        drawing_completed: "Drawing completed"
    }
};

function getTranslation(key, language) {
    // Eğer dil belirtilmemişse veya belirtilen dil listede yoksa İngilizce kullanılır
    if (!language || !LOCALE[language]) {
        language = "en";
    }

    // Anahtar listede yoksa veya çevirisi yoksa anahtar kullanılır
    if (!LOCALE[language][key]) {
        return key;
    }

    return LOCALE[language][key];
}

let settingData = {
    "world_list_lang":"en",
    "anti_afk": false,
    "auto_kick": false,
    "auto_report": false,
    "auto_skip": false,
    "rainbow_drawing": false,
    "rainbow_drawing_ms": 10,
    "auto_answer": false,
    "auto_answer_ms": 1000,
    "open_menu_key": new KeyboardEvent('keydown', { code: 'KeyM', ctrlKey: true, key: 'M' }),
};

var menu = new CreateMenu({title:getTranslation('mod_menu',LANG)});
const screenWidth = window.innerWidth;
var worldListMenu = new CreateMenu({title:getTranslation('mod_menu',LANG), startX:screenWidth - 300, startY:10 , width:300, height:700, pin: true});

var selectMenu = menu.addSelectMenu({label:getTranslation('language_list',LANG), options:[
    { name: getTranslation('english', LANG), value: 'en' },
    { name: getTranslation('turkish', LANG), value: 'tr' },
    { name: getTranslation('azerbaijani', LANG), value: 'az' },
    { name: getTranslation('arabic', LANG), value: 'ar' },
    { name: getTranslation('portuguese', LANG), value: 'pt_br' },
    { name: getTranslation('brazilian_portuguese', LANG), value: 'indo' }
]})


selectMenu.on('change', (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex].value;
    fetch(`https://raw.githubusercontent.com/anonimbiri/gartic.io-hack/main/world_list/${selectedOption}.json`)
        .then(response => response.json())
        .then(data => {
        console.log(data.world_list);
        wordList = data.world_list;
    });
});



let file = null;
menu.addFileDrop({label:getTranslation('drawing_bot',LANG),title:getTranslation('drag_or_click',LANG)}).on('Filedrop', (e) => {
    file = e.detail;
});

menu.addButton({title:getTranslation('draw',LANG)}).on('click', (e) => {
    console.log(file);
    if(file){
        new SendToast({title:getTranslation('drawing_bot',LANG), message:getTranslation('drawing_started', LANG), type:"Info"});
        image.src = URL.createObjectURL(file[0]);
        console.log(e.target.innerHTML);
    }else{
        new SendToast({title:getTranslation('drawing_bot',LANG), message:getTranslation('select_image', LANG), type:"Error"});
    }
});
menu.addSwitch({label:getTranslation('anti_afk',LANG)}).on('change', (e) => {
    settingData.anti_afk = e.target.checked;
    new SendToast({message:getTranslation('feature_is', LANG).replace('{option}', getTranslation('anti_afk', LANG)).replace('{status}', e.target.checked ? getTranslation('enabled', LANG) : getTranslation('disabled', LANG)), type:"Success"});
});


menu.addSwitch({label:getTranslation('auto_kick',LANG)}).on('change', (e) => {
    settingData.auto_kick = e.target.checked;
    new SendToast({message:getTranslation('feature_is', LANG).replace('{option}', getTranslation('auto_kick', LANG)).replace('{status}', e.target.checked ? getTranslation('enabled', LANG) : getTranslation('disabled', LANG)), type:"Success"});
});
menu.addSwitch({label:getTranslation('auto_report',LANG)}).on('change', (e) => {
    settingData.auto_report = e.target.checked;
    new SendToast({message:getTranslation('feature_is', LANG).replace('{option}', getTranslation('auto_report', LANG)).replace('{status}', e.target.checked ? getTranslation('enabled', LANG) : getTranslation('disabled', LANG)), type:"Success"});
});
menu.addSwitch({label:getTranslation('rainbow_drawing',LANG)}).on('change', (e) => {
    settingData.rainbow_drawing = e.target.checked;
    new SendToast({message:getTranslation('feature_is', LANG).replace('{option}', getTranslation('rainbow_drawing', LANG)).replace('{status}', e.target.checked ? getTranslation('enabled', LANG) : getTranslation('disabled', LANG)), type:"Success"});
});
menu.addSwitch({label:getTranslation('auto_skip',LANG)}).on('change', (e) => {
    settingData.auto_skip = e.target.checked;
    new SendToast({message:getTranslation('feature_is', LANG).replace('{option}', getTranslation('auto_skip', LANG)).replace('{status}', e.target.checked ? getTranslation('enabled', LANG) : getTranslation('disabled', LANG)), type:"Success"});
});
menu.addSwitch({label:getTranslation('auto_answer',LANG)}).on('change', (e) => {
    settingData.auto_answer = e.target.checked;
    new SendToast({message:getTranslation('feature_is', LANG).replace('{option}', getTranslation('auto_answer', LANG)).replace('{status}', e.target.checked ? getTranslation('enabled', LANG) : getTranslation('disabled', LANG)), type:"Success"});
});
menu.addHotkey({label:getTranslation('open_menu_key',LANG), keyevent: settingData.open_menu_key}).on('Hotkey', (e) => {
    settingData.open_menu_key = e.detail;
});
new SendToast({message:"to open the menu, press Ctrl + M", icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAQAAADlauupAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQfmCRsQBQIJntbJAAAA80lEQVQ4y8WSP8rCUBDEf/uZwCuCN/ECXsQ/F7KxFaKksIreISmsRTBHSGmXYCUEMxZPBUEb84EDC7PD7jze7sKvYVKvB/3+d+3nM1JR6GsUBZ40jZQk0ukklaW0Xnt9t/Mhea0sfU2S+B7pblBVaoNAbZZJaSo55/XxWBqNPHdOSlO1WaY2CKSqkiSTpC5D/HvJNJvBagVNA5MJOhxgv4fpFK5XWCzQfP7ZwMyQ2SPBzOARd+3Jn2v8ly/UNQpDlOew3doHwGaD8hyFIdQ1QOANogiLYxgM4HKRlsv37w2HmHMQxxBFfm5dDqk9Hruf8s9xA/KFIrPBQJcRAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTA5LTI3VDE2OjA1OjAyKzAwOjAwmRa+2wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wOS0yN1QxNjowNTowMiswMDowMOhLBmcAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjItMDktMjdUMTY6MDU6MDIrMDA6MDC/Xie4AAAAAElFTkSuQmCC", type:"Info"});

playerİd = null;
playerServerİd = null;
playerLang = 2;
players = [];
hit = false;
var autoAnswer = null;

let langMatch = {
    code: {
        23:"az",
        8:"tr",
        19:"ar",
        1:"pt_br",
        45:"indo",
        2:"en"
    },
    index: {
        23:2,
        8:1,
        19:3,
        1:4,
        45:5,
        2:0
    }
};

newWs=null;

window.WebSocket = new Proxy(WebSocket, {
    construct(target, args) {
        let ws = new target(...args);
        ws.send = new Proxy(ws.send, {
            apply(target, thisArg, args) {
                //console.log(args[0]);
                return Reflect.apply(...arguments);
            }
        });
        newWs = ws;
        ws.addEventListener('message', (event) => {
            //console.log(event.data);
            if (!event.data.includes('[')) return;
            const data = JSON.parse(event.data.replace(/^\d+/g, ''));
            //console.log(data);
            switch (data[0]) {
                case 13: {
                    console.log(data[2]);
                    break;
                }
                case 5: {
                    playerİd = data[1];
                    playerServerİd = data[2];
                    playerLang = data[4].idioma;
                    console.log(playerLang);
                    players = data[5];
                    fetch(`https://raw.githubusercontent.com/anonimbiri/gartic.io-hack/main/world_list/${langMatch.code[playerLang]}.json`)
                        .then(response => response.json())
                        .then(data => {
                        console.log(data.world_list);
                        wordList = data.world_list;
                    });
                    selectMenu.changeSelectedIndex(langMatch.index[playerLang]);
                    break;
                }
                case 45: {
                    if(data[2] == playerİd && settingData.auto_kick == true){
                        newWs.send(`42[45,${playerServerİd},["${data[1]}",true]]`)
                    }
                    break;
                }
                case 30: {
                    hit = true;
                    var searchWord = data[1].join("");
                    (async () => {
                        var matches = await searchWordInList(searchWord);

                        for (var i = 0; i < matches.length; i++) {
                            worldListMenu.addButton({title:matches[i]}).on('click', (e) => {
                                ws.send(`42[13,${playerServerİd},"${e.target.innerHTML}"]`);
                                e.target.style.borderColor = "red";
                                e.target.parentNode.appendChild(e.target);

                            });
                        }

                        if (settingData.auto_answer == true) {
                            let currentIndex = 0;
                            autoAnswer = setInterval(function() {
                                if (currentIndex < matches.length) {
                                    newWs.send(`42[13,${playerServerİd},"${matches[currentIndex]}"]`);
                                    currentIndex++;
                                } else {
                                    clearInterval(autoAnswer);
                                }
                            }, settingData.auto_answer_ms);
                        }

                    })()
                    break;
                }
                case 19: {
                    hit = false;
                    clearInterval(autoAnswer);
                    //remove all child element
                    while (worldListMenu.menuItemsContainer.firstChild) {
                        worldListMenu.menuItemsContainer.removeChild(worldListMenu.menuItemsContainer.firstChild);
                    }
                    break;
                }
                case 16: {
                    if(settingData.auto_skip == true){
                        newWs.send(`42[25,${playerServerİd}]`)
                    }
                    break;
                }
                case 34: {
                    if(settingData.auto_report == true){
                        newWs.send(`42[35,${playerServerİd}]`)
                    }
                    newWs.send(`42[30,${playerServerİd}]`)
                    newWs.send(`42[30,${playerServerİd}]`)
                    newWs.send(`42[30,${playerServerİd}]`)
                    newWs.send(`42[30,${playerServerİd}]`)
                    break;
                }

            }
        });
        return ws;
    }
});

setInterval(function() {
    const chatForm = document.querySelector('#chat form');
    if (chatForm) {
        let isinput = document.querySelector('input[name="chat"]').disabled;
        if(isinput==true){
            document.querySelector('#chat form').innerHTML =`<div class="textGame"><input id="chatUnlock" name="chat" type="text" class="mousetrap" placeholder="Chat Unlock" autocomplete="off" autocorrect="off" autocapitalize="off" maxlength="100" value=""><span></span><label>tab<span class="tooltip">AnonimBiri</span></label><div class="lottieAns"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 291 41" width="291" height="41" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);"><defs><clipPath id="__lottie_element_4"><rect width="291" height="41" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_4)"><g style="display: none;"><g><path></path><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4"></path></g></g><g transform="matrix(1,0,0,1,196.5,21.5)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,-0.7879999876022339,-0.5609999895095825)"><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(116,205,118)" stroke-opacity="1" stroke-width="4" d="M0 0"></path></g></g><g transform="matrix(0.800000011920929,0,0,0.800000011920929,318.20001220703125,-98.1500015258789)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path stroke-linecap="round" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(255,255,255)" stroke-opacity="1" stroke-width="6" d="M0 0"></path></g></g></g></svg></div></div>`;
        }
    }
}, 1000);


/*------------------------------------------------------------------------------
TR: Renkli çizimin olduğu kısım
EN: The part with the colored drawing
------------------------------------------------------------------------------*/

let r = 255, g = 0, b = 0;
setInterval(function() {
    if(settingData.rainbow_drawing == true){
        if (g < 255 && r == 255 && b == 0) {
            g++;
        } else if (g == 255 && r > 0 && b == 0) {
            r--;
        } else if (r == 0 && g == 255 && b < 255) {
            b++;
        } else if (r == 0 && b == 255 && g > 0) {
            g--;
        } else if (r < 255 && b == 255 && g == 0) {
            r++;
        } else if (r == 255 && b > 0 && g == 0) {
            b--;
        }
        let HexColor = rgbToHex(r,g,b);
        newWs.send(`42[10,${playerServerİd},[5,"${HexColor}"]]`)
    }
}, settingData.rainbow_drawing_ms);


setInterval(function() {
    if(settingData.anti_afk == true){
        newWs.send(`42[42,${playerServerİd}]`)
    }
}, 50000);

document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && event.target.matches('#chatUnlock')) {
        const chatUnlockValue = event.target.value;
        newWs.send(`42[11,${playerServerİd},"${chatUnlockValue}"]`)
        event.target.value = "";
    }
});



var wordList = [];
async function searchWordInList(searchWord) {
    return new Promise(resolve => {
        setTimeout(() => {
            var matchList = [];
            for (var i = 0; i < wordList.length; i++) {
                var currentWord = wordList[i].toLowerCase();
                var search = searchWord.toLowerCase();
                if (currentWord.length === search.length) {
                    var match = true;
                    for (var j = 0; j < currentWord.length; j++) {
                        if (search[j] !== '_' && search[j] !== currentWord[j]) {
                            match = false;
                            break;
                        }
                    }
                    if (match) {
                        if(!matchList.includes(currentWord)) matchList.push(currentWord);
                        //matchList.push(wordList[i]);
                    }
                }
            }
            resolve(matchList);
        }, 2000);
    });
}

var width = 100;
var height = 100;
var fit = "zoom";
document.addEventListener("keydown", function(event) {
    if (event.code == settingData.open_menu_key.code && event.ctrlKey == settingData.open_menu_key.ctrlKey && event.altKey == settingData.open_menu_key.altKey && event.shiftKey == settingData.open_menu_key.shiftKey) {
        MenuShowHide();
    }
});

/*------------------------------------------------------------------------------
TR: Çizim botunun olduğu kısım
EN: The part where the drawing bot is
------------------------------------------------------------------------------*/

let brushDiameter = 4;
let dots = [];
var image = new Image();
image.crossOrigin = "Anonymous";
image.onload = function() {
    brushDiameter = document.querySelector('[name="size"]').value || 4;
    let lines = generateLines(image);
    lines.sort((line1, line2) => {
        return line2.length - line1.length;
    });
    lines.forEach((line,index) => {
        drawImage(line.start.x, line.start.y, line.end.x, line.end.y, line.color);
        let gameCanvas = document.querySelector('#drawing canvas');
        const context = gameCanvas.getContext('2d');
        context.beginPath();
        context.moveTo(line.start.x, line.start.y);
        context.lineTo(line.end.x, line.end.y);
        context.strokeStyle = line.color.replace('x','#');
        context.stroke();
    });
    new SendToast({title:getTranslation('drawing_bot',LANG), message:getTranslation('drawing_completed',LANG), type:"Success"});
}

let generateLines = function (img) {
    let gameBackgroundColor = new Color(255, 255, 255, 255) // white;
    let transparentColor = new Color(0, 0, 0, 0);
    let gameCanvas = document.querySelector('#drawing canvas');

    let imageDrawWidth = gameCanvas.width / brushDiameter;
    let imageDrawHeight = gameCanvas.height / brushDiameter;
    let imageData = imageHelper.scaleImage(img, { width: imageDrawWidth, height: imageDrawHeight, scaleMode: 'scaleToFit' });

    let xOffset = (gameCanvas.width - imageData.width * brushDiameter) / 2;
    let yOffset = (gameCanvas.height - imageData.height * brushDiameter) / 2;

    let horizontalLines = [];
    let startX;
    let currColor = {};
    let lineColor = {};
    let Colorid = null;

    // Horizontally
    for (let y = 0; y < imageData.height; y++) {
        startX = 0;
        lineColor = imageHelper.getPixelColor(imageData, 0, y);
        lineColor = getNearestAvailableColor(lineColor);

        for (let x = 1; x < imageData.width; x++) {
            currColor = imageHelper.getPixelColor(imageData, x, y);
            currColor = getNearestAvailableColor(currColor);

            if (!currColor.isEqual(lineColor)) {
                if (!lineColor.isEqual(transparentColor) && !lineColor.isEqual(gameBackgroundColor)) {
                    let lineStartX = (startX * brushDiameter) + xOffset;
                    let lineEndX = ((x - 1) * brushDiameter) + xOffset;

                    horizontalLines.push({
                        start: {
                            x: lineStartX,
                            y: (y * brushDiameter) + yOffset,
                        },
                        end: {
                            x: lineEndX,
                            y: (y * brushDiameter) + yOffset,
                        },
                        length: lineEndX - lineStartX,
                        color: rgbToHex(currColor.r,currColor.g,currColor.b),
                        brushDiameter: brushDiameter
                    });
                }

                startX = x;
                lineColor = currColor;
            }
        }
    }

    // Vertically
    let verticalLines = [];
    let startY;
    for (let x = 0; x < imageData.width; x++) {
        startY = 0;
        lineColor = imageHelper.getPixelColor(imageData, x, 0);
        lineColor = getNearestAvailableColor(lineColor);

        for (let y = 1; y < imageData.height; y++) {
            currColor = imageHelper.getPixelColor(imageData, x, y);
            currColor = getNearestAvailableColor(currColor);

            if (!currColor.isEqual(lineColor)) {
                if (!lineColor.isEqual(transparentColor) && !lineColor.isEqual(gameBackgroundColor)) {
                    let lineStartY = (startY * brushDiameter) + yOffset;
                    let lineEndY = ((y - 1) * brushDiameter) + yOffset;

                    verticalLines.push({
                        start: {
                            x: (x * brushDiameter) + xOffset,
                            y: lineStartY,
                        },
                        end: {
                            x: (x * brushDiameter) + xOffset,
                            y: lineEndY,
                        },
                        length: lineEndY - lineStartY,
                        color: rgbToHex(currColor.r,currColor.g,currColor.b),
                        brushDiameter: brushDiameter
                    });
                }

                startY = y;
                lineColor = currColor;
            }
        }
    }

    return ((horizontalLines.length < verticalLines.length) ? horizontalLines : verticalLines);
};

let imageHelper = {
    scaleImage: function (img, options) {
        // Setting options or using default values if they don't exist
        let size = {
            width: options.width || 767,
            height: options.height || 448,
        };
        let scaleMode = options.scaleMode || 'scaleToFit';

        let canvas = document.createElement('canvas');

        // 'Scaling an image to fit on canvas' - https://stackoverflow.com/a/23105310
        // See it live: https://codepen.io/charliezhao0916/pen/oKayxE
        let wRatio = size.width / img.width;
        let hRatio = size.height / img.height;

        let ratio;
        let scaledImageWidth;
        let scaledImageHeight;

        switch (scaleMode) {
                // Suppose image original size is 200 x 300, and size parameter is 800 x 600
                // wRatio: 800/200 = 4, hRatio: 600 / 300 = 2
            case 'scaleToFit':
                // Determine which ratio is smaller. For the example, the hRatio would be smaller.
                // The image width/height will be multiplied by this ratio, so the image size is now 400x600
                // Note: the image size will always be equal or smaller than the size parameter --> scaled to fit
                ratio = Math.min(wRatio, hRatio);

                scaledImageWidth = img.width * ratio;
                scaledImageHeight = img.height * ratio;

                // The image size is smaller than the size parameter, so we set canvas size to the image size to remove empty space
                canvas.width = scaledImageWidth;
                canvas.height = scaledImageHeight;
                break;
            case 'scaleToFill':
                // Determine which ratio is larger. For the example, the wRatio would be larger.
                // The image width/height will be multiplied by this ratio, so the image size is now 800 x 1200
                // Note: the image size will always be equal or larger than the size parameter --> scaled to fill
                ratio = Math.max(wRatio, hRatio);

                scaledImageWidth = img.width * ratio;
                scaledImageHeight = img.height * ratio;

                // The image size is larger than the size parameter, so we set canvas size to the size parameter.
                // Some parts of the image will be cut off, but we are limited to the size parameter.
                canvas.width = size.width;
                canvas.height = size.height;
                break;
        }

        // This determines from where on the canvas we are drawing the image
        // It is set so that we are always centering the image on the canvas
        let dx = (canvas.width - scaledImageWidth) / 2;
        let dy = (canvas.height - scaledImageHeight) / 2;

        // Draw the image on the canvas, this is where the scaling happens
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
        let canvasContext = canvas.getContext('2d');
        canvasContext.drawImage(img, dx, dy, scaledImageWidth, scaledImageHeight);

        return canvasContext.getImageData(0, 0, canvas.width, canvas.height);
    },

    getPixelColor: function(imageData, x, y){
        const data = imageData.data;

        // Suppose you have a 2x2 image:
        // RED PIXEL  (x:0, y:0) |       GREEN PIXEL (x:1, y:0)
        // BLUE PIXEL (x:0, y:1) | TRANSPARENT PIXEL (x:1, y:1)
        // The data array is 1-dimensional, and it looks like this:
        // [ 255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255, 0, 0, 0, 0 ]
        // |   1ST PIXEL   |   2ND PIXEL   |   3RD PIXEL   | 4TH  PIXEL |
        // Each pixel has 4 values which corresponds to rgba
        // Notice the index for the first pixel's values starts at 0, second pixel: 4, third: 8, fourth: 12
        // This can be calculated using the formula: 4*y*imageWidth + 4*x
        let i = 4 * y * imageData.width + 4 * x; // r: data[i], g: data[i+1], b: data[i+2], a: data[i+3]

        return new Color(data[i], data[i+1], data[i+2], data[i+3]);
    },

    // 'Get average color from area of image' - https://stackoverflow.com/a/44557266
    // To get the pixel data (array) from an area of the image, the solution uses: context.getImageData(x, y, width, height).data
    // This is very slow, it's much faster to get the pixel data (array) of the entire image and use indexes to get the values for the specific pixels you want
    getAverageColor: function (imageData, startX, startY, width, height) {
        let totals = { r: 0, g: 0, b: 0, weight: 0, numPixels: 0};

        for (let y = startY; y < startY + height; y++) {
            for (let x = startX; x < startX + width; x++) {
                let color = this.getPixelColor(imageData, x, y);

                // Use the alpha channel as the weight, the more transparent the pixel, the less we care about its rgb values
                let weight = color.a / 255;
                totals.r += color.r * weight;
                totals.g += color.g * weight;
                totals.b += color.b * weight;
                totals.weight += weight;
                totals.numPixels++;
            }
        }

        let averageColor = new Color(
            // The | operator stands for bitwise OR, OR 0 will truncate any decimals
            // 'Using bitwise OR 0 to floor a number' - https://stackoverflow.com/questions/7487977/using-bitwise-or-0-to-floor-a-number
            totals.r / totals.weight | 0, // r
            totals.g / totals.weight | 0, // g
            totals.b / totals.weight | 0, // b
            totals.weight / totals.numPixels, // a
        );

        return averageColor;
    },
};

class Color {
    constructor(r, g, b, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    get JSONString() {
        return JSON.stringify(this);
    }

    isEqual(color){
        return (this.r == color.r && this.g == color.g && this.b == color.b && this.a == color.a);
    }

    /*
        'Get Color Component from RGB String' - https://stackoverflow.com/questions/10970958/get-a-color-component-from-an-rgb-string-in-javascript
        Example rgbString: 'rgb(255, 0, 6)' - This can be obtained from element.style.backgroundColor
            rgbString.substring(4, rgb.length - 1): '255, 0, 6'
            .replace(/ /g, ''): '255,0,6'
            .split(','): ['255', '0', '6']
    */
    static getColorFromRGBString(rgbString) {
        let rgb = rgbString.substring(4, rgbString.length - 1).replace(/ /g, '').split(',');
        return new Color(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
    }

    // The Euclidean distance formula is sqrt(rDiff^2 + gDiff^2 + bDiff^2). However, it does not account for the way humans perceive colour, this formula should do a better job at it
    // 'Colour Metric' - https://www.compuphase.com/cmetric.htm
    static distance(color1, color2) {
        let rMean = (color1.r + color2.r) / 2;
        let rDiff = color1.r - color2.r;
        let gDiff = color1.g - color2.g;
        let bDiff = color1.b - color2.b;

        // The actual distance formula is sqrt( (2 + rMean/256)*rDiff^2 + 4*gDiff^2 + (2 + (255-rMean)/256)*bDiff^2 )
        // This simplifies to sqrt( ((512+rMean)/256)*rDiff^2 + 4*gDiff^2 + ((767-rMean)/256)*bDiff^2  )
        // 'Algorithms/Distance approximations' - https://en.wikibooks.org/wiki/Algorithms/Distance_approximations
        return Math.sqrt(((512 + rMean) / 256) * Math.pow(rDiff, 2) + 4 * Math.pow(gDiff, 2) + ((767 - rMean) / 256) * Math.pow(bDiff, 2));
    }
}

function getNearestAvailableColor(color){
    let shortestDistance = Number.MAX_SAFE_INTEGER;
    let key = color.JSONString;
    let nearestColor;

    let nearestColorLookup = {};
    let colors = [];

    let colorss = [
        // Siyahın tonları
        'rgb(0, 0, 0)',
        'rgb(20, 20, 20)',
        'rgb(40, 40, 40)',
        'rgb(60, 60, 60)',
        'rgb(80, 80, 80)',
        'rgb(100, 100, 100)',
        'rgb(120, 120, 120)',
        'rgb(140, 140, 140)',
        'rgb(160, 160, 160)',
        'rgb(180, 180, 180)',

        // Gri tonları
        'rgb(192, 192, 192)',
        'rgb(176, 176, 176)',
        'rgb(160, 160, 160)',
        'rgb(144, 144, 144)',
        'rgb(128, 128, 128)',
        'rgb(112, 112, 112)',
        'rgb(96, 96, 96)',
        'rgb(80, 80, 80)',
        'rgb(64, 64, 64)',
        'rgb(48, 48, 48)',

        // Koyu Mavi tonları
        'rgb(0, 0, 128)',
        'rgb(16, 16, 112)',
        'rgb(32, 32, 96)',
        'rgb(48, 48, 80)',
        'rgb(64, 64, 64)',
        'rgb(80, 80, 48)',
        'rgb(96, 96, 32)',
        'rgb(112, 112, 16)',
        'rgb(128, 128, 0)',
        'rgb(144, 144, 0)',

        // Açık Mavi tonları
        'rgb(135, 206, 235)',
        'rgb(119, 200, 235)',
        'rgb(103, 194, 235)',
        'rgb(87, 188, 235)',
        'rgb(71, 182, 235)',
        'rgb(55, 176, 235)',
        'rgb(39, 170, 235)',
        'rgb(23, 164, 235)',
        'rgb(7, 158, 235)',
        'rgb(0, 152, 235)',

        // Açık Gri tonları
        'rgb(220, 220, 220)',
        'rgb(210, 210, 210)',
        'rgb(200, 200, 200)',
        'rgb(190, 190, 190)',
        'rgb(180, 180, 180)',
        'rgb(170, 170, 170)',
        'rgb(160, 160, 160)',
        'rgb(150, 150, 150)',
        'rgb(140, 140, 140)',
        'rgb(130, 130, 130)',

        // Koyu Yeşil tonları
        'rgb(0, 100, 0)',
        'rgb(0, 105, 0)',
        'rgb(0, 110, 0)',
        'rgb(0, 115, 0)',
        'rgb(0, 120, 0)',
        'rgb(0, 125, 0)',
        'rgb(0, 130, 0)',
        'rgb(0, 135, 0)',
        'rgb(0, 140, 0)',
        'rgb(0, 145, 0)',

        // Açık Yeşil tonları
        'rgb(144, 238, 144)',
        'rgb(152, 251, 152)',
        'rgb(154, 255, 154)',
        'rgb(160, 255, 160)',
        'rgb(173, 255, 173)',
        'rgb(193, 255, 193)',
        'rgb(202, 255, 202)',
        'rgb(218, 255, 218)',
        'rgb(240, 255, 240)',
        'rgb(244, 255, 244)',

        // Koyu Kırmızı tonları
        'rgb(139, 0, 0)',
        'rgb(128, 0, 0)',
        'rgb(120, 0, 0)',
        'rgb(112, 0, 0)',
        'rgb(104, 0, 0)',
        'rgb(96, 0, 0)',
        'rgb(88, 0, 0)',
        'rgb(80, 0, 0)',
        'rgb(72, 0, 0)',
        'rgb(64, 0, 0)',

        // Açık Kırmızı tonları
        'rgb(255, 99, 71)',
        'rgb(255, 105, 97)',
        'rgb(255, 114, 104)',
        'rgb(255, 127, 80)',
        'rgb(255, 140, 105)',
        'rgb(255, 160, 122)',
        'rgb(255, 165, 0)',
        'rgb(255, 182, 193)',
        'rgb(255, 192, 203)',
        'rgb(255, 204, 204)',

        // Koyu Turuncu tonları
        'rgb(200, 60, 0)',
        'rgb(210, 75, 0)',
        'rgb(220, 90, 0)',
        'rgb(230, 105, 0)',
        'rgb(240, 120, 0)',
        'rgb(250, 135, 0)',
        'rgb(255, 150, 0)',
        'rgb(255, 165, 10)',
        'rgb(255, 180, 25)',
        'rgb(255, 195, 40)',

        // Açık Turuncu tonları
        'rgb(255, 200, 85)',
        'rgb(255, 205, 100)',
        'rgb(255, 210, 115)',
        'rgb(255, 215, 130)',
        'rgb(255, 220, 145)',
        'rgb(255, 225, 160)',
        'rgb(255, 230, 175)',
        'rgb(255, 235, 190)',
        'rgb(255, 240, 205)',
        'rgb(255, 245, 220)',

        // Koyu Kahve rengi tonları
        'rgb(45, 25, 0)',
        'rgb(60, 40, 0)',
        'rgb(75, 55, 0)',
        'rgb(90, 70, 0)',
        'rgb(105, 85, 0)',
        'rgb(120, 100, 0)',
        'rgb(135, 115, 0)',
        'rgb(150, 130, 0)',
        'rgb(165, 145, 0)',
        'rgb(180, 160, 0)',

        // Açık Kahve rengi tonları
        'rgb(150, 120, 90)',
        'rgb(165, 135, 100)',
        'rgb(180, 150, 110)',
        'rgb(195, 165, 120)',
        'rgb(210, 180, 130)',
        'rgb(225, 195, 140)',
        'rgb(240, 210, 150)',
        'rgb(255, 225, 160)',
        'rgb(255, 240, 170)',
        'rgb(255, 255, 180)',

        // Mor tonları
        'rgb(50, 0, 50)',
        'rgb(75, 0, 75)',
        'rgb(100, 0, 100)',
        'rgb(125, 0, 125)',
        'rgb(150, 0, 150)',
        'rgb(175, 0, 175)',
        'rgb(200, 0, 200)',
        'rgb(225, 0, 225)',
        'rgb(250, 0, 250)',
        'rgb(255, 0, 255)',

        // Pembe tonları
        'rgb(255, 192, 203)',
        'rgb(255, 182, 193)',
        'rgb(255, 160, 122)',
        'rgb(255, 105, 180)',
        'rgb(255, 20, 147)',
        'rgb(219, 112, 147)',
        'rgb(199, 21, 133)',
        'rgb(255, 0, 255)',
        'rgb(218, 112, 214)',
        'rgb(186, 85, 211)',

        // Sarı tonları
        'rgb(255, 255, 153)',
        'rgb(255, 255, 102)',
        'rgb(255, 215, 0)',
        'rgb(255, 193, 7)',
        'rgb(255, 185, 15)',
        'rgb(255, 165, 0)',
        'rgb(255, 140, 0)',
        'rgb(255, 127, 80)',
        'rgb(255, 99, 71)',
        'rgb(255, 69, 0)',

        // Ten rengi tonları
        'rgb(250, 240, 230)',
        'rgb(240, 230, 140)',
        'rgb(238, 232, 170)',
        'rgb(222, 184, 135)',
        'rgb(210, 180, 140)',
        'rgb(188, 143, 143)',
        'rgb(165, 42, 42)',
        'rgb(139, 69, 19)',
        'rgb(128, 0, 0)',
        'rgb(107, 68, 35)',

    ];


    colorss.forEach((colorr) => {
        let getcolor = Color.getColorFromRGBString(colorr);
        colors.push(getcolor);
    });

    if (color.a == 0){
        nearestColor = new Color(0, 0, 0, 0);
    }
    else if (key in nearestColorLookup) {
        nearestColor = nearestColorLookup[key];
    }
    else {
        for (let i = 0; i < colors.length; i++) {
            let distance = Color.distance(color, colors[i]);

            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestColor = colors[i];
            }
        }
        nearestColorLookup[key] = nearestColor;
    }
    return nearestColor;
}

function rgbToHex(r, g, b) {
    const hexR = r.toString(16).padStart(2, '0').toUpperCase();
    const hexG = g.toString(16).padStart(2, '0').toUpperCase();
    const hexB = b.toString(16).padStart(2, '0').toUpperCase();
    return `x${hexR}${hexG}${hexB}`;
}

function drawImage(startX,startY,stopX,stopY, color) { // tr: çizimi soket gönder // en: send drawing socket
    //newWs.send(`42[10,${playerServerİd},[6,${penSize}]]`)
    newWs.send(`42[10,${playerServerİd},[5,"${color}"]]`) //color
    newWs.send(`42[10,${playerServerİd},[2,${startX},${startY},${stopX},${stopY}]]`) //[2,x,y]
}
