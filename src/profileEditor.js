import React from 'react';
import { View, Text, Button, Modal, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';

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
					<SafeAreaView style={{marginTop: 30,}}>
						<Text style={{textAlign: 'center', fontSize: 40, right:'20%'}}>Shipping Info</Text>
						
						<View style={{marginTop:'10%'}}>
							<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} placeholder="Full Name"></TextInput>
							<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} placeholder="Address Line 1"></TextInput>
							<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} placeholder="Address Line 2"></TextInput>
							<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} placeholder="City"></TextInput>
							<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} placeholder="State"></TextInput>
							<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} placeholder="Zip Code"></TextInput>
							<TouchableOpacity style={{alignSelf:'center',marginTop: '2%', backgroundColor: 'transparent', textAlign:'center'}}onPress={() => {
							this.setState({isModalVisible: false})
							}}><Text style={{alignSelf:'center', color:'blue',fontSize: 20}}>Dismiss</Text></TouchableOpacity>
						</View>
					</SafeAreaView>
				</Modal>
			</View>
		);
	}
}

export default ProfileEditor;