/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import React from 'react';
import HomeScreen from './src/homeScreen.js';
import SupremeWebView from './src/supremeWebView.js';
import ProfileScreen from './src/profileScreen.js';
import CardHolder from './src/cardHolder';
import {Navigation} from 'react-native-navigation';

Navigation.registerComponent(`HomeScreen`, () => HomeScreen);
Navigation.registerComponent(`ProfileScreen`, () => ProfileScreen);
Navigation.registerComponent(`CardHolder`, () => CardHolder);
Navigation.registerComponent(`SupremeWebView`, () => SupremeWebView);

Navigation
    .events()
    .registerAppLaunchedListener(() => {
        Navigation.setDefaultOptions({
            layout: {
                direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
                backgroundColor: 'white'
            },
            animations: {
                push: {
                    waitForRender: true
                },
                push: {
                    enabled: 'true',
                    content: {
                        alpha: {
                            from: 0,
                            to: 1,
                            duration: 200,
                            interpolation: 'accelerate'
                        }
                    }
                },
                pop: {
                    enabled: 'true',
                    content: {
                        alpha: {
                            from: 1,
                            to: 0,
                            duration: 200,
                            interpolation: 'decelerate'
                        }
                    }
                }
            }
        })
        Navigation.setRoot({
            root: {
                bottomTabs: {
                    children: [
                        {
                            stack: {
                                children: [
                                    {
                                        component: {
                                            id: "bot",
                                            name: "SupremeWebView"
                                        },
                                        component: {
                                            id: "home",
                                            name: 'HomeScreen'
                                        }
                                    }
                                ],
                                options: {
                                    bottomTab: {
                                        text: 'Home',
                                        testID: 'FIRST_TAB_BAR_BUTTON'
                                    }
                                }
                            }
                        }, {
                            stack: {
                                children: [
                                    {
                                        component: {
                                            id: "card",
                                            name: "CardHolder"
                                        },
                                        component: {
                                            id: "profile",
                                            name: "ProfileScreen"
                                        }
                                    }
                                ],
                                options: {
                                    bottomTab: {
                                        text: "Profile",
                                        testID: "SECOND_TAB_BAR_BUTTON"
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        });
    });

export const cardOnPressHandler = (parentComponentId) => {
    Navigation.push(parentComponentId, {
        component: {
            name: "CardHolder"
        }
    })
}
export const botOnPressHandler = (parentComponentId) => {
    Navigation.push(parentComponentId, {
        component: {
            name: "SupremeWebView",
            animations: {
                waitForRender: true
            }
        }
    })
}

AppRegistry.registerComponent(appName, () => App);