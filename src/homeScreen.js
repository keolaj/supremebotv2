import React from "react";
import {
    StyleSheet,
    Button,
    View,
    Text,
    Slider,
	Modal,
	Animated
} from "react-native";
import {white} from "ansi-colors";
import ItemScreen from "./itemScreen.js";
import ItemModal from "./itemModal.js";
import styles from "./styles/styles.js";
import {stringify} from "querystring";
import {botOnPressHandler} from '../index.js';

var plist = require("plist");
var RNFS = require("react-native-fs");
const cheerio = require("react-native-cheerio");

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Home"
    };
    constructor(props) {
        super(props);
        this.state = {
            slideValue: 300,
            plistDict: {
                firstNameLine: "init"
            },
            supremeList: [
                {
                    name: "loading"
                }
            ],
            selectedColor: "",
            latestWeek: "",
            currentSliderIndex: 0,
            isModalVisible: false,
            selectedSize: "",
            selectedColor: "",
            colorId: "",
            sizeId: "",
            imageURL: ""
        };
        this.path = RNFS.DocumentDirectoryPath + "/Address.plist";
        RNFS
            .readFile(this.path, "utf8")
            .then(results => {
                this.setState({
                    plistDict: plist.parse(results)
                });
            })
            .catch(err => {
                console.log(err);
            });
        this.supremeInterval;
        this.getLatestWeek();
    }
    change(slideValue) {
        this.setState(() => {
            return {slideValue: parseFloat(slideValue)};
        });
    }

    getLatestWeek = () => {
        const url = "https://www.supremecommunity.com/season/latest/droplists/";
        let list = [];
        fetch(url).then(res => {
            return res.text();
        }).catch(err => {
            console.log(err);
        }).then(html => {
            const $ = cheerio.load(html);
            const latestURL = $(".block");
            const href = latestURL
                .first()
                .attr("href");
            console.log("supremecommunity latest week is at https://www.supremecommunity.com" + href);
            this.setState({
                latestWeek: "https://www.supremecommunity.com" + href
            });
            return "https://www.supremecommunity.com" + href;
            // return
            // "https://www.supremecommunity.com/season/fall-winter2019/droplist/2019-10-31/
            // " return
            // "https://www.supremecommunity.com/season/fall-winter2019/droplist/2019-10-24/
            // " ; return
            // "https://www.supremecommunity.com/season/fall-winter2019/droplist/2019-11-14/
            // " ;
        }).catch(err => {
            console.log(err);
        }).then(latestWeekHref => {
            fetch(latestWeekHref).then(res => {
                return res.text();
            }).catch(err => {
                console.log(err);
            }).then(html => {
                const $ = cheerio.load(html);
                const items = $(".card.card-2");
                console.log("items");
                if (items.length !== 0) {
                    items.each((i, el) => {
                        let obj = {};
                        // Give ID
                        obj.id = i + 1;
                        // Name of item
                        obj.name = $(el)
                            .find("h2")
                            .text();
                        // Code value that Supreme Community gives an item
                        obj.code = $(el).attr("data-itemid");
                        // Price of item
                        obj.price = $(el)
                            .find(".label-price")
                            .text()
                            .trim();
                        // Image Href of item
                        let imageURL = $(el)
                            .find("img")
                            .attr("src");
                        obj.image = `https://www.supremecommunity.com${imageURL}`;
                        // Description of item
                        let description = $(el)
                            .find("img")
                            .attr("alt");
                        obj.description = description.split(" - ")[1];
                        // Category of item
                        let category = $(el)
                            .find(".category")
                            .text();
                        obj.category = category;
                        // Colors of item

                        if (!obj.name.includes("*Restock*") && !obj.name.includes("*INSTORE ONLY")) {
                            list.push(obj);
                        }
                    });
                }
                if (list.length === 0) {
                    console.log("list is empty");
                } else {
                    this.setState({supremeList: list});
                }
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
    };
    buttonHandle = () => {
        RNFS
            .readFile(this.path, "utf8")
            .then(results => {
                this.setState({
                    plistDict: plist.parse(results)
                });
                this.getSupremeWebsite();
            })
            .catch(err => {
                console.log(err);
            });
    };
    getSupremeWebsite() {
        if (this.supremeInterval != 1) {
            console.log("clearing supreme interval");
            clearInterval(this.supremeInterval);
            this.supremeInterval = 1;
        }
        this.supremeInterval = setInterval(() => {
            console.log("setting interval and searching for " + this.state.supremeList[this.state.currentSliderIndex].name);
            fetch("https://www.supremenewyork.com/mobile_stock.json")
                .then(res => res.json())
                .then(secondRes => {
                    for (x of secondRes.products_and_categories.new) {
                        if (x.name.includes(this.state.supremeList[this.state.currentSliderIndex].name)) {
                            console.log("keyword is in an existing supreme object, continuing");
                            clearInterval(this.supremeInterval);
                            this.supremeInterval = 1;
                            fetch(`https://www.supremenewyork.com/shop/${x.id}.json`)
                                .then(res => res.json())
                                .then(secondRes => {
                                    for (x of secondRes.styles) {
                                        if (x.name.toLowerCase().includes(this.state.selectedColor.toLowerCase())) {
                                            console.log("color matches lets make sure we get this color");
                                            console.log(x.image_url);
                                            this.setState({imageURL: x.image_url});
                                            for (y of x.sizes) {
                                                if (y.name === this.state.selectedSize && y.stock_level != 0) {
                                                    console.log("heres the right size id: " + y.id);
                                                    this.setState({sizeId: y.id});
                                                    this.setState({colorId: x.id});
                                                    this
                                                        .props
                                                        .navigation
                                                        .navigate("SupremeWebView", {
                                                            firstName: this.state.plistDict.firstNameLine,
                                                            timeout: this.state.slideValue,
                                                            lastName: this.state.plistDict.lastNameLine,
                                                            tel: this.state.plistDict.telephoneLine,
                                                            keyword: this.state.supremeList[this.state.currentSliderIndex].name,
                                                            addressOne: this.state.plistDict.addressOneLine,
                                                            addressTwo: this.state.plistDict.addressTwoLine,
                                                            city: this.state.plistDict.cityLine,
                                                            zipCode: this.state.plistDict.zipCodeLine,
                                                            email: this.state.plistDict.emailLine,
                                                            stateAbbreviated: this.state.plistDict.stateLine,
                                                            cardNumber: this.state.plistDict.cardNumberLine,
                                                            cvv: this.state.plistDict.cvvLine,
                                                            month: this.state.plistDict.monthLine,
                                                            year: this.state.plistDict.yearLine,
                                                            customTimeOut: this.state.slideValue,
                                                            selectedSize: this.state.selectedSize,
                                                            selectedColor: this.state.selectedColor,
                                                            sizeId: this.state.sizeId,
                                                            colorId: this.state.colorId
                                                        });
                                                    return;
                                                } else {
                                                    continue;
                                                }
                                            }
                                        } else {
                                            continue;
                                        }
                                    }
                                    console.log("color did not match, continuing");
                                    botOnPressHandler();
                                    return;
                                });
                        } else {
                            continue;
                        }
                    }
                    console.log(this.state.supremeList[this.state.currentSliderIndex].name + " was not in mobile stock, gonna fetch stock json again");
                })
                .catch(err => {
                    console.log(err);
                });
        }, 300);
    }
    updateSliderIndex = currentIndex => {
        this.setState({currentSliderIndex: currentIndex});
    };
    showModalHandler() {
        if (this.state.supremeList[this.state.currentSliderIndex].name === "loading") {
            return;
        } else {
            this.setState({isModalVisible: true});
        }
    }
    dismissModalHandler() {
        this.setState({isModalVisible: false});
    }
    onValueChangeHandler = (itemValue, itemIndex) => {
        this.setState({selectedSize: itemValue});
    };
    onColorChangeHandler = colorValue => {
        this
            .setState({selectedColor: colorValue})
            .then(() => {
                console.log(this.state);
            });
    };
    onTextChangeHandler = text => {
        this.setState({selectedSize: text});
    };
    onColorChangeHandler = text => {
        this.setState({selectedColor: text});
        console.log(this.state.selectedColor);
    };
    render() {
        const {slideValue} = this.state;

        return (
            <View style={styles.main}>
                <View style={styles.welcomeCard}>
                    <Text style={styles.welcomeCardHeader}>
                        Welcome Back, {this.props.screenProps}
                    </Text>
                    <Button
                        style={styles.startBtn}
                        title="Start Bot"
                        onPress={() => {
                        this.buttonHandle();
                    }}/>
                </View>
                <View style={{
                    marginTop: 20
                }}>
                    <ItemScreen
                        supremeList={this.state.supremeList}
                        ref={c => {
                       		this._carousel = c;
                    	}}
                        onSnapToItemFunc={this.updateSliderIndex}
                        isModalVisible={this.state.isModalVisible}
                        showModalHandler={this.showModalHandler.bind(this)}
					/>
					{this.state.supremeList.category ? 
					<ItemModal
                        isModalVisible={this.state.isModalVisible}
                        dismissModalHandler={this.dismissModalHandler.bind(this)}
                        currentItem={this.state.supremeList[this.state.currentSliderIndex]}
                        onValueChange={this.onValueChangeHandler}
                        onTextChange={this.onTextChangeHandler}
                        onColorChange={this.onColorChangeHandler}
                        selectedValue={this.state.selectedSize}
                        onColorChange={this.onColorChangeHandler}
                        currentColor={this.state.selectedColor}
					/>: null}
                </View>
                <View style={styles.sliderContainer}>
                    <Text style={styles.text}>{String(slideValue)}ms</Text>
                    <Slider
                        step={100}
                        maximumValue={7000}
                        onValueChange={this
                        .change
                        .bind(this)}
                        value={slideValue}/>
                </View>
            </View>
        );
    }
}
export default HomeScreen;
