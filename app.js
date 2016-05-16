var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm:', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm:'];

var pikePlace = {
  locationName: 'Pike Place Market',
  minCustomersHour: 14,
  maxCustomersHour: 35,
  avgCupsPerCustomer: 1.2,
  avgPoundsPerCustomer: 0.34,
  totalPoundsPerHour: [],
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,

  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
    }
  },

  calcCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var cups = Math.round(this.customersPerHour[i] * this.avgCupsPerCustomer);
      this.cupsPerHour.push(cups);
    }
  },

  calcBeansNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = Math.ceil(this.cupsPerHour[i] / 16);
      this.beansNeededForCupsPerHour.push(beans);
    }
  },

  calcPoundPacksPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var packs = Math.round(this.customersPerHour[i] * this.avgPoundsPerCustomer);
      this.poundPackagesPerHour.push(packs);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var pounds = this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i];
      this.totalPoundsPerHour.push(pounds);
    }
  },

  calcDailyCustTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCustomersTotal += this.customersPerHour[i];
    }
  },

  calcDailyCupsTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCupsTotal += this.cupsPerHour[i];
    }
  },

  calcDailyPoundPackagesTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyPoundPackagesTotal += this.poundPackagesPerHour[i];
    }
  },

  calcDailyBeansNeededTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyBeansNeeded += this.totalPoundsPerHour[i];
    }
  },

  render: function() {
    pikePlace.calcCustomersPerHour(pikePlace.minCustomersHour, pikePlace.maxCustomersHour);
    pikePlace.calcCupsPerHour();
    pikePlace.calcBeansNeededForCupsPerHour();
    pikePlace.calcPoundPacksPerHour();
    pikePlace.calcTotalPoundsPerHour();
    pikePlace.calcDailyCustTotal();
    pikePlace.calcDailyCupsTotal();
    pikePlace.calcDailyPoundPackagesTotal();
    pikePlace.calcDailyBeansNeededTotal();
    // call all of the other methods that calc data
    var ulElement = document.getElementById('pike');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = this.totalPoundsPerHour[i] + ' lbs [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + ' lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);
    }
    var custTotalEl = document.createElement('li');
    custTotalEl.textContent = 'Total customers at ' + this.locationName + ': ' + this.dailyCustomersTotal;
    ulElement.appendChild(custTotalEl);
    var cupsTotalEl = document.createElement('li');
    cupsTotalEl.textContent = 'Total cups sold at ' + this.locationName + ': ' + this.dailyCupsTotal;
    ulElement.appendChild(cupsTotalEl);
    var poundsTotalEl = document.createElement('li');
    poundsTotalEl.textContent = 'Total pound packages sold at ' + this.locationName + ': ' + this.dailyPoundPackagesTotal;
    ulElement.appendChild(poundsTotalEl);
    var beansTotalEl = document.createElement('li');
    beansTotalEl.textContent = 'Total beans needed at ' + this.locationName + ': ' + this.dailyBeansNeeded;
    ulElement.appendChild(beansTotalEl);
  }
};

pikePlace.render();

