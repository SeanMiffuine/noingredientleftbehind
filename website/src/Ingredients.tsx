import { Player } from "@lottiefiles/react-lottie-player";
import { useState } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { AppState } from "./App";

const defaultStyle = {
    transition: `opacity 500ms ease-in-out`,
}

const transitionStyles: Record<TransitionStatus, React.CSSProperties> = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0, display: 'none' },
    unmounted: { opacity: 0, display: 'none' },
};

export default function Ingredients(props: { state: AppState, onDone: (ingredients: string[]) => void }) {
    let [ingredients, setIngredients] = useState<string[]>([]);
    let [running, setRunning] = useState("");
    return (
        <Transition in={props.state === AppState.INGREDIENTS} timeout={500}>
            {state => <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
            }}>
                <div className='ingredients'>
                    {ingredients.map((ingredient, index) =>
                        <input className="ingredient" key={index} value={ingredient} onChange={e => {
                            ingredients[index] = e.target.value;
                            setIngredients([...ingredients]);
                        }}
                            onKeyDown={(e) => {
                                if (e.key !== 'Enter') return;
                                if (ingredients[index] === "")
                                    ingredients.splice(index, 1);
                                setIngredients([...ingredients]);
                            }}
                            onBlur={() => {
                                if (ingredients[index] === "")
                                    ingredients.splice(index, 1);
                                setIngredients([...ingredients]);
                            }}></input>
                    )}
                    <input className="add-ingredient-input" value={running} onChange={(e) => setRunning(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if (running === "") return;
                                setIngredients([...ingredients, running]);
                                setRunning('');
                                (e.target as HTMLElement).focus();
                            }
                            if (e.key === 'Backspace' && running === '' && ingredients.length > 0) {
                                setRunning(ingredients.pop() as string);
                                setIngredients([...ingredients]);
                            }
                        }}
                        placeholder="Add Ingredient"></input>
                </div>
                <div className='button submit' onClick={() => props.onDone([...ingredients, running])}>Submit</div>
            </div>
            }
        </Transition>
    );

}