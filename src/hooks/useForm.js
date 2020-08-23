import { useState } from "react"


const useForm = (initialState = {}) => {
   
const [formValue, setformValue] = useState(initialState)

const handleInputChange = ({target}) => {
   
    setformValue({
        ...formValue,
        [target.name] : target.value
    })
}

const reset = () => {
    setformValue(initialState)
}

return [formValue, reset,  handleInputChange]

}

export default useForm