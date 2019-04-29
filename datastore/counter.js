const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0; // readCounter(function(something, data) {return data}

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num); //0001, 0002, 0003
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count); //"00001"
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  //read counter.txt.... 
  //grab the value. "00001" ... zeropadded...
  //increment by 1 => "000002"
  //overwrite the number to counter.txt
  //send it back 
    readCounter(function(err, data) { //data = 1
    data++; // number 2
    writeCounter(data, () => {
      callback(err, zeroPaddedNumber(data));
      });
  });
  // return count;
  //json parse was here
  // count++;
  // writeCounter(count, function(err, data){

  //   return data //data = "00001" json stringify was here
  // });
  // counter = counter + 1;
  // return zeroPaddedNumber(counter);
  // return zeroPaddedNumber(data) //"00001"
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
