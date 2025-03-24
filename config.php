<?php
// API配置
define('API_BASE_URL', 'https://ll.thespacedevs.com/2.0.0');
define('API_DEV_URL', 'https://lldev.thespacedevs.com/2.0.0');
define('USE_DEV_API', false); // 开发阶段设为true，生产环境设为false

// 缓存配置
define('CACHE_ENABLED', true);
define('CACHE_DIR', __DIR__ . '/cache');
define('CACHE_LIFETIME', 3600); // 缓存有效期（秒）

// 时区设置
date_default_timezone_set('Asia/Shanghai');

// 启用错误日志但禁用在页面上显示错误信息
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

?>
