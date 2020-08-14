import React,{useState} from 'react';
import {Button, Input, Switch, TextField} from '@material-ui/core'
import DragNDrop from './DragNDrop'
import ImageUploader from './ImageUploader'
export default function Home(): JSX.Element {

  const [afterSubmit, setAfterSubmit] = useState(true)
  const [isEncrypt, setIsEncrypt] = useState(true)

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <div style={{ alignSelf: "center", paddingTop: "60px", fontSize:'30px' }}>
        Image Steganography
      </div>

      <div style={{width:'80%', padding:'40px',display:'flex', flexDirection:'column'}}>
      <ImageUploader/>
        <div style={{marginTop:'20px'}}>
        <span style={{fontSize:'20px'}}>encrypt</span>
        <Switch checked={isEncrypt} onChange={()=>{setIsEncrypt(!isEncrypt)}} />
        <span style={{fontSize:'20px'}}>decrypt</span>
        </div>
        <div>
           <Input
            style={{
              marginTop: "20px",
              borderRadius: "10px",
              width: "100%",
              paddingLeft: "10px",
              backgroundColor: "white",
            }}
            placeholder="message"
          ></Input>
        </div>
        <div style={{display:'flex', alignItems:'center', marginTop: "20px"}}>
        <Input
          type="password"
          style={{
            width: "50%",
            marginRight: "15px",
            borderRadius: "10px",
            paddingLeft: "10px",
            backgroundColor: "white",
          }}
          placeholder="password"
        ></Input>
         <Button
          style={{ fontSize: "12px", borderRadius: "10px", width: "45%", height:'32px' }}
          color="primary"
          variant="contained"
        >
          submit
        </Button>

      </div>
    </div>
    </div>
  );
}
