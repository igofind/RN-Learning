/**
 * Created by DELL on 2017/6/12.
 */
import React, { PureComponent } from 'react';
import { ScrollView, View } from 'react-native';
import TextInputWidget from '../../widget/LabelInput';
import Split from '../../widget/Split';
import Rule from '../../widget/RuleLink';
import screen from '../../common/screen';
import ResultHeader from '../../widget/ResultHeader';

export default class extends PureComponent {

    constructor() {
        super();
        this.state = {
            results: new Array(9).fill(0),
        };

        this.setResults = (results) => {
            this.setState({
                results,
            });
        };

        this.resetResult = () => {
            this.setState({
                results: new Array(9).fill(0),
            });
        };
    }

    render() {
        const resultItem = [
            ['偏差结算电量', '万千瓦时'],
            ['长协收益', '万元'],
            ['月度竞价收益', '万元'],
            ['偏差结算费', '万元'],
            ['偏差结算费（用户）', '万元'],
            ['偏差结算费（售电公司）', '万元'],
            ['代理服务费', '万元'],
        ];
        const results = this.state.results;
        return (
            <ScrollView
                style={{ flexDirection: 'column', height: screen.containerHeight }}
                overScrollMode="always"
            >
                <View style={{ flex: 1 }}>
                    <Split />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <ResultHeader
                                title="用户收益"
                                style={{
                                    marginRight: 0,
                                    borderTopLeftRadius: 5,
                                    borderBottomLeftRadius: 5,
                                }}
                                value={results[0]}
                            />
                        </View>

                        <View style={{
                            width: screen.onePixel,
                            borderTopWidth: 20,
                            borderTopColor: '#fff',
                            borderBottomWidth: 20,
                            borderBottomColor: '#fff',
                        }}
                        />

                        <View style={{ flex: 1 }}>
                            <ResultHeader
                                title="售电公司收益"
                                style={{
                                    marginLeft: 0,
                                    borderTopRightRadius: 5,
                                    borderBottomRightRadius: 5,
                                }}
                                value={results[1]}
                            />
                        </View>
                    </View>
                    <Split />
                    <View >
                        {
                            resultItem.map((curr, index) => (<TextInputWidget
                                label={curr[0]}
                                value={`${results[index + 2]}`}
                                key={curr.id}
                                isInput={false}
                                textStyle={{ color: '#00aaee' }}
                                unit={curr[1]}
                            />))
                        }
                    </View>
                    <Split style={{ height: 30 }} />
                    <Rule.GuangDong navigation={this.props.navigation} />
                    <Split style={{ height: 30 }} />
                </View>
            </ScrollView>
        );
    }
}
