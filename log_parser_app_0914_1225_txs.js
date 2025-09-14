// 代码生成时间: 2025-09-14 12:25:28
const express = require('express');
const fs = require('fs');
const path = require('path');

// 创建Express应用
const app = express();
const port = 3000;

// 解析日志文件的函数
const parseLogFile = (filePath) => {
  try {
    // 读取日志文件内容
    const rawData = fs.readFileSync(filePath, 'utf8');
    // 分割日志文件内容为数组
    const lines = rawData.split('
');
    // 解析每条日志并返回结果对象
    const parsedData = lines.map(line => {
      try {
        // 假设日志格式为 '时间戳 - 消息'
        const [timestamp, message] = line.split(' - ');
        return { timestamp, message };
      } catch (error) {
        // 如果解析失败，返回错误信息
        return { error: 'Failed to parse log entry' };
      }
    });
    return parsedData;
  } catch (error) {
    // 处理文件读取错误
    console.error(`Error reading file: ${error.message}`);
    return null;
  }
};

// 路由：解析日志文件并返回结果
app.get('/parse-logfile', (req, res) => {
  // 获取日志文件路径参数
  const { filePath } = req.query;
  if (!filePath) {
    res.status(400).json({ error: 'Log file path is required' });
    return;
  }
  
  // 检查文件路径是否合法
  if (!path.isAbsolute(filePath)) {
    res.status(400).json({ error: 'Log file path must be absolute' });
    return;
  }
  
  // 调用日志文件解析函数
  const result = parseLogFile(filePath);
  if (result) {
    res.json(result);
  } else {
    res.status(500).json({ error: 'Failed to parse log file' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Log parser app listening at http://localhost:${port}`);
});
