// 代码生成时间: 2025-08-10 22:08:04
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// 使用multer中间件处理文件上传
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// API端点，用于文件上传
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    
    // 文件转换逻辑（示例：将DOC转换为TXT）
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    const txtFilePath = filePath.replace('.doc', '.txt');
    
    fs.readFile(filePath, 'binary', (err, file) => {
        if (err) {
            return res.status(500).send('Error reading the file.');
        }
        
        // 这里应该是实际的转换逻辑，这里只是将文件内容写入TXT文件
        fs.writeFile(txtFilePath, file, 'binary', (err) => {
            if (err) {
                return res.status(500).send('Error converting the file.');
            }
            
            res.send('File converted successfully.');
        });
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Document Converter App listening at http://localhost:${port}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 注释和文档
// 此程序是一个简单的文档格式转换器，能够接受DOC文件并转换为TXT文件。
// 它使用Express框架来处理HTTP请求，并通过Multer中间件处理文件上传。
// 上传的文件被保存在'uploads'目录下，并生成一个新的TXT文件。
// 请注意，实际的文件转换逻辑需要根据具体的转换需求来实现。