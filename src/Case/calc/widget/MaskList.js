import React, { PureComponent } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../common/theme';
import screen from '../common/screen';
import Config from '../common/config';

const styles = StyleSheet.create({
    list: {
        flexDirection: 'column',
        height: 90,
        flex: 1,
    },
    listItem: {
        backgroundColor: '#fff',
        height: 45,
        flexDirection: 'row',
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: screen.onePixel,
    },
    itemText: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        fontSize: 15,
        textAlignVertical: 'center',
        flex: 1,
        color: '#3a3a3a',
        marginLeft: 12,
    },
    itemActive: {
        color: '#00aaee',
    },
    checkIcon: {
        textAlign: 'center',
        color: '#00aaee',
        backgroundColor: '#fff',
        fontSize: 14,
        marginRight: 12,
        textAlignVertical: 'center',
    },
    hide: {
        display: 'none',
    },
});

export default class MaskList extends PureComponent {

    constructor() {
        super();
        this.state = {
            isExpand: false,
        };

        this.CONS = 'cons';
        this.COMP = 'comp';

        this.CONS_TITLE = '市场化交易测算（电力用户）';
        this.COMP_TITLE = '市场化交易测算（售电公司）';

        this.changeUser = (user) => {
            this.currentUser = user;
            this.setState({
                isExpand: !this.state.isExpand,
            });
            this.props.onUserChange(user, user === Config.CONS);
        };

        this.toggleList = () => {
            this.setState({
                isExpand: !this.state.isExpand,
            });
        };
    }

    _checkUser(user) {
        return this.currentUser === user;
    }

    _renderCheckMark(user) {
        if (user === this.currentUser) {
            return <Icon name="md-checkmark" style={styles.checkIcon} />;
        }
        return <View />;
    }

    render() {
        this.currentUser = this.props.initUser;

        return (
            <View
                ref={(e) => { this._userList = e; }}
                style={[theme.maskContainer, this.state.isExpand ? {} : styles.hide]}
            >
                <Animated.View style={theme.mask} />
                <View style={styles.list}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.changeUser(Config.CONS, true)}>
                        <View style={styles.listItem}>
                            <Text
                                style={[styles.itemText, this._checkUser(Config.CONS) && styles.itemActive]}
                            >{Config.CONS_TITLE}</Text>
                            {this._renderCheckMark(Config.CONS)}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.changeUser(Config.COMP, false)}>
                        <View style={styles.listItem}>
                            <Text
                                style={[styles.itemText, this._checkUser(Config.COMP) && styles.itemActive]}
                            >{Config.COMP_TITLE}</Text>
                            {this._renderCheckMark(Config.COMP)}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
