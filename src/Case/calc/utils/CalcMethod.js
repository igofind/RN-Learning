import Big from "./big.min";
// *******************************电力用户测算************************************* //
/**
 * 电力用户测算
 * @param contPower 合同电量
 * @param usedPower 实际用电量
 * @param monthPower 长协分月电量
 * @param spreads 长协价差
 * @param monthDealPower 月度竞价成交电量
 * @param clearingFeeSpreads 月度出清结算价差
 * @param biasPowerRanger 允许偏差范围
 * @param dirPrice 目录综合电价
 */
function doConsCalc(contPower, usedPower, monthPower, spreads, monthDealPower, clearingFeeSpreads, biasPowerRanger, dirPrice) {
    let
        biasPower, // 偏差电量
        checkingEnergy, // 考核电量
        spendBeforeMarketing, // 市场化前支出
        consultBenefit, // 长协收益（双边协商）
        monthBenefit, // 月度收益
        clearingFee, // 偏差电量结算费用
        totalSpend, // 市场后总支出
        totalBenefit,// 市场后总收益
        needCheck // 是否考核
    ;
    biasPowerRanger = new Big(biasPowerRanger).times(0.01);

    biasPower = calcBiasPower(usedPower, contPower);
    checkingEnergy = calcCheckingEnergy(usedPower, contPower, biasPowerRanger);
    spendBeforeMarketing = calcSpendBeforeMarketing(usedPower, dirPrice);
    consultBenefit = calcConsultBenefit(monthPower, spreads);
    needCheck = biasPower.abs().gt(new Big(contPower).times(biasPowerRanger));
    monthBenefit = calcMonthBenefit(monthDealPower, clearingFeeSpreads, needCheck, biasPower);
    clearingFee = calcClearingFee(needCheck, usedPower, contPower, biasPowerRanger, clearingFeeSpreads, biasPower, checkingEnergy);
    totalSpend = calcTotalSpend(spendBeforeMarketing, consultBenefit, monthBenefit, clearingFee);
    totalBenefit = calcTotalBenefit(consultBenefit, monthBenefit, clearingFee);

    return [
        toStr(totalBenefit), // 用户收益
        toStr(biasPower), // 偏差结算电量
        toStr(consultBenefit), // 长协收益
        toStr(monthBenefit), // 月度竞价收益
        toStr(clearingFee), // 偏差结算费用
        toStr(spendBeforeMarketing), // 市场化前支出
        toStr(totalSpend) // 实际缴纳电费
    ];
}

/**
 * 偏差电量计算
 * @param usedPower 实际用电量
 * @param contPower 合同电量
 */
function calcBiasPower(usedPower, contPower) {
    return new Big(usedPower).minus(contPower);
}

/**
 * 考核电量计算
 * @param usedPower 实际用电量
 * @param contPower 合同电量
 * @param biasPowerRanger 允许偏差范围
 */
function calcCheckingEnergy(usedPower, contPower, biasPowerRanger) {
    let biasPower = calcBiasPower(usedPower, contPower);
    let _biasPowerRanger = new Big(biasPowerRanger);
    let needCheck = biasPower.abs().gt(new Big(contPower).times(_biasPowerRanger));
    if (needCheck) {
        if (biasPower.gt(0)) {
            return biasPower.minus(_biasPowerRanger.times(contPower));
        } else {
            return biasPower.plus(_biasPowerRanger.times(contPower));
        }
    } else {
        return new Big(0);
    }
}

/**
 * 市场化前支出
 * @param usedPower 实际用电量
 * @param dirPrice 综合目录电价
 */
function calcSpendBeforeMarketing(usedPower, dirPrice) {
    return new Big(usedPower).times(dirPrice);
}

/**
 * 长协收益（双边协商）
 * @param monthPower 长协分月电量
 * @param spreads 长协价差
 */
function calcConsultBenefit(monthPower, spreads) {
    return new Big(monthPower).times(spreads).times(0.001);// 0.001 为单位换算
}

