// Global Variables - hours, locations, totals etc...
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm:', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var allKiosks = [];
var actualStaffHourly = [];
var actualBeansHourly = [];
var coffeeTable = document.getElementById('beans-table');
var staffTable = document.getElementById('baristas-table');
var newStoreForm = document.getElementById('newStoreForm');

//Kiosk Location Constructor
function CoffeeKiosk(locName, minCust, maxCust, avgCupsCust, avgPoundsCust) {
  //Provided data
  this.locName = locName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCupsCust = avgCupsCust;
  this.avgPoundsCust = avgPoundsCust;
  //Calculated Hourly Data
  this.poundsHourly = [];
  this.custHourly = [];
  this.cupsHourly = [];
  this.beansForCupsHourly = [];
  this.poundPacksHourly = [];
  this.staffHourly = [];
  //Calculated Daily Data
  this.dailyCustTotal = 0;
  this.dailyCupsTotal = 0;
  this.dailyPoundPacksTotal = 0;
  this.dailyBeansTotal = 0;
  this.dailyStaffTotal = 0;
  //Push Kiosk object to allKiosks array
  allKiosks.push(this);
};

//Calculation Methods
CoffeeKiosk.prototype.calcCustHourly = function(min, max) {
  for (var i = 0; i < hours.length; i ++) {
    var customers = Math.floor(Math.random() * (max - min + 1)) + min;
    this.custHourly.push(customers);
  }
};

CoffeeKiosk.prototype.calcCupsHourly = function() {
  for (var i = 0; i < hours.length; i++) {
    var cups = Math.ceil(this.custHourly[i] * this.avgCupsCust);
    this.cupsHourly.push(cups);
  }
};

CoffeeKiosk.prototype.calcBeansForCupsHourly = function() {
  for (var i = 0; i < hours.length; i++) {
    var beans = Math.ceil(this.cupsHourly[i] / 16);
    this.beansForCupsHourly.push(beans);
  }
};

CoffeeKiosk.prototype.calcPoundPacksHourly = function() {
  for (var i = 0; i < hours.length; i ++) {
    var packs = Math.ceil(this.custHourly[i] * this.avgPoundsCust);
    this.poundPacksHourly.push(packs);
  }
};

CoffeeKiosk.prototype.calcTotalPoundsHourly = function() {
  for (var i = 0; i < hours.length; i++) {
    var pounds = this.beansForCupsHourly[i] + this.poundPacksHourly[i];
    this.poundsHourly.push(pounds);
  }
};

CoffeeKiosk.prototype.calcStaffHourly = function() {
  for (var i = 0; i < hours.length; i++) {
    var staff = Math.ceil(((this.cupsHourly[i] / 60) * 2) + ((this.poundPacksHourly[i] / 60) * 2));
    this.staffHourly.push(staff);
  }
};

CoffeeKiosk.prototype.calcDailyCustTotal = function() {
  for (var i = 0; i < hours.length; i++) {
    this.dailyCustTotal += this.custHourly[i];
  }
};

CoffeeKiosk.prototype.calcDailyCupsTotal = function() {
  for (var i = 0; i < hours.length; i++) {
    this.dailyCupsTotal += this.cupsHourly[i];
  }
};

CoffeeKiosk.prototype.calcDailyPoundPacksTotal = function() {
  for (var i = 0; i < hours.length; i++) {
    this.dailyPoundPacksTotal += this.poundPacksHourly[i];
  }
};

CoffeeKiosk.prototype.calcDailyBeansTotal = function() {
  for (var i = 0; i < hours.length; i++) {
    this.dailyBeansTotal += this.poundsHourly[i];
  }
};

CoffeeKiosk.prototype.calcDailyStaffTotal = function() {
  for (var i = 0; i < hours.length; i++) {
    this.dailyStaffTotal += this.staffHourly[i];
  }
};

CoffeeKiosk.prototype.calcActualStaffHourly = function() {
  for (var i = 0; i < hours.length; i++) {
    actualStaffHourly.push(this.staffHourly[i]);
  }
};

//Calc Method
CoffeeKiosk.prototype.calcAll = function() {
  this.calcCustHourly(this.minCust, this.maxCust);
  this.calcCupsHourly();
  this.calcBeansForCupsHourly();
  this.calcPoundPacksHourly();
  this.calcTotalPoundsHourly();
  this.calcStaffHourly();
  this.calcDailyCustTotal();
  this.calcDailyCupsTotal();
  this.calcDailyPoundPacksTotal();
  this.calcDailyStaffTotal();
  this.calcDailyBeansTotal();
};

//Render Methods
CoffeeKiosk.prototype.renderBeans = function() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.locName;
  trEl.appendChild(tdEl);

  var tdEl = document.createElement('td');
  tdEl.textContent = this.dailyBeansTotal + ' lbs';
  trEl.appendChild(tdEl);

  for (var i = 0; i < hours.length; i++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = this.poundsHourly[i];
    trEl.appendChild(tdEl);
  }
  coffeeTable.appendChild(trEl);
};

