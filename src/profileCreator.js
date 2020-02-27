import React from 'react';
import { View, Text, TextInput } from 'react-native';

class ProfileCreator extends React.Component {
	render() {
		return (
			<View>
				<TextInput placeholder={"Name"} />
			</View>
		);
	}
}

export default ProfileCreator;