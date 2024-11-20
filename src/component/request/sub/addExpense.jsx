import React from 'react'
import Select from '../../../reusableComponent/select/select'
import Input from '../../../reusableComponent/input/input'
import Button from '../../../reusableComponent/button/button'

const AddExpense = ({request, setRequest, formData, handleChange, handleClick}) => {
  return (
    <div>
        <Select 
           data={[
             "Food", "Transport",
             "Data","Dstv", "Netflix", "Security",
             "HealthCare",
             "LightBill", "Water","Security",
             "House Rent", "Church", "Family Support",
             "Clothing", "Shoe", "Groceries",
            "Others"
          ]}
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
      <Button disabled={(request.purpose==="")} title={"Submit"} onClick={()=> handleClick()}/>


      
    </div>
  )
}

export default AddExpense
