var ack = require('ac-koa').require('hipchat');
var pkg = require('./package.json');
var app = ack(pkg);

var addon = app.addon()
  .hipchat()
  .allowRoom(true)
  .scopes('send_notification');

if (process.env.DEV_KEY) {
  addon.key(process.env.DEV_KEY);
}
 
addon.webhook('room_message', /^\/hello$/, function *() {
  yield this.roomClient.sendNotification('Hi, ' + this.sender.name + '!');
});
 
app.listen();



var abrevs = [];
var sumUser = 0;
var tip = 0;




userRet:{};

init: function(){
    
    getFromDB(date);
    sumOrders();
},

getFromDB: function(date){
    db = getOrder(date);
    
},

sumOrders: function(){
	    
    for(var i = 0; i < db.orders.length; i++){
	for(var j = 0; j < db.orders[i].orderlines.length; j++){
	    sumUser += db.orders[i].orderlines[j].amount * empanadas.Menu[db.orders[i].orderlines[j].abbreviation];
	    abrevs.push() = db.orders[i].orderlines[j].abbreviation;
	    
	}	
    }
	    
    sumUser += sumeUser*.1;
    empanadas.userRet["abbreviations"] = abrevs;
    empanadas.userRet["sum"] = sumUser;
}



