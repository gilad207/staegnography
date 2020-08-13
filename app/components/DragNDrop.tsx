import React,{useState, useEffect, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import ImageUploader from "react-images-upload";

export default function DragNDrop(props) {
  // const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const [choseImage, setChoiceImage] = useState(false)

  // const onDrop = useCallback(acceptedFiles => {
  //   setChoiceImage(true)
  // }, [])

  // useEffect(() => {
  //   filesPath = acceptedFiles[0].path
  // },[acceptedFiles]);
  const [pictures, setPictures] = useState([]);

  const onDrop = picture => {
    setPictures([...pictures, picture]);
    choseImage(true)
    return <p>pictures[0]</p>
  };

  return (
    <div style={{ display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center' }}>

      {/* { && <img
          src={require(String(pictures[0]))}
          style={{height:'400px', width:'300px'}}
      />} */}
      <div >
 <ImageUploader
      {...props}
      withIcon={false}
      withLabel={false}
      singleImage={true}
      onChange={onDrop}
      imgExtension={[".jpg",".png"]}
      maxFileSize={5242880}
    />
    </div>
    </div>
  );
}
