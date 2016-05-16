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

  render: function() {
    pikePlace.calcCustomersPerHour(pikePlace.minCustomersHour, pikePlace.maxCustomersHour);
    pikePlace.calcCupsPerHour();
    pikePlace.calcBeansNeededForCupsPerHour();
    pikePlace.calcPoundPacksPerHour();
    pikePlace.calcTotalPoundsPerHour();
    // call all of the other methods that calc data
    var ulElement = document.getElementById('pike');
    for (var i = 0; i < hours.length; i++) {
      // create a <li>
      // give that <li> content
      // append the <li> to the <ul>
      var liElement = document.createElement('li');
      liElement.textContent = this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.beansNeededForCupsPerHour[i] + ' lbs), ' + this.poundPackagesPerHour[i] + ' lbs to-go';
      ulElement.appendChild(liElement);
    }
  }
};

pikePlace.render();
