<?php
require_once 'config.php';
require_once 'functions.php';

// 设置返回内容类型为JSON
header('Content-Type: application/json; charset=utf-8');

// 处理API请求
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'monthly':
        $year = isset($_GET['year']) ? intval($_GET['year']) : date('Y');
        $month = isset($_GET['month']) ? intval($_GET['month']) : date('m');
        $data = getLaunchesForMonth($year, $month);
        echo json_encode($data);
        break;
        
    case 'details':
        $id = isset($_GET['id']) ? $_GET['id'] : '';
        if (!empty($id)) {
            $data = getApiData('/launch/' . $id . '/');
            echo json_encode($data);
        } else {
            echo json_encode(['error' => '未指定发射ID']);
        }
        break;
        
    case 'upcoming':
        $params = [
            'net__gte' => date('Y-m-d'),
            'ordering' => 'net',
            'limit' => 10
        ];
        $data = getApiData('/launch/', $params);
        echo json_encode($data);
        break;
        
    default:
        echo json_encode(['error' => '未知操作']);
        break;
}
?>
