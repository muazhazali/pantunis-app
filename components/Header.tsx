import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface HeaderProps {
  title: string;
  subtitle?: string;
  /**
   * Icon to render on the left. Pass undefined to hide.
   * Example: 'chevron.right' (from IconSymbol mapping)
   */
  leftIcon?: Parameters<typeof IconSymbol>[0]['name'];
  /**
   * Icon to render on the right. Pass undefined to hide.
   */
  rightIcon?: Parameters<typeof IconSymbol>[0]['name'];
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

export function Header({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
}: HeaderProps) {
  return (
    <SafeAreaView edges={["top"]}>
      <View style={styles.container}>
        {leftIcon ? (
          <IconSymbol name={leftIcon} size={24} color="#fff" onPress={onLeftPress as any} />
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
        <View style={styles.textContainer}>
          <ThemedText type="title" lightColor="#fff" darkColor="#fff">
            {title}
          </ThemedText>
          {subtitle ? (
            <ThemedText lightColor="#fff" darkColor="#fff">
              {subtitle}
            </ThemedText>
          ) : null}
        </View>
        {rightIcon ? (
          <IconSymbol name={rightIcon} size={24} color="#fff" onPress={onRightPress as any} />
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00936a',
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
  },
}); 