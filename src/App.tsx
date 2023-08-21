import { useState, useEffect } from "react";
import "./App.css";
import cloud from './assets/cloud.svg';

const randomNumber = () => Math.round(Math.random());
const randomPosition = () => Math.floor(Math.random() * 4);

const add = (
  array: Array<number | null>,
  prevArray?: Array<number | null>
) => {
  if (!array.includes(null)) return array;
  if (prevArray && !prevArray?.includes(null)) return [
    randomNumber(),
    randomNumber(),
    randomNumber(),
    randomNumber()
  ]

  const newArray = prevArray ? [...prevArray] : [...array];
  let position = randomPosition();

  if (prevArray?.length) {
    prevArray.map((item, index) => {
      if (item !== null) {
        newArray.splice(index, 1, randomNumber())
      }
    })

    while (prevArray[position] !== null) {
      position = randomPosition();
    }
  }

  newArray.splice(position, 1, randomNumber());
  return newArray;
};

function App() {
  // inspiration: https://br.pinterest.com/pin/401313016797815226/
  const [counter, setCounter] = useState<number>(0)
  const [matrix, setMatrix] = useState<Array<Array<number | null>>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMatrix(prevMatrix => {
        const newMatrix = [...prevMatrix];
        const newArray = Array(4).fill(null);

        if (newMatrix.length < 10) {
          newMatrix.unshift(newArray);
        } else {
          newMatrix.pop()
          newMatrix.unshift(newArray);
        }

        newMatrix[counter] = add(newMatrix[0], newMatrix[counter + 1]);

        return newMatrix;
      })

      setCounter(count => count++)
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='container'>
      <img src={cloud} alt='Cloud'/>
      {matrix.map((array, index) => (
        <ul key={index} className='rain-line'>
          {array.map((value, innerIndex) => (
            <li key={innerIndex}>{value === null ? " " : value}</li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default App;