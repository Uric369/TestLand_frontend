import React, { Component } from 'react';
import Vditor from 'vditor';

const markdownContent = `
### 简介

一个Markdown 编辑器，现在是分屏预览模式，编辑当前文本试试看吧！

你可以点击右上角三个点左侧符号，在以下三种模式之间切换：

* 所见即所得模式（Alt+Ctrl+7）
* 即时渲染模式（Alt+Ctrl+8）
* 分屏预览模式（Alt+Ctrl+9）
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
