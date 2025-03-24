// 
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;
let launchesData = [];
let currentView = 'calendar'; // 'calendar'  'list'

// emoji
// 根据发射服务提供商返回国旗emoji
function getProviderFlag(providerName) {
    if (!providerName) return '🏳️'; // 默认无国旗
    
    // 映射表：发射服务提供商 -> 国旗
    const flagMap = {
        'SpaceX': '🇺🇸',
        'NASA': '🇺🇸',
        'ULA': '🇺🇸',
        'Rocket Lab': '🇺🇸', // 总部在美国
        'Blue Origin': '🇺🇸',
        'Northrop Grumman': '🇺🇸',
        'Firefly Aerospace': '🇺🇸',
        'Virgin Orbit': '🇺🇸',
        'Arianespace': '🇪🇺',
        'Roscosmos': '🇷🇺',
        'Russian Space Forces': '🇷🇺',
        'CASC': '🇨🇳',
        'China Aerospace Science and Technology Corporation': '🇨🇳',
        'ExPace': '🇨🇳',
        'Galactic Energy': '🇨🇳',
        'ISRO': '🇮🇳',
        'JAXA': '🇯🇵',
        'Isar Aerospace': '🇩🇪',
        'Gilmour Space Technologies': '🇦🇺',
        'KARI': '🇰🇷',
        'Israel Aerospace Industries': '🇮🇱',
        'Iranian Space Agency': '🇮🇷',
        'Agência Espacial Brasileira': '🇧🇷',
        'Maritime Launch Services': '🇨🇦',
        'Rocket Lab New Zealand': '🇳🇿',
        'Khrunichev State Research and Production Space Center':'🇷🇺'
    };
    
    // 检查完整匹配
    if (flagMap[providerName]) {
        return flagMap[providerName];
    }
    
    // 如果没有完全匹配，尝试部分匹配
    for (const key in flagMap) {
        if (providerName.includes(key) || key.includes(providerName)) {
            return flagMap[key];
        }
    }
    
    return '🏳️'; // 未知提供商
}

// 
document.addEventListener('DOMContentLoaded', function() {
    // 
    loadMonthlyData(currentYear, currentMonth);
    
    // 
    loadUpcomingLaunches();
    
    // 
    document.getElementById('prev-month').addEventListener('click', function() {
        navigateMonth(-1);
    });
    
    document.getElementById('next-month').addEventListener('click', function() {
        navigateMonth(1);
    });
    
    // 
    document.querySelector('.modal .close').addEventListener('click', function() {
        document.getElementById('launch-details-modal').style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        // 关闭发射详情模态框
        if (event.target === document.getElementById('launch-details-modal')) {
            document.getElementById('launch-details-modal').style.display = 'none';
        }
        
        // 关闭二维码模态框
        if (event.target === document.getElementById('qrcode-modal')) {
            document.getElementById('qrcode-modal').style.display = 'none';
        }
    });

    
    // 
    document.getElementById('calendar-view').addEventListener('click', function() {
        switchView('calendar');
    });
    
    document.getElementById('list-view').addEventListener('click', function() {
        switchView('list');
    });

    // 二维码按钮点击事件处理
    const qrcodeBtn = document.getElementById('qrcode-btn');
    const qrcodeModal = document.getElementById('qrcode-modal');
    const qrcodeClose = qrcodeModal.querySelector('.close');

    // 点击按钮显示二维码模态框
    qrcodeBtn.addEventListener('click', function() {
        qrcodeModal.style.display = 'block';
    });

    // 点击关闭按钮关闭模态框
    qrcodeClose.addEventListener('click', function() {
        qrcodeModal.style.display = 'none';
    });
    
});

// 
function switchView(viewType) {
    currentView = viewType;
    
    // 
    document.getElementById('calendar-view').classList.toggle('active', viewType === 'calendar');
    document.getElementById('list-view').classList.toggle('active', viewType === 'list');
    
    // 
    if (launchesData.length > 0) {
        if (viewType === 'calendar') {
            renderCalendar(currentYear, currentMonth, launchesData);
        } else {
            renderListView(currentYear, currentMonth, launchesData);
        }
    } else {
        // 
        loadMonthlyData(currentYear, currentMonth);
    }
}

// 
function loadMonthlyData(year, month) {
    document.getElementById('launch-calendar').innerHTML = '<div class="loading">...</div>';
    document.getElementById('current-month').textContent = `${year}${month}`;
    
    fetch(`api.php?action=monthly&year=${year}&month=${month}`)
        .then(response => response.json())
        .then(data => {
            launchesData = data.results || [];
            if (currentView === 'calendar') {
                renderCalendar(year, month, launchesData);
            } else {
                renderListView(year, month, launchesData);
            }
        })
        .catch(error => {
            console.error(':', error);
            document.getElementById('launch-calendar').innerHTML = '<div class="error"></div>';
        });
}

// 
function loadUpcomingLaunches() {
    document.getElementById('upcoming-list').innerHTML = '<li class="loading">...</li>';
    
    fetch('api.php?action=upcoming')
        .then(response => response.json())
        .then(data => {
            const launches = data.results || [];
            renderUpcomingLaunches(launches);
        })
        .catch(error => {
            console.error(':', error);
            document.getElementById('upcoming-list').innerHTML = '<li class="error"></li>';
        });
}

// 
function navigateMonth(delta) {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;
    
    if (newMonth > 12) {
        newMonth = 1;
        newYear++;
    } else if (newMonth < 1) {
        newMonth = 12;
        newYear--;
    }
    
    currentYear = newYear;
    currentMonth = newMonth;
    
    loadMonthlyData(currentYear, currentMonth);
}

// 
function renderUpcomingLaunches(launches) {
    const upcomingList = document.getElementById('upcoming-list');
    
    if (launches.length === 0) {
        upcomingList.innerHTML = '<li class="no-data"></li>';
        return;
    }
    
    let html = '';
    launches.forEach(launch => {
        const launchDate = new Date(launch.net);
        const formattedDate = `${launchDate.getFullYear()}${launchDate.getMonth() + 1}${launchDate.getDate()} ${launchDate.getHours()}:${String(launchDate.getMinutes()).padStart(2, '0')}`;
        
    html += `
        <li class="upcoming-item" data-id="${launch.id}">
            <div class="launch-time">${formattedDate}</div>
            <div class="launch-name">${launch.name}</div>
            <div class="launch-provider">${getProviderFlag(launch.launch_service_provider?.name)} ${launch.launch_service_provider?.name || ''}</div>
        </li>
    `;
    });
    
    upcomingList.innerHTML = html;
    
    // 
    document.querySelectorAll('.upcoming-item').forEach(item => {
        item.addEventListener('click', function() {
            showLaunchDetails(this.getAttribute('data-id'));
        });
    });
}
