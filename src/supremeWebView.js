import React from "react";
import {
    StyleSheet,
    Button,
    View,
    Text,
    Alert,
    AppState
} from "react-native";
import {WebView} from "react-native-webview";

class SupremeWebView extends React.Component {
    static navigationOptions = {
        title: "Running..."
    };
    constructor(props) {
        super(props);
    }
    render() {
        const {params} = this.props.navigation.state;
        const run = `
            document.body.style.backgroundColor = 'black';
            setTimeout(() => {
                window.DOMWindow.addEventListener('load', (event) => {
                    window.alert("dom content loaded")
                });
            }, 10);
            setTimeout(() => {
                document.getElementById("new-category").click();true;
                //very ugly way of scripting website
                setTimeout(() => {
                    $("li:contains('${params.keyword}')")[0].click();true;
                    setTimeout(() => {
                        if ("${params.colorId}" != "") {
                            $("#style-${params.colorId}")[0].children[0].children[0].click();
                        }
                        $("#size-options")[0].value = $( "option:contains('${params.selectedSize}')" )[0].value
                        //$("#size-options")[0].value = "${params.sizeId}"   
                        $("#size-options").trigger("change");
                        setTimeout(() => {
                            $("span:contains('add to cart')").click();true;
                            setTimeout(() => {
                                $("span:contains('CHECK OUT')").click();true;
                                setTimeout(() => {
                                    document.getElementById("order_bn").value = "${params.firstName} ${params.lastName}";
                                    document.getElementById("order_email").value = "${params.email}";
                                    document.getElementById("order_tel").value = "${params.tel}";
                                    document.getElementById("order_billing_address").value = "${params.addressOne}";
                                    document.getElementById("order_billing_address_2").value = "${params.addressTwo}";
                                        $("*[placeholder='zip']")[0].value = "${params.zipCode}";
                                        $("*[placeholder='city']")[0].value = "${params.city}";
                                        $("#order_billing_state").val('${params.stateAbbreviated}').trigger("change");
                                        $("#credit_card_year").val('${params.year}').trigger("change");
                                        $("#credit_card_month").val('${params.month}').trigger("change");
                                        document.getElementById("cnid").value = "${params.cardNumber}";
                                        $("*[placeholder='cvv']")[0].value = "${params.cvv}";
                                        document.getElementById("order_terms_label").click();
                                        document.getElementById("submit_button").click();
                                        setTimeout(() => {
                                            window.scrollTo(0, 250);
                                        }, 200);
                                }, (${params.customTimeOut} + 200));
                            }, 400);    
                        }, 400);                                  
                    }, 300);
                }, 300);
            }, 400);
            true;
        `;
        console.log(params);
        return (<WebView
            source={{
            uri: "https://www.supremenewyork.com/shop"
        }}
            ref={r => (this.webref = r)}
            scalesPageToFit={true}
            style={styles.container}
            javaScriptEnabled={true}
            onLoad={() => {
            this
                .webref
                .injectJavaScript(run);
        }}
            addressOneLine={this.props.addressOneLine}
            domStorageEnabled={true}
            startInLoadingState={true}
            ignoreSslError={true}
            onError={err => console.log("error", err)}/>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#9477cb",
        justifyContent: "center"
    }
});

export default SupremeWebView;
