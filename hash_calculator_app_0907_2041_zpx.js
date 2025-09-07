// 代码生成时间: 2025-09-07 20:41:06
const express = require('express');
const crypto = require('crypto');

// 创建一个Express应用
const app = express();
const PORT = 3000;

// 允许JSON格式的请求体
app.use(express.json());

// 定义哈希计算的路由和处理函数
app.post('/calculate-hash', (req, res) => {
    // 从请求体中提取数据
    const { data } = req.body;
    
    // 检查是否提供了数据
    if (!data) {
        return res.status(400).json({
            error: 'No data provided'
        });
    }
    
    // 使用SHA256算法计算哈希值
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    
    // 返回哈希值
    res.status(200).json({
        hash
    });
});

// 错误处理器
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Hash Calculator App running on port ${PORT}`);
});
