const fs = require('fs');
let userIDs = [], logs = [];
let regEx = /([A-Z]+)/g; // To get symbols of the users 
let bankLogs,filteredUsers,temporarySymbols=[],symbols=[];
let objectOfUsers={};  let frequenceCounter={};
let splitterOne=[],splitterTwo=[];

let readData = new Promise(function (resolve, reject) {
    fs.readFile('/home/geek/Desktop/activity-logs.csv', 'utf8', (err, data) => {
        if (err)
            reject();
        resolve(data);

    });

});

function splitString(stringToSplit, separator) {
    let arrayOfStrings = stringToSplit.split(separator);
    arrayOfStrings.forEach(function (element) {
        logs.push(element)
    });
    //console.log(logs);
    return logs;
}


readData
    .then((data) => {
        bankLogs = splitString(data, ';');
    })
    .then(()=>{
       for (let index = 2; index < bankLogs.length; index += 5){ 
                userIDs.push(bankLogs[index]);
                temporarySymbols.push(bankLogs[index+1]);    
        }
    })
    .then(()=>{
        temporarySymbols.forEach(function(element) {
            splitterOne.push(element.split('='));
       });
    })
    // .then(()=>{

    //     console.log(splitterOne)
    // })
    // .then(()=>{
    //     for (let i = 0; i < splitterOne.length; i+=5) {
    //         splitterTwo.push(splitterOne.split('&'))
            
    //     }
    //    for (let i = 0; i < splitterTwo.length; i+=2) 
    //        symbols.push(splitterTwo[i]);
    // })
    // .then(()=>{
    //     console.log(symbols)
    // })
    .then(()=>{
        for (let i = 0; i < symbols.length; i++) {
            let num = symbols[i];
            frequenceCounter[num] = frequenceCounter[num] ? frequenceCounter[num] + 1 : 1;
          }
    })
    .then(() => {
      filteredUsers=userIDs.filter((value, index)=> {
            return userIDs.indexOf(value) === index
        });
    })
    .then(() => {
        filteredUsers.forEach(function(element) {
            objectOfUsers[element]={}   
        });
    })
    .then(()=>{
        console.log(objectOfUsers)
    })
    .catch((err) => console.log('Error happened : ' + err));
