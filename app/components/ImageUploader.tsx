import axios from 'axios';

import React,{Component} from 'react';

class ImageUploader extends Component {

    state = {

      // Initially, no file is selected
      selectedFile: null
    };

    // On file select (from the pop up)
    onFileChange = event => {

      // Update the state
      this.setState({ selectedFile: event.target.files[0] });

    };

    // On file upload (click the upload button)
    onFileUpload = () => {

      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );

      // Request made to the backend api
      // Send formData object
      axios.post("api/uploadfile", formData);
    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {

      if (this.state.selectedFile) {

        return (
            <p>{this.state.selectedFile.name}</p>
        );
      } else {
        return (
            <h4>Choose before Pressing the Submit button</h4>
        );
      }
    };

    render() {

      return (
        <div>
            <div style={{display:'flex', flexDirection:'row'}}>
            <label for="image-upload" style={{
                      border: '1px solid #ccc',
                      display: 'inline-block',
                      padding: '0px 12px',
                      cursor: 'pointer',
                      marginRight:'15px',
                  }}>
              <p>Choose Image</p>
            </label>
            <input id="image-upload" type="file" onChange={this.onFileChange} style={{display:'none'}}/>
            {this.fileData()}
            </div>
        </div>
      );
    }
  }

export default ImageUploader;
