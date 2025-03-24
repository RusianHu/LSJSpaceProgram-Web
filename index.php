<?php
require_once 'config.php';
require_once 'functions.php';

// 获取当前年月
$year = isset($_GET['year']) ? intval($_GET['year']) : date('Y');
$month = isset($_GET['month']) ? intval($_GET['month']) : date('m');

// 获取本月即将发生的发射
$upcomingLaunches = getApiData('/launch/', [
    'net__gte' => date('Y-m-d'),
    'ordering' => 'net',
    'limit' => 5
]);

?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🚀老司机全球航天发射计划爬虫</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>🚀老司机全球航天发射计划爬虫 <button id="qrcode-btn" class="qrcode-btn">扫码使用小程序</button></h1>
        <div class="month-selector">
            <button id="prev-month">上个月</button>
            <span id="current-month"><?php echo $year ?>年<?php echo $month ?>月</span>
            <button id="next-month">下个月</button>
            <div class="view-toggle">
                <button id="calendar-view" class="view-btn active">日历视图</button>
                <button id="list-view" class="view-btn">列表视图</button>
            </div>
        </div>
    </header>

    <main>
        <div class="container">
            <div class="calendar" id="launch-calendar">
                <!-- 日历将由JavaScript动态生成 -->
                <div class="loading">加载中...</div>
            </div>
            
            <div class="upcoming-launches">
                <h2>即将发射</h2>
                <ul id="upcoming-list">
                    <!-- 即将发射的列表将由JavaScript动态生成 -->
                    <li class="loading">加载中...</li>
                </ul>
            </div>
        </div>
        
        <!-- 发射详情模态框 -->
        <div id="launch-details-modal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <div id="launch-details-content"></div>
            </div>
        </div>
        <!-- 二维码模态框 -->
        <div id="qrcode-modal" class="modal">
            <div class="modal-content qrcode-modal-content">
                <span class="close">&times;</span>
                <div class="qrcode-container">
                    <h3>扫描二维码使用微信小程序</h3>
                    <img src="xcx.jpg" alt="航天发射日历微信小程序二维码" class="qrcode-image">
                    <p>随时随地查看全球航天发射计划</p>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <p>数据由 The Space Devs 的 Launch Library 2 API 提供</p>
        <p>&copy; <?php echo date('Y'); ?> 老司机全球航天发射计划爬虫</p>
    </footer>

    <script src="app.js"></script>
    <script src="calendar.js"></script>
    <script src="details.js"></script>
    <script src="listview.js"></script>
</body>
</html>
