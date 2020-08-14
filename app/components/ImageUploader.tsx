import axios from 'axios';
import React, { Component, useState } from 'react';
import { Button } from '@material-ui/core';

export default function ImageUploader({
	isEncrypt,
	message,
	setMessage,
	password,
	setPassword,
	isSubmit,
	setIsSubmit
}) {
	const [ selectedFile, setSelectedFile ] = useState(null);
	const [ responseImage, setResponseImage ] = useState(null);
	const [ responseMessage, setResponseMessage ] = useState(null);

	const getImageWithText = () => {
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(selectedFile);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		}).then((response) => {
			const params = new URLSearchParams();
			params.append('message', message);
			params.append('password', password);
			params.append('image', response.split(',')[1]);
			axios.post('http://localhost:8080/encode/getImageWithText', params).then((response) => {
				setResponseImage('data:;base64,' + response.data);
			});
		});
	};

	const getTextFromImage = () => {
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(selectedFile);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		}).then((response) => {
			const params = new URLSearchParams();
			params.append('password', password);
			params.append('image', response.split(',')[1]);
			axios.post('http://localhost:8080/decode/getTextFromImage', params).then((response) => {
        console.log(response.data)
				const retMessage = response.data == -1 ? 'Wrong Password' : 'The secret message is: ' + response.data;
				setResponseMessage(retMessage);
			});
		});
	};

	const onFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleSubmit = () => {
		setIsSubmit(true);
		isEncrypt ? getImageWithText() : getTextFromImage();
	};

	const handleRestart = () => {
		setIsSubmit(false);
		setSelectedFile(null);
		setResponseImage(null);
		setResponseMessage(null);
		setMessage('');
		setPassword('');
	};

	const fileData = () => {
		if (selectedFile) {
			return <p>{selectedFile.name}</p>;
		} else {
			return <h4>Choose before Pressing the Submit button</h4>;
		}
	};

	return (
		<div>
			{!isSubmit && (
				<div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<label
							htmlFor="image-upload"
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
						<input id="image-upload" type="file" onChange={onFileChange} style={{ display: 'none' }} />
						{fileData()}
					</div>
					<div>
						<Button
							onClick={handleSubmit}
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
				</div>
			)}
			{isSubmit && (
				<div>
					{isEncrypt ? (
						<img src={responseImage} style={{ width: '500px', height: '300px' }} />
					) : (
						<h3>{responseMessage}</h3>
					)}
					<div style={{ display: 'flex', justifyContent: 'space-around' }}>
						{isEncrypt && (
							<Button
								style={{
									marginTop: '20px',
									fontSize: '12px',
									borderRadius: '10px',
									width: '40%',
									height: '32px'
								}}
								color="primary"
								variant="contained"
							>
								<a
									href={responseImage}
									download="image.png"
									style={{ color: 'white', textDecoration: 'none' }}
								>
									save
								</a>
							</Button>
						)}
						<Button
							onClick={handleRestart}
							style={{
								marginTop: '20px',
								fontSize: '12px',
								borderRadius: '10px',
								width: '40%',
								height: '32px'
							}}
							color="secondary"
							variant="contained"
						>
							restart
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
