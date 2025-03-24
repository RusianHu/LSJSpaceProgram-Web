// 渲染日历
function renderCalendar(year, month, launches) {
    const calendarEl = document.getElementById('launch-calendar');
    
    // 获取月份的天数
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // 获取月份第一天是星期几 (0-6, 0为星期日)
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    
    // 创建日历头部 (星期几)
    let calendarHtml = `
        <div class="calendar-header">
            <div>日</div>
            <div>一</div>
            <div>二</div>
            <div>三</div>
            <div>四</div>
            <div>五</div>
            <div>六</div>
        </div>
        <div class="calendar-body">
    `;
    
    // 添加空白格子直到月份第一天
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarHtml += '<div class="day empty"></div>';
    }
    
    // 创建每天的格子
    for (let day = 1; day <= daysInMonth; day++) {
        const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayLaunches = launches.filter(launch => {
            const launchDate = new Date(launch.net);
            return launchDate.getFullYear() === year &&
                   launchDate.getMonth() + 1 === month &&
                   launchDate.getDate() === day;
        });
        
        let dayClass = 'day';
        if (dayLaunches.length > 0) {
            dayClass += ' has-launches';
        }
        
        // 检查是否是今天
        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() + 1 && day === today.getDate()) {
            dayClass += ' today';
        }
        
        calendarHtml += `<div class="${dayClass}" data-date="${date}">
            <div class="day-number">${day}</div>`;
            
        if (dayLaunches.length > 0) {
            calendarHtml += '<div class="launches-container">';
            // 限制显示的发射数量，防止过多影响布局
            const displayLaunches = dayLaunches.slice(0, 3);
            displayLaunches.forEach(launch => {
                const launchTime = new Date(launch.net);
                const hours = launchTime.getHours();
                const minutes = String(launchTime.getMinutes()).padStart(2, '0');
                
                calendarHtml += `
                    <div class="list-launch-item" data-id="${launch.id}">
                        <div class="list-launch-time">${hours}:${minutes}</div>
                        <div class="list-launch-info">
                            <div class="list-launch-name">${launch.name}</div>
                            <div class="list-launch-provider">${getProviderFlag(launch.launch_service_provider?.name)} ${launch.launch_service_provider?.name || '未知'}</div>
                        </div>
                    </div>
                `;
            });
            
            // 如果有更多发射，显示一个"更多"提示
            if (dayLaunches.length > 3) {
                calendarHtml += `<div class="launch-item more">+${dayLaunches.length - 3} 更多</div>`;
            }
            
            calendarHtml += '</div>';
        }
        
        calendarHtml += '</div>';
    }
    
    calendarHtml += '</div>';
    calendarEl.innerHTML = calendarHtml;
    
    // 添加点击事件
    document.querySelectorAll('.launch-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!this.classList.contains('more')) {
                showLaunchDetails(this.getAttribute('data-id'));
            }
        });
    });
}
