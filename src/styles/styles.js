import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    welcomeCard: {
        marginTop: 20,
        backgroundColor: '#8B9DFE',
        height: '30%',
        width: '75%',
        borderRadius: 15,
        left: '12.5%',
        padding: 1,
        shadowColor: "#F6F6F6",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.55,
        shadowRadius: 5.14,
        elevation: 7
    },
    text: {
        color: '#ffffff',
        fontSize: 40
    },
    sliderContainer: {
        marginLeft: 20,
        marginRight: 20,
        top: 0
    },
    welcomeCardHeader: {
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'white',
        marginBottom: 50,
        top: 30
    },
    main: {
        backgroundColor: '#0A0D1F',
        height: '100%',
        top: 0,
        left: 0
    },
    startBtn: {
        top: 200
    }
});
export default styles;