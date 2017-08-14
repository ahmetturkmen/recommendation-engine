const fs = require('fs');
const isUpperCase = require('is-upper-case');
let bankLogs = [], objectOfUsers = {}, objectKeys = [];
let filteredUsers = [], temporarySymbols = [];
let readData = new Promise(function (resolve, reject) {
    fs.readFile('/home/geek/Desktop/activity-logs.csv', 'utf8', (err, data) => {
        if (err)
            reject();
        resolve(data);

    });

});

readData
    .then((data) => {
        bankLogs = splitString(data, ';')
    })
    .then(() => {
        for (let index = 2; index < bankLogs.length; index += 5) {
            objectOfUsers[bankLogs[index]] = {}
            temporarySymbols.push(bankLogs[index].concat(bankLogs[index + 1]));
        }
        Object.keys(objectOfUsers).forEach(function (element) {
            objectKeys.push(element)
        });
        for (let index = 0; index < objectKeys.length; index++)
            createObject(index);
        console.log(objectOfUsers)
    })
    .catch((err) => console.log('Error happened : ' + err));


function splitString(stringToSplit, separator) {
    let logs = [];
    let arrayOfStrings = stringToSplit.split(separator);
    arrayOfStrings.forEach(function (element) {
        logs.push(element)
    });
    return logs;
}

function createObject(indexOfFilteredUsers) {
    let counter, tempSlicedValue, tempSlicedValue2;
    temporarySymbols.forEach(function (element) {
        tempSlicedValue = element.slice(0, element.indexOf('/'));
        tempSlicedValue2 = element.slice(tempSlicedValue.length + 9, element.indexOf('&'))
        if (tempSlicedValue === objectKeys[indexOfFilteredUsers] && isUpperCase(tempSlicedValue2) && tempSlicedValue2 !== '') {
            if (objectOfUsers[objectKeys[indexOfFilteredUsers]][tempSlicedValue2] === undefined) {
                counter = 1;
                objectOfUsers[objectKeys[indexOfFilteredUsers]][tempSlicedValue2] = counter;
            }
            else if (objectOfUsers[objectKeys[indexOfFilteredUsers]][tempSlicedValue2] !== undefined) {
                counter++;
                objectOfUsers[objectKeys[indexOfFilteredUsers]][tempSlicedValue2] = counter;
            }
        }

    })
}


module.exports = {
    splitString,
}