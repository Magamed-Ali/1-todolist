import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
        <div>
            <input
                className={error ? "error-input" : ""}
                value={titleInput}
                onChange={(e) => onChangeHandler(e)}
                onKeyDown={(e) => onKeyDownHandler(e)}
            />
            <button onClick={addTask}>+</button>
            {
                error && <div className="errorRe">введите текст</div>
            }

        </div>
    );
}
