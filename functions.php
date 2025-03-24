<?php
// 获取API数据
function getApiData($endpoint, $params = []) {
    global $config;
    
    $baseUrl = USE_DEV_API ? API_DEV_URL : API_BASE_URL;
    $url = $baseUrl . $endpoint;
    
    if (!empty($params)) {
        $url .= '?' . http_build_query($params);
    }
    
    $cacheKey = md5($url);
    $cacheFile = CACHE_DIR . '/' . $cacheKey . '.json';
    
    // 检查缓存
    if (CACHE_ENABLED && file_exists($cacheFile) && (time() - filemtime($cacheFile) < CACHE_LIFETIME)) {
        return json_decode(file_get_contents($cacheFile), true);
    }
    
    // 发起API请求
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, '太空发射日历网站/1.0');
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode == 200) {
        $data = json_decode($response, true);
        
        // 保存到缓存
        if (CACHE_ENABLED) {
            if (!is_dir(CACHE_DIR)) {
                mkdir(CACHE_DIR, 0755, true);
            }
            file_put_contents($cacheFile, $response);
        }
        
        return $data;
    }
    
    return null;
}

// 获取指定月份的发射计划
function getLaunchesForMonth($year, $month) {
    $startDate = sprintf('%d-%02d-01', $year, $month);
    $endDate = date('Y-m-t', strtotime($startDate));
    
    $params = [
        'net__gte' => $startDate,
        'net__lte' => $endDate,
        'limit' => 100
    ];
    
    return getApiData('/launch/', $params);
}

// 格式化日期时间
function formatDateTime($dateString) {
    $date = new DateTime($dateString);
    $date->setTimezone(new DateTimeZone('Asia/Shanghai'));
    return $date->format('Y年m月d日 H:i');
}
?>
