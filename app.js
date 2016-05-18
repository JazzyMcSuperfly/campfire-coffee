// Global Variables - hours and locations
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm:', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];
var allKiosks = [];

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
  };
};

CoffeeKiosk.prototype.calcCupsHourly = function() {
  for (var i = 0; i < hours.length; i++) {
    var cups = Math.ceil(this.custHourly[i] * this.avgCupsCust);
    this.cupsHourly.push(cups);
  };
};

CoffeeKiosk.prototype.calcBeansForCupsHourly = function() {
  for (var i = 0; i < hours.length; i++) {
    var beans = Math.ceil(this.cupsHourly[i] / 16);
    this.beansForCupsHourly.push(beans);
  };
};

CoffeeKiosk.prototype.calcPoundPacksHourly = function() {
  for (var i = 0; i < hours.length; i ++) {
    var packs = Math.ceil(this.custHourly[i] * this.avgPoundsCust);
    this.poundPacksHourly.push(packs);
  };
};

CoffeeKiosk.prototype.calcTotalPoundsHourly = function() {
  for (var i = 0; i < hours.length; i++) {
    var pounds = this.beansForCupsHourly[i] + this.poundPacksHourly[i];
    this.poundsHourly.push(pounds);
  };
};

CoffeeKiosk.prototype.calcStaffHourly = function() {
  for (var i = 0; i < hours.length; i++) {
    var staff = Math.ceil(((this.cupsHourly[i] / 60) * 2) + ((this.poundPacksHourly[i] / 60) * 2));
    this.staffHourly.push(staff);
  };
};

CoffeeKiosk.prototype.calcDailyCustTotal = function() {
  for (var i = 0; i < hours.length; i++) {
    this.dailyCustTotal += this.custHourly[i];
  };
};

CoffeeKiosk.prototype.calcDailyCupsTotal = function() {
  for (var i = 0; i < hours.length; i++) {
    this.dailyCupsTotal += this.cupsHourly[i];
  };
};

CoffeeKiosk.prototype.calcDailyPoundPacksTotal = function() {
  for (var i = 0; i < hours.length; i++) {
    this.dailyPoundPacksTotal += this.poundPacksHourly[i];
  };
};

CoffeeKiosk.prototype.calcDailyBeansTotal = function() {
  for (var i = 0; i < hours.length; i++) {
    this.dailyBeansTotal += this.poundsHourly[i];
  };
};

CoffeeKiosk.prototype.calcDailyStaffTotal = function() {
  for (var i = 0; i < hours.length; i++) {
    this.dailyStaffTotal += this.staffHourly[i];
  };
};

//Render Methods
CoffeeKiosk.prototype.renderBeans = function() {
  this.calcCustHourly(this.minCust, this.maxCust);
  this.calcCupsHourly();
  this.calcBeansForCupsHourly();
  this.calcPoundPacksHourly();
  this.calcTotalPoundsHourly();
  this.calcStaffHourly();
  this.calcDailyCustTotal();
  this.calcDailyCupsTotal();
  this.calcDailyPoundPacksTotal();
  this.calcDailyBeansTotal();

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
  };
  coffeeTable.appendChild(trEl);
};

CoffeeKiosk.prototype.renderStaff = function() {
  this.calcStaffHourly();
  this.calcDailyStaffTotal();

  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.locName;
  trEl.appendChild(tdEl);

  var tdEl = document.createElement('td');
  tdEl.textContent = this.dailyStaffTotal + ' Hrs';
  trEl.appendChild(tdEl);

  for (var i = 0; i < hours.length; i++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = this.staffHourly[i];
    trEl.appendChild(tdEl);
  };
  staffTable.appendChild(trEl);
};

//Creating store objects
var pikePlace = new CoffeeKiosk('Pike Place Market', 14, 35, 1.2, 0.34);
var capitolHill = new CoffeeKiosk('Capitol Hill', 12, 28, 3.2, 0.03);
var seattlePublicLibrary = new CoffeeKiosk('Seattle Public Library', 9, 45, 2.6, 0.02);
var southLakeUnion = new CoffeeKiosk('South Lake Union', 5, 18, 1.3, 0.04);
var seaTacAirport = new CoffeeKiosk('Sea-Tac Airport', 28, 44, 1.1, 0.41);

//Coffee Table Render
var coffeeTable = document.getElementById('beans-table');

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
};

// Barista Table Render
var staffTable = document.getElementById('baristas-table');

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
};

//Render Data Function
pikePlace.renderBeans();
pikePlace.renderStaff();
capitolHill.renderBeans();
capitolHill.renderStaff();
seattlePublicLibrary.renderBeans();
seattlePublicLibrary.renderStaff();
southLakeUnion.renderBeans();
southLakeUnion.renderStaff();
seaTacAirport.renderBeans();
seaTacAirport.renderStaff();

//Render Totals Vars and functions
var actualStaffDaily = 0;
var actualStaffHourly = [];
// var totalHourlyStaff = ;

var calcDailyStaffTotals = function() {
  for (var i = 0; i < allKiosks.length; i++) {
    actualStaffDaily += allKiosks[i].dailyStaffTotal;
  };
};

// PROBLEM AREA - HELP!!!!!!
// Renders the totals row ok, but the math itself is not right. been working on it for a while
// and the solution is still escaping me!!
var calcHourlyStaffTotals = function() {
  for (var j = 0; j < allKiosks.length; j++) {
    for (var i = 0; i < hours.length; i++) {
      actualStaffHourly.push(allKiosks[j].staffHourly[i]);
    };
  };
};

var renderStaffTotals = function() {
  calcDailyStaffTotals();
  calcHourlyStaffTotals();
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Totals';
  trEl.appendChild(tdEl);

  var tdEl = document.createElement('td');
  tdEl.textContent = actualStaffDaily;
  trEl.appendChild(tdEl);

  for (var i = 0; i < hours.length; i++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = actualStaffHourly[i];
    trEl.appendChild(tdEl);
  };
  staffTable.appendChild(trEl);
};
renderStaffTotals();
