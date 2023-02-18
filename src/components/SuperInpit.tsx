import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

type SuperInputType = {
    inputAddTasks: (titleInput: string) => void
}
export function SuperInpit(props: SuperInputType){

const [titleInput, setTitle] = useState('')
const [error, setError] = useState<boolean>(false)

const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
    error && setError(false)
    setTitle(e.currentTarget.value)
}
const addTask = ()=> {
    const trimmedTitle = titleInput.trim()
    if(trimmedTitle !== ""){
        props.inputAddTasks(titleInput)
    }else {
        setError(true)
    }
    /*props.addDateTask(titleInput);*/
    setTitle("")
}

const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {

    if(e.key === "Enter"){
        addTask()
        setTitle("")
    }
}
    return (
        <div className="super-input">
            <TextField
                id="standard-multiline-flexible"
                label="New task"
                multiline
                maxRows={2}
                variant="standard"
                className={error ? "error-input" : ""}
                value={titleInput}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
            />
            <Button
                onClick={addTask}
                variant="contained"
                size="small"
                style={{maxWidth: "40px", minWidth: "40px"}}
                endIcon={<SendIcon style={{marginLeft: "-5px"}} />}>
            </Button>
            {
                error && <div className="errorRe">Enter text</div>
            }

        </div>
    );
}
