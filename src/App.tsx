import React, { useEffect, useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color
interface Car {
  id: number,
  brand: string,
  rentPrice: number,
  colorId: number,
}

interface Color {
  id: number,
  name: string,
}

interface CarsWithColor extends Car {
  color: Color,
}

const carsWithColor: CarsWithColor[] = carsFromServer.map(car => ({
  ...car,
  color: colorsFromServer.find(color => color.id === car.colorId),
}));

export const App: React.FC = () => {
  const [state, setState] = useState(carsWithColor);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const filteredByBrand = () => {
      state.filter(car => {
        const lowerCasedBrand = car.brand.toLowerCase();
        const lowerCasedQuery = query.toLowerCase();

        return lowerCasedBrand.includes(lowerCasedQuery);
      });
    };

    setState(filteredByBrand);
  }, [query]);

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />

      <select>
        <option disabled>Chose a color</option>
        {colorsFromServer.map(color => (
          <option>{color.name}</option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Rent price</th>
          </tr>
        </thead>
        <tbody>
          {state.map(car => (
            <tr>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td style={{ color: car.color.name }}>{car.color.name}</td>
              <td>{car.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
