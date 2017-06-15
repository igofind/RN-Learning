import React, {Component} from "react";
import {Button, View} from "react-native";
export default class MyButton extends Component {
    constructor() {
        super();
        this.reset = false;
        this.state = {
            show: true,
        };
        this.resetState = () => {
            this.setState({
                show: true,
            });
        };
    }

    _hideSelf() {
        // 通过按钮事件来触发按钮自己state变化 => 隐藏自己
        this.setState({
            show: false,
        });
    };

    needReset() {
        if (this.reset !== this.props.reset) {
            this.reset = this.props.reset;
            return true;
        } else {
            return false;
        }
    }

    render() {
        console.log('子 step ：render()');
        let show = this.needReset() || this.state.show;

        let Btn = show ?
            <Button onPress={() => {
                this.props.onPress ? this.props.onPress() : this._hideSelf();
            }}
                    title={this.props.title}
                    color={this.props.color}/> : <View/>;
        return (Btn);
    }

    // *************************************************生命周期******************************************************//
    componentWillMount() {
        console.log('子 step 1：componentWillMount')
    }

    componentDidMount() {
        console.log('子 step 2：componentDidMount')
    }

    componentWillReceiveProps() {
        // 父重新渲染时(调用render()) => 触发子中的componentWillReceiveProps
        console.log('子 componentWillReceiveProps')
    }

    shouldComponentUpdate() {
        console.log('子 step 3：shouldComponentUpdate')
        return true;
    }

    componentWillUpdate() {
        console.log('子 step 4：componentWillUpdate')
    }

    componentDidUpdate() {
        console.log('子 step 5：componentDidUpdate')
    }

    componentWillUnmount() {
        console.log('子 step 6：componentWillUnmount')
    }
}