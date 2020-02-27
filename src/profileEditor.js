import React from 'react';
import { View, Text, Button, Modal } from 'react-native';

class ProfileEditor extends React.Component {
	// nameOnChangeHandler = (text) => {
	// 	this.setState(() => {
	// 		return {name: text};
	// 	}).then(() => console.log(this.state))
	// }
	constructor(props) {
		super(props);
		this.state = {
			isModalVisible: false
		}
	}
	render() {
		return (
			<View>
				<Button title={"Add Profile"} onPress={() => {
					this.setState({
						isModalVisible: true
					})
				}}/>
				<Modal visible={this.state.isModalVisible} presentationStyle={"formSheet"} animationType={"slide"}>
					<Text>Test</Text>
				</Modal>
			</View>
		);
	}
}

export default ProfileEditor;