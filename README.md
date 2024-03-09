# TestLand 代码在线测评平台
本项目旨在创建一个能够支持大规模用户并发的在线代码编写、执行和测试平台，同时提供丰富的测试工具和库以及多语言支持，以满足不同用户的需求。

#### 基本需求：
1. **功能性需求**：
    1. 用户管理
        - 用户注册、登录、退出；
    2. 题目浏览
        - 查看题目列表，包括名称、难度、标签等；
    3. 题目解答
        - 选择题目并使用编程语言解答；
        - 提交代码进行自动评测（包括自动编译和测试用例）；
    4. 解答记录
        - 查看已解答题目列表，包括通过率、提交次数等；
    5. 用户排行榜
        - 综合考虑解题数、难度、一次提交成功率等进行排名；
    6. 管理员功能
        - 管理题目及测试用例；
    7. 用户代码评测
        - 查看代码评测结果和详情，包括编译信息、运行时间、内存占用、输出信息等；
    8. 多语言支持
        - 支持多种编程语言，包括C、C++、Java、Python；
    9. 代码历史记录
        - 支持代码提交历史记录的查看和比对；
    10. 讨论区
        - 支持题目讨论区，用户可以交流问题和经验；

2. **非功能性要求** 和 **约束条件**：
   - 客户端为Web浏览器或IDE的插件；
   - 支持1000个并发用户进行评测；
   - 对用户输入进行安全过滤和验证，防止恶意攻击和非法操作；

## 特色与创新点
- 前端深浅模式切换
- 在线Markdown编辑与预览
- 响应式布局
- 支持历史版本管理
- 支持多种编程语言
![image](https://github.com/Uric369/TestLand_frontend/assets/96730554/429f2241-b412-4711-bcd1-e5a47cc4dda1)


## 架构风格和设计模式

采用REST架构，前端使用React工程，后端使用Spring Boot工程，并通过REST API相互通信。后端与测评机之间通过消息队列相互通信。设计中采用了单例、模板和工厂等设计模式。

## 技术方案亮点

- WebSocket：在评测完成后，后端通过WebSocket向前端发送信息，实时向用户提供代码评估和反馈，无需手动刷新页面。
- YARA：在评测用户代码前，使用YARA对其进行扫描，防止恶意代码的运行对服务器造成破坏。
- Docker：通过使用Docker container进行评测，将每次评测任务独立地与服务器主机分隔，增加了安全性和并行性。
- RabbitMQ：通过使用消息队列，用户提交代码后不会由于等待评测造成数据丢失。多线程对队列中的评测信息进行处理，提高响应速度。

## 视频图片效果展示

[题库 & 编辑代码 & 代码测评 视频展示](https://github.com/Uric369/TestLand_frontend/blob/62e9e192386a7f1db9bf1ff1bd50fa46c33a8185/video%26image/testland.mp4)

| 界面  | Light Mode  | Dark Mode |
|--------------|------------|-------------------|
| 讨论区 | ![image](https://github.com/Uric369/TestLand_frontend/blob/main/video%26image/light/discussion.png)| ![image](https://github.com/Uric369/TestLand_frontend/blob/main/video%26image/dark/discussion.png)| 
| 帖子 | ![image](https://github.com/Uric369/TestLand_frontend/blob/main/video%26image/light/forumInfo.png)| ![image](https://github.com/Uric369/TestLand_frontend/blob/main/video%26image/dark/forumInfo.png)| 
| 帖子内容Markdown编辑 | ![image](https://github.com/Uric369/TestLand_frontend/blob/main/video%26image/light/postEditor.png) |  |
