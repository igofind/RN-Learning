import React, { PureComponent } from 'react';
import { Button, Text, View } from 'react-native';

export default class extends PureComponent {

    static navigationOptions = {
        title: 'Welcome',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View >
                <Text>This is home page.</Text>

                <Button title={'Go Chat'} onPress={() => { navigate('Chat'); }} />
            </View>
        );
    }
}
