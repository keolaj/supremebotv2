import React  from 'react';
import {
	View,
	Button,
	Text,
	Image,
	ScrollView,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { gray } from 'ansi-colors';
import { sliderWidth, itemWidth } from './styles/sliderEntry.js';
import styles from './styles/sliderEntry.js';
class ItemScreen extends React.Component {
	_renderItem = ({item, index}) => {
		return (
			// <View key={item.id}>
			// 	<Text>{item.name}</Text>
			// 	<Image style={{width: 50, height: 50}} source={{uri: item.image}}/>
			// </View>
			<TouchableOpacity
				activeOpacity={1}
				style={styles.slideInnerContainer}
				key={item.id}
				onPress={this.props.showModalHandler}
			>	
				<View style={styles.shadow} />
				<View style={[styles.imageContainer, styles.imageContainerEven]}>
			  		<Image
              			source={{ uri: item.image }}
              			style={styles.image}
            		/>
					<View style={[styles.radiusMask, styles.radiusMaskEven]} />
			    </View>
			    <View style={styles.textContainerEven}>
				    <Text
						style={styles.titleEven}
						numberOfLines={2}
				    >{item.name}
				    </Text>
			    </View>
		  </TouchableOpacity>
		);
	}
	render() {
		const screenWidth = Math.round(Dimensions.get('window').width);
		return (
			<Carousel 
				ref={(c) => { this._carousel = c; }}
				renderItem={this._renderItem}
				data={this.props.supremeList}
				sliderWidth={sliderWidth}
                itemWidth={itemWidth}
				onSnapToItem={this.props.onSnapToItemFunc}
				layout={'stack'}
			/>
		)
	}
}

export default ItemScreen;