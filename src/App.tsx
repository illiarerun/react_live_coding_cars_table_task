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

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

export const App: React.FC = () => {
  const [listOfCars, setListOfCars] = useState(carsWithColor);
  const [words, setWords] = useState('');
  // const [selectedColor, setSelectedColor] = useState(0);

  // const handleClickOnColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = event.target;
  //   const filtered = listOfCars.filter(car => (
  //     car.color?.name
  //   ));

  //   setSelectedColor();
  // };

  const handleClickInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filtered = listOfCars.filter(car => {
      const loverCaseBrand = car.brand.toLowerCase();
      const loverCaseWords = words.toLowerCase();

      return loverCaseBrand.includes(loverCaseWords);
    });

    setWords(value);
    setListOfCars(filtered);
  };

  // const filterByInput = () => {
  //   const filtered = listOfCars.filter(car => {
  //     const loverCaseBrand = car.brand.toLowerCase();
  //     const loverCaseWords = words.toLowerCase();

  //     return loverCaseBrand.includes(loverCaseWords);
  //   });

  //   return filtered;
  // };

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
        <option id="0" disabled>Chose a color</option>
        {colorsFromServer.map(color => (
          <option
            id={String(color.id)}
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
          {listOfCars.map(car => (
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
