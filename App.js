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
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			this.getCurrentTime();
		}, 1000);
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
	}

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground
					style={styles.image}
					source={{
						uri:
							'https://picsum.photos/' +
							Math.round(Dimensions.get('window').width) +
							'/' +
							Math.round(Dimensions.get('window').height),
					}}
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
		backgroundColor: '#00ff50',
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
