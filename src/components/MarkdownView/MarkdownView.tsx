import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import React, { useMemo } from 'react';
import { marked } from 'marked';
import RenderHtml, {
  defaultSystemFonts,
  HTMLContentModel,
  HTMLElementModel,
} from 'react-native-render-html';
import { useTheme } from '../../hooks';
import { createStyles } from './styles';
import { Theme } from '../../utils/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PreRenderer = ({ TDefaultRenderer, tnode, ...props }, theme) => {
  const styles = createStyles(theme);

  // Helper function to recursively find the <code> tag
  const findCodeNode = (node) => {
    if (node.tagName === 'code') {
      return node;
    }
    if (node.children) {
      for (const child of node.children) {
        const result = findCodeNode(child);
        if (result) return result;
      }
    }
    return null;
  };

  // Find the <code> tag inside the <pre> tag
  const codeNode = findCodeNode(tnode);
  const language = codeNode?.attributes.class?.replace('language-', '') || '';
  const codeContent = codeNode?.children[0]?.data || '';

  // Handle the copy button click
  const handleCopy = async () => {
    Clipboard.setString(codeContent);
  };

  return (
    <View style={styles.preContainer}>
      {/* Language label and copy button */}
      <View style={styles.codeHeader}>
        {!!language && <Text style={styles.languageLabel}>{language}</Text>}
        <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
          <Icon name="content-copy" size={18} color={theme.colors.onPrimaryContainer} />
          <Text style={styles.copyButtonText}>Copy Code</Text>
        </TouchableOpacity>
      </View>

      {/* Code content */}
      <View style={styles.codeContent}>
        <TDefaultRenderer
          {...props}
          tnode={tnode}
          style={[props.style, styles.codeBlock]}
        />
      </View>
    </View>
  );
};

// Custom Code component renderer for inline code
const CodeRenderer = ({ TDefaultRenderer, tnode, ...props }, theme) => {
  const styles = createStyles(theme);
  return (
    <Text style={styles.inlineCode}>
      <TDefaultRenderer {...props} tnode={tnode} />
    </Text>
  );
};

const BoldRenderer = ({ TDefaultRenderer, tnode, ...props }, theme) => {
  const styles = createStyles(theme);
  // Check if there are multiple text nodes
  if (tnode.children && tnode.children.length > 1) {
    const textContent = tnode.children.map((child) => child.data).join(''); // Join text nodes
    return (
      <Text style={[styles.strong, props.style]}>
        {textContent}
      </Text>
    );
  }
  return (
    <Text style={[styles.strong, props.style]}>
      <TDefaultRenderer {...props} tnode={tnode} />
    </Text>
  );
};

interface MarkdownViewProps {
  markdownText: string;
  maxMessageWidth: number;
  selectable?: boolean;
}

const ThinkRenderer = ({ TDefaultRenderer, ...props }, theme) => {
  const styles = createStyles(theme);
  return (
    <View style={styles.thinkContainer}>
      <View style={styles.thinkTextContainer}>
        <Text style={styles.thinkText}>💭 Thinking...</Text>
      </View>
      <TDefaultRenderer {...props} />
    </View>
  );
};

marked.use({
  langPrefix: 'language-',
  mangle: false,
  headerIds: false,
});

export const MarkdownView: React.FC<MarkdownViewProps> = React.memo(
  ({ markdownText, maxMessageWidth, selectable = false }) => {
    console.log('markdownText1: ', markdownText);
    const theme = useTheme();
    const styles = createStyles(theme);

    const tagsStyles = useMemo(() => createStyles(theme), [theme]);
    const systemFonts = useMemo(() => defaultSystemFonts, []);
    const contentWidth = useMemo(() => maxMessageWidth, [maxMessageWidth]);
    const htmlContent = useMemo(() => marked(markdownText), [markdownText]);
    const source = useMemo(() => ({ html: htmlContent }), [htmlContent]);
    console.log('markdownText2: ', htmlContent);

    const customHTMLElementModels = useMemo(
      () => ({
        think: HTMLElementModel.fromCustomModel({
          tagName: 'think',
          contentModel: HTMLContentModel.block,
        }),
        code: HTMLElementModel.fromCustomModel({
          tagName: 'code',
          contentModel: HTMLContentModel.textual,
        }),
      }),
      [],
    );

    const renderers = useMemo(
      () => ({
        think: (props) => ThinkRenderer(props, theme),
        pre: (props) => PreRenderer(props, theme),
        code: (props) => CodeRenderer(props, theme),
        strong: (props) => BoldRenderer(props, theme),
        b: (props) => BoldRenderer(props, theme),
      }),
      [theme],
    );

    const defaultTextProps = useMemo(
      () => ({
        selectable,
        userSelect: selectable ? 'text' : 'none',
      }),
      [selectable],
    );

    return (
      <View testID="chatMarkdownScrollView" style={{ maxWidth: maxMessageWidth }}>
        <RenderHtml
          contentWidth={contentWidth}
          source={source}
          tagsStyles={tagsStyles}
          defaultTextProps={defaultTextProps}
          systemFonts={systemFonts}
          customHTMLElementModels={customHTMLElementModels}
          renderers={renderers}
        />
      </View>
    );
  },
  (prevProps, nextProps) =>
    prevProps.markdownText === nextProps.markdownText &&
    prevProps.maxMessageWidth === nextProps.maxMessageWidth &&
    prevProps.selectable === nextProps.selectable,
);