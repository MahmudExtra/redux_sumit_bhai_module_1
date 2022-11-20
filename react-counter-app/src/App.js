import React, { useState } from "react";
import Counter from "./components/Counter";
import Stats from "./components/Stats";

const initialState = [
  {
    id: 1,
    count: 0,
  },
  {
    id: 2,
    count: 0,
  },
];

export default function App() {
  const [state, setState] = useState(initialState);
  const countValue = state.reduce((total, current) => total + current.count, 0);
  const increament = (id) => {
    setState((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    });
  };

  const decrement = (id) => {
    const updatedState = state.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    });
    setState(updatedState);
  };
  return (
    <div class="w-screen h-screen p-10 bg-gray-100 text-slate-700">
      <h1 class="max-w-md mx-auto text-center text-2xl font-bold">
        Simple Counter Application
      </h1>

      <div class="max-w-md mx-auto mt-10 space-y-5">
        {state.map((s) => (
          <Counter
            increament={increament}
            decrement={decrement}
            id={s.id}
            count={s.count}
          />
        ))}

        <Stats count={countValue} />
      </div>
    </div>
  );
}
