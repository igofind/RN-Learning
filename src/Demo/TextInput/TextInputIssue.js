import React, { Component } from 'react';
import { ScrollView, TextInput, View } from 'react-native';

export default class TextInputIssue extends Component {
    // RN 0.44
    // Android
    // 加上textAlign: 'right' or 'center'后，按住TextInput区域后不能拖动页面

    // RN issue: https://github.com/facebook/react-native/issues/13997
    // RN issue: https://github.com/facebook/react-native/issues/12167
    // RN issue: https://github.com/facebook/react-native/issues/10646

    render() {
        return (
            <ScrollView>
                <View style={{ height: 300 }}>
                    <TextInput placeholder={'1 Input something...'} />
                </View>
                <View style={{ height: 300, textAlign: 'right' }}>
                    <TextInput placeholder={'2 Input something...'} />
                </View>
                <View style={{ height: 300 }}>
                    <TextInput placeholder={'3 Input something...'} />
                </View>
            </ScrollView>
        );
    }
}
