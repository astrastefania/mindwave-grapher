var fs = require("fs");
var thinkgear = require("node-thinkgear-sockets")
var jf = require('jsonfile');

var dataPath = "data/";
var max = 60;

// create data folder if we do not already have one
if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath);
}

var client = thinkgear.createClient({ enableRawOutput: false });

var output = [[], [], [], [], [], [], [], []];
var timeStart = Date.now();
var count = 0;
client.on("data", function(data) {
console.log(data);
  if (data.eegPower) {
    // output[0].push({
    //  date: count,
    //  value: data.eegPower.delta
    // });
    // output[1].push({
    //  date: count,
    //  value: data.eegPower.theta
    // });
    output[0].push({
       date: count,
       value: data.eegPower.lowAlpha
     });
    output[1].push({
       date: count,
       value: data.eegPower.highAlpha
     });
    output[2].push({
       date: count,
       value: data.eegPower.lowBeta
     });
    output[3].push({
       date: count,
       value: data.eegPower.highBeta
     });
    //  output[6].push({
    //    date: count,
    //    value: data.eegPower.lowGamma
    //  });
    //  output[7].push({
    //    date: count,
    //    value: data.eegPower.highGamma
    //  });
  }
  ++count;
  var temp = [];
  for (var i = 0; i < output.length; i++) {
    temp[i] = output[i].slice(-max);
  }
  jf.writeFile(dataPath + 'mindwave.json', temp, function(err) {
    console.log('file written');
  });
});

client.connect();


