const fs = require('fs');
const isUpperCase = require('is-upper-case');
let userIDs = [], logs = [];
let objectOfUsers = {};
let bankLogs, filteredUsers = [], temporarySymbols = [];



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
        // console.log(bankLogs)
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
        for (let index = 0; index < filteredUsers.length; index++)
            createObject(index)
    })
    .then(() => {
        let manhattanValue = manhattan(objectOfUsers[filteredUsers[0]], objectOfUsers[filteredUsers[1]])
        console.log('Manhattan value between ' + filteredUsers[0] + ' and ' + filteredUsers[1] + ' : ' + manhattanValue)
    })
    .then(() => {
        let euclideanValue = euclidean(objectOfUsers[filteredUsers[0]], objectOfUsers[filteredUsers[1]])
        console.log('Euclidean value between ' + filteredUsers[0] + ' and ' + filteredUsers[1] + ' : ' + euclideanValue)
    })
    .then(()=>{
        console.log(objectOfUsers)
    })
    .catch((err) => console.log('Error happened : ' + err));


function splitString(stringToSplit, separator) {
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
        if (tempSlicedValue === filteredUsers[indexOfFilteredUsers] && isUpperCase(tempSlicedValue2) && tempSlicedValue2 !== '') {
            if (objectOfUsers[filteredUsers[indexOfFilteredUsers]][tempSlicedValue2] === undefined) {
                counter = 1;
                objectOfUsers[filteredUsers[indexOfFilteredUsers]][tempSlicedValue2] = counter;
            }
            else if (objectOfUsers[filteredUsers[indexOfFilteredUsers]][tempSlicedValue2] !== undefined) {
                counter++;
                objectOfUsers[filteredUsers[indexOfFilteredUsers]][tempSlicedValue2] = counter;
            }
        }

    })
}

//manhattan
function manhattan(user1, user2) {
    let numberOfRequests = 0;
    for (let request of Object.keys(user1))
        if (request in user2)
            numberOfRequests += Math.abs(user1[request] - user2[request])
    return numberOfRequests;
}

// Euclidean
function euclidean(user1, user2) {
    let numberOfRequests = 0;
    for (let request of Object.keys(user1))
        if (request in user2)
            numberOfRequests += ((user1[request] - user2[request]) ** 2);

    return Math.sqrt(numberOfRequests)
}



module.exports = {
    splitString,
}