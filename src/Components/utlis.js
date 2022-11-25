import numeral from "numeral";
import React from "react";
import {Circle,Popup} from "react-leaflet";

const casetypecolor={

cases:{
  hex:"#CC1034",
  multiplier:800
},
recovered:{
  hex:"#7dd71d",
  multiplier:1200
},
deaths:{
  hex:"#fb4443",
  multiplier:2000
}
}


export const sortdata=(data)=>{
  const sorteddata=[...data];
return  sorteddata.sort((a,b)=>(a.cases>b.cases? -1:1))
};




export const prettier=(sta)=>(
sta?`+${numeral(sta).format("0,0a")}`:""
);




export const dataforcircle=(data,casetype="cases")=>{

data.map((country)=>(


<Circle>
center={[country.countryInfo.lat,country.countryInfo.long]}
fillOpacity={0.4}
color={casetypecolor[casetype].hex}
fillColor={casetypecolor[casetype].hex}
radius={Math.sqrt(country[casetype])*casetypecolor[casetype].multiplier}


<Popup>
<div className='info-container'>
<div
 className='info-flag' 
 style={{backgound:`url(${country.countryInfo.flag})`}} />

<div className='info-name'>{country.country}</div>

<div className='info-cases'>CASES:{numeral(country.cases).format("0,0")}</div>

<div className='info-recovered'>RECOVERED:{ numeral(country.recovered).format("0,0")}</div>

<div className='info-death'>Death: { numeral(country.deaths).format("0,0")}</div>

</div>
</Popup>



</Circle>




))


}