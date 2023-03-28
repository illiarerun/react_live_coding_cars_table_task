import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

const getColorById = (colorId: number) => {
  const findedColor = colorsFromServer.find(color => (
    color.id === colorId
  ));

  return findedColor || null;
};

const carsWithColor = carsFromServer.map(car => ({
  ...car,
  color: getColorById(car.colorId),
}));

export const App: React.FC = () => {
  const [words, setWords] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);

  let visibleCars = [...carsWithColor];

  const handleClickOnColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedColor(+value);
  };

  if (selectedColor) {
    visibleCars = visibleCars.filter(car => (
      car.color?.id === selectedColor
    ));
  }

  const handleClickInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setWords(value);
  };

  if (words) {
    visibleCars = visibleCars.filter(car => {
      const loverCaseBrand = car.brand.toLowerCase();
      const loverCaseWords = words.toLowerCase();

      return loverCaseBrand.includes(loverCaseWords);
    });
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={words}
        onChange={handleClickInput}
      />

      <select
        value={selectedColor}
        onChange={handleClickOnColor}
      >
        <option value="0" disabled>Chose a color</option>
        {colorsFromServer.map(color => (
          <option
            value={color.id}
            key={color.id}
          >
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
          {visibleCars.map(car => (
            <tr>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td style={{ color: car.color?.name }}>{car.color?.name}</td>
              <td>{car.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
