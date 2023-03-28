import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

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

interface FullCar extends Car {
  color: Color | null,
}

const getColorById = (colorId: number): Color | null => {
  const colors = colorsFromServer.find(
    color => color.id === colorId,
  );

  return colors || null;
};

const fullCars: FullCar[] = carsFromServer.map(car => {
  return {
    ...car,
    color: getColorById(car.colorId),
  };
});

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

export const App: React.FC = () => {
  const [filteredCars, setFilteredCars] = useState([...fullCars]);
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div>
      <input type="search" placeholder="Find by car brand" />

      <select
        value={selectedColor}
        onChange={(event) => {
          setSelectedColor(Number(event.target.value));
        }}
      >
        <option value={0}>Chose a color</option>
        {colorsFromServer.map(color => {
          const { id, name } = color;

          return (
            <option value={id}>{name}</option>
          );
        })}
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
              color,
            } = car;

            return (
              <>
                {color
                  && (
                    <tr>
                      <td>{id}</td>
                      <td>{brand}</td>
                      <td style={{ color: color?.name }}>{color?.name}</td>
                      <td>{rentPrice}</td>
                    </tr>
                  )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
