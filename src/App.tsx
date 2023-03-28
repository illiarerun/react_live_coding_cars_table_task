import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

export const App: React.FC = () => {
  const [carBrandFilter, setCarBrandFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setColorFilter(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => (
    setCarBrandFilter(event.target.value)
  );

  const filteredCars = carsFromServer.filter((car) => (
    car.brand.toLowerCase().includes(carBrandFilter.toLowerCase())
  ));

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={carBrandFilter}
        onChange={handleFilterChange}
      />

      <select
        value={colorFilter}
        onChange={handleColorChange}
      >

        {colorsFromServer.map(color => (
          <option key={color.id} value={color.name}>
            {color.name}
          </option>
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
          {filteredCars.map(car => {
            const {
              id,
              brand,
              rentPrice,
            } = car;

            return (
              <tr>
                <td>{id}</td>
                <td>{brand}</td>
                <td style={{ color: 'red' }}>Red</td>
                <td>{rentPrice}</td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </div>
  );
};
