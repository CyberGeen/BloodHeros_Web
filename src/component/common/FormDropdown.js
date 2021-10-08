import React  from 'react'
    


const FormDropdown = ({name , value , error , handleChange}) => {
    
    
   let opt = Object.entries(value)
    opt = opt.map(obj => <option value={obj[0]} key={obj[0]} >{obj[1]}</option> )
    return (
        <div>
            <select name={name} onChange={handleChange} >
                {opt}
            </select>
            {error && <div>{error}</div>}
        </div>
)
}

export default FormDropdown
