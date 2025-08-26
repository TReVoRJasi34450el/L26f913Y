// 代码生成时间: 2025-08-26 18:56:24
const express = require('express');
const app = express();
const port = 3000;

// 模拟数据库
let inventory = [];

// 中间件用于解析请求体
app.use(express.json());

// 获取库存列表
app.get('/inventory', (req, res) => {
    try {
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 添加库存项
app.post('/inventory', (req, res) => {
    const { item, quantity } = req.body;
    if (!item || typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    inventory.push({ item, quantity });
    res.status(201).json({ item, quantity });
});

// 更新库存项
app.put('/inventory/:index', (req, res) => {
    const { index } = req.params;
    const { quantity } = req.body;
    if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    const itemIndex = parseInt(index);
    if (itemIndex >= 0 && itemIndex < inventory.length) {
        inventory[itemIndex].quantity = quantity;
        res.status(200).json(inventory[itemIndex]);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// 删除库存项
app.delete('/inventory/:index', (req, res) => {
    const { index } = req.params;
    const itemIndex = parseInt(index);
    if (itemIndex >= 0 && itemIndex < inventory.length) {
        inventory.splice(itemIndex, 1);
        res.status(200).json({ message: 'Item removed' });
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Inventory Management System running on port ${port}`);
});