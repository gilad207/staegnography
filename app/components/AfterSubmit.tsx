import React,{useState} from 'react';
import {Button, Input, Switch, TextField} from '@material-ui/core'
import DragNDrop from './DragNDrop'

export default function Home(): JSX.Element {

  return(
<div>
    <div style={{marginTop:'20px'}}>
    <div  style={{fontSize:'20px'}}>hidden message: "this is a message"</div>
  </div>
   <Button
    style={{ fontSize: "12px", borderRadius: "10px", width: "30%", height:'32px', marginRight:'10px' }}
    color="primary"
    variant="contained"
  >
    save
  </Button>
  <Button
    style={{ fontSize: "12px", borderRadius: "10px", width: "20%", height:'32px' }}
    color="secondary"
    variant="contained"
  >
    reset
  </Button>
</div>
);
}
