var ack = require('ac-koa').require('hipchat');
var pkg = require('./package.json');
var app = ack(pkg);

var MENU = {
  'pino': {
    name: 'Pino',
    price: 1100
  },
  'caq': {
    name: 'Carne Queso',
    price: 1300
  },
  'ccq': {
    name: 'Carne Champiñón Queso',
    price: 1300
  },
  'cpq': {
    name: 'Carne Pimentón Queso',
    price: 1300
  },
  'cchq': {
    name: 'Carne Choclo Queso',
    price: 1300
  },
  'poq': {
    name: 'Pollo Queso',
    price: 1200
  },
  'pcq': {
    name: 'Pollo Champiñón Queso',
    price: 1200
  },
  'ppq': {
    name: 'Pollo Pimentón Queso',
    price: 1200
  },
  'pchq': {
    name: 'Pollo Choclo Queso',
    price: 1200
  },
  'xcmq': {
    name: 'Extra Camarón Queso',
    price: 2000
  },
  'cmq': {
    name: 'Camarón Queso',
    price: 1600
  },
  'cmcq': {
    name: 'Camarón Champiñón Queso',
    price: 1600
  },
  'cmpq': {
    name: 'Camarón Pimentón Queso',
    price: 1600
  },
  'cmchq': {
    name: 'Camarón Choclo Queso',
    price: 1600
  },
  'qos': {
    name: 'Queso Ostión',
    price: 2000
  },
  'qch': {
    name: 'Queso Choclo',
    price: 1100
  },
  'qcch': {
    name: 'Queso Champiñón Choclo',
    price: 1300
  },
  'qc': {
    name: 'Queso Champiñón',
    price: 1300
  },
  'qj': {
    name: 'Queso Jamón',
    price: 1100
  },
  'cap': {
    name: 'Capresse',
    price: 1200
  },
  'napo': {
    name: 'Napolitana',
    price: 1100
  },
  'qma': {
    name: 'Queso Marisco',
    price: 1300
  },
  'qpoca': {
    name: 'Queso Pollo Carne',
    price: 1300
  },
  'k': {
    name: 'Queso',
    price: 1200
  }
};

function createOrder(room, context) {
  var order = {
    name: context.sender.name,
    orderLines: []
  };

  var unparsedOrderLines = context.match[1].trim().split(/ /);
  for (var i = 0; i < unparsedOrderLines.length; ++i) {
    var matches = /(\d*)(.*)/.exec(unparsedOrderLines[i]);
    if (!(matches[2] in MENU)) {
      continue;
    }

    order.orderLines.push({
      abbreviation: matches[2],
      quantity: matches[1]
    });
  }

  var orderMessage = '';
  var totalMessage = 0;
  for (var i = 0; i < order.orderLines.length; ++i) {
    var quantity = order.orderLines[i].quantity;
    var abbreviation = order.orderLines[i].abbreviation;
    orderMessage += quantity + 'x' + MENU[abbreviation].name;
    totalMessage += MENU[abbreviation].price * parseInt(quantity);

    if (i == order.orderLines.length - 2) {
      orderMessage += ' and ';
    } else if (i != order.orderLines.length - 1) {
      orderMessage += ', ';
    }
  }

  totalMessage = totalMessage * 1.1;

  return room.sendNotification(context.sender.name + ', you ordered ' + orderMessage + ' empanada(s). Your total with tip is <b>' + totalMessage + ' CLP</b>.');
}

var addon = app.addon()
  .hipchat()
  .allowRoom(true)
  .scopes('send_notification');

if (process.env.DEV_KEY) {
  addon.key(process.env.DEV_KEY);
}

addon.webhook('room_message', /^\/hello$/, function *() {
  yield this.roomClient.sendNotification('Hi pendejo ' + this.sender.name + '!');
});

addon.webhook('room_message', /^\/empanada(.*)$/, function *() {
  var command = this.match[1].trim();
  if (command == "help") {
    // TODO
    // yield printhelp(this.roomClient, this);
  } else if (command == "order"){
    // yield printOrder(this.roomClient, this);
  } else if (command == "myorder"){
    // yield printMyOrder(this.roomClient, this);
  } else {
    yield createOrder(this.roomClient, this);
  }
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



