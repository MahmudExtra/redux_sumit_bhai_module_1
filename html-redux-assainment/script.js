// // select dom elements
const addingNewCounter = document.getElementById("addingNewCounter");
const mainCounter = document.getElementById("main-counter");
const resetEl = document.getElementById("reset");
// const incrementEl = document.getElementById("increment");
// const decrementEl = document.getElementById("decrement");

// // action identifier
const ADDCOUNTER = "addCounter";
const INCREMENT = "increment";
const DECREMENT = "decement";
const RESETCOUNTER = "resetCounter";

// // action creators
const increment = (value, counterId) => {
  return {
    type: INCREMENT,
    payload: value,
    id: counterId,
  };
};
const decrement = (value, counterId) => {
  return {
    type: DECREMENT,
    payload: value,
    id: counterId,
  };
};
const addCounter = () => {
  return {
    type: ADDCOUNTER,
  };
};
const reset = () => {
  return {
    type: RESETCOUNTER,
  };
};

// helper function
const incrementHandler = (value, counterId) => {
  store.dispatch(increment(value, counterId));
};
const decrementHandler = (value, counterId) => {
  store.dispatch(decrement(value, counterId));
};

// initial state
const initalState = [
  {
    id: 1,
    value: 0,
    incrementBy: 2,
    decrementBy: 1,
  },
];

// create reducer function
function counterReducer(state = initalState, action) {
  if (action.type === ADDCOUNTER) {
    return [
      ...state,
      {
        id: state.length + 1,
        value: 0,
        incrementBy: Math.round(Math.random() * 10 + 1),
        decrementBy: Math.round(Math.random() * 10 + 1),
      },
    ];
  }
  if (action.type === RESETCOUNTER) {
    return state.map((counter) => {
      return {
        ...counter,
        value: 0,
      };
    });
  }
  if (action.type === INCREMENT) {
    const { payload, id } = action;
    return state.map((counter) => {
      if (counter.id === id) {
        return {
          ...counter,
          value: counter.value + payload,
        };
      }
      return {
        ...counter,
      };
    });
  }
  if (action.type === DECREMENT) {
    const { payload, id } = action;
    return state.map((counter) => {
      if (counter.id === id) {
        return {
          ...counter,
          value: counter.value - payload,
        };
      }
      return {
        ...counter,
      };
    });
  }
  // adding new counter

  // incrementing counter
  else {
    return state;
  }
}
// create store

const store = Redux.createStore(counterReducer);

// SUBSCRIBE
const render = () => {
  const state = store.getState();
  mainCounter.innerHTML = "";
  state.forEach((counter) => {
    mainCounter.innerHTML += `
   <div class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow my-4">
   <div class="text-2xl font-semibold" id="counter">
     ${counter.value}
   </div>
   <div class="flex space-x-3">
     <button
       class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
       id="increment"
       onclick = "incrementHandler(${counter.incrementBy},${counter.id})"
     >
       Increment
     </button>
     <button
       class="bg-red-400 text-white px-3 py-2 rounded shadow"
       id="decrement"
       onclick = "decrementHandler(${counter.decrementBy},${counter.id})"
     >
       Decrement
     </button>
   </div>
 </div>
   `;
  });
};
// update UI initiallay
render();
store.subscribe(render);

// button click listener
addingNewCounter.addEventListener("click", () => {
  store.dispatch(addCounter());
});
resetEl.addEventListener("click", () => {
  store.dispatch(reset());
});

// incrementEl.addEventListener("click", () => {
//   store.dispatch(increment(5));
// });
// decrementEl.addEventListener("click", () => {
//   store.dispatch(decrement(2));
// });
