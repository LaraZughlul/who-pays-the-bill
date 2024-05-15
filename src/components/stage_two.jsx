import { useContext } from "react";
import { MyContext } from "../context";

const Stage2 = () => {
    const context = useContext(MyContext)

    return (
        <>
            <div className="result_wrapper">
                <h3>The loser is:</h3>
                {context.result}
            </div>
            <div className="action_button" onClick={() => context.resetGame()}>
                START OVER
            </div>
            <div className="action_button btn_2" onClick={() => context.getNewResult()}>
                PICK AGAIN
            </div>
        </>
    )
}

export default Stage2;