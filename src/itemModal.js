import React from "react";
import {Text, Button, View, Picker, TextInput} from "react-native";
import Modal from "react-native-modal";

class ItemModal extends React.Component {
    render() {
        let sizePicker;
        let tee = false;
        let sweatshirt = false;
        // if (this.props.currentItem.description != undefined) {     tee =
        // this.props.currentItem.description.toLowerCase().includes("tee"); sweatshirt
        // = this.props.currentItem.name.toLowerCase().includes("sweatshirt"); }
        if (this.props.currentItem.category === "tops-sweaters" || this.props.currentItem.category === "jackets" || this.props.currentItem.category === "sweatshirts" || this.props.currentItem.category === "shirts" || this.props.currentItem.category === "t-shirts" || tee || sweatshirt) {
            sizePicker = (
                <Picker
                    selectedValue={this.props.selectedValue}
                    onValueChange={this.props.onValueChange}>
                    <Picker.Item label="Small" value="Small"/>
                    <Picker.Item label="Medium" value="Medium"/>
                    <Picker.Item label="Large" value="Large"/>
                    <Picker.Item label="Extra Large" value="XLarge"/>
                </Picker>
            );
        } else {
            sizePicker = (
                <View>
                    <TextInput
                        style={{
                        marginTop: 15,
                        fontSize: 20
                    }}
                        onChangeText={this.props.onTextChange}
                        color="black"
                        placeholder="Size"
                        backgroundColor="#D3D3D3"
                        placeholderTextColor="darkgrey"/>
                </View>
            );
        }
        console.log(this.props.currentItem);
        return (
            <View style={{
                justifyContent: "center"
            }}>
                <Modal isVisible={this.props.isModalVisible} back>
                    <View
                        style={{
                        marginTop: 50,
                        justifyContent: "center",
                        backgroundColor: "white",
                        borderRadius: 8,
                        padding: 16,
                        borderLeft: "6px solid red"
                    }}>
                        <Text
                            style={{
                            textAlign: "center",
                            marginBottom: 7,
                            fontSize: 25
                        }}>
                            {this.props.currentItem.name}
                        </Text>
                        {this.props.currentItem.price
                            ? (
                                <Text>Price: {this.props.currentItem.price}</Text>
                            )
                            : null}

                        {sizePicker}
                        <TextInput
                            style={{
                            textAlign: "center",
                            padding: 16,
                            borderRadius: 8,
                            fontSize: 25
                        }}
                            onChangeText={this.props.onColorChange}
                            placeholder="Color"
                            value={this.props.currentColor}/>
                        <Button onPress={this.props.dismissModalHandler} title="Done"/>
                    </View>
                </Modal>
            </View>
        );
    }
}
export default ItemModal;
