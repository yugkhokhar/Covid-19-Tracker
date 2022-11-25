import React,{useState,useEffect} from 'react';
import './App.css';
import {MenuItem,FormControl,Select} from '@material-ui/core';
import InfoBox from './Components/InfoBox';
import Table from './Components/Table';
import {Card,CardContent} from '@material-ui/core';
import Graph from './Components/Graph';
import {sortdata} from './Components/utlis.js';
import Map from "./Components/Map";



function App() {
  
 let [allcountriesdata,setallcountriesdata]=useState([]);


  let [countries,setcountries]=useState([]);
//all counties name

let [countryselect,setcountryinbox]=useState("WorldWide");
//set the selecteed country in dropdown

  let [countrydata,setcountrydata]=useState({}); 
  //particular country object

 let [tabledata,settabledata]=useState([]); 


 let [mapcenter,setmapcenter]=useState([]);
 let [zoom,setzoom]=useState(3);

 let [casetype,setcasetype]=useState(3);




//fetch the worldwide data while loading app
useEffect(()=>{

const fetchworlddata=async()=>{

 await fetch("https://disease.sh/v3/covid-19/all").then(response=>response.json()).then((data)=>{
   setcountrydata(data);
 }) 
}
fetchworlddata();


},[])







//Used for the api request
//UseEffect is used to for the execution of the callback function when page reloads and then again evey time the quantitty in second parameter changes

useEffect(()=>{

const getcountriesname=async()=>{
await fetch("https://disease.sh/v3/covid-19/countries")

.then((response)=>response.json())

.then((data)=>{

const countries=data.map((country)=>({
  
    name:country.country,
    value:country.countryInfo.iso2
  
}));
console.log(data);
const sorteddata=sortdata(data);
settabledata(sorteddata);
setallcountriesdata(data);
setcountries(countries);
})

}
getcountriesname();
},[])
  

//changing the default option with selected country name

const countrychange=async(event)=>{
const countrychoose=event.target.value;

const url=countrychoose==="WorldWide"?"https://disease.sh/v3/covid-19/all": `https://disease.sh/v3/covid-19/countries/${countrychoose}`;

await fetch(url).then((response)=>response.json()).then((data)=>{
  setcountrydata(data);
setcountryinbox(countrychoose);
setmapcenter([data.countryInfo.lat,data.countryInfo.long])

})

}
console.log(countrydata);

  return (
<div className="App">

  <div className='left'>
     <div className='header'>
        <h1>COVID-19 TRACKER</h1>
       <FormControl className='dropdown'>
       <Select variant='outlined' value={countryselect} onChange={countrychange}>
       <MenuItem value="WorldWide">WorldWide</MenuItem>
       {countries.map((country)=>{
       return   <MenuItem value={country.value}>{country.name}</MenuItem>})}

         </Select>
         </FormControl>
    </div>

    <div className='cards'>
       
       <InfoBox  
        isRed
        active={casetype=="cases"}
        onClick={e=>setcasetype("cases")}
        className='card'
        title="CORONA VIRUS CASES" 
        cases={countrydata.todayCases} 
        total={countrydata.cases}/>
       
       <InfoBox
           active={casetype=="recovered"}
         onClick={(e)=>setcasetype("recovered")}
         title="RECOVERED" 
         cases={countrydata.todayRecovered} 
         total={countrydata.recovered}/>
       
       <InfoBox 
       isRed
        active={casetype=="deaths"}
        onClick={e=>setcasetype("deaths")}
        title="DEATHS"
        cases={countrydata.todayDeaths} 
        total={countrydata.deaths} />
     </div>
  
 <Map center={mapcenter} countries={allcountriesname} casetype={casetype} zoom={zoom}/>

</div>

 <Card className='right'>
   <CardContent>
     <h3>LIVE CASES BY COUNTRY</h3>
<Table countries={tabledata}/>

  <h3>WORLDWIDE CASES</h3>
  <Graph casetype={casetype} />
    </CardContent>
 </Card>
 
 
</div>
  );
}

export default App;
