import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Button, Text, View } from 'react-native';

class Welcome extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>Hello React Navigation!</Text>
                <Button title={'go chat'} onPress={() => navigate('Chat')} />
                <Button color={'green'} title={'go setting'} onPress={() => navigate('Settings')} />
            </View>
        );
    }
}

class ChatScreen extends Component {
    static navigationOptions = {
        title: 'Chat',
    };

    render() {
        const { navigate, goBack } = this.props.navigation;
        return (<View>
            <Text>Chat with Ryn !</Text>
            <Button title={'go back'} onPress={() => goBack()} />
            <Button color={'red'} title={'go setting'} onPress={() => navigate('Settings')} />
            <Button color={'green'} title={'go welcome'} onPress={() => navigate('Welcome')} />
        </View>
        );
    }
}

class Settings extends Component {
    static navigationOptions = {
        title: 'Settings',
    };

    render() {
        const { goBack } = this.props.navigation;
        return (<View>
            <Text>some thing to setup</Text>
            <Button title={'go back'} onPress={() => goBack()} />
            <Button color={'red'} title={'go back null'} onPress={() => goBack(null)} />
            {/* goBack(key) 不能用，key为this.props.navigation.state.key，但是这个key是自动随机生成的，每次都不一样，且不能拿到别的页面的key*/}
            <Button color={'green'} title={'go back + key'} onPress={() => goBack('1')} />
        </View>
        );
    }
}

const HelloReactNavigation = StackNavigator({
    Welcome: {
        screen: Welcome,
        key: 1,
    },
    Chat: {
        screen: ChatScreen,
    },
    Settings: {
        screen: Settings,
    },
});

export default HelloReactNavigation;