// 渲染列表视图
function renderListView(year, month, launches) {
    const calendarEl = document.getElementById('launch-calendar');
    
    // 将发射按日期分组
    const launchesByDay = {};
    
    launches.forEach(launch => {
        const launchDate = new Date(launch.net);
        if (launchDate.getFullYear() === year && launchDate.getMonth() + 1 === month) {
            const day = launchDate.getDate();
            if (!launchesByDay[day]) {
                launchesByDay[day] = [];
            }
            launchesByDay[day].push(launch);
        }
    });
    
    // 创建列表视图HTML
    let listHtml = '<div class="list-view-container">';
    
    // 获取月份的天数
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // 获取今天的日期
    const today = new Date();
    const isCurrentMonth = (year === today.getFullYear() && month === today.getMonth() + 1);
    const currentDay = isCurrentMonth ? today.getDate() : -1;
    
    // 遍历月份中的每一天
    for (let day = 1; day <= daysInMonth; day++) {
        // 只显示有发射的日期或者今天
        if (launchesByDay[day] || day === currentDay) {
            const date = new Date(year, month - 1, day);
            const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
            const isToday = (day === currentDay);
            
            listHtml += `
                <div class="list-day${isToday ? ' today' : ''}">
                    <div class="list-date">
                        <div>${month}月${day}日 <span class="list-date-weekday">${weekday}</span></div>
                        ${isToday ? '<span class="today-indicator">今天</span>' : ''}
                    </div>
            `;
            
            if (launchesByDay[day] && launchesByDay[day].length > 0) {
                listHtml += '<div class="list-launches">';
                launchesByDay[day].forEach(launch => {
                    const launchTime = new Date(launch.net);
                    const hours = launchTime.getHours();
                    const minutes = String(launchTime.getMinutes()).padStart(2, '0');
                    
                    listHtml += `
                        <div class="list-launch-item" data-id="${launch.id}">
                            <div class="list-launch-time">${hours}:${minutes}</div>
                            <div class="list-launch-info">
                                <div class="list-launch-name">${launch.name}</div>
                                <div class="list-launch-provider">${getProviderFlag(launch.launch_service_provider?.name)} ${launch.launch_service_provider?.name || '未知'}</div>
                            </div>
                        </div>
                    `;
                });
                listHtml += '</div>';
            } else {
                listHtml += '<div class="no-launches">无发射计划</div>';
            }
            
            listHtml += '</div>';
        }
    }
    
    if (Object.keys(launchesByDay).length === 0) {
        listHtml += '<div class="no-data">本月无发射计划</div>';
    }
    
    listHtml += '</div>';
    calendarEl.innerHTML = listHtml;
    
    // 添加点击事件
    document.querySelectorAll('.list-launch-item').forEach(item => {
        item.addEventListener('click', function() {
            showLaunchDetails(this.getAttribute('data-id'));
        });
    });
}
