interface State {
    waiting: boolean,
    title: string,
    open:boolean,
    status:number,
    firstImg: string,
}

interface SuccessfullyCreated {
    type: "SUCCESS",
    payload: number,
}

interface Error {
    type: "ERROR",
    payload: number,
}

interface Loading {
    type: "LOADING",
    // payload: Number,
}

interface CloseSnackbar {
    type: "CLOSE_SNACKBAR",
}

interface UpdateInputValue {
    type:"UPDATE_INPUT_VALUE",
    payload:string,
}

interface FirstImageSet {
    type:"FIRST_IMAGE_SET",
    payload:string,
}

type Action = SuccessfullyCreated 
    | Loading
    | CloseSnackbar
    | Error
    | UpdateInputValue
    | FirstImageSet

export default function reducer(state: State, action: Action):State {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                waiting: true
            }
        case "CLOSE_SNACKBAR":
            return {
                ...state,
                open:!state.open,
            }
        case "SUCCESS":
            return {
                ...state,
                status: action.payload,
                waiting:false,
                open:!state.open,
                title:"",
            }
        case "ERROR":
            return {
                ...state,
                waiting:false,
                status: action.payload,
                open:true,
            }
        case "UPDATE_INPUT_VALUE":
            return {
                ...state,
                title: action.payload,
            }
        case "FIRST_IMAGE_SET":
            return {
                ...state,
                firstImg: action.payload
            }
        default:
            return state;
    }
};