import React, { Component } from 'react';
import Vditor from 'vditor';

const markdownContent = `
# Heading 1

## Heading 2

### Heading 3

This is a **bold** text.

This is an *italic* text.

~~This is a strikethrough text.~~

- Unordered list item 1
- Unordered list item 2
- Unordered list item 3

1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3

> This is a blockquote.

\`console.log('Hello, World!');\`

\`\`\`javascript
function add(a, b) {
  return a + b;
}
\`\`\`

| Column 1 | Column 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
`;


class MarkdownDisplay extends Component {
  constructor(props) {
    super(props);
    this.previewRef = React.createRef();
    this.state = {
      htmlContent: '',
    };
  }

  componentDidMount() {
  // const { markdownContent } = this.props;
  console.log("content");
  console.log(markdownContent);
  Vditor.preview(this.previewRef.current, markdownContent, {
    hljs: { style: 'github' },
    after: () => {
      this.setState({ htmlContent: this.previewRef.current.innerHTML });
    },
  });
}

  render() {
    const { htmlContent } = this.state;

    return (
      <div ref={this.previewRef} dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
    );
  }
}

export default MarkdownDisplay;
