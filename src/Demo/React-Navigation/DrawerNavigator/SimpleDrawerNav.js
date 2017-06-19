import React, { Component } from 'react';
import { Button, View, StyleSheet, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerItems, DrawerNavigator, StackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
    icon: {
        fontSize: 20,
    },
});

class HomeScreen extends Component {
    /* static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (<Icon name="ios-home" style={[styles.icon, { color: tintColor }]} />),
    };*/

    static navigationOptions = ({ navigation }) => ({
        drawerLabel: `${navigation.state.routeName}`,
        drawerIcon: ({ tintColor }) => (<Icon name="ios-home" style={[styles.icon, { color: tintColor }]} />),
    });
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button title="Go to notifications" onPress={() => navigate('Notification')} />
            </View>
        );
    }
}

class NotificationScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Notification',
        drawerIcon: ({ tintColor }) => (<Icon name="ios-notifications" style={[styles.icon, { color: tintColor }]} />),
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button title="Go Settings  " onPress={() => navigate('Settings')} />
            </View>
        );
    }
}

class SettingScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Settings',
        drawerIcon: ({ tintColor }) => (<Icon name="ios-settings" style={[styles.icon, { color: tintColor }]} />),
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button title="Go Home" onPress={() => navigate('Home')} />
                <View style={{ height: 10 }} />
                <Button title="Test backbahavior" onPress={() => navigate('TestBackBehavior')} />
                <View style={{ height: 10 }} />
                <Button title="Show DrawerNavigator" onPress={() => navigate('DrawerOpen')} />
            </View>
        );
    }
}

class BackBehavior extends Component {
    render() {
        return (
            <View>
                <Text>backBehavior prop test page.</Text>
                <View style={{ height: 10 }} />
                <Text >
                    {JSON.stringify(this.props.screenProps)}
                </Text>
            </View>
        );
    }
}

const TabNav = DrawerNavigator({
    Notification: {
        screen: NotificationScreen,
    },
    // Home ... Home12 测试滚动效果
    Home: {
        screen: HomeScreen,
    },
    Home2: {
        screen: HomeScreen,
    },
    Home3: {
        screen: HomeScreen,
    },
    Home4: {
        screen: HomeScreen,
    },
    Home5: {
        screen: HomeScreen,
    },
    Home6: {
        screen: HomeScreen,
    },
    Home7: {
        screen: HomeScreen,
    },
    Home8: {
        screen: HomeScreen,
    },
    Home9: {
        screen: HomeScreen,
    },
    Home10: {
        screen: HomeScreen,
    },
    Home11: {
        screen: HomeScreen,
    },
    Home12: {
        screen: HomeScreen,
    },
    Settings: {
        screen: SettingScreen,
    },
}, {
    initialRouteName: 'Notification',
    // order: ['Home', 'Notification', 'Settings'],
    paths: [], // TODO 怎么用?

    // StackNavigator 与 TabNavigator 嵌套时，Stack的screen做返回操作时，Tab是否定位到初始化的tab
    // TODO 不起作用?
    backBehavior: 'initialRoute',
    // 可重写
    contentComponent: props => <ScrollView><DrawerItems {...props} /></ScrollView>,

    // items:
});

const SimpleTabNav = StackNavigator({
    Home: {
        screen: TabNav,
        navigationOptions: {
            header: null,
        },
    },
    TestBackBehavior: {
        screen: BackBehavior,
    },
});

export default () => (
    <SimpleTabNav
        // 如果想从外部给屏幕组件传入扩展的属性，可以使用 screenProps
        screenProps={{ title: 'screenProps Test', data: 'xxxx' }}
    />
);
