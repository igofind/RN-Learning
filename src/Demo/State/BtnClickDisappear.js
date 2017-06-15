/**
 * Created by DELL on 2017/6/15.
 */
import React, {Component} from "react";
import MyButton from "./MyButton";
import {View} from "react-native";

export default class BtnClickDisappear extends Component {

    constructor() {
        super();
        this.state = {
            reset: true,
        };
    }

    _refreshByState() {
        this.setState((prevState, props) => ({
            reset: !prevState.reset
        }));
    }

    _resetChild(){
        this.myBtn1.resetState();
    }

    render() {
        console.log('父 step：render');
        return (
            <View>
                <MyButton ref={(e) => this.myBtn1 = e} title="Button1 点我消失" reset={this.state.reset} color="red"/>
                <MyButton title={"重置（通过改变父组件直接操作子组件）"} onPress={() => this._resetChild()}/>

                <View style={{height: 30}}/>
                <MyButton title="Button2 点我消失" reset={this.state.reset} color="green"/>
                <MyButton title="Button3 点我消失" reset={this.state.reset} color="blue"/>

                <MyButton title={"重置（通过改变父组件的state来改变子组件）"} onPress={() => this._refreshByState()}/>
            </View>
        );
    }

    // *************************************************生命周期******************************************************//
    componentWillMount() {
        console.log('父 step 1：componentWillMount')
    }

    componentDidMount() {
        console.log('父 step 2：componentDidMount')
    }

    componentWillReceiveProps() {
        // 父组件重新渲染时(调用render()) => 触发子组件中的componentWillReceiveProps
        console.log('父 componentWillReceiveProps')
    }

    shouldComponentUpdate() {
        console.log('父 step 3：shouldComponentUpdate')
        return true;
    }

    componentWillUpdate() {
        console.log('父 step 4：componentWillUpdate')
    }

    componentDidUpdate() {
        console.log('父 step 5：componentDidUpdate')
    }

    componentWillUnmount() {
        console.log('父 step 6：componentWillUnmount')
    }
}