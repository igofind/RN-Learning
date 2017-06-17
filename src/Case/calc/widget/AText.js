import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default class AText extends PureComponent {
    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this.props.onPress}
                    activeOpacity={1}
                >
                    <Text style={this.props.style}>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
