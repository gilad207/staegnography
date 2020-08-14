import axios from 'axios';

import React, { Component, usestate } from 'react';
import { Button } from '@material-ui/core';
class ImageUploader extends Component {
	state = {
		choseImage: false,
		// Initially, no file is selected
		selectedFile: null,
		responseImage: null
	};

	sendImageBase64 = () => {
		new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.readAsDataURL(this.state.selectedFile);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		}).then((a) => {
			const params = new URLSearchParams();
			params.append('message', 'value1');
			params.append('password', 'ilanM');
			params.append('image', a.split(',')[1]);
			axios.post('http://192.168.1.105:8080/encode/getImageWithText', params).then((response) => {
				this.setState({ responseImage: 'data:;base64,' + response.data });
				const params1 = new URLSearchParams();
				params1.append('image', response.data);
				params1.append('password', 'ilanM');
				axios
					.post('http://192.168.1.105:8080/decode/getTextFromImage', params1)
					.then((response) => console.log(response));
			});
		});
	};

	// On file select (from the pop up)
	onFileChange = (event) => {
		// Update the state
		this.setState({ selectedFile: event.target.files[0], choseImage: true });
	};

	// On file upload (click the upload button)
	onFileUpload = () => {
		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name);
		// Request made to the backend api
		// Send formData
	};
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
		if (this.state.selectedFile) {
			return <p>{this.state.selectedFile.name}</p>;
		} else {
			return <h4>Choose before Pressing the Submit button</h4>;
		}
	};

	render() {
		return (
			<div>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<label
						style={{
							border: '1px solid #ccc',
							display: 'inline-block',
							padding: '0px 12px',
							cursor: 'pointer',
							marginRight: '15px'
						}}
					>
						<p>Choose Image</p>
					</label>
					<input id="image-upload" type="file" onChange={this.onFileChange} style={{ display: 'none' }} />
					{this.fileData()}
				</div>
				<div>
					<Button
						onClick={this.sendImageBase64}
						style={{
							marginTop: '20px',
							fontSize: '12px',
							borderRadius: '10px',
							width: '45%',
							height: '32px'
						}}
						color="primary"
						variant="contained"
					>
						submit
					</Button>
				</div>
				{this.state.responseImage != null && (
					<img src={this.state.responseImage} style={{ width: '200px', height: '200px' }} />
				)}
			</div>
		);
	}
}

export default ImageUploader;
