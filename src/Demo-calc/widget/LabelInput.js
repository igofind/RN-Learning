/**
 * @flow
 */
import React, {PureComponent} from "react";
import {Alert, Keyboard, StyleSheet, Text, TextInput, View} from "react-native";
import screen from "../common/screen";

export default class LabelInput extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isFocus: false,
        };

        this._input = null;
        this._inputValue = 0; // 都是数字，所以默认值给0，方便计算

        this.getValue = () => {
            return this._inputValue;
        };

        this.clear = () => {
            this._input.clear();
            this._inputValue = 0;
        }
    }

    componentWillMount() {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this._autoBlur());
    }

    componentWillUnmount() {
        this.keyboardDidHideListener.remove();
    }

    _onFocus() {
        this.setState({
            isFocus: true,
        });
        Alert.alert("focus")
    }

    _autoBlur() {
        this._input.blur();
    }

    _onBlur() {
        this.setState({
            isFocus: false,
        });
    }

    _onChangeText(newValue) {
        this._inputValue = newValue;
    }

    _renderInput() {
        let isInput = this.props.isInput;
        if (!isInput) {
            return <Text
                ref={(e) => this._input = e}
                style={[styles.input, this.state.isFocus && styles.focus, this.props.textStyle]}
                {...this.props}
            >{this.props.value}</Text>
        } else {
            return <TextInput
                ref={(e) => this._input = e}
                value={this.props.value}
                style={[styles.input, this.state.isFocus && styles.focus, this.props.textStyle]}
                keyboardType={this.props.keyboardType ? this.props.keyboardType : 'numeric'}
                underlineColorAndroid="transparent"
                onChangeText={(newValue) => this._onChangeText(newValue)}
                onfocus={() => this._onFocus()}
                onBlur={() => this._onBlur()}
                returnKeyType="done"
                onEndEditing={() => this._onBlur()}
                editable={this.props.editable}
                {...this.props}
            />
        }
    }

    render() {
        return (
            <View style={styles.content}>
                <Text style={styles.label}>{this.props.label}</Text>
                {/*<TextInput
                    ref={(e) => this._input = e}
                    value={this.props.value}
                    style={[styles.input, this.state.isFocus && styles.focus, this.props.textStyle]}
                    keyboardType={this.props.keyboardType ? this.props.keyboardType : 'numeric'}
                    underlineColorAndroid="transparent"
                    onChangeText={(newValue) => this._onChangeText(newValue)}
                    onfocus={() => this._onFocus()}
                    onBlur={() => this._onBlur()}
                    returnKeyType="done"
                    onEndEditing={() => this._onBlur()}
                    editable={this.props.editable}
                    {...this.props}
                />*/}
                {this._renderInput()}
                <Text style={styles.unit}>{this.props.unit}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#fff',
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10,
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: screen.onePixel,
    },
    input: {
        flex: 1,
        textAlign: 'right',
        fontSize: 14,
        color: '#8d8d8d',
    },
    focus: {
        color: '#3a3a3a',
    },
    label: {
        fontSize: 15,
        color: '#3a3a3a',
    },
    unit: {
        fontSize: 14,
        color: '#c8c8c8',
        paddingRight: 12,
        paddingLeft: 5,
    }
});