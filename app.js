// Global Variables - hours and locations - tables coffee and baristas - table headings
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm:', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm:'];
var locations = [];
var coffeeTable = document.getElementById('beans-table');
var staffTable = document.getElementById('baristas-table');
var coffeeHeadings = [];

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

  //Push kiosk to locations array
  locations.push(this);
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
    var cups = Math.round(this.custPerHour[i] * this.avgCupsCust);
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
    var staff = this.custHourly[i] / 2;
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

//Render methods

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
  this.calcDailyStaffTotal();
};



//   render: function() {
//     pikePlace.calcCustomersPerHour(pikePlace.minCustomersHour, pikePlace.maxCustomersHour);
//     pikePlace.calcCupsPerHour();
//     pikePlace.calcBeansNeededForCupsPerHour();
//     pikePlace.calcPoundPacksPerHour();
//     pikePlace.calcTotalPoundsPerHour();
//     pikePlace.calcDailyCustTotal();
//     pikePlace.calcDailyCupsTotal();
//     pikePlace.calcDailyPoundPackagesTotal();
//     pikePlace.calcDailyBeansNeededTotal();
//     // call all of the other methods that calc data
//     var ulElement = document.getElementById('pike');
//     for (var i = 0; i < hours.length; i++) {
//       // create a <li>
//       // give that <li> content
//       // append the <li> to the <ul>
//       var liElement = document.createElement('li');
//       liElement.textContent = this.totalPoundsPerHour[i] + ' lbs [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + ' lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
//       ulElement.appendChild(liElement);
//     }
//     var custTotalEl = document.createElement('li');
//     custTotalEl.textContent = 'Total customers at ' + this.locationName + ': ' + this.dailyCustomersTotal;
//     ulElement.appendChild(custTotalEl);
//     var cupsTotalEl = document.createElement('li');
//     cupsTotalEl.textContent = 'Total cups sold at ' + this.locationName + ': ' + this.dailyCupsTotal;
//     ulElement.appendChild(cupsTotalEl);
//     var poundsTotalEl = document.createElement('li');
//     poundsTotalEl.textContent = 'Total pound packages sold at ' + this.locationName + ': ' + this.dailyPoundPackagesTotal;
//     ulElement.appendChild(poundsTotalEl);
//     var beansTotalEl = document.createElement('li');
//     beansTotalEl.textContent = 'Total pounds of beans needed at ' + this.locationName + ': ' + this.dailyBeansNeeded;
//     ulElement.appendChild(beansTotalEl);
//   }
// };
//
// pikePlace.render();