/**
 * 月度收益
 * @param monthDealPower 月度竞价成交电量
 * @param clearingFeeSpreads 月度价差
 */
function calcMonthBenefit(monthDealPower, clearingFeeSpreads) {
    return new Big(monthDealPower).times(clearingFeeSpreads).times(0.001);
}

/**
 * 偏差电量结算费用
 */
function calcClearingFee(needCheck, usedPower, contPower, biasPowerRanger, clearingFeeSpreads, biasPower, checkingEnergy) {
    return calcClearingFeeIn(needCheck, usedPower, contPower, biasPowerRanger, clearingFeeSpreads, biasPower)
        .plus(calcClearingFeeOut(needCheck, usedPower, contPower, checkingEnergy, clearingFeeSpreads))
        .times(0.001);
}

/**
 * 偏差范围内结算费用
 * @param needCheck 是否考核
 * @param usedPower 实际用电量
 * @param contPower 合同电量
 * @param biasPowerRanger 允许偏差范围
 * @param clearingFeeSpreads 月度出清结算价差
 * @param biasPower 偏差电量
 */
function calcClearingFeeIn(needCheck, usedPower, contPower, biasPowerRanger, clearingFeeSpreads, biasPower) {
    if (needCheck) {
        return new Big(biasPowerRanger).times(clearingFeeSpreads).times(contPower);
    } else {
        return new Big(biasPower).times(clearingFeeSpreads).times(contPower < usedPower ? 1 : -1);
    }
}

/**
 * 偏差范围外结算费用
 * @param needCheck 是否考核
 * @param usedPower 实际用电量
 * @param contPower 合同电量
 * @param checkingEnergy 考核电量
 * @param clearingFeeSpreads 月度出清结算价差
 */
function calcClearingFeeOut(needCheck, usedPower, contPower, checkingEnergy, clearingFeeSpreads) {
    return contPower < usedPower
        ? new Big(clearingFeeSpreads).times(checkingEnergy).times(-1)
        : new Big(clearingFeeSpreads).times(checkingEnergy).times(3);
}

/**
 * 市场后总支出
 * @param spendBeforeMarketing 市场化前支出
 * @param consultBenefit 长协收益（双边协商）
 * @param monthBenefit 月度收益
 * @param clearingFee 偏差电量结算费用
 */
function calcTotalSpend(spendBeforeMarketing, consultBenefit, monthBenefit, clearingFee) {
    return new Big(spendBeforeMarketing).plus(consultBenefit).plus(monthBenefit).plus(clearingFee);
}

/**
 * 市场后总收益
 * @param consultBenefit 长协收益（双边协商）
 * @param monthBenefit 月度收益
 * @param clearingFee 偏差电量结算费用
 */
function calcTotalBenefit(consultBenefit, monthBenefit, clearingFee) {
    return new Big(consultBenefit).plus(monthBenefit).plus(clearingFee);
}

/**
 * 判断是否需要补位
 * @param numStr
 * @return {boolean}
 */
function needFixed(numStr) {
    if (numStr === null || numStr.length === 0) {
        return false;
    }
    let idx = numStr.indexOf(".");
    if (idx < 0) {
        return false;
    }
    let subNum = numStr.substring(idx + 1);
    return subNum.length > 2;
}

function toStr(num) {
    return needFixed(num.toString()) ? num.toFixed(2) : num.toString();
}

// *******************************售电公司测算************************************* //
const TYPE_BDFC = 1, TYPE_FC = 2, TYPE_YKJ = 3;
/**
 * 售电公司测算
 * @param contPower 合同电量
 * @param usedPower 实际用电量
 * @param monthPower 长协分月电量
 * @param spreads 长协价差
 * @param monthDealPower 月度竞价成交电量
 * @param clearingFeeSpreads 月度出清结算价差
 * @param biasPowerRanger 允许偏差范围
 * @param minimumSpreads 保底价差
 * @param compShareRadio 售电公司分成占比
 * @param biasAssessmentRatio 售电公司偏差考核占比
 * @param agentRadio 代理服务占比
 * @param contType 合同类型
 * @return {[*,*,*,*,*,*,*,*,*]}
 */
