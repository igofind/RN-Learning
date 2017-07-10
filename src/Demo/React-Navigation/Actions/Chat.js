import React, { PureComponent } from 'react';
import { Button, Text, View } from 'react-native';

export default class extends PureComponent {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View >
                <Text>This is chat page.</Text>

                <Button title={'Go Setting'} onPress={() => { navigate('Setting'); }} />
            </View>
        );
    }
}
