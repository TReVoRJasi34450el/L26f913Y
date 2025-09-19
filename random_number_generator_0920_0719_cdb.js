// 代码生成时间: 2025-09-20 07:19:35
const express = require('express');

// 创建一个Express应用
const app = express();
const port = 3000;

// 中间件来解析请求体
app.use(express.json());

// 路由：生成随机数
app.get('/random-number', (req, res) => {
    // 从查询参数中获取最小和最大值
    const { min, max } = req.query;
    if (typeof min !== 'number' || typeof max !== 'number' || min >= max) {
        // 如果参数不正确，返回错误信息
        return res.status(400).json({
            error: 'Invalid parameters. Please provide min and max as numbers with min < max.'
        });
    }

    // 生成一个介于min和max之间的随机数
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // 返回随机数
    res.json({
        randomNumber
    });
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 启动服务器
app.listen(port, () => {
    console.log(`Random number generator running on http://localhost:${port}`);
});

// 文档说明：
/*
 * 该程序提供了一个简单的随机数生成器服务。
 * 它使用Express框架监听/get-random-number路由。
 * 用户可以通过查询参数min和max来指定随机数的范围。
 * 如果参数不正确或者缺少参数，服务会返回一个错误信息。
 * 正常情况下，服务会返回一个JSON对象，其中包含一个随机数。
 *
 * 错误处理：
 * 如果中间件或路由处理中出现错误，
 * 会调用错误处理中间件来返回一个500状态码和一个错误消息。
 *
 * 可维护性和可扩展性：
 * 代码结构清晰，易于理解和维护。
 * 如果需要添加新的功能或修改现有逻辑，
 * 开发者可以轻松地在相应的部分进行修改。
 * 遵循JS最佳实践，确保代码质量和可读性。
 */