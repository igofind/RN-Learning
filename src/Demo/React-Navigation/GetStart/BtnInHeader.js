import React, { Component } from 'react';
import { Button, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

// react navigation 官方 例子 https://reactnavigation.org/docs/intro/headers

class HomeScreen extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Button
                title="Go Chat"
                onPress={
                () => { navigate('Chat', { user: 'Lucy' }); }
            }
            />
        );
    }
}

class ChatScreen extends Component {

    static navigationOptions = (({ navigation }) => {
        const { state, setParams } = navigation;
        const isInfo = state.params.mode === 'info';
        const { user } = state.params;

        return {
            title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
            headerRight: <Button
                title="Info"
                onPress={() => setParams({ mode: isInfo ? 'none' : 'info' })}
            />,
        };
    });

    render() {
        const { mode, user } = this.props.navigation.state.params;
        return <Text>{mode === 'info' ? `Chat with ${user}` : `${user}' info screen`}</Text>;
    }
}

const BtnInHeader = StackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Chat: {
        screen: ChatScreen,
    },
});

export default BtnInHeader;

