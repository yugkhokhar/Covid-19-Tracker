import React from 'react';
import './InfoBox.css';
import {Card,CardContent,Typography} from '@material-ui/core';
import {prettier} from "./utlis.js";

function InfoBox({title,cases,active,total,...props}) {
  return (

    <Card   onClick={props.onClick} className={`card  ${active && "infoBox-selected" } ${isRed && "infoBoxred"}`}>
  <CardContent>
  <Typography className='textPrimary'>
   <h3>{title} </h3> 
  </Typography>
  
 <h3 className={`todaycases ${!isRed && "notred-recovered"}`}>{prettier(cases)}</h3>

   <Typography className='textSecondary'>
   {total} M TOTAL
  </Typography>
  
  </CardContent>


    </Card>
  );
}

export default InfoBox;