var capitolHill = {
  locationName: 'Capitol Hill',
  minCustomersHour: 12,
  maxCustomersHour: 28,
  avgCupsPerCustomer: 3.2,
  avgPoundsPerCustomer: 0.03,
  totalPoundsPerHour: [],
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,

  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
    }
  },

  calcCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var cups = Math.round(this.customersPerHour[i] * this.avgCupsPerCustomer);
      this.cupsPerHour.push(cups);
    }
  },

  calcBeansNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = Math.ceil(this.cupsPerHour[i] / 16);
      this.beansNeededForCupsPerHour.push(beans);
    }
  },

  calcPoundPacksPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var packs = Math.round(this.customersPerHour[i] * this.avgPoundsPerCustomer);
      this.poundPackagesPerHour.push(packs);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var pounds = this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i];
      this.totalPoundsPerHour.push(pounds);
    }
  },

  calcDailyCustTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCustomersTotal += this.customersPerHour[i];
    }
  },

  calcDailyCupsTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCupsTotal += this.cupsPerHour[i];
    }
  },

  calcDailyPoundPackagesTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyPoundPackagesTotal += this.poundPackagesPerHour[i];
    }
  },

  calcDailyBeansNeededTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyBeansNeeded += this.totalPoundsPerHour[i];
    }
  },

  render: function() {
    capitolHill.calcCustomersPerHour(capitolHill.minCustomersHour, capitolHill.maxCustomersHour);
    capitolHill.calcCupsPerHour();
    capitolHill.calcBeansNeededForCupsPerHour();
    capitolHill.calcPoundPacksPerHour();
    capitolHill.calcTotalPoundsPerHour();
    capitolHill.calcDailyCustTotal();
    capitolHill.calcDailyCupsTotal();
    capitolHill.calcDailyPoundPackagesTotal();
    capitolHill.calcDailyBeansNeededTotal();
    // call all of the other methods that calc data
    var ulElement = document.getElementById('capitol');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = this.totalPoundsPerHour[i] + ' lbs [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + ' lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);
    }
    var custTotalEl = document.createElement('li');
    custTotalEl.textContent = 'Total customers at ' + this.locationName + ': ' + this.dailyCustomersTotal;
    ulElement.appendChild(custTotalEl);
    var cupsTotalEl = document.createElement('li');
    cupsTotalEl.textContent = 'Total cups sold at ' + this.locationName + ': ' + this.dailyCupsTotal;
    ulElement.appendChild(cupsTotalEl);
    var poundsTotalEl = document.createElement('li');
    poundsTotalEl.textContent = 'Total pound packages sold at ' + this.locationName + ': ' + this.dailyPoundPackagesTotal;
    ulElement.appendChild(poundsTotalEl);
    var beansTotalEl = document.createElement('li');
    beansTotalEl.textContent = 'Total beans needed at ' + this.locationName + ': ' + this.dailyBeansNeeded;
    ulElement.appendChild(beansTotalEl);
  }
};

capitolHill.render();

var seattlePublicLibrary = {
  locationName: 'Seattle Public Library',
  minCustomersHour: 9,
  maxCustomersHour: 45,
  avgCupsPerCustomer: 2.6,
  avgPoundsPerCustomer: 0.02,
  totalPoundsPerHour: [],
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,

  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
    }
  },

  calcCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var cups = Math.round(this.customersPerHour[i] * this.avgCupsPerCustomer);
      this.cupsPerHour.push(cups);
    }
  },

  calcBeansNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = Math.ceil(this.cupsPerHour[i] / 16);
      this.beansNeededForCupsPerHour.push(beans);
    }
  },

  calcPoundPacksPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var packs = Math.round(this.customersPerHour[i] * this.avgPoundsPerCustomer);
      this.poundPackagesPerHour.push(packs);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var pounds = this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i];
      this.totalPoundsPerHour.push(pounds);
    }
  },

  calcDailyCustTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCustomersTotal += this.customersPerHour[i];
    }
  },

  calcDailyCupsTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCupsTotal += this.cupsPerHour[i];
    }
  },

  calcDailyPoundPackagesTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyPoundPackagesTotal += this.poundPackagesPerHour[i];
    }
  },

  calcDailyBeansNeededTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyBeansNeeded += this.totalPoundsPerHour[i];
    }
  },

  render: function() {
    seattlePublicLibrary.calcCustomersPerHour(seattlePublicLibrary.minCustomersHour, seattlePublicLibrary.maxCustomersHour);
    seattlePublicLibrary.calcCupsPerHour();
    seattlePublicLibrary.calcBeansNeededForCupsPerHour();
    seattlePublicLibrary.calcPoundPacksPerHour();
    seattlePublicLibrary.calcTotalPoundsPerHour();
    seattlePublicLibrary.calcDailyCustTotal();
    seattlePublicLibrary.calcDailyCupsTotal();
    seattlePublicLibrary.calcDailyPoundPackagesTotal();
    seattlePublicLibrary.calcDailyBeansNeededTotal();
    // call all of the other methods that calc data
    var ulElement = document.getElementById('spl');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = this.totalPoundsPerHour[i] + ' lbs [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + ' lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);
    }
    var custTotalEl = document.createElement('li');
    custTotalEl.textContent = 'Total customers at ' + this.locationName + ': ' + this.dailyCustomersTotal;
    ulElement.appendChild(custTotalEl);
    var cupsTotalEl = document.createElement('li');
    cupsTotalEl.textContent = 'Total cups sold at ' + this.locationName + ': ' + this.dailyCupsTotal;
    ulElement.appendChild(cupsTotalEl);
    var poundsTotalEl = document.createElement('li');
    poundsTotalEl.textContent = 'Total pound packages sold at ' + this.locationName + ': ' + this.dailyPoundPackagesTotal;
    ulElement.appendChild(poundsTotalEl);
    var beansTotalEl = document.createElement('li');
    beansTotalEl.textContent = 'Total beans needed at ' + this.locationName + ': ' + this.dailyBeansNeeded;
    ulElement.appendChild(beansTotalEl);
  }
};

