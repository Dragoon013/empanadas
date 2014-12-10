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

  var orderMessage = '';
  var totalMessage = 0;
  var unparsedOrderLines = context.match[1].trim().split(/ /);
  for (var i = 0; i < unparsedOrderLines.length; ++i) {
	var matches = /(\d*)(.*)/.exec(unparsedOrderLines[i]);
    order.orderLines.push({
      abbreviation: matches[2],
      quantity: matches[1]
    });

    orderMessage += matches[1] + 'x' + MENU[matches[2]].name + ', ';
    totalMessage += MENU[matches[2]].price * parseInt(matches[1]);
  }

  return room.sendNotification(context.sender.name + ', you ordered ' + orderMessage + ' and your total is ' + totalMessage + '.');
}

var addon = app.addon()
  .hipchat()
  .allowRoom(true)
  .scopes('send_notification');

if (process.env.DEV_KEY) {
  addon.key(process.env.DEV_KEY);
}

addon.webhook('room_message', /^\/hello$/, function *() {
  console.log(this);
  yield this.roomClient.sendNotification('Hi pendejo ' + this.sender.name + '!');
});

addon.webhook('room_message', /^\/empanada(.*)$/, function *() {
	if (context.match[1].trim() == "help"){
		yield printhelp(this.roomClient, this);
	}
	if (context.match[1].trim() == "order"){
		yield printOrder(this.roomClient, this);
	}
	if (context.match[1].trim() == "myorder"){
		yield printMyOrder(this.roomClient, this);
	}
	yield createOrder(this.roomClient, this);
});

app.listen();

/*
{
	orders: [{
		name: 'Joaquin�n Benavides',
		orderLines: [{
			abbreviation: 'k',
			quantity: 2
		}]
	}]
}
*/

