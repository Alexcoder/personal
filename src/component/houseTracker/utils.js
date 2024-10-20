import { useState } from 'react';
import * as Hooks from "../../hooks"

function Utils(){
  const trackerInitialState={
      familyName  : Hooks.getItemLocalStorage("familyName"),
      month       : Hooks.formatDate.month,
      creator     : Hooks.getItemLocalStorage("creator"),  
      category    : "" ,
      description : "",
      amountPresented : "",
      amountSpent  : "" ,
      date       : Hooks.formatDate.fullDate(),
  }  

  const [tracker, setTracker]= useState(trackerInitialState);
  const formInput = [
      {
        title: "Description", 
        name : "description", 
        value: tracker.description,
        placeholder : "", 
      },
      {
        title: "Amount Presented", 
        name : "amountPresented", 
        value: tracker.amountPresented,
        placeholder : "", 
      },

      {
        title: "Amount Spent", 
        name : "amountSpent", 
        value: tracker.amountSpent,
        placeholder : "", 
      },

  ];

  const selectData = [ 
    "Food", "Clothing","Groceries",
    "Generator", "Miscellaneous", 
    "Health Care","Logistics",
    "School",]

    return{
      tracker,
      setTracker,
      formInput,
      selectData,
    }
};

export default Utils;