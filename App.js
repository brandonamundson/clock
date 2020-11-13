import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Platform,
	ImageBackground,
	Dimensions,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Audio } from 'expo-av';
const { Picsum } = require('picsum-photos');

var playbackInstance = new Audio.Sound();

export default class App extends Component {
	constructor() {
		super();

		this.state = { currentTime: null, currentDay: null };
		this.daysArray = [
			'sunday',
			'monday',
			'tuesday',
			'wednesday',
			'thursday',
			'friday',
			'saturday',
		];
		this.screenSize = {
			x: Math.round(Dimensions.get('window').width),
			y: Math.round(Dimensions.get('window').height),
		};
		this.img = Picsum.url({
			height: this.screenSize.y,
			width: this.screenSize.x,
		});
	}

	async componentDidMount() {
		this.timer = setInterval(() => {
			this.getCurrentTime();
		}, 1000);
		this.timer = setInterval(() => {
			this.getNewImg();
		}, 5000);
		this.timer = setInterval(() => {
			playbackInstance.loadAsync(require('./assets/tiktok_extended.mp3'));
			playbackInstance.playAsync();
		}, 1000);
	}

	async getNewImg() {
		this.img = await Picsum.url({
			height: this.screenSize.y,
			width: this.screenSize.x,
		});
	}

	getCurrentTime = () => {
		let hour = new Date().getHours();
		let minutes = new Date().getMinutes();
		let seconds = new Date().getSeconds();
		let am_pm = 'pm';

		if (minutes < 10) {
			minutes = '0' + minutes;
		}

		if (seconds < 10) {
			seconds = '0' + seconds;
		}

		if (hour > 12) {
			hour = hour - 12;
		}

		if (hour == 0) {
			hour = 12;
		}

		if (new Date().getHours() < 12) {
			am_pm = 'am';
		}

		this.setState({
			currentTime: hour + ':' + minutes + ':' + seconds + ' ' + am_pm,
		});

		this.daysArray.map((item, key) => {
			if (key == new Date().getDay()) {
				this.setState({ currentDay: item.toUpperCase() });
			}
		});
	};

	componentWillUnmount() {
		clearInterval(this.timer);
		playbackInstance.unloadAsync();
	}

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground
					style={styles.image}
					source={{ uri: this.img }}
				>
					<Text style={styles.daysText}>{this.state.currentDay}</Text>
					<Text style={styles.timeText}>
						{this.state.currentTime}
					</Text>
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'ios' ? 20 : 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000',
	},
	timeText: {
		fontSize: Platform.OS === 'android' ? 70 : RFPercentage(13),
		color: '#ff5000',
	},
	daysText: {
		color: '#0030ff',
		paddingBottom: 0,
		fontSize: Platform.OS === 'android' ? 30 : RFPercentage(6),
		fontWeight: Platform.OS === 'android' ? 'bold' : '500',
	},
	image: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
