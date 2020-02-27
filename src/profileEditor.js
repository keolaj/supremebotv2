import React from 'react';
import { View, Text, Button, Modal, TouchableOpacity, TextInput } from 'react-native';

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
				<Modal visible={this.state.isModalVisible} presentationStyle={"formSheet"} animationType={"slide"} onDismiss={() => {
					this.setState({isModalVisible: false});
					console.log('modal dismissed')
				}} onRequestClose={() => {
					this.setState({isModalVisible:false})
				}}
				>
					<View style={{marginTop: 30}}>
						<Text>Test2</Text>
						<Button onPress={() => {
						this.setState({isModalVisible: false})
						}} title={'dismiss'}/>
					</View>
				</Modal>
			</View>
		);
	}
}

export default ProfileEditor;