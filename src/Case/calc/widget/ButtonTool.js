import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import screen from '../common/screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 40,
    },
    btn: {
        flex: 1,
        width: 150,
        borderRadius: 5,
        borderWidth: screen.onePixel,
    },
    btnReset: {
        backgroundColor: '#fff',
        borderColor: '#e6e6e6',
    },
    btnOk: {
        backgroundColor: '#00aaee',
        borderWidth: 0,
    },
    btnText: {
        flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 18,
    },
    btnTextReset: {
        color: '#3a3a3a',
    },
    btnTextOk: {
        color: '#fff',
    },
});

export default class ButtonTool extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={1} onPress={this.props.onReset}>
                    <View style={[styles.btn, styles.btnReset]}>
                        <Text style={[styles.btnText, styles.btnTextReset]}>重置</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={this.props.onOk}>
                    <View style={[styles.btn, styles.btnOk]}>
                        <Text style={[styles.btnText, styles.btnTextOk]}>测算</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

