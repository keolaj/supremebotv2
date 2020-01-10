/**
 * @format
 */

import {
	AppRegistry
} from 'react-native';
import App from './src/app';
import {
	name as appName
} from './app.json';
import React from 'react';
import HomeScreen from './src/homeScreen.js';
import SupremeWebView from './src/supremeWebView.js';
import ProfileScreen from './src/profileScreen.js';
import CardHolder from './src/cardHolder';
import {
	Navigation
} from 'react-native-navigation';

Navigation.registerComponent(`HomeScreen`, () => HomeScreen);
Navigation.registerComponent(`ProfileScreen`, () => ProfileScreen);
Navigation.registerComponent(`CardHolder`, () => CardHolder);

Navigation
	.events()
	.registerAppLaunchedListener(() => {
		Navigation.setRoot({
			root: {
				bottomTabs: {
					children: [{
						stack: {
							children: [{
								component: {
									name: 'HomeScreen',
								}
							}],
							options: {
								bottomTab: {
									text: 'Home',
									testID: 'FIRST_TAB_BAR_BUTTON'
								}
							}
						}
					}, {
						stack: {
							children: [{
								component: {
									id: "card",
									name: "CardHolder",
								},
								component: {
									id: "profile",
									name: "ProfileScreen",
								}
							}],
							options: {
								bottomTab: {
									text: "Profile",
									testID: "SECOND_TAB_BAR_BUTTON"
								}
							}
						}
					}]
				}
			}
		});
	});

export const cardOnPressHandler = (parentComponentId) => {
	Navigation.push(parentComponentId, {
		component: {
			name: "CardHolder"
		},
		options: {
			topBar: {
				title: {
					text: 'Card'
				}
			}
		}
	})
}


AppRegistry.registerComponent(appName, () => App);