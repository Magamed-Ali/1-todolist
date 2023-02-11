import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type SpanType = {
    title: string
    editTasksHandler: (title: string)=> void
}

export function EditableSpan(props: SpanType) {

    const [edit, setEdit] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)
    const ediFoolHandler = () => {
        setEdit(!edit)
        props.editTasksHandler(title)
    }
    const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if(e.key === "Enter"){
            props.editTasksHandler(title)
            setEdit(false)
        }
    }
    return (
        <>
            {edit ? <input
                    value={title}
                    onChange={changeInput}
                    onBlur={ediFoolHandler}
                    onKeyDown={(e) => onKeyDownHandler(e)}/>
                :
                <span onDoubleClick={ediFoolHandler}>{props.title}</span>
            }
        </>
    );
}

