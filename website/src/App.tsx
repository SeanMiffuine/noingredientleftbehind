import React, { useState } from 'react';
import './App.scss';
import { Transition, TransitionStatus } from 'react-transition-group';
import Start from './Start';
import Ingredients from './Ingredients';
import Recipe from './Recipe';


export enum AppState {
  START,
  INGREDIENTS,
  RECIPE,
}

export default function App() {
  let [state, setState] = useState(AppState.START); 
  let [ingredients, setIngredients] = useState<string[]>([]);
  return (
    <div className="app">
      <div className='nav'>
        <div>
          No Ingredient Left Behind
        </div>
        <div>
          <a>
            Contact Us
          </a>
        </div>
      </div>
      <div className='main-body'>
        <Start state={state} onDone={()=> setState(AppState.INGREDIENTS)} />
        <Ingredients state={state} onDone={(ingredients)=> {
          setState(AppState.RECIPE);
          setIngredients(ingredients);
          }} />
          <Recipe state={state} ingredients={ingredients} />
      </div>
    </div>
  );
}
