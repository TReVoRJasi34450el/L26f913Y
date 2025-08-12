// 代码生成时间: 2025-08-12 18:29:39
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const { Transform } = require('stream');

// 创建一个转换流，用于处理CSV文件的每一行
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        // 将CSV行转换为JSON对象
        const row = chunk.toString().trim().split(',').reduce((obj, val, idx) => {
            obj[this.headers[idx]] = val.trim();
            return obj;
        }, {});
        // 将处理后的对象推送到下游
        this.push(JSON.stringify(row) + '
');
        callback();
    },
    objectMode: true,
    readableObjectMode: true
});

// 创建Express应用
const app = express();

// 允许上传CSV文件
app.use(express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.multipart({ upload: './uploads' }));

// 路由：处理CSV文件
app.post('/process-csv', (req, res) => {
    const { file } = req.files;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // 读取文件并使用转换流
    const readStream = fs.createReadStream(file.path);
    const writeStream = fs.createWriteStream(file.path + '.json');
    readStream
        .pipe(csv())
        .pipe(transformStream)
        .pipe(writeStream)
        .on('finish', () => {
            fs.unlinkSync(file.path); // 删除原始CSV文件
            res.json({
                message: 'CSV file processed successfully',
                processedFile: file.path + '.json'
            });
        });
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// 文档说明：
// 该程序允许用户上传CSV文件，并将其转换为JSON格式。
// 它使用Express框架来处理HTTP请求，以及一个转换流来处理CSV文件的每一行。
// CSV文件被读取并转换为JSON对象，然后写入到一个新的JSON文件中。