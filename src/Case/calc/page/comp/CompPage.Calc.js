import React, { PureComponent } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import TextInputWidget from '../../widget/LabelInput';
import Rule from '../../widget/RuleLink';
import Split from '../../widget/Split';
import ButtonTool from '../../widget/ButtonTool';

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
                contType: type,
            });
        };
    }

    _resetInputs() {
        const inputs = this.inputs;
        this._calcItems.map((curr) => {
            inputs[curr[2]].clear();
            return curr;
        });
        this._otherItems.map((curr) => {
            inputs[curr[2]] && inputs[curr[2]].clear();
            return curr;
        });
    }

    _getValues() {
        const inputs = this.inputs;
        const values = [];
        // 与计算方法参数列表顺序保持一致
        const itemArr = ['htzdl', 'sjzydl', 'sbxsyd', 'sbxsjc', 'ydjjcjdl', 'ydcqjsjc', 'yxpcfw'];
        const otherItem = ['bdjc', 'fcbl', 'pckhbl', 'dlfffbl'];

        itemArr.map((curr) => {
            values.push(inputs[curr].getValue());
            return curr;
        });
        otherItem.map((curr) => {
            if (inputs[curr]) {
                values.push(inputs[curr].getValue());
            } else {
                values.push(0);
            }
            return curr;
        });
        values.push(this.state.contType);
        return values;
    }

    render() {
        const calcItems = this._calcItems;
        const otherItems = [...this._otherItems];

        if (this.state.contType === 1) { // 分成
            otherItems.slice(0, 2);
        } else if (this.state.contType === 2) { // 一口价
            otherItems.slice(1, 1);
        }
        return (
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={125} style={{ flex: 1 }}>
                <ScrollView>
                    <Split />
                    <View >
                        {
                            calcItems.map((curr, index) => (<TextInputWidget
                                label={calcItems[index][0]}
                                key={curr.id}
                                isInput={true}
                                unit={calcItems[index][1]}
                                ref={(e) => { this.inputs[calcItems[index][2]] = e; }}
                            />))
                        }
                        <Split />
                        {
                            otherItems.map((curr, index) => (<TextInputWidget
                                label={otherItems[index][0]}
                                key={curr.id}
                                isInput={true}
                                unit={otherItems[index][1]}
                                ref={(e) => { this.inputs[otherItems[index][2]] = e; }}
                            />))
                        }
                    </View>
                    <Split style={{ height: 30 }} />
                    <Rule.GuangDong navigation={this.props.navigation} />
                    <Split style={{ height: 30 }} />

                    <ButtonTool
                        onReset={() => {
                            this._resetInputs();
                            this.props.onReset();
                        }}
                        onOk={() => {
                            this.props.onOk(this._getValues());
                        }}
                    />

                    <Split style={{ height: 30 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}
