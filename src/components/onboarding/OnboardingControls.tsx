import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SIZES } from '../../config/theme';
import { Button } from '../../components/common/Button';

const { width } = Dimensions.get('window');

interface OnboardingControlsProps {
    isLastSlide: boolean;
    onNext: () => void;
    onSkip: () => void;
}

const OnboardingControls: React.FC<OnboardingControlsProps> = ({
    isLastSlide,
    onNext,
    onSkip
}) => {
    return (
        <View style={styles.bottomContainer}>
            <Button
                title={isLastSlide ? "Começar" : "Próximo"}
                onPress={onNext}
                style={styles.button}
            />

            {!isLastSlide && (
                <Button
                    title="Pular"
                    onPress={onSkip}
                    variant="text"
                    style={styles.skipButton}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: SIZES.xl,
    },
    button: {
        width: width * 0.8,
        marginBottom: SIZES.md,
    },
    skipButton: {
        marginBottom: SIZES.lg,
    },
});

export default React.memo(OnboardingControls);
