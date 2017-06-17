import React, { PureComponent } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import AText from './AText';
import screen from '../common/screen';

/* eslint-disable global-require */

function requireHtml() {
    const source = resolveAssetSource(require('../html/guangdong.html'));

    if (__DEV__) {
        return require('../html/guangdong.html');
    }
    return Platform.select({
        android: { uri: 'file:///android_asset/html/guangdong.html' },
        ios: { uri: `file://${source.uri}` },
    });
}

const ruleList = {
    guangdong: {
        title: '广东电力市场交易基本规则（试行）',
        file: requireHtml(),
    },
};

const styles = StyleSheet.create({
    a: {
        height: 20,
    },
    rule: {
        alignSelf: 'center',
        fontSize: 12,
        color: '#8d8d8d',
        borderBottomWidth: screen.onePixel,
        borderBottomColor: '#8d8d8d',
    },
});

class GuangDong extends PureComponent {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.a}>
                <AText
                    style={styles.rule}
                    text={ruleList.guangdong.title}
                    onPress={() => {
                        navigate('RulePage', { title: ruleList.guangdong.title, file: ruleList.guangdong.file });
                    }}
                />
            </View>
        );
    }
}

const Rule = {
    GuangDong,
};

export default Rule;
