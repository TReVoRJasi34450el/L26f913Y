// 代码生成时间: 2025-09-17 02:55:11
const express = require('express');
const fs = require('fs');
const path = require('path');

// 创建 Express 应用
const app = express();
const port = 3000;

// 定义文件和文件夹存储的根目录
const rootDirectory = './organized_folders';

// 确保根目录存在
if (!fs.existsSync(rootDirectory)) {
  fs.mkdirSync(rootDirectory, { recursive: true });
}

// 设置静态文件目录，用于服务文件
app.use(express.static('public'));

// POST 请求处理：接收文件并组织文件夹
app.post('/organize', express.json(), (req, res) => {
  // 检查请求体是否包含文件列表
  if (!req.body.files) {
    return res.status(400).json({
      error: 'No files provided in the request body'
    });
  }

  const files = req.body.files;

  // 组织文件夹
  try {
    files.forEach(file => {
      const { name, type } = file;
      const folderPath = path.join(rootDirectory, type);
      
      // 如果文件夹不存在，则创建
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      
      // 将文件移动到对应的文件夹
      const filePath = path.join(folderPath, name);
      fs.copyFileSync(file.path, filePath);
    });
    
    res.json({
      message: 'Files organized successfully'
    });
  } catch (error) {
    // 错误处理
    res.status(500).json({
      error: 'Failed to organize files',
      details: error.message
    });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Folder Organizer is running at http://localhost:${port}`);
});

/*
 * 文件夹组织器服务器
 * 接收文件并根据文件类型组织到不同的文件夹
 */
