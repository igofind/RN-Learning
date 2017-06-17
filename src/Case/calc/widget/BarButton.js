/**
 * Created by DELL on 2017/6/10.
 */
import React, { PureComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from './Icon';

export default class BarButton extends PureComponent {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                activeOpacity={1}
            >
                <View>
                    <Icon
                        type={this.props.type}
                        name={this.props.name}
                        style={[{ fontSize: 18, color: '#fff' }, this.props.style]}
                    />
                </View>
            </TouchableOpacity>);
    }
}
