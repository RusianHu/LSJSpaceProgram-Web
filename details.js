// 显示发射详情
function showLaunchDetails(id) {
    const modal = document.getElementById('launch-details-modal');
    const content = document.getElementById('launch-details-content');
    
    // 显示加载中
    content.innerHTML = '<div class="loading">加载中...</div>';
    modal.style.display = 'block';
    
    // 获取发射详情
    fetch(`api.php?action=details&id=${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                content.innerHTML = `<div class="error">${data.error}</div>`;
                return;
            }
            
            const launch = data;
            const launchDate = new Date(launch.net);
            const formattedDate = `${launchDate.getFullYear()}年${launchDate.getMonth() + 1}月${launchDate.getDate()}日 ${launchDate.getHours()}:${String(launchDate.getMinutes()).padStart(2, '0')}`;
            
            let html = `
                <h2>${launch.name}</h2>
                <div class="details-grid">
                    <div class="detail-item">
                        <span class="label">发射时间:</span>
                        <span class="value">${formattedDate}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">发射状态:</span>
                        <span class="value">${getLaunchStatus(launch.status?.id)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">发射提供商:</span>
                        <span class="value">${launch.launch_service_provider?.name || '未知'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">发射地点:</span>
                        <span class="value">${launch.pad?.location?.name || '未知'}</span>
                    </div>
                </div>
            `;
            
            if (launch.mission) {
                html += `
                    <h3>任务信息</h3>
                    <p class="mission-description">${launch.mission.description || '无描述'}</p>
                    <div class="detail-item">
                        <span class="label">任务类型:</span>
                        <span class="value">${launch.mission.type || '未知'}</span>
                    </div>
                `;
            }
            
            if (launch.rocket && launch.rocket.configuration) {
                html += `
                    <h3>火箭信息</h3>
                    <div class="detail-item">
                        <span class="label">火箭名称:</span>
                        <span class="value">${launch.rocket.configuration.name || '未知'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">火箭系列:</span>
                        <span class="value">${launch.rocket.configuration.family || '未知'}</span>
                    </div>
                `;
            }
            
            if (launch.image) {
                html += `
                    <div class="launch-image">
                        <img src="${launch.image}" alt="${launch.name}" />
                    </div>
                `;
            }
            
            content.innerHTML = html;
        })
        .catch(error => {
            console.error('加载发射详情失败:', error);
            content.innerHTML = '<div class="error">加载详情失败，请稍后重试。</div>';
        });
}

// 获取发射状态文本
function getLaunchStatus(statusId, launchDate) {
    // 如果是未来发射，默认状态为"准备中"
    const now = new Date();
    const launch = new Date(launchDate);
    
    if (launch > now) {
        return '准备中';
    }
    
    const statusMap = {
        1: '准备中',
        2: '发射成功',
        3: '发射失败',
        4: '发射延期',
        5: '在轨',
        6: '任务结束',
        7: '部分失败',
        8: '发射取消'
    };
    
    return statusMap[statusId] || '未知';
}