function doCompCalc(contPower, usedPower, monthPower, spreads, monthDealPower, clearingFeeSpreads, biasPowerRanger,
                    minimumSpreads, compShareRadio, biasAssessmentRatio, agentRadio, contType) {

    let
        biasPower,// 偏差电量
        consultBenefit, // 长协收益（双边协商）
        monthBenefit,// 月度竞价收益
        clearingFee, // 偏差电量结算费用
        needCheck, // 是否考核
        totalBenefit, // 市场后总收益
        checkingEnergy; // 考核电量

    biasPowerRanger = new Big(biasPowerRanger).times(0.01);
    biasPower = calcBiasPower(usedPower, contPower); // 偏差结算电量
    consultBenefit = calcConsultBenefit(monthPower, spreads); // 长协收益

    needCheck = biasPower.abs().gt(new Big(contPower).times(biasPowerRanger));
    monthBenefit = calcMonthBenefit(monthDealPower, clearingFeeSpreads, needCheck, biasPower);// 月度竞价收益

    checkingEnergy = calcCheckingEnergy(usedPower, contPower, biasPowerRanger);
    clearingFee = calcClearingFee(needCheck, usedPower, contPower, biasPowerRanger, clearingFeeSpreads, biasPower, checkingEnergy); // 偏差结算费用
    totalBenefit = calcTotalBenefit(consultBenefit, monthBenefit, clearingFee);

    let
        consAgentBenefit, // 用户代理结算利润
        consDividedInterests, // 用户分成利益
        consTotalBenefit, // 用户总收益
        compShareBenefit, // 售电公司分成利益
        agentSpend, // 代理服务费
        compTotalBenefit, //售电公司总利益
        consBiasSpend, // 偏差结算费（用户）
        compBiasSpend // 偏差结算费（售电公司）
    ;

    consAgentBenefit = calcConsAgentBenefit(minimumSpreads, contPower, contType);
    consDividedInterests = calcConsDividedInterests(totalBenefit, clearingFee, consAgentBenefit, compShareRadio, contType);
    agentSpend = calcAgentSpend(consAgentBenefit, agentRadio, contType);
    consTotalBenefit = calcConsTotalBenefit(consAgentBenefit, consDividedInterests,
        biasAssessmentRatio, clearingFee, agentSpend, contType);

    compShareBenefit = calcCompShareBenefit(totalBenefit, clearingFee, consAgentBenefit, compShareRadio, contType);
    compTotalBenefit = calcCompTotalBenefit(agentSpend, compShareBenefit, biasAssessmentRatio, clearingFee, contType);

    consBiasSpend = calcConsBiasSpend(biasAssessmentRatio, clearingFee);
    compBiasSpend = calcCompBiasSpend(biasAssessmentRatio, clearingFee);

    return [
        toStr(consTotalBenefit), // 用户收益
        toStr(compTotalBenefit), // 售电公司收益
        toStr(biasPower), // 偏差结算电量
        toStr(consultBenefit), // 长协收益
        toStr(monthBenefit), // 月度竞价收益
        toStr(clearingFee), // 偏差结算费用
        toStr(consBiasSpend), // 偏差结算费（用户）
        toStr(compBiasSpend), // 偏差结算费（售电公司）
        toStr(agentSpend) //代理服务费
    ];
}

/**
 * 用户代理结算利润
 * @param minimumSpreads 保底价差
 * @param contPower 合同电量
 * @param contType 合同类型
 */
function calcConsAgentBenefit(minimumSpreads, contPower, contType) {

    if (contType === TYPE_BDFC || contType === TYPE_YKJ) {
        return new Big(minimumSpreads).times(contPower).times(0.001)
    } else {
        return new Big(0);
    }
}