seattlePublicLibrary.render();

var southLakeUnion = {
  locationName: 'South Lake Union',
  minCustomersHour: 5,
  maxCustomersHour: 18,
  avgCupsPerCustomer: 1.3,
  avgPoundsPerCustomer: 0.04,
  totalPoundsPerHour: [],
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,

  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
    }
  },

  calcCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var cups = Math.round(this.customersPerHour[i] * this.avgCupsPerCustomer);
      this.cupsPerHour.push(cups);
    }
  },

  calcBeansNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = Math.ceil(this.cupsPerHour[i] / 16);
      this.beansNeededForCupsPerHour.push(beans);
    }
  },

  calcPoundPacksPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var packs = Math.round(this.customersPerHour[i] * this.avgPoundsPerCustomer);
      this.poundPackagesPerHour.push(packs);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var pounds = this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i];
      this.totalPoundsPerHour.push(pounds);
    }
  },

  calcDailyCustTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCustomersTotal += this.customersPerHour[i];
    }
  },

  calcDailyCupsTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCupsTotal += this.cupsPerHour[i];
    }
  },

  calcDailyPoundPackagesTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyPoundPackagesTotal += this.poundPackagesPerHour[i];
    }
  },

  calcDailyBeansNeededTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyBeansNeeded += this.totalPoundsPerHour[i];
    }
  },

  render: function() {
    southLakeUnion.calcCustomersPerHour(southLakeUnion.minCustomersHour, southLakeUnion.maxCustomersHour);
    southLakeUnion.calcCupsPerHour();
    southLakeUnion.calcBeansNeededForCupsPerHour();
    southLakeUnion.calcPoundPacksPerHour();
    southLakeUnion.calcTotalPoundsPerHour();
    southLakeUnion.calcDailyCustTotal();
    southLakeUnion.calcDailyCupsTotal();
    southLakeUnion.calcDailyPoundPackagesTotal();
    southLakeUnion.calcDailyBeansNeededTotal();
    // call all of the other methods that calc data
    var ulElement = document.getElementById('slu');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = this.totalPoundsPerHour[i] + ' lbs [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + ' lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);
    }
    var custTotalEl = document.createElement('li');
    custTotalEl.textContent = 'Total customers at ' + this.locationName + ': ' + this.dailyCustomersTotal;
    ulElement.appendChild(custTotalEl);
    var cupsTotalEl = document.createElement('li');
    cupsTotalEl.textContent = 'Total cups sold at ' + this.locationName + ': ' + this.dailyCupsTotal;
    ulElement.appendChild(cupsTotalEl);
    var poundsTotalEl = document.createElement('li');
    poundsTotalEl.textContent = 'Total pound packages sold at ' + this.locationName + ': ' + this.dailyPoundPackagesTotal;
    ulElement.appendChild(poundsTotalEl);
    var beansTotalEl = document.createElement('li');
    beansTotalEl.textContent = 'Total beans needed at ' + this.locationName + ': ' + this.dailyBeansNeeded;
    ulElement.appendChild(beansTotalEl);
  }
};

