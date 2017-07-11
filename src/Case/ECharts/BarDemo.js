import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Echarts from './lib/index';

const styles = StyleSheet.create({
    barCharContainer: {
        flex: 1,
    },
});

const echartsOptions = [
    {
        title: {
            show: false,
        },
        tooltip: {
            textStyle: {
                fontSize: 10,
            },
        },
        grid: {
            top: 30,
            height: 50,
        },
        legend: {
            data: [
                {
                    name: '总合同电量',
                    icon: 'rect',
                },
                {
                    name: '总实际执行电量',
                    icon: 'rect',
                },
            ],
            top: 'bottom',
            textStyle: {
                fontSize: 8,
            },
            itemWidth: 6,
            itemHeight: 6,
            padding: 0,
            selectedMode: false,
        },
        xAxis: {
            data: ['总合同电量', '总实际执行电量'],
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false, // 不显示刻度线
            },
            axisLabel: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: '#D3D3D3',
                },
            },
            min: 1,
        },
        yAxis: {
            name: '兆瓦时',
            nameTextStyle: {
                fontSize: 8,
                color: '#8d8d8d',
            },
            nameGap: 10,
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                textStyle: {
                    color: '#8d8d8d',
                    fontSize: 8,
                },
            },
            axisLine: {
                lineStyle: {
                    color: '#D3D3D3',
                },
            },
            inverse: false,
            min: 0,
            max: 20,
            minInterval: 5,
        },
        series: [
            {
                name: '总合同电量',
                type: 'bar',
                barWidth: 28,
                data: [16],
                tooltip: {
                    formatter: '{b}：{c}',
                },
            },
            {
                name: '总实际执行电量',
                type: 'bar',
                barWidth: 28,
                barGap: '200%', // 柱间距离
                data: [9],
                tooltip: {
                    formatter: '{a}：{c}',
                },
            },
        ],
        color: ['#47CFA0', '#00aaee'],
    },
    {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
            position: [20, 0],
            textStyle: {
                fontSize: 10,
            },
        },
        legend: {
            orient: 'horizontal',
            x: 'center',
            top: 'bottom',
            itemWidth: 6,
            itemHeight: 6,
            data: [
                {
                    name: '申报电量',
                    icon: 'rect',
                },
                {
                    name: '成交电量',
                    icon: 'rect',
                },
            ],
            textStyle: {
                fontSize: 8,
                color: '#8d8d8d',
            },
            selectedMode: false,
            padding: 0,
        },
        series: [
            {
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                hoverAnimation: false,
                cursor: 'normal',
                label: {
                    normal: {
                        position: 'outside',
                        formatter: '{c} 兆瓦时',
                        textStyle: {
                            fontSize: 8,
                        },
                    },
                    emphasis: {
                        position: 'outside',
                        formatter: '{c} 兆瓦时',
                        textStyle: {
                            fontSize: 8,
                        },
                    },
                },
                labelLine: {
                    normal: {
                        length: 5,
                        length2: 5,
                    },
                    emphasis: {
                        length: 5,
                        length2: 5,
                    },
                },
                data: [
                    { value: 100, name: '成交电量' },
                    { value: 300, name: '申报电量' },
                ],
            },
        ],
        color: ['#47CFA0', '#00aaee'],
    },
];

export default class extends PureComponent {
    render() {
        return (
            <View style={styles.barCharContainer}>
                <Echarts option={echartsOptions[0]} height={100} />
            </View>
        );
    }
}
