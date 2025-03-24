# 航天发射日历

🚀 一个展示全球航天发射计划的网站

![image](https://github.com/user-attachments/assets/4e626c00-71ff-4f77-aaff-5bfd1c24efd4)

![image](https://github.com/user-attachments/assets/fbc8f9ac-43e1-4b41-b915-744348ad0f7e)

## 项目介绍

航天发射日历是一个实时展示全球航天发射计划的网站项目，用户可以通过日历视图或列表视图浏览不同国家和航天机构的发射计划，获取发射详情，掌握最新的航天动态。

## 功能特点

- 📅 日历视图：直观展示每月发射计划
- 📋 列表视图：按时间顺序详细展示发射信息
- 🔍 发射详情：查看任务描述、火箭信息、发射地点等详细数据
- 🌐 国际化支持：显示不同国家的航天活动（附国旗标识）
- 🔄 实时更新：定期从权威数据源获取最新发射信息

## 技术栈

- **前端**：原生JavaScript、HTML5、CSS3
- **后端**：PHP
- **API**：The Space Devs的Launch Library 2 API
- **缓存**：本地JSON缓存，减轻API负担

## 安装方法

1. 克隆仓库到本地
```bash
git clone https://github.com/yourusername/space-launch-calendar.git
```

2. 配置Web服务器（Apache/Nginx）指向项目根目录

3. 确保PHP环境已安装并启用curl扩展

4. 修改`config.php`中的配置（如需要）
```php
// API配置
define('API_BASE_URL', 'https://ll.thespacedevs.com/2.0.0');
define('USE_DEV_API', false); // 生产环境设为false

// 缓存配置
define('CACHE_ENABLED', true);
define('CACHE_DIR', __DIR__ . '/cache');
define('CACHE_LIFETIME', 3600); // 缓存有效期（秒）
```

5. 确保cache目录可写
```bash
mkdir cache
chmod 755 cache
```

## 使用方法

### 网站功能

- **切换月份**：点击"上个月"/"下个月"按钮浏览不同月份的发射计划
- **切换视图**：点击"日历视图"/"列表视图"按钮更改展示方式
- **查看详情**：点击任意发射项目可查看详细信息

## 数据来源

本项目数据由 The Space Devs 的 Launch Library 2 API 提供，实时更新全球航天发射信息。

## 贡献指南

欢迎提交Issue和Pull Request来帮助改进这个项目！

贡献步骤：
1. Fork本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m '添加某某功能'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

## 授权协议

本项目采用MIT许可证 - 详情请见 [LICENSE](LICENSE) 文件
