import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useMemo, useState } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { json } from "stream/consumers";
import { AppState } from "./App";
import Ingredients from "./Ingredients";
import Loading from "./Loading";

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

export default function Recipe(props: { state: AppState, ingredients: string[] }) {
    let [loading, setLoading] = useState(true);
    let [recipe, setRecipe] = useState("")
    let [title, setTitle] = useState("")
    return (
        <Transition in={props.state === AppState.RECIPE} timeout={500} onEnter={async () => {
            let res = await fetch('/create_recipe', {
                method: 'POST',
                body: JSON.stringify({ ingredients: props.ingredients }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data = await res.json();
            console.log(data);
            setRecipe(data.recipe);
            setTitle(data.title);
            setLoading(false);
        }}>
            {state => <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
            }}>
                {loading ? <Loading /> :
                    <div className='recipe'>
                        <div className='recipe-title'>{title}</div>
                        <div className='recipe-ingredients'>
                            <div>
                                Ingredients:
                            </div>
                        {   props.ingredients.map((e, i) =>
                                <div key={i}>{e}</div>
                            )
                        }</div>
                        <div className='recipe-body'>{recipe.split('instructions: ')[1]}</div>
                    </div>
                }
            </div>
            }
        </Transition>
    );

}