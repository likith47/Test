class City {
  constructor(name) {
    this.name = name;
  } 
}

class Leg {
  constructor(source, destination, cost) {
    this.source = source;
    this.destination = destination;
    this.cost = cost;
  }
}

class Route {
  constructor(legs) {
    this.legs = legs;
  }

  getTotalCost() {
    let totalCost = 0;
    for (const leg of this.legs) {
      totalCost += leg.cost;
    }
    return totalCost;
  }
}

function main() {
  // Create cities
  const city1 = new City("City A");
  const city2 = new City("City B");
  const city3 = new City("City C");

  // Create legs
  const leg1 = new Leg(city1, city2, 100);
  const leg2 = new Leg(city2, city3, 150);

  // Create route
  const route = new Route([leg1, leg2]);

  // Calculate total cost
  const totalCost = route.getTotalCost();

  console.log("Total cost of the trip:", totalCost);
}

// Call the main function
main();
