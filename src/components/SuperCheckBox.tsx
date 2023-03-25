import React, {ChangeEvent, memo, useCallback} from 'react';
import Checkbox from "@mui/material/Checkbox";

type TypeCheck = {
    task: boolean
    callBack: (check: boolean) => void
}
const SuperCheckBox = memo(function (props: TypeCheck) {
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }, [])
    return (
        <Checkbox
            checked={props.task}
            defaultChecked
            onChange={onChangeHandler}
            style={{maxWidth: "35px", minWidth: "35px", height: "35px"}}
        />
    );
})

export default SuperCheckBox;