/**
 * @flow
 */
import React, { PureComponent } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import screen from '../common/screen';

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
    },
});

export default class LabelInput extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isFocus: false,
        };

        this._input = null;
        this._inputValue = '';

        this.getValue = () => (this._inputValue === '' ? 0 : this._inputValue);

        this.clear = () => {
            this._input.clear();
            this._inputValue = 0;
        };
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
            keyboardType: this.props.keyboardType ? this.props.keyboardType : 'numeric',
        });
    }

    _autoBlur() {
        this._input.isFocused && this._input.isFocused() && this._input.blur();
    }

    _onBlur() {
        this.setState({
            isFocus: false,
            keyboardType: 'default',
        });
    }

    _onChangeText(newValue) {
        this._inputValue = newValue;
    }

    _renderInput() {
        const isInput = this.props.isInput;
        if (!isInput) {
            return (<Text
                ref={(e) => { this._input = e; }}
                style={[styles.input, this.props.textStyle]}
                {...this.props}
            >{this.props.value}</Text>);
        }
        return (<TextInput
            ref={(e) => { this._input = e; }}
            defaultValue={this._inputValue}
            style={[styles.input, this.state.isFocus && styles.focus, this.props.textStyle]}
            keyboardType={this.state.keyboardType}
            underlineColorAndroid="transparent"
            onChangeText={newValue => this._onChangeText(newValue)}
            onFocus={() => this._onFocus()}
            onBlur={() => this._onBlur()}
            returnKeyType="done"
            onEndEditing={() => this._autoBlur()}
            editable={this.props.editable}
            multiline={true}
            {...this.props}
        />);
    }

    render() {
        return (
            <View style={styles.content}>
                <Text style={styles.label}>{this.props.label}</Text>
                {this._renderInput()}
                <Text style={styles.unit}>{this.props.unit}</Text>
            </View>
        );
    }
}
