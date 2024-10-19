import './App.css';
import Input from './reusableComponent/input';
import Select from "./reusableComponent/select";

function App() {
  const monthFormat ={
    Jan : "January",
    Feb : "February",
    Mar : "March",
    Apr : "April",
    May : "May",
    Jun : "June",
    Jul : "July",
    Aug : "August",
    Sep : "September",  
    Oct : "October" ,
    Nov : "November",
    Dec : "December",
  };

  const formatDate ={
    weekDay : new Date().toString().slice(0,3),
    date    : new Date().getDate(),
    month   : monthFormat[`${new Date().toString().slice(4,7)}`],
    year    : new Date().toString().slice(11,15),
    time    : new Date().toString().slice(15,24),
    fullDate(){
      return `${this.date}-${this.month}-${this.year}`
  }
};
  


  return (
    <div className="Appx" 
     style={{display:"grid", placeContent:"center", width:"auto", minHeight:"100vh", placeItems:"initial", backgroundColor:"rgba(50, 50, 200, 0.5)"}}
      >
      <h1>{formatDate.weekDay}</h1>
     <div>{formatDate.time}</div>
     <div>{formatDate.fullDate()}</div>
     
     <Input 
     title={<strong>Date</strong>}
     />
     <Input
     title={<strong>Amount</strong>} 
     />
     <Select
     title={<strong>Category</strong>} 
     data={[ "Food", "Clothing","Groceries","Generator", "Miscellaneous", "Health Care","Logistics"]}
     placeholder={"Category"}
     onClick={(item)=> {}}
     />

    </div>
  );
}

export default App;