CoffeeKiosk.prototype.renderStaff = function() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.locName;
  trEl.appendChild(tdEl);

  var tdEl = document.createElement('td');
  tdEl.textContent = this.dailyStaffTotal + ' hrs';
  trEl.appendChild(tdEl);

  for (var i = 0; i < hours.length; i++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = this.staffHourly[i];
    trEl.appendChild(tdEl);
  }
  staffTable.appendChild(trEl);
};

function headerBeansRender() {
  var thEl = document.createElement('th');
  thEl.textContent = '';
  coffeeTable.appendChild(thEl);

  var thEl = document.createElement('th');
  thEl.textContent = 'Daily Location Total';
  coffeeTable.appendChild(thEl);

  for (var i = 0; i < hours.length; i++) {
    var thEl = document.createElement('th');
    thEl.textContent = hours[i];
    coffeeTable.appendChild(thEl);
  }
}

function headerBaristaRender() {
  var thEl = document.createElement('th');
  thEl.textContent = '';
  staffTable.appendChild(thEl);

  var thEl = document.createElement('th');
  thEl.textContent = 'Daily Location Total';
  staffTable.appendChild(thEl);

  for (var i = 0; i < hours.length; i++) {
    var thEl = document.createElement('th');
    thEl.textContent = hours[i];
    staffTable.appendChild(thEl);
  }
}

var beanFooterTotalDisp = 0;

function beansTotalDisp() {
  for (var i = 0; i < allKiosks.length; i++) {
    beanFooterTotalDisp += allKiosks[i].dailyBeansTotal;
  }
}

function beansHourlyTotalRow() {
  for (var i = 0; i < hours.length; i++) {
    var sum = 0;
    for (var j = 0; j < allKiosks.length; j++) {
      sum += allKiosks[j].poundsHourly[i];
    }
    actualBeansHourly.push(sum);
  }
}

function renderBeanTotals() {
  beansTotalDisp();
  beansHourlyTotalRow();
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Totals';
  trEl.appendChild(tdEl);

  var tdEl = document.createElement('td');
  tdEl.textContent = beanFooterTotalDisp + ' lbs';
  trEl.appendChild(tdEl);

  for (var i = 0; i < hours.length; i++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = actualBeansHourly[i];
    trEl.appendChild(tdEl);
  };
  coffeeTable.appendChild(trEl);
};

var staffFooterTotalDisp = 0;

function staffTotalDisp() {
  for (var i = 0; i < allKiosks.length; i++) {
    staffFooterTotalDisp += allKiosks[i].dailyStaffTotal;
  }
}

function staffHourlyTotalRow() {
  for (var i = 0; i < hours.length; i++) {
    var sum = 0;
    for (var j = 0; j < allKiosks.length; j++) {
      sum += allKiosks[j].staffHourly[i];
    }
    actualStaffHourly.push(sum);
  }
}

function renderStaffTotals() {
  staffTotalDisp();
  staffHourlyTotalRow();
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Totals';
  trEl.appendChild(tdEl);

  var tdEl = document.createElement('td');
  tdEl.textContent = staffFooterTotalDisp + ' hrs';
  trEl.appendChild(tdEl);

  for (var i = 0; i < hours.length; i++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = actualStaffHourly[i];
    trEl.appendChild(tdEl);
  };
  staffTable.appendChild(trEl);
};

function renderTables() {
  headerBeansRender();
  headerBaristaRender();
  for (var i = 0; i < allKiosks.length; i++) {
    allKiosks[i].calcAll();
    allKiosks[i].renderBeans();
    allKiosks[i].renderStaff();
  }
  renderBeanTotals();
  renderStaffTotals();
}

function renderNewTables() {
  coffeeTable.innerHTML = '';
  staffTable.innerHTML = '';
  renderTables();
};

//Creating store objects
var pikePlace = new CoffeeKiosk('Pike Place Market', 14, 35, 1.2, 0.34);
var capitolHill = new CoffeeKiosk('Capitol Hill', 12, 28, 3.2, 0.03);
var seattlePublicLibrary = new CoffeeKiosk('Seattle Public Library', 9, 45, 2.6, 0.02);
var southLakeUnion = new CoffeeKiosk('South Lake Union', 5, 18, 1.3, 0.04);
var seaTacAirport = new CoffeeKiosk('Sea-Tac Airport', 28, 44, 1.1, 0.41);

renderTables();

//EVENT HANDLERS!
function handleAddNew(event) {
  event.preventDefault();

  if (!event.target.location.value || !event.target.min.value || !event.target.max.value || !event.target.avgCups.value || !event.target.avgPounds.value) {
    return alert('Please include ALL relevant data!');
  }

  var location = event.target.location.value;
  var min = event.target.min.value;
  var max = event.target.max.value;
  var avgCups = event.target.avgCups.value;
  var avgPounds = event.target.avgPounds.value;

  var newStore = function() {
    new CoffeeKiosk(location, min, max, avgCups, avgPounds);
  };
  newStore();

  event.target.location.value = null;
  event.target.min.value = null;
  event.target.max.value = null;
  event.target.avgCups.value = null;
  event.target.avgPounds.value = null;

  renderNewTables();
}

//event listener
newStoreForm.addEventListener('submit', handleAddNew);
