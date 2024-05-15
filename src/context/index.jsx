import { useState, createContext } from "react";
import { ToastContainer, toast } from 'react-toastify';

const MyContext = createContext();

const MyProvider = (props) => {

    const [stage, setStage] = useState(1);
    const [players, setPlayers] = useState([]);
    const [result, setResult] = useState('');

    const addPlayerHandler = (name) => {
        setPlayers(prevState => ([
            ...prevState,
            name
        ]))
    }

    const removePlayerHandler = (idx) => { //passing the index to find the player we want to remove
        let newArr = [...players]; //duplicate players array
        newArr.splice(idx, 1); //remove player at index, one player
        setPlayers(newArr); //update of players arr
    }

    const nextButtonHandler = () => {
        if (players.length < 2) {
            //alert using toast
            toast.error('You need more players.')
        } else {
            setStage(2)
            setTimeout(()=>{ //wait 2 secs before displaying the loser
                generateLoser();
            }, 2000)
        }
    }

    const generateLoser = () => {
        let result = players[Math.floor(Math.random()*players.length)];
        setResult(result)
    }

    const resetGameHandler = () => {
        setStage(1)
        setPlayers([])
        setResult('')
    }

    return (
        <>
            <MyContext.Provider value={{
                //States
                stage: stage,
                players: players,
                result: result,

                //Methods
                addPlayer: addPlayerHandler,
                removePlayer: removePlayerHandler,
                nextButton: nextButtonHandler,
                resetGame:resetGameHandler,
                getNewResult:generateLoser
            }}>
                {props.children}
            </MyContext.Provider>
            <ToastContainer position="top-left" autoClose={2000}/>
        </>
    )
}

export {
    MyContext,
    MyProvider
}