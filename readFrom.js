const fs = require('fs');
const isUpperCase = require('is-upper-case');
let userIDs = [],logs=[];
let objectOfUsers = {}; 
let bankLogs, filteredUsers, temporarySymbols = [];


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
            userIDs.push(bankLogs[index]);
            temporarySymbols.push(bankLogs[index].concat(bankLogs[index + 1]));
        }
    })
    .then(() => {
        filteredUsers = userIDs.filter((value, index) => {
            return userIDs.indexOf(value) === index
        });
    })
    .then(() => {
        filteredUsers.forEach(function (element) {
            objectOfUsers[element] = {}
        });
    })
    .then(() => {
        createObject(temporarySymbols, 0)

    })
    .then(() => {
        createObject(temporarySymbols, 1)
    })
    .then(() => {
        createObject(temporarySymbols, 2);
    })
    .then(() => {
        createObject(temporarySymbols, 3)
    })
    .then(() => {
        console.log(objectOfUsers)

    })

    .catch((err) => console.log('Error happened : ' + err));


function splitString(stringToSplit, separator) {
    let arrayOfStrings = stringToSplit.split(separator);
    arrayOfStrings.forEach(function (element) {
        logs.push(element)
    });
    //console.log(logs);
    return logs;
}

function createObject(temporarySymbols, indexOfFilteredUsers) {
    let counter, tempSlicedValue, tempSlicedValue2;
    temporarySymbols.forEach(function (element) {
        tempSlicedValue = element.slice(0, element.indexOf('/'));
        tempSlicedValue2 = element.slice(tempSlicedValue.length + 9, element.indexOf('&'))
        if (tempSlicedValue === filteredUsers[indexOfFilteredUsers] && isUpperCase(tempSlicedValue2) && tempSlicedValue2 !== '') {
            if (objectOfUsers[filteredUsers[indexOfFilteredUsers]][tempSlicedValue2] === undefined) {
                counter = 1;
                objectOfUsers[filteredUsers[indexOfFilteredUsers]][tempSlicedValue2] = counter;
            }
            else if (objectOfUsers[filteredUsers[indexOfFilteredUsers]][tempSlicedValue2] !== undefined)
                counter++;
            objectOfUsers[filteredUsers[indexOfFilteredUsers]][tempSlicedValue2] = counter;
        }

    })
}