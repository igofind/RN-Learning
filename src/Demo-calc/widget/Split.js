import React, {PureComponent} from 'react';
import {AppRegistry, View} from 'react-native';
import theme from "../common/theme";

export default class Split extends PureComponent {
    render() {
        return (<View style={[theme.split, this.props.style]}/>);
    }
}