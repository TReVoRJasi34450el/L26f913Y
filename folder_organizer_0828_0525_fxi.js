// 代码生成时间: 2025-08-28 05:25:49
const express = require('express');
const fs = require('fs');
const path = require('path');

// 创建Express应用
const app = express();
const PORT = 3000;

// 存储文件夹结构整理的结果
let folderStructure = {
  "folders": [],
  "files": []
};

// 中间件，用于解析JSON类型的请求体
app.use(express.json());

// 获取文件夹结构的路由
app.get('/api/folder/organize', (req, res) => {
  const folderPath = req.query.path;
  if (!folderPath) {
    return res.status(400).json({
      error: 'No folder path provided.'
    });
  }
  try {
    // 验证路径是否存在
    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({
        error: 'Folder not found.'
      });
    }
    // 递归函数，用于遍历文件夹
    const organizeFolder = (dir) => {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      items.forEach(item => {
        if (item.isDirectory()) {
          folderStructure.folders.push(item.name);
          organizeFolder(path.join(dir, item.name));
        } else {
          folderStructure.files.push(item.name);
        }
      });
    };
    // 重置结构对象
    folderStructure = {
      folders: [],
      files: []
    };
    // 开始组织文件夹
    organizeFolder(folderPath);
    // 返回整理后的文件夹结构
    res.json(folderStructure);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to organize folder structure.'
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Folder Organizer server is running on port ${PORT}`);
});

// 代码注释：
// 该程序是一个简单的Express服务器，它提供了一个API端点，用于获取指定文件夹的组织结构。
// 用户可以通过查询参数'path'提供文件夹路径。
// 程序会递归地遍历文件夹，将文件夹存储在'folders'数组中，将文件存储在'files'数组中。
// 然后，它将这个结构作为JSON响应返回。
// 程序中包含了错误处理，以确保在路径不存在或读取失败时返回适当的HTTP状态码。