/**
 * 用户分成利益
 * @param totalBenefit 市场化后总收益
 * @param clearingFee 偏差结算费用
 * @param consAgentBenefit 用户代理结算利润
 * @param compShareRadio 售电公司分成占比
 * @param contType 合同类型
 */
function calcConsDividedInterests(totalBenefit, clearingFee, consAgentBenefit, compShareRadio, contType) {

    switch (contType) {
        case TYPE_BDFC: // 保底分成
            return new Big(totalBenefit).minus(clearingFee).minus(consAgentBenefit).times(new Big(100).minus(compShareRadio)).div(100);
        case TYPE_FC: // 分成
            return new Big(totalBenefit).minus(clearingFee).times(new Big(100).minus(compShareRadio)).div(100);
        default:
            return new Big(0);
    }
}

/**
 * 用户总收益
 * @param consAgentBenefit 用户代理结算利润
 * @param consDividedInterests 用户分成利益
 * @param biasAssessmentRatio 售电公司偏差考核占比
 * @param clearingFee 偏差电量结算费用
 * @param agentSpend 代理服务费
 * @param contType 合同类型
 */
function calcConsTotalBenefit(consAgentBenefit, consDividedInterests, biasAssessmentRatio,
                              clearingFee, agentSpend, contType) {
    switch (contType) {
        case TYPE_BDFC: // 保底分成
            return new Big(consAgentBenefit).plus(consDividedInterests).plus(new Big(100).minus(biasAssessmentRatio).times(clearingFee).div(100))
                .minus(agentSpend);
        case TYPE_FC: // 分成
            return new Big(consDividedInterests).plus(new Big(100).minus(biasAssessmentRatio).times(clearingFee).div(100));
        case TYPE_YKJ: // 一口价
            return new Big(consAgentBenefit).plus(new Big(100).minus(biasAssessmentRatio).times(clearingFee).div(100))
                .minus(agentSpend);
        default:
            return new Big(0);
    }
}

/**
 * 售电公司分成利益
 * @param totalBenefit 市场化后总收益
 * @param clearingFee 偏差结算费用
 * @param consAgentBenefit 用户代理结算利润
 * @param compShareRadio 售电公司分成占比
 * @param contType 合同类型
 */
function calcCompShareBenefit(totalBenefit, clearingFee, consAgentBenefit, compShareRadio, contType) {

    switch (contType) {
        case TYPE_BDFC: // 保底分成
            return new Big(totalBenefit).minus(clearingFee).minus(consAgentBenefit).times(compShareRadio).div(100);
        case TYPE_FC: // 分成
            return new Big(totalBenefit).minus(clearingFee).times(compShareRadio).div(100);
        case TYPE_YKJ: // 一口价
            return new Big(totalBenefit).minus(clearingFee).minus(consAgentBenefit);
        default:
            return new Big(0);
    }

}

/**
 * 代理服务费
 * @param consAgentBenefit 用户代理结算利润
 * @param agentRadio 代理服务占比
 * @param contType 合同类型
 */
function calcAgentSpend(consAgentBenefit, agentRadio, contType) {
    if (contType === TYPE_BDFC || contType === TYPE_YKJ) {
        return new Big(consAgentBenefit).times(agentRadio).div(100);
    } else {
        return new Big(0);
    }
}

/**
 * 售电公司总利益
 * @param agentSpend 代理服务费
 * @param compShareBenefit 售电公司分成利益
 * @param biasAssessmentRatio 售电公司偏差考核占比
 * @param clearingFee 偏差电量结算费用
 * @param contType 合同类型
 */
function calcCompTotalBenefit(agentSpend, compShareBenefit, biasAssessmentRatio, clearingFee, contType) {
    switch (contType) {
        case TYPE_BDFC: // 保底分成
        case TYPE_YKJ: // 一口价
            return new Big(agentSpend).plus(compShareBenefit)
                .plus(new Big(biasAssessmentRatio).times(clearingFee).div(100));
        case TYPE_FC: // 分成
            return new Big(compShareBenefit).plus(new Big(biasAssessmentRatio).times(clearingFee).div(100));
        default:
            break;
    }
}

