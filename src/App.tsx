import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

interface Color {
  id: number;
  name: string;
}

interface Car {
  id: number;
  brand: string;
  rentPrice: number;
  colorId: number;
  color?: Color | null;
}

function getColorByCar(car: Car): any {
  return colorsFromServer.find(color => color.id === car.colorId);
}

export const cars: Car[] = carsFromServer.map(car => {
  const color: any = getColorByCar(car);

  const auto = {
    ...car,
    color: getColorByCar(color),
  };

  return auto;
});

export const App: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtereCars = cars.filter((car) => (
    car.brand.toLowerCase().includes(search.toLowerCase())
  ));

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        onChange={(event) => setSearch(event.target.value)}
      />

      <select>
        <option>Chose a color</option>
        {
          colorsFromServer.map(color => (
            <option
              value={color.id}
              key={color.id}
            >
              {color.name}
            </option>
          ))
        }
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
          {filtereCars.map(car => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              {/* {<td style={{ color: 'red' }}>{car.color.name}</td> */}
              <td>{car.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
