const readFrom = require('../readFrom');


// Testing stringSplitter function
describe('Splitting Function',function() {
    it('function should split the given string acc. to given pattern',function(){
        let string= '2017-08-09T16:04:25.788Z;MATRIKS;12951;/?symbol=ECZYT&period=1hour&start=2016-10-26&end=2016-10-26;veli-bar-data-api-node;bar-data-api'
        let separator = '/'
        let result = readFrom.splitString(string,separator)
        let expectedResult=['2017-08-09T16:04:25.788Z;MATRIKS;12951;','?symbol=ECZYT&period=1hour&start=2016-10-26&end=2016-10-26;veli-bar-data-api-node;bar-data-api']
        expect(result).toEqual(expectedResult)
       
    })
 

})

