import Input from "../../reusableComponent/input";
import Select from "../../reusableComponent/select";
import Utils from "./utils";

function HouseTracker(){
    const Util = Utils();

  console.log(Util.tracker)
    return(
        <div>
                 <Select
                   title={<strong>Category</strong>} 
                   data={Util.selectData}
                   placeholder={Util.tracker.category}
                   onClick={(item)=> {Util.setTracker(prev=> ({...prev, category: item}))}}
                />
                <br/>
            {
                Util.formInput.map((item, i)=>(
                    <Input 
                    key={i}
                    title={<strong>{item.title}</strong>}
                    name = {item.name} 
                    value = {item.value}
                    placeholder= {item.placeholder} 
                    onChange = {(e)=> { Util.setTracker(prev=> ({...prev, [e.target.name] : e.target.value}))} }        
                    />
                ))
            }

        </div>
    )
};

export default HouseTracker;