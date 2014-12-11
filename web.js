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


var empanadas = (function(){

    //the array to be filled with individual orders
    var orders = [];    
    var abrevs = [];
    var sumUser = 0;
    var tip = 0;


    return{
	
	userRet:{};
	prices: {};

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
		    sumUser += orderlines[j].amount * empanadas.prices[orderlines[j].abbreviation];
		    abrevs.push() = orderlines[j].abbreviation;
		    
		}	
	    }
	    
	    sumUser += sumeUser*.1;
	    empanadas.userRet["abbreviations"] = abrevs;
	    empanadas.userRet["sum"] = sumUser;
	}

    }


})();

//empanadas.init()