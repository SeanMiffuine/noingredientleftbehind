import { Player } from "@lottiefiles/react-lottie-player";

export default function Loading() {
    return <div>
        <Player src={process.env.PUBLIC_URL + "/lf30_editor_fxhpzg4x.json"}
        speed={0.5}
        controls={false}
        autoplay
        loop
        style={{height: '5rem', width: '5rem'}}>
        </Player>
        cooking up a recipe
    </div>
}