import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';

type SpanType = {
    title: string
    editTasksHandler: (title: string)=> void
}

export const EditableSpan = memo(function (props: SpanType) {
    console.log("EditableSpan")

    const [edit, setEdit] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)

    const ediFoolHandler = useCallback(() => {
        setEdit(!edit)
        props.editTasksHandler(title)
    }, [])

    const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {

        if(e.key === "Enter"){
            props.editTasksHandler(title)
            setEdit(false)
        }
    }, [])
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
})

