import React, { Component } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';

const styles = StyleSheet.create({
    icon: {
        fontSize: 20,
    },
});

class HomeScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (<Icon name="ios-home" style={[styles.icon, { color: tintColor }]} />),
    };
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
        tabBarLabel: 'Notification',
        tabBarIcon: ({ tintColor }) => (<Icon name="ios-notifications" style={[styles.icon, { color: tintColor }]} />),
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
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => (<Icon name="ios-settings" style={[styles.icon, { color: tintColor }]} />),
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button title="Go Home" onPress={() => navigate('Home')} />
                <View style={{ height: 10 }} />
                <Button title="Test backbahavior" onPress={() => navigate('TestBackBehavior')} />
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

const TabNav = TabNavigator({
    Notification: {
        screen: NotificationScreen,
    },
    Home: {
        screen: HomeScreen,
    },
    Settings: {
        screen: SettingScreen,
    },
}, {
    tabBarComponent: TabBarBottom, // bar使用的组件
    tabBarPosition: 'bottom', // bar的位置
    swipeEnabled: false, // 是否能滑动左右切换
    animationEnabled: false, // 切换时是否使用过度动画
    lazy: true, // 是否懒加载tab，而不是提前渲染
    tabBarOptions: {
        //* *****************options for TabBarBottom******************//
        activeTintColor: '#00aaee',
        activeBackgroundColor: '#fff',
        // inactiveTintColor: '',
        // inactiveBackgroundColor: '',
        showLabel: true,
        style: {
            // 整个tabBar的样式
            // borderWidth: 5,
        },
        labelStyle: {
            // label的样式
            // fontSize: 20,
        },
        tabStyle: {
            // 每个tab的样式
            // TODO 不起作用?
        },
        //* *****************options for TabBarBottom******************//

        //* *****************options for TabBarTop ******************//
        // activeTintColor: '#00aaee',
        // inactiveTintColor : '#fff',
        // showIcon : false,
        // showLabel : false,
        // upperCaseLabel : false,
        // pressColor : '', // color for material ripple (Android >= 5.0 only)
        // pressOpacity : 0.4, // opacity for pressed tab (iOS and Android < 5.0 only)
        // scrollEnabled : true,
        // tabStyle: {},
        // indicatorStyle: {},
        // labelStyle: {},
        // iconStyle: {},
        // style: {}
    },
    initialRouteName: 'Notification',
    order: ['Home', 'Notification', 'Settings'],
    paths: [], // TODO 怎么用?

    // StackNavigator 与 TabNavigator 嵌套时，Stack的screen做返回操作时，Tab是否定位到初始化的tab
    // TODO 不起作用?
    backBehavior: 'initialRoute',
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
