import React, {PureComponent} from "react";
import {KeyboardAvoidingView, ScrollView, View} from "react-native";
import TextInputWidget from "../../widget/LabelInput";
import Rule from "../../widget/RuleLink";
import Split from "../../widget/Split";
import ButtonTool from "../../widget/ButtonTool";

export default class extends PureComponent {
    constructor() {
        super();
        this.inputs = {};
        this._calcItems = [
            ['市场区域', 'TODO', 'scqy'],
            ['双边协商价差', '厘/千瓦时', 'sbxsjc'],
            ['双边协商月度分解电量', '万千瓦时', 'sbxsyd'],
            ['月度出清结算价差', '厘/千瓦时', 'ydcqjsjc'],
            ['月度竞价成交电量', '万千瓦时', 'ydjjcjdl'],
            ['合同总电量', '万千瓦时', 'htzdl'],
            ['实际总用电量', '万千瓦时', 'sjzydl'],
            ['允许偏差范围（±%）', '%', 'yxpcfw'],
        ];
        this._otherItems = [
            ['合同类型', 'TODO', 'htlx'],
            ['保底价差', '厘/千瓦时', 'bdjc'],
            ['代理服务费比例', '%', 'dlfffbl'],
            ['分成比例（售电公司）', '%', 'fcbl'],
            ['偏差考核比例（售电公司）', '%', 'pckhbl'],
        ];
        this.state = {
            contType: 1, // 1：保底分成,2：分成,3：一口价
        };
        this.changerContType = (type) => {
            this.setState({
                contType: type
            });
        };
    }

    _resetInputs() {
        let inputs = this.inputs;
        this._calcItems.map(function (curr) {
            inputs[curr[2]].clear();
        });
        this._otherItems.map(function (curr) {
            inputs[curr[2]] && inputs[curr[2]].clear();
        });
    }

    _getValues() {
        let inputs = this.inputs;
        let values = [];
        // 与计算方法参数列表顺序保持一致
        let itemArr = ['htzdl', 'sjzydl', 'sbxsyd', 'sbxsjc', 'ydjjcjdl', 'ydcqjsjc', 'yxpcfw'];
        let otherItem = ['bdjc', 'fcbl', 'pckhbl', 'dlfffbl'];

        itemArr.map(function (curr) {
            values.push(inputs[curr].getValue());
        });
        otherItem.map(function (curr) {
            if (inputs[curr]) {
                values.push(inputs[curr].getValue());
            } else {
                values.push(0);
            }
        });
        values.push(this.state.contType);
        return values;
    }

    render() {
        let calcItems = this._calcItems;
        let otherItems = [...this._otherItems];

        if (this.state.contType === 1) { // 分成
            otherItems.slice(0, 2);
        } else if (this.state.contType === 2) { // 一口价
            otherItems.slice(1, 1);
        }
        return (
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={125} style={{flex: 1,}}>
                <ScrollView>
                    <Split/>
                    <View >
                        {
                            calcItems.map((curr, index) => {
                                return <TextInputWidget
                                    label={calcItems[index][0]}
                                    key={index}
                                    isInput={true}
                                    unit={calcItems[index][1]}
                                    ref={(e) => this.inputs[calcItems[index][2]] = e}/>
                            })
                        }
                        <Split/>
                        {
                            otherItems.map((curr, index) => {
                                return <TextInputWidget
                                    label={otherItems[index][0]}
                                    key={index}
                                    isInput={true}
                                    unit={otherItems[index][1]}
                                    ref={(e) => this.inputs[otherItems[index][2]] = e}/>
                            })
                        }
                    </View>
                    <Split style={{height: 30}}/>
                    <Rule.GuangDong navigation={this.props.navigation}/>
                    <Split style={{height: 30}}/>

                    <ButtonTool
                        onReset={() => {
                            this._resetInputs();
                            this.props.onReset();
                        }}
                        onOk={() => {
                            this.props.onOk(this._getValues())
                        }}/>

                    <Split style={{height: 30}}/>
                </ScrollView>
            </KeyboardAvoidingView>
        );

    }
}