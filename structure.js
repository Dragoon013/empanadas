//empanadas, yo

var empanadas = (function(){

    //the array to be filled with individual orders
    var orders = [];    
    var orderlines = [];
    var sumUser = 0;
    var tip = 0;
    
    return{

	prices: {};

	init: function(){
	    
	    getFromDB(date);
	    sumOrders();
	},

	getFromDB: function(date){
	    db = DB(date);

	},
	
	sumOrders: function(){
	    
	    for(var i = 0; i < db.orders.length; i++){
		for(var j = 0; j < db.orders[i].orderlines.length; j++){
		    sumUser += orderlines[j].amount * prices[orderlines[j].abbreviation];
		}	
	    }
	
	    sumUser += sumeUser*.1;
	}

    }


})();

empanadas.init()