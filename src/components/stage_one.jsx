import { useRef, useContext, useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { MyContext } from '../context';

const Stage1 = () => {

    const textInput = useRef();
    const context = useContext(MyContext);
    const [error, setError] = useState([false, '']) //error?, error msg

    const handleSubmit = (e) => {
        e.preventDefault(); //prevents form from submition
        const value = textInput.current.value;
        const validate = validateInput(value)

        //run validation
        if (validate) {
            setError([false, '']);
            //add to list
            context.addPlayer(value);
            //reset form
            textInput.current.value = '';
        }
    }

    const validateInput = (value) => {
        if (value === '') {
            setError([true, 'You need to write something to add.']);
            return false;
        }
        if (value.length <= 2) {
            setError([true, 'Sorry, you need at least 3 characters.'])
            return false;
        }
        return true;
    }

    return (
        <>
            <Form onSubmit={handleSubmit} className='mt-4'> {/* react bootstrap components that we imported */}
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Add player name"
                        name="player"
                        ref={textInput}
                    >

                    </Form.Control>
                </Form.Group>

                {/* show errors        er[0], error[1] */}
                {error[0] ? //error > [true, 'error msg']
                    <Alert>{error[1]}</Alert>
                    : null
                }

                <Button className='miami' variant='primary' type='submit'>
                    <span className='bold_sign'>+ </span>Player
                </Button>

                {context.players && context.players.length > 0 ?
                    <>
                        <hr />
                        <div>
                            <ul className='list-group'>
                                {context.players.map((player, idx) => (
                                    <li key={idx} className='list-group-item d-flex justify-content-between align-items-center list-group-item-action'>
                                        {player}
                                        {/* to delete the player */}
                                        <span className='badge badge-danger' onClick={() => context.removePlayer(idx)}>
                                            X
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            {/* next button */}
                            <div className='action_button' onClick={() => context.nextButton()}>
                                NEXT
                            </div>
                        </div>
                    </>
                    : null //if we don't have players show nothing
                }
            </Form>
        </>
    )
}

export default Stage1;