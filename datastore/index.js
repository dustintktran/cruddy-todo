const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // var id = 
  counter.getNextUniqueId(function (err, data) {
    var id = data;
    // console.log(data)
    // let dirpathhh = path.join();
    const dirpathhh = path.join(exports.dataDir, `${id}.txt`);
    // console.log("current path : " , dirpathhh)
    fs.writeFile(dirpathhh, text);
    // console.log(JSON.stringify({id,text}))
    callback(null, { id, text });
    //"1", "2", "3"
    return data //"00001"
  }); //"00001"
  // items[id] = text;
};

exports.readAll = (callback) => {
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  fs.readdir(exports.dataDir, (err, data) => {
    // let finalArray = [];
    // for (let i = 0 ; i < data.length; i++) {
    //   let filetextpath = path.join(exports.dataDir, data[i])
    //   fs.readFile(filetextpath, 'utf8' ,(err, onetext)=> {
    //     finalArray.push(JSON.stringify(onetext));
    //     console.log(JSON.stringify(onetext));
    //   })

    var data2 = data.map((items) => {
      // var name = exports.dataDir.substring(0, items.length-4)
      let idontknow = items.substring(0, 5)
      // console.log('the array thing', {id:idontknow, text:idontknow});
      return { id: idontknow, text: idontknow };
    })
    // console.log(data2)
    callback(null, data2);

    // console.log("final array ", finalArray)

  })
};

exports.readOne = (id, callback) => {

  //read one method takes in id and a callback function.
  //callback function takes in two params. err and text data...


  let filetextpath = path.join(exports.dataDir, `${id}.txt`)
  fs.readFile(filetextpath, 'utf8', (err, text) => {
    // console.log(filetextpath)
    if (text === undefined) {
      // callback(err);
      callback(new Error(`No item with id: ${id}`));
    } else {
      // console.log(text);
      callback(null, { id, text })
    }
  })


  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   fs.readFile(filetextpath, 'utf8', (err, onetext) => {

  //     callback(null, { id, text });
  //   })
  //   }
};

exports.update = (id, updatetext, callback) => {

  let filetextpath = path.join(exports.dataDir, `${id}.txt`)
  fs.readFile(filetextpath, 'utf8', (err, text) => {
    console.log(filetextpath);
    if (text === undefined) {
      callback(err);
    } else {
      console.log("update test ", id, text, updatetext)
      fs.writeFile(filetextpath, updatetext)
      callback(null, { id: id, text: updatetext })
    }

  })

  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
};

exports.delete = (id, callback) => {
  let filetextpath = path.join(exports.dataDir, `${id}.txt`)
  fs.readFile(filetextpath, 'utf8', (err, text) => {
    if (text === undefined) {
      callback(err);
    } else {
      fs.unlink(filetextpath, (err) => {
        callback(null, err);
      });
    }
  });
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
