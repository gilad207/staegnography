import React, { useState } from 'react';
import { Button, Input, Switch, TextField } from '@material-ui/core';
import ImageUploader from './ImageUploader';
export default function Home(): JSX.Element {
	const [ isSubmit, setIsSubmit ] = useState(false);
	const [ isEncrypt, setIsEncrypt ] = useState(true);
	const [ message, setMessage ] = useState('');
	const [ password, setPassword ] = useState('');

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<div style={{ alignSelf: 'center', paddingTop: '60px', fontSize: '30px' }}>
				<h2>Image Steganography</h2>
			</div>

			<div style={{ width: '80%', padding: '40px', display: 'flex', flexDirection: 'column' }}>
				{!isSubmit && (
					<div>
						<div>
							<span style={{ fontSize: '20px' }}>decrypt</span>
							<Switch
								checked={isEncrypt}
								onChange={() => {
									setIsEncrypt(!isEncrypt);
								}}
							/>
							<span style={{ fontSize: '20px' }}>encrypt</span>
						</div>
						<div>
							<Input
								onChange={(e) => setMessage(e.target.value)}
								disabled={!isEncrypt}
								style={{
									marginTop: '20px',
									borderRadius: '10px',
									width: '100%',
									paddingLeft: '10px',
									backgroundColor: 'white'
								}}
								placeholder="message"
							/>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
							<Input
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								style={{
									width: '100%',
									borderRadius: '10px',
									paddingLeft: '10px',
									backgroundColor: 'white'
								}}
								placeholder="password"
							/>
						</div>
					</div>
				)}
				<div style={{ marginTop: '30px' }}>
					<ImageUploader
						isEncrypt={isEncrypt}
						message={message}
						setMessage={setMessage}
						password={password}
						setPassword={setPassword}
						isSubmit={isSubmit}
						setIsSubmit={setIsSubmit}
					/>
				</div>
			</div>
		</div>
	);
}
