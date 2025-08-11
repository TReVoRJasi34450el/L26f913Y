// 代码生成时间: 2025-08-11 15:13:00
const express = require('express');
const fs = require('fs');
const path = require('path');

// 创建express应用
const app = express();
const port = 3000;

// 解析JSON请求体的中间件
app.use(express.json());

// POST路由，接收批量重命名的请求
app.post('/rename', (req, res) => {
  // 检查请求体是否包含必要的字段
  if (!req.body.files || !Array.isArray(req.body.files)) {
    return res.status(400).json({
      error: 'Invalid request. Please provide an array of files.'
    });
  }

  // 遍历文件数组，执行重命名操作
  req.body.files.forEach((file, index) => {
    // 检查文件对象是否包含旧名称和新名称
    if (!file.oldName || !file.newName) {
      console.error('Invalid file object:', file);
      return;
    }

    // 构建完整的文件路径
    const oldPath = path.join(process.cwd(), file.oldName);
    const newPath = path.join(process.cwd(), file.newName);

    // 重命名文件
    fs.rename(oldPath, newPath, (error) => {
      if (error) {
        console.error('Error renaming file:', error);
        // 发送部分成功或失败的响应
        res.status(200).json({
          success: false,
          message: 'Some files were renamed successfully, but some failed.',
          details: error
        });
      }
    });
  });

  // 发送成功的响应
  res.status(200).json({
    success: true,
    message: 'All files renamed successfully.'
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Batch file renamer server listening at http://localhost:${port}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'An internal error occurred.'
  });
});

// 导出应用以便测试
module.exports = app;