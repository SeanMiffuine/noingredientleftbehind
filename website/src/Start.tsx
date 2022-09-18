import { Transition, TransitionStatus } from "react-transition-group";
import { AppState } from "./App";

const defaultStyle = {
    transition: `opacity 500ms ease-in-out`,
    opacity: 1,
  }
  
  const transitionStyles: Record<TransitionStatus, React.CSSProperties> = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { position: 'absolute', pointerEvents: 'none', opacity: 0 },
    exited:  { opacity: 0, display: 'none' },
    unmounted:  { display: 'none' },
  };

export default function Start(props: {state: AppState, onDone: ()=>void}) {
  return (
    <Transition in={props.state === AppState.START} timeout={500}>
    {state => <div style={{
      ...defaultStyle,
      ...transitionStyles[state]
    }}>
      <div className='button start' onClick={()=>props.onDone()}>Start</div>
      <div className='tag-line'>No.Ingredients.Wasted.</div>
    </div>
    }
  </Transition>
  );

}