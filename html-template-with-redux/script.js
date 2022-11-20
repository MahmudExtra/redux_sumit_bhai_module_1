// select dom elements
const counterEl = document.getElementById("counter");
const incrementEl = document.getElementById("increment");
const decrementEl = document.getElementById("decrement");

// action identifier
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// action creators
const increment = (value) => {
  return {
    type: INCREMENT,
    payload: value,
  };
};
const decrement = (value) => {
  return {
    type: DECREMENT,
    payload: value,
  };
};
// initial state
const initalState = {
  value: 0,
};

// create reducer function
function counterReducer(state = initalState, action) {
  if (action.type === INCREMENT) {
    return {
      ...state,
      value: state.value + action.payload,
    };
  } else if (action.type === DECREMENT) {
    return {
      ...state,
      value: state.value - action.payload,
    };
  } else {
    return state;
  }
}
// create store

const store = Redux.createStore(counterReducer);

// SUBSCRIBE
const render = () => {
  const state = store.getState();
  counterEl.innerText = state.value;
};
// update UI initiallay
render();
store.subscribe(render);

// button click listener
incrementEl.addEventListener("click", () => {
  store.dispatch(increment(5));
});
decrementEl.addEventListener("click", () => {
  store.dispatch(decrement(2));
});
