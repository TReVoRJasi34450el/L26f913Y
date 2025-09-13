// 代码生成时间: 2025-09-13 21:27:27
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// 用于验证用户登录信息的用户数据
// 这应该是一个真实数据库查询，但为了示例，我们使用硬编码数据
const users = {
    'user1': 'password1',
    'user2': 'password2'
};

// 使用 body-parser 中间件来解析 JSON 格式的请求体
app.use(bodyParser.json());

// 登录路由
app.post('/login', (req, res) => {
    // 从请求体中获取用户名和密码
    const { username, password } = req.body;

    // 检查用户名和密码是否提供
    if (!username || !password) {
        // 如果没有提供用户名或密码，返回错误响应
        res.status(400).json({
            error: 'Username and password are required.'
        });
        return;
    }

    // 检查用户名和密码是否匹配
    const validPassword = users[username];
    if (!validPassword || validPassword !== password) {
        // 如果密码不匹配，返回错误响应
        res.status(401).json({
            error: 'Invalid credentials.'
        });
        return;
    }

    // 如果验证成功，返回成功响应
    res.status(200).json({
        message: 'Login successful.'
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Login system running on http://localhost:${port}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 请注意，这里的用户验证系统是非常基础的，不适用于生产环境。
// 在生产环境中，您应该使用安全的身份验证方法，例如JWT、OAuth或数据库存储的哈希密码。