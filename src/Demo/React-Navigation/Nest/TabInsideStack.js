import React, {Component} from "react";
import {Button, Text, View} from "react-native";
import {StackNavigator, TabNavigator} from "react-navigation";
class RecentChatsScreen extends Component {
    render() {
        return (
            <View>
                <Text>List of recent chats</Text>
            </View>
        );
    }
}

class AllContactsScreen extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>List of all contacts</Text>
                <Button title={'chat with Ryn'} onPress={() => navigate('Chat')}/>
            </View>
        );
    }
}

class ChatScreen extends Component {
    static navigationOptions = {
        headerTitle: 'Chat'
    };

    render() {
        return (
            <Text>Chat with Ryn !</Text>
        );
    }
}

const MainScreenNavigator = TabNavigator({
    Recent: {
        screen: RecentChatsScreen,
    },
    All: {
        screen: AllContactsScreen,
    },
});

export default NestingNavigators = StackNavigator({
    Home: {
        screen: MainScreenNavigator,
        navigationOptions: {
            title: 'My Chats',
        }
    },
    Chat: {screen: ChatScreen},
});
