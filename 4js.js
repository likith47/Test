<!DOCTYPE html>
<html>
<head>
  <title>CRUD Example</title>
  <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState } = React;

    const App = () => {
      const [routes, setRoutes] = useState([]);
      const [legs, setLegs] = useState([]);
      const [cities, setCities] = useState([]);

      // Add a new route
      const addRoute = () => {
        const newRoute = {
          id: routes.length + 1,
          legs: [],
        };
        setRoutes([...routes, newRoute]);
      };

      // Add a new leg to a route
      const addLeg = (routeId, city1, city2, cost) => {
        const newLeg = {
          id: legs.length + 1,
          city1,
          city2,
          cost,
        };
        setLegs([...legs, newLeg]);

        // Update the route with the new leg
        const updatedRoutes = routes.map((route) =>
          route.id === routeId ? { ...route, legs: [...route.legs, newLeg] } : route
        );
        setRoutes(updatedRoutes);
      };

      // Add a new city
      const addCity = (name) => {
        const newCity = {
          id: cities.length + 1,
          name,
        };
        setCities([...cities, newCity]);
      };

      // Calculate the total cost of the trip
      const calculateTotalCost = () => {
        let totalCost = 0;
        legs.forEach((leg) => {
          totalCost += leg.cost;
        });
        return totalCost;
      };

      return (
        <div>
          <h1>CRUD Example</h1>

          <h2>Routes</h2>
          <button onClick={addRoute}>Add Route</button>
          <ul>
            {routes.map((route) => (
              <li key={route.id}>
                Route {route.id}
                <ul>
                  {route.legs.map((leg) => (
                    <li key={leg.id}>
                      Leg: {leg.city1} - {leg.city2}, Cost: {leg.cost}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <h2>Legs</h2>
          <button onClick={() => addLeg(1, "City A", "City B", 100)}>Add Leg</button>
          <ul>
            {legs.map((leg) => (
              <li key={leg.id}>
                Leg: {leg.city1} - {leg.city2}, Cost: {leg.cost}
              </li>
            ))}
          </ul>

          <h2>Cities</h2>
          <button onClick={() => addCity("City A")}>Add City</button>
          <ul>
            {cities.map((city) => (
              <li key={city.id}>{city.name}</li>
            ))}
          </ul>

          <h2>Total Cost</h2>
          <p>{calculateTotalCost()}</p>
        </div>
      );
    };

    ReactDOM.render(<App />, document.getElementById("root"));
  </script>
</body>
</html>