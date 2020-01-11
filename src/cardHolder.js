import React from "react";
import {StyleSheet, View, Switch} from "react-native";
import {CreditCardInput, LiteCreditCardInput} from "react-native-input-credit-card";
import {Navigation} from 'react-native-navigation'

const s = StyleSheet.create({
    switch: {
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 20
    },
    container: {
        backgroundColor: "#F5F5F5",
        marginTop: 60
    },
    label: {
        color: "black",
        fontSize: 12
    },
    input: {
        fontSize: 16,
        color: "black"
    }
});

export default class CardHolder extends React.Component {
    state = {
        useLiteCreditCardInput: false
    };

    _onChange = formData => console.log(JSON.stringify(formData, null, " "));
    _onFocus = field => console.log("focusing", field);

    componentDidMount = () => {
        console.log("component did mount card")
    }

    render() {
        return (
            <Navigation.Element>
                <View style={s.container}>
                    <CreditCardInput
                        requiresName
                        requiresCVC
                        requiresPostalCode
                        labelStyle={s.label}
                        inputStyle={s.input}
                        validColor={"black"}
                        invalidColor={"red"}
                        placeholderColor={"darkgray"}
                        onFocus={this._onFocus}
                        onChange={this._onChange}/>
                </View>
            </Navigation.Element>
        );
    }
}
