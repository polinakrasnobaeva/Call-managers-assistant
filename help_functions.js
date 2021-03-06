/*jslint sloppy: true*/

var debug = false,
    log,
    logG,
    logGE,
    logT,
    logTE,
    a = function (a) {};

if (debug) {
    log = console.log.bind(console);
    logG = console.group.bind(console);
    logGE = console.groupEnd.bind(console);
    logT = console.time.bind(console);
    logTE = console.timeEnd.bind(console);
} else {
    log = a;
    logG = a;
    logGE = a;
    logT = a;
    logTE = a;
}


//getStorage('CallManagersAssistant', function(storage) {
//    log('rand!');
//    storage.lastCheckRelevanceBD = Math.random();
//    //return storage;
//})


function isEmptyObject(obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
}

function in_array(value, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) return true;
    }
    return false;
}

function getStorage(storageName, func) {
    chrome.storage.local.get(storageName, function (result) {
        var storage = result[storageName],
            result;

        if (isEmptyObject(storage)) {
             storage = storageInit();
        } else {
            storage = JSON.parse(storage);
        }

        result = func(storage);

        if (result == null) return;

        setStorage(storageName, result);
    });
}

function setStorage(storageName, storage) {
    var objToSave = {};
    objToSave[storageName] = JSON.stringify(storage);
    log('Сейчас сохраняется в базу:')
    log(objToSave);
    chrome.storage.local.set(objToSave);
}

function storageInit() {
    return {
        BD : {},
//        lastCheckRelevanceBD: 0,
//        lastModifiedHTTPS: 0,
        logAndPassСorrectly: null,
        login: "",
        pass: ""
    };
};