southLakeUnion.render();

var seaTacAirport = {
  locationName: 'Sea-Tac Airport',
  minCustomersHour: 28,
  maxCustomersHour: 44,
  avgCupsPerCustomer: 1.1,
  avgPoundsPerCustomer: 0.41,
  totalPoundsPerHour: [],
  customersPerHour: [],
  cupsPerHour: [],
  beansNeededForCupsPerHour: [],
  poundPackagesPerHour: [],
  dailyCustomersTotal: 0,
  dailyCupsTotal: 0,
  dailyPoundPackagesTotal: 0,
  dailyBeansNeeded: 0,

  calcCustomersPerHour: function(min,max) {
    for (var i = 0; i < hours.length; i ++) {
      var customers = Math.floor(Math.random() * (max - min + 1)) + min;
      this.customersPerHour.push(customers);
    }
  },

  calcCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var cups = Math.round(this.customersPerHour[i] * this.avgCupsPerCustomer);
      this.cupsPerHour.push(cups);
    }
  },

  calcBeansNeededForCupsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var beans = Math.ceil(this.cupsPerHour[i] / 16);
      this.beansNeededForCupsPerHour.push(beans);
    }
  },

  calcPoundPacksPerHour: function() {
    for (var i = 0; i < hours.length; i ++) {
      var packs = Math.round(this.customersPerHour[i] * this.avgPoundsPerCustomer);
      this.poundPackagesPerHour.push(packs);
    }
  },

  calcTotalPoundsPerHour: function() {
    for (var i = 0; i < hours.length; i++) {
      var pounds = this.beansNeededForCupsPerHour[i] + this.poundPackagesPerHour[i];
      this.totalPoundsPerHour.push(pounds);
    }
  },

  calcDailyCustTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCustomersTotal += this.customersPerHour[i];
    }
  },

  calcDailyCupsTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyCupsTotal += this.cupsPerHour[i];
    }
  },

  calcDailyPoundPackagesTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyPoundPackagesTotal += this.poundPackagesPerHour[i];
    }
  },

  calcDailyBeansNeededTotal: function() {
    for (var i = 0; i < hours.length; i++) {
      this.dailyBeansNeeded += this.totalPoundsPerHour[i];
    }
  },

  render: function() {
    seaTacAirport.calcCustomersPerHour(seaTacAirport.minCustomersHour, seaTacAirport.maxCustomersHour);
    seaTacAirport.calcCupsPerHour();
    seaTacAirport.calcBeansNeededForCupsPerHour();
    seaTacAirport.calcPoundPacksPerHour();
    seaTacAirport.calcTotalPoundsPerHour();
    seaTacAirport.calcDailyCustTotal();
    seaTacAirport.calcDailyCupsTotal();
    seaTacAirport.calcDailyPoundPackagesTotal();
    seaTacAirport.calcDailyBeansNeededTotal();
    // call all of the other methods that calc data
    var ulElement = document.getElementById('seatac');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = this.totalPoundsPerHour[i] + ' lbs [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + ' lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go]';
      ulElement.appendChild(liElement);
    }
    var custTotalEl = document.createElement('li');
    custTotalEl.textContent = 'Total customers at ' + this.locationName + ': ' + this.dailyCustomersTotal;
    ulElement.appendChild(custTotalEl);
    var cupsTotalEl = document.createElement('li');
    cupsTotalEl.textContent = 'Total cups sold at ' + this.locationName + ': ' + this.dailyCupsTotal;
    ulElement.appendChild(cupsTotalEl);
    var poundsTotalEl = document.createElement('li');
    poundsTotalEl.textContent = 'Total pound packages sold at ' + this.locationName + ': ' + this.dailyPoundPackagesTotal;
    ulElement.appendChild(poundsTotalEl);
    var beansTotalEl = document.createElement('li');
    beansTotalEl.textContent = 'Total beans needed at ' + this.locationName + ': ' + this.dailyBeansNeeded;
    ulElement.appendChild(beansTotalEl);
  }
};

seaTacAirport.render();
