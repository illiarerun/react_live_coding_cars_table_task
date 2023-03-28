import React from 'react';
// import carsFromServer from './api/cars';
// import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

// interface Car {
//   id: number,
//   brand: string,
//   rentPrice: number,
//   colorId: number,
// }

// interface Color {
//   id: number,
//   name: string,
// }

// const getColorById = (colorId: number) => colorsFromServer
//   .find((color) => color.id
//   === colorId);

// const cars = carsFromServer.map((car) => {
//   const color = getColorById(car.colorId);

//   return {
//     ...car,
//     color,
//   };
// });

// const filteredCars = (brandName) => {
//   cars.filter((car) => {
//     return car.brand === brandName;
//   });
// };

export const App: React.FC = () => {
  // const [currentCars, setCurrentCars] = useState(cars);
  // const [brandName, setBrandName] = useState('');

  return (
    <div>
      <input type="search" placeholder="Find by car brand" />

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
          {/* {cars.map((currCar) => {
            const { car, colorCar } = currCar;

            return (
              <tr>
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td style={{
                  color: colorCar.name,
                }}
                >
                  {colorCar.name}
                </td>
                <td>{car.rentPrice}</td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </div>
  );
};
