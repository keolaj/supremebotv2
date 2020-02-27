import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CardHolder from './cardHolder.js';
import {Navigation} from 'react-native-navigation';
import {cardOnPressHandler} from '../index.js';
import {profileOnPressHandler} from '../index.js';

class ProfileScreen extends React.Component {
    componentDidMount = () => {
        console.log("component did mount profile")
    }
    render() {
        return (
            <Navigation.Element>
                <View
                    style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => {
                        cardOnPressHandler(this.props.componentId);
                    }}
                        style={{
                        backgroundColor: 'blue',
                        height: 70,
                        justifyContent: "center",
                        alignItems: "center",
                        width: '80%',
                        marginTop: 30,
                        borderRadius: 20
                    }}>
                        <Text>Card</Text>
                    </TouchableOpacity>
					<TouchableOpacity 
						onPress={() => {
							profileOnPressHandler(this.props.componentId);
						}}
						style={{
							backgroundColor: 'blue',
							height: 70,
							justifyContent: "center",
							alignItems: "center",
							width: '80%',
							marginTop: 30,
							borderRadius: 20
						}}
					/>
                </View>
            </Navigation.Element>
        )
    }
}
export default ProfileScreen;