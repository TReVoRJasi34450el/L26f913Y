// 代码生成时间: 2025-08-10 11:35:32
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 定义文件存放规则
const fileRules = {
  'images': ['jpg', 'jpeg', 'png', 'gif'],
  'documents': ['pdf', 'doc', 'docx', 'txt'],
  'videos': ['mp4', 'avi', 'mov'],
  'audios': ['mp3', 'wav', 'aac'],
  'archives': ['zip', 'rar', 'tar', 'gz']
};

/**
 * 整理文件夹结构
 * @param {string} dirPath - 目录路径
 * @returns {Promise} 整理结果
 */
function organizeFolderStructure(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject('Error reading directory: ' + err.message);
        return;
      }

      let promises = files.map(file => {
        const fullPath = path.join(dirPath, file);
        return new Promise((resolve, reject) => {
          fs.stat(fullPath, (err, stats) => {
            if (err) {
              reject('Error stating file: ' + err.message);
              return;
            }
            if (stats.isDirectory()) {
              // 递归整理子文件夹
              organizeFolderStructure(fullPath)
                .then(() => resolve())
                .catch(err => reject(err));
            } else if (stats.isFile()) {
              // 根据文件扩展名移动文件到对应的文件夹
              const extension = path.extname(file).substring(1);
              const targetFolder = fileRules[extension] ? extension : 'others';
              const targetPath = path.join(dirPath, targetFolder, file);
              fs.rename(fullPath, targetPath, err => {
                if (err) {
                  reject('Error moving file: ' + err.message);
                } else {
                  resolve();
                }
              });
            } else {
              resolve();
            }
          });
        });
      });

      Promise.all(promises).then(() => {
        resolve('Folder structure organized successfully');
      }).catch(err => {
        reject(err);
      });
    });
  });
}

// 中间件，用于整理指定文件夹
app.post('/organize', (req, res) => {
  const { dirPath } = req.body;
  if (!dirPath) {
    return res.status(400).json({
      message: 'Please provide a directory path'
    });
  }

  organizeFolderStructure(dirPath)
    .then(result => {
      res.json({
        message: result
      });
    }).catch(err => {
      res.status(500).json({
        message: err
      });
    });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