/**
 * 偏差结算费（用户）
 * @param biasAssessmentRatio 售电公司偏差考核占比
 * @param clearingFee 偏差电量结算费用
 */
function calcConsBiasSpend(biasAssessmentRatio, clearingFee) {
    return new Big(100).minus(biasAssessmentRatio).times(clearingFee).div(100);
}

/**
 * 偏差结算费（售电公司）
 * @param biasAssessmentRatio 售电公司偏差考核占比
 * @param clearingFee 偏差电量结算费用
 */
function calcCompBiasSpend(biasAssessmentRatio, clearingFee) {
    return new Big(biasAssessmentRatio).times(clearingFee).div(100);
}

// **************************************************Test************************************************************ //
// contPower, usedPower, monthPower, spreads, monthDealPower, clearingFeeSpreads, biasPowerRanger, dirPrice
// doConsCalc(600, 550, 400, -30, 200, -36, 0, 0.8);// ["-13.8", "-50", "-12", "-7.2", "5.4", "440", "426.2"]
// doConsCalc(600, 350, 400, -30, 200, -36, 0, 0.8);// ["7.8", "-250", "-12", "-7.2", "27", "280", "287.8"]

// doConsCalc(600, 350, 400, -30, 200, -36, 3, 0.8);//["-16.392", "-50", "-12", "-7.2", "2.808", "440", "423.608"]
// doConsCalc(600, 650, 400, -30, 200, -36, 3, 0.8);//["-18.696", "50", "-12", "-7.2", "0.504", "520", "501.304"]

// usedPower, contPower, monthPower, spreads, monthDealPower, clearingFeeSpreads, biasPowerRanger,
// minimumSpreads, compShareRadio, biasAssessmentRatio, agentRadio, contType
// 保底分成
// doCompCalc(600, 550, 400, -30, 200, -36, 0, -25, 70, 70, 20, 1); ["-11.64", "-2.16", "-50", "-12", "-7.2", "5.4", "1.62", "3.78", "-3"]
// doCompCalc(600, 350, 400, -30, 200, -36, 0, -25, 70, 70, 20, 1); ["-5.16", "12.96", "-250", "-12", "-7.2", "27", "8.1", "18.9", "-3"]
// doCompCalc(400, 350, 400, -30, 0, -26, 0, -25, 70, 70, 20, 1); ["-7.43", "-0.67", "-50", "-12", "0", "3.9", "1.17", "2.73", "-2"]

// 用户收益
// 售电公司收益
// 偏差结算电量
// 长协收益
// 月度竞价收益
// 偏差结算费用
// 偏差结算费（用户）
// 偏差结算费（售电公司）
// 代理服务费

// 分成
// doCompCalc(400, 350, 400, -30, 0, -26, 0, 0, 50, 50, 0, 2); // ["-4.05", "-4.05", "-50", "-12", "0", "3.9", "1.95", "1.95", "0"]

// 一口价
// doCompCalc(400, 350, 400, -30, 0, -26, 0, -25, 0, 70, 20, 3); // ["-6.83", "-1.27", "-50", "-12", "0", "3.9", "1.17", "2.73", "-2"]
// doCompCalc(600, 550, 400, -30, 200, -36, 0, -25, 0, 70, 20, 3); // ["-10.38", "-3.42", "-50", "-12", "-7.2", "5.4", "1.62", "3.78", "-3"]
// doCompCalc(900, 860, 600, -30, 300, -24, 0, -25, 0, 70, 20, 3); // ["-17.136", "-5.184", "-40", "-18", "-7.2", "2.88", "0.864", "2.016", "-4.5"]

// **************************************************Test************************************************************ //

export default Calc = {
    doConsCalc: doConsCalc,
    doCompCalc: doCompCalc
}