import React from 'react'
import Select from '../../../reusableComponent/select'
import Input from '../../../reusableComponent/input'
import Button from '../../../reusableComponent/button'

const AddExpense = ({request, setRequest, formData, handleChange, handleClick}) => {
  return (
    <div>
        <Select 
           data={["Clothing", "Shoe", "Groceries","Transport", "Food", "HealthCare", "Miscellaneous"]}
           name={"purpose"}
           value={request.purpose}
           placeholder={request.purpose}
           onClick={(item)=> setRequest(prev=> ({...prev, purpose: item}))}        
        />
        {
        formData.map((item,i)=>(
            <Input 
                key={i}
                title={<strong style={{fontSize:"13px"}}>{item.title}</strong>} 
                name={item.name} 
                value={item.value}
                placeholder={""} 
                onChange={handleChange}
            />))
        }
      <Button title={"Submit"} onClick={()=> handleClick()}/>


      
    </div>
  )
}

export default AddExpense
