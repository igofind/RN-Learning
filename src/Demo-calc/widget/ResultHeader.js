import React, {PureComponent} from "react";
import {StyleSheet, Text, View} from "react-native";

export default class ResultHeader extends PureComponent {
    render() {
        return (
            <View style={{height: 117}}>
                <View style={[styles.header, this.props.style]}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={styles.num}>{this.props.value || 0}</Text>
                        <Text style={styles.unit}>万元</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginLeft: 12,
        marginRight: 12,
    },
    title: {
        marginLeft: 12,
        marginTop: 12,
        fontSize: 15,
        color: '#8d8d8d',
    },
    num: {
        marginTop: 10,
        fontSize: 40,
        color: '#00aaee',
        textAlign: 'center',
    },
    unit: {
        fontSize: 12,
        color: '#8d8d8d',
        marginLeft: 5,
        marginTop: 8,
        textAlignVertical: 'center',
    }
});