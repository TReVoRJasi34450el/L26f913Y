// 代码生成时间: 2025-08-09 17:04:35
const express = require('express');
const session = require('express-session');

// 初始化Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 使用session中间件
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// 存储主题选项
const themes = {
    light: 'Light Theme',
    dark: 'Dark Theme'
};

// 路由：获取当前主题
app.get('/api/theme', (req, res) => {
    // 检查session中的主题设置，如果没有则默认为'light'
    const theme = req.session.theme || 'light';
    res.json({
        status: 'success',
        theme: theme
    });
});

// 路由：切换主题
app.post('/api/switch-theme', (req, res) => {
    // 检查提供的切换请求是否有效
    if (!themes[req.body.theme]) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid theme'
        });
    }
    
    // 设置新的会话主题
    req.session.theme = req.body.theme;
    res.json({
        status: 'success',
        message: `Theme switched to ${req.body.theme}`
    });
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// 代码注释：
// 这段代码创建了一个简单的Express应用程序，用于处理主题切换功能。
// 它使用了express-session来存储用户会话，包括主题偏好。
// 提供了两个API端点：一个用于获取当前主题，一个用于切换主题。
// 错误处理中间件确保了任何服务器错误都能返回给客户端。