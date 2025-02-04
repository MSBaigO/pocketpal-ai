import { StyleSheet } from 'react-native';
import { Theme } from '../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    // Base text styles
    body: {
      color: theme.colors.text,
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'system-font',
      padding: 0,
      margin: 0,
      backgroundColor: 'transparent',
    },
    strong: {
      fontWeight: 'bold',
      margin: 0,
      padding: 0,
      textAlign: 'left',
    },
    b: {
      fontWeight: 'bold',
      margin: 0,
      padding: 0,
      textAlign: 'left',
    },
    em: {
      fontStyle: 'italic',
      margin: 0,
      padding: 0,
    },
    i: {
      fontStyle: 'italic',
      margin: 0,
      padding: 0,
    },
    p: {
      margin: 0,
      padding: 0,
    },

    // Code-related styles
    code: {
      fontFamily: 'Courier',
      backgroundColor: theme.colors.surface,
      color: theme.colors.onSurface,
      fontSize: 14,
      lineHeight: 20,
      padding: 2,
    },
    pre: {
      backgroundColor: 'transparent',
      padding: 0,
      margin: 0,
    },
    preContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      marginVertical: 12,
      overflow: 'hidden',
    },
    codeHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8,
      backgroundColor: theme.colors.primaryContainer,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline,
    },
    codeContent: {
      padding: 12,
    },
    languageLabel: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 15,
      fontWeight: 'bold',
    },
    copyButton: {
      flexDirection: 'row', // Align icon and text horizontally
      alignItems: 'center', // Center items vertically
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      backgroundColor: theme.colors.primaryContainer,
    },
    copyButtonText: {
      color: theme.colors.onPrimaryContainer,
      fontSize: 15,
      marginLeft: 8, // Add some margin to separate the icon and text
    },
    codeBlock: {
      fontFamily: 'Courier',
      fontSize: 14,
      lineHeight: 20,
      color: theme.colors.onSurface,
    },
    inlineCode: {
      fontFamily: 'Courier',
      backgroundColor: theme.colors.surface,
      color: theme.colors.onSurface,
      fontSize: 14,
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 4,
    },

    // Custom <think> block styles
    thinkContainer: {
      backgroundColor: theme.colors.surfaceContainerHigh,
      borderRadius: 8,
      padding: 12,
      marginVertical: 8,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
      opacity: 0.8,
    },
    thinkText: {
      color: theme.colors.primary,
      fontWeight: 'bold',
      marginRight: 8,
    },
    thinkTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
  });