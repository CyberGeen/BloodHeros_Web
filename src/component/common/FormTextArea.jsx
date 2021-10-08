import React from 'react'
const FormTextArea = ({name , label , value , error ,  handleChange}) => {
    return (
        <div>
            <label htmlFor={name}>
                {label}
            </label>
            <textarea 
                onChange={handleChange} 
                value={value}
                id={name}
                name={name}
                rows="16"
                cols="32"
            >
    
            </textarea>
            {error && <div>{error}</div>}
        </div>
    )
}

export default FormTextArea
