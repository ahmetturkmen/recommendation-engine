let fs=require('fs')
let readData = new Promise(function (resolve, reject) {
    fs.readFile('/home/geek/Desktop/activity-logs.csv', 'utf8', (err, data) => {
        if (err)
            reject(err);
        resolve(data);
    });

});
readData.then((data) => {
        console.log(data)
})