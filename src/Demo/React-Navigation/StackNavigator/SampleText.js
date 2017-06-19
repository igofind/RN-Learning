/* @flow */

import React from 'react';
import { StyleSheet, Text } from 'react-native';

/**
 * Used across examples as a screen placeholder.
 */
const styles = StyleSheet.create({
    sampleText: {
        margin: 14,
    },
});

const SampleText = ({ children }) => (
    <Text style={styles.sampleText}>{children}</Text>
);

export default SampleText;
