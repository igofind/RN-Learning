import React, { PureComponent } from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class extends PureComponent {
    render() {
        const { dispatch } = this.props.navigation;
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
            ],
        });
        return (
            <View >
                <Text>This is setting page.</Text>

                <Button title={'Back Home'} onPress={() => { dispatch(resetAction); }} />
            </View>
        );
    }
}
