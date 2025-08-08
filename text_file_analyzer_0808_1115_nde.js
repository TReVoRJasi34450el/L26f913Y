// 代码生成时间: 2025-08-08 11:15:10
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 允许跨域请求
app.use(cors());

// 解析JSON和表单数据
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件目录
app.use(express.static('public'));

// 上传文件的API接口
app.post('/upload', (req, res) => {
  // 检查是否有文件上传
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // 获取上传的文件
  const file = req.files.file;

  // 处理文件
  const filePath = path.join(__dirname, 'uploads', file.name);
  file.mv(filePath, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    // 读取文件内容
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');

    // 分析文件内容
    const stats = analyzeTextFile(fileContent);

    // 返回文件统计信息
    res.json(stats);
  });
});

// 分析文本文件内容
function analyzeTextFile(content) {
  // 计算行数
  const lines = content.split(/\r
|\r|
/).filter(line => line.trim().length > 0);
  const lineCount = lines.length;

  // 计算单词数
  const wordCount = content.split(/\s+/).length - 1;

  // 计算字符数
  const charCount = content.length;

  // 返回统计信息
  return {
    lineCount,
    wordCount,
    charCount
  };
}

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});