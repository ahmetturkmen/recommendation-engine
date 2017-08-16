const fs = require('fs');
const isUpperCase = require('is-upper-case');
let objectOfUsers = {}
let readData = new Promise(function (resolve, reject) {
    fs.readFile('/home/geek/Desktop/activity-logs.csv', 'utf8', (err, data) => {
        if (err)
            reject(err);
        resolve(data);
    });

});

readData.then(data => {
    let temp = data.split('\r'), symbol
    let temporaryString; let userAndSymbol = [];
    temp.forEach((element) => {
        [_, __, userId, symbolString, ___, _____] = element.split(';');
        if (symbolString !== undefined && symbolString.includes('/?symbol=')) {
            symbol = symbolString.slice(symbolString.indexOf('=') + 1, symbolString.indexOf('&'));
                userAndSymbol.push(userId + ' ' + symbol)
        }
    })
     createObject(userAndSymbol)
    console.log(objectOfUsers)
})
    .catch((err) => console.log('Error happened : ' + err));

function createObject(userIdAndSymbol) {
    let counter;
    userIdAndSymbol.forEach(function(element) {
        [userId, symbol] = element.split(' ')
        if (objectOfUsers[userId] === undefined)
            objectOfUsers[userId] = {};
        if (objectOfUsers[userId] !== undefined)
            if (objectOfUsers[userId][symbol] === undefined && isUpperCase(symbol)) {
                counter = 1
                objectOfUsers[userId][symbol] = counter
            }
            else if (objectOfUsers[userId][symbol] !== undefined && isUpperCase(symbol)) {
                counter++
                objectOfUsers[userId][symbol] = counter
            }
    });
}