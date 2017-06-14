/**
 * Created by DELL on 2017/6/9.
 */
import React, {PureComponent} from "react";
import {Dimensions, Picker} from "react-native";

class ProvincePicker extends PureComponent {
    render() {
        return (
            <Picker
                style={{width: Dimensions.get('window').width - 120, justifyContent: 'center', alignSelf: 'center'}}
                selectedValue={this.state.typeData}
                onValueChange={(lang) => this.setState({typeData: lang})}>
                <Picker.Item label="男" value="男"/>
                <Picker.Item label="女" value="女"/>
            </Picker>
        );
    }
}