import React, { ChangeEvent, useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';
import { Cars } from './types/Cars';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const carsWithColor: Cars[] = carsFromServer.map(car => ({
  ...car,
  color: colorsFromServer.find(color => color.id === car.colorId)?.name,
}));

const containsQuery = (brand: string, searchingTerm: string): boolean => {
  return brand.toLowerCase().includes(searchingTerm.toLowerCase().trim());
};

export const App: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const visibleBrands = carsWithColor.filter(car => (
    containsQuery(car.brand, query)
  ));

  return (
    <div>
      <input
        value={query}
        onChange={handleInputChange}
        type="search"
        placeholder="Find by car brand"
      />

      <select>
        <option>Chose a color</option>
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
          {visibleBrands.map(({
            brand,
            id,
            rentPrice,
            color,
          }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{brand}</td>
              <td style={{ color: `${color}` }}>{color}</td>
              <td>{rentPrice}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};
