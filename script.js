/**
 * 计算两个时间之间的差值
 * 显示年、月、日和总天数
 */
function calculateTimeDifference() {
    // 获取日期输入值
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    // 验证输入
    if (!startDate || !endDate) {
        document.getElementById('result').innerHTML = '请选择日期！';
        return;
    }
    
    // 创建日期对象（设置时间为00:00:00以确保只比较日期）
    const startDateTime = new Date(startDate + 'T00:00:00');
    const endDateTime = new Date(endDate + 'T00:00:00');
    
    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        document.getElementById('result').innerHTML = '请输入有效的日期！';
        return;
    }
    
    // 计算时间差（毫秒）
    const timeDiff = Math.abs(endDateTime - startDateTime);
    
    // 转换时间差为天数
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // 计算年、月、剩余天数
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const remainingDays = totalDays % 30;
    
    // 构建结果字符串
    let result = '时间差为：<br>';
    if (years > 0) result += `${years} 年 `;
    if (months > 0) result += `${months} 个月 `;
    if (remainingDays > 0) result += `${remainingDays} 天`;
    
    // 如果时间差为0
    if (timeDiff === 0) {
        result = '两个时间相同';
    } else {
        // 添加总天数显示
        result += `<br><br>总计：${totalDays} 天`;
    }
    
    // 显示结果
    document.getElementById('result').innerHTML = result;
}

/**
 * 初始化时间选择器
 */
function initializeTimePickers() {
    const timeInputs = document.querySelectorAll('.time-input');
    
    timeInputs.forEach(input => {
        const picker = input.parentElement;
        const dropdown = picker.querySelector('.time-dropdown');
        const hoursColumn = dropdown.querySelector('.hours');
        const minutesColumn = dropdown.querySelector('.minutes');
        
        // 生成小时选项
        for (let i = 0; i < 24; i++) {
            const hour = i.toString().padStart(2, '0');
            const div = document.createElement('div');
            div.className = 'time-option';
            div.textContent = hour;
            div.onclick = (e) => {
                e.stopPropagation(); // 阻止事件冒泡
                updateTime(input, hour, input.value.split(':')[1]);
                updateSelectedState(hoursColumn, div);
            };
            hoursColumn.appendChild(div);
        }
        
        // 生成分钟选项
        for (let i = 0; i < 60; i++) {
            const minute = i.toString().padStart(2, '0');
            const div = document.createElement('div');
            div.className = 'time-option';
            div.textContent = minute;
            div.onclick = (e) => {
                e.stopPropagation(); // 阻止事件冒泡
                updateTime(input, input.value.split(':')[0], minute);
                updateSelectedState(minutesColumn, div);
            };
            minutesColumn.appendChild(div);
        }
        
        // 点击输入框时显示/隐藏下拉框
        input.onclick = (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            const allDropdowns = document.querySelectorAll('.time-dropdown');
            allDropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('show');
                }
            });
            dropdown.classList.toggle('show');
            
            // 设置当前选中的时间
            const [hours, minutes] = input.value.split(':');
            setInitialSelection(hoursColumn, hours);
            setInitialSelection(minutesColumn, minutes);
        };
    });
    
    // 点击外部时关闭所有下拉框
    document.addEventListener('click', () => {
        document.querySelectorAll('.time-dropdown').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    });
    
    // 防止点击下拉框本身时关闭
    document.querySelectorAll('.time-dropdown').forEach(dropdown => {
        dropdown.onclick = (e) => e.stopPropagation();
    });
}

/**
 * 更新选中状态
 * @param {HTMLElement} column - 时间列元素
 * @param {HTMLElement} selectedOption - 被选中的选项元素
 */
function updateSelectedState(column, selectedOption) {
    column.querySelectorAll('.time-option').forEach(option => {
        option.classList.remove('selected');
    });
    selectedOption.classList.add('selected');
}

/**
 * 设置初始选中状态
 * @param {HTMLElement} column - 时间列元素
 * @param {string} value - 当前值
 */
function setInitialSelection(column, value) {
    column.querySelectorAll('.time-option').forEach(option => {
        option.classList.remove('selected');
        if (option.textContent === value) {
            option.classList.add('selected');
            // 滚动到选中项
            option.scrollIntoView({ block: 'center', behavior: 'auto' });
        }
    });
}

/**
 * 更新时间输入框的值
 * @param {HTMLInputElement} input - 时间输入框元素
 * @param {string} hours - 小时值
 * @param {string} minutes - 分钟值
 */
function updateTime(input, hours, minutes) {
    input.value = `${hours}:${minutes}`;
}

/**
 * 计算增加天数后的日期
 */
function calculateAddDays() {
    // 获取输入值
    const baseDate = document.getElementById('baseDate').value;
    const daysToAdd = parseInt(document.getElementById('daysToAdd').value) || 0;
    
    // 验证输入
    if (!baseDate) {
        document.getElementById('addDaysResult').innerHTML = '请选择起始日期！';
        return;
    }
    
    // 创建日期对象（设置时间为00:00:00以确保只比较日期）
    const startDateTime = new Date(baseDate + 'T00:00:00');
    
    if (isNaN(startDateTime.getTime())) {
        document.getElementById('addDaysResult').innerHTML = '请输入有效的日期！';
        return;
    }
    
    // 计算新日期
    const resultDate = new Date(startDateTime);
    resultDate.setDate(resultDate.getDate() + daysToAdd);
    
    // 格式化结果
    const year = resultDate.getFullYear();
    const month = String(resultDate.getMonth() + 1).padStart(2, '0');
    const day = String(resultDate.getDate()).padStart(2, '0');
    
    // 显示结果
    const resultStr = `${year}年${month}月${day}日`;
    document.getElementById('addDaysResult').innerHTML = `计算结果：<br>${resultStr}`;
}

/**
 * 切换功能模块
 * @param {string} moduleId - 要显示的模块的ID
 */
function switchModule(moduleId) {
    // 隐藏所有计算器
    document.querySelectorAll('.calculator').forEach(calc => {
        calc.style.display = 'none';
    });
    
    // 显示选中的计算器
    document.getElementById(moduleId).style.display = 'block';
    
    // 更新菜单项的激活状态
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
}

/**
 * 生成到期日期表格数据
 */
function generateExpiryDates() {
    const tbody = document.getElementById('expiryTableBody');
    tbody.innerHTML = ''; // 清空现有内容
    
    const now = new Date();
    
    // 定义置顶的天数
    const topDays = [1, 7, 15, 30, 31];
    
    // 先生成置顶的数据
    topDays.forEach(days => {
        const currentDate = new Date(now);
        const expiryDate = new Date(now);
        expiryDate.setDate(expiryDate.getDate() + days);
        
        // 格式化日期
        const currentDateStr = formatDateTime(currentDate);
        const expiryDateStr = formatDateTime(expiryDate);
        
        // 创建表格行
        const tr = document.createElement('tr');
        tr.classList.add('top-row'); // 添加置顶样式
        tr.innerHTML = `
            <td>${days}</td>
            <td></td>
            <td>${currentDateStr}</td>
            <td>${expiryDateStr}</td>
            <td>
                <button class="copy-btn" onclick="copyDates('${currentDateStr}', '${expiryDateStr}')">
                    复制时间
                </button>
                <button class="copy-btn copy-row-btn" onclick="copyRow(this)">
                    复制整行
                </button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
    
    // 生成其他天数的数据（1-365天，排除已置顶的天数）
    for (let days = 1; days <= 365; days++) {
        if (topDays.includes(days)) continue; // 跳过已置顶的天数
        
        const currentDate = new Date(now);
        const expiryDate = new Date(now);
        expiryDate.setDate(expiryDate.getDate() + days);
        
        // 格式化日期
        const currentDateStr = formatDateTime(currentDate);
        const expiryDateStr = formatDateTime(expiryDate);
        
        // 创建表格行
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${days}</td>
            <td></td>
            <td>${currentDateStr}</td>
            <td>${expiryDateStr}</td>
            <td>
                <button class="copy-btn" onclick="copyDates('${currentDateStr}', '${expiryDateStr}')">
                    复制时间
                </button>
                <button class="copy-btn copy-row-btn" onclick="copyRow(this)">
                    复制整行
                </button>
            </td>
        `;
        
        tbody.appendChild(tr);
    }
}

/**
 * 格式化日期时间
 * @param {Date} date - 日期对象
 * @returns {string} 格式化后的日期时间字符串
 */
function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

/**
 * 复制日期
 * @param {string} currentDate - 当前时间
 * @param {string} expiryDate - 到期时间
 */
function copyDates(currentDate, expiryDate) {
    // 创建一个隐藏的表格来保持格式
    const tempTable = document.createElement('table');
    const tr = document.createElement('tr');
    
    // 创建两个单元格
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    
    // 设置单元格内容
    td1.textContent = currentDate;
    td2.textContent = expiryDate;
    
    // 组装表格
    tr.appendChild(td1);
    tr.appendChild(td2);
    tempTable.appendChild(tr);
    
    // 将表格添加到文档中（隐藏）
    tempTable.style.position = 'fixed';
    tempTable.style.left = '-9999px';
    document.body.appendChild(tempTable);
    
    // 创建选区
    const range = document.createRange();
    range.selectNode(tempTable);
    
    // 清除当前选区
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    
    // 执行复制
    document.execCommand('copy');
    
    // 清理
    window.getSelection().removeAllRanges();
    document.body.removeChild(tempTable);
}

/**
 * 搜索指定天数的记录
 */
function searchExpiryDate() {
    const searchDays = parseInt(document.getElementById('searchDays').value);
    if (!searchDays || searchDays < 1 || searchDays > 365) {
        alert('请输入1-365之间的天数！');
        return;
    }
    
    // 移除之前的高亮
    document.querySelectorAll('.highlight').forEach(row => {
        row.classList.remove('highlight');
    });
    
    // 查找并高亮对应行
    const rows = document.querySelectorAll('#expiryTableBody tr');
    rows.forEach(row => {
        const daysText = row.cells[0].textContent;
        const days = parseInt(daysText);
        if (days === searchDays) {
            row.classList.add('highlight');
            // 修改滚动行为，使用更快的速度
            row.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
    });
}

/**
 * 刷新到期日期数据
 */
function refreshExpiryDates() {
    // 添加刷新动画效果
    const refreshIcon = document.querySelector('.refresh-icon');
    refreshIcon.style.animation = 'spin 0.5s linear';
    
    // 重新生成数据
    generateExpiryDates();
    
    // 动画结束后移除动画
    setTimeout(() => {
        refreshIcon.style.animation = '';
    }, 500);
}

/**
 * 复制整行数据
 * @param {HTMLElement} button - 触发复制的按钮元素
 */
function copyRow(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    
    // 创建一个隐藏的表格来保持格式
    const tempTable = document.createElement('table');
    const tr = document.createElement('tr');
    
    // 复制前四个单元格（不包括操作列）
    for (let i = 0; i < 4; i++) {
        const td = document.createElement('td');
        td.textContent = cells[i].textContent;
        tr.appendChild(td);
    }
    
    tempTable.appendChild(tr);
    
    // 将表格添加到文档中（隐藏）
    tempTable.style.position = 'fixed';
    tempTable.style.left = '-9999px';
    document.body.appendChild(tempTable);
    
    // 创建选区
    const range = document.createRange();
    range.selectNode(tempTable);
    
    // 清除当前选区
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    
    // 执行复制
    document.execCommand('copy');
    
    // 清理
    window.getSelection().removeAllRanges();
    document.body.removeChild(tempTable);
}

/**
 * 规则列表
 * @type {Array<{field: string, condition: string}>}
 */
let rules = [];

/**
 * 初始化数据处理模块
 */
function initializeDataProcessor() {
    // 添加 XLSX 库
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js';
    document.head.appendChild(script);
    
    script.onload = () => {
        // 添加按钮点击事件监听
        const processButton = document.getElementById('processButton');
        if (processButton) {
            processButton.addEventListener('click', processExcel);
        }
        
        // 添加文件选择事件监听
        const fileInput = document.getElementById('excelFile');
        if (fileInput) {
            fileInput.addEventListener('change', function(e) {
                console.log('文件已选择:', e.target.files[0]?.name);
            });
        }
    };
}

// 添加所有数据处理相关的函数
async function processExcel() {
    console.log('开始处理Excel文件');
    const fileInput = document.getElementById('excelFile');
    const resultDiv = document.getElementById('analysisResult');
    
    if (!fileInput.files.length) {
        alert('请选择一个Excel文件');
        return;
    }

    const file = fileInput.files[0];
    console.log('正在读取文件:', file.name);

    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            console.log('文件读取完成，开始处理数据');
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);

            console.log('Excel数据转换完成:', jsonData.length, '行数据');

            // 处理数据
            const processedData = processData(jsonData);
            
            // 显示结果
            displayResults(processedData);
            console.log('数据处理完成');
        } catch (error) {
            console.error('处理数据时出错:', error);
            alert('处理文件时出错: ' + error.message);
        }
    };

    reader.onerror = function(error) {
        console.error('读取文件时出错:', error);
        alert('读取文件时出错');
    };

    reader.readAsArrayBuffer(file);
}

function processData(data) {
    try {
        // 只保留需要的字段，并处理多行联系方式
        const processedData = data.flatMap(row => {
            // 分割联系方式备注中的多行数据
            const contacts = (row['联系方式备注'] || '')
                .split(/[\n\r]+/)  // 按换行符分割
                .map(contact => contact.trim())  // 去除空格
                .map(contact => {
                    // 提取"设备："和"；"之间的内容
                    const match = contact.match(/设备：([^；]+)/);
                    return match ? match[1].trim() : contact;
                })
                .filter(contact => contact);  // 移除空行
            
            // 如果没有有效的联系方式，返回空数组
            if (contacts.length === 0) {
                return [];
            }
            
            // 为每个联系方式创建一条记录
            return contacts.map(contact => ({
                order_id: row['主订单编号'],
                contact_note: contact,
                seller_code: (() => {
                    const code = (row['商家编码'] || '').toString().replace(/[^\d]/g, '');
                    return code.length > 0 ? code : 'NULL';
                })(),
                price: parseFloat(row['商品价格'] || 0),
                quantity: parseInt(row['购买数量'] || 0),
                payment_amount: (() => {
                    const total = parseFloat(row['买家实付金额'] || 0);
                    const quantity = parseInt(row['购买数量'] || 1);
                    return quantity > 0 ? +(total / quantity).toFixed(2) : 0;
                })(),
                refund_status: row['退款状态'],
                payment_time: row['订单付款时间'],
                expiry_time: (() => {
                    const paymentTime = new Date(row['订单付款时间']);
                    const days = parseInt((row['商家编码'] || '').toString().replace(/[^\d]/g, '') || '0');
                    if (isNaN(paymentTime.getTime())) {
                        return '';
                    }
                    const expiryTime = new Date(paymentTime);
                    expiryTime.setDate(paymentTime.getDate() + days);
                    return formatDateTime(expiryTime);
                })()
            }));
        });

        // 过滤掉退款成功的订单
        const filteredData = processedData.filter(row => row.refund_status !== '退款成功');
        
        // 过滤掉联系方式为空的订单
        const finalData = filteredData.filter(row => {
            const contact = row.contact_note;
            return contact && contact.trim() !== '' && contact !== 'null' && contact !== 'undefined';
        });

        // 计算基础统计信息
        const analysis = {
            '总订单数': finalData.length,
            '总销售额': finalData.reduce((sum, row) => sum + (row.payment_amount || 0), 0),
            '平均订单金额': finalData.reduce((sum, row) => sum + (row.payment_amount || 0), 0) / finalData.length,
            '平均商品单价': finalData.reduce((sum, row) => sum + (row.price || 0), 0) / finalData.length,
            '总购买数量': finalData.reduce((sum, row) => sum + (row.quantity || 0), 0),
            '已过滤退款订单数': processedData.length - filteredData.length,
            '已过滤空联系方式订单数': filteredData.length - finalData.length,
            '空商家编码订单数': finalData.filter(row => row.seller_code === 'NULL').length
        };

        return {
            processedData: finalData,
            analysis
        };
    } catch (error) {
        console.error('处理数据时出错:', error);
        throw error;
    }
}

function displayResults(results) {
    const resultDiv = document.getElementById('analysisResult');
    let html = '<div class="button-group">';
    html += '<button id="downloadButton">下载Excel</button>';
    html += '<button id="copyButton">复制表格数据</button>';
    html += '</div>';
    
    html += '<h4>分析结果：</h4>';
    
    for (const [key, value] of Object.entries(results.analysis)) {
        html += `<p>${key}: ${typeof value === 'number' ? value.toFixed(2) : value}</p>`;
    }

    // 添加数据表格
    html += '<div class="table-container">';
    html += '<table class="data-table" id="dataTable">';
    
    // 表头
    const headers = [
        '联系方式备注', '主订单编号', '商家编码', '买家实付金额',
        '订单付款时间', '到期时间', '商品价格', '购买数量', '退款状态'
    ];
    
    html += '<thead><tr>';
    headers.forEach(header => {
        html += `<th>${header}</th>`;
    });
    html += '</tr></thead>';
    
    // 表格数据
    html += '<tbody>';
    const sortedData = [...results.processedData].sort((a, b) => {
        if (a.seller_code === 'NULL' && b.seller_code !== 'NULL') return -1;
        if (a.seller_code !== 'NULL' && b.seller_code === 'NULL') return 1;
        return 0;
    });
    
    sortedData.forEach(row => {
        html += '<tr>';
        html += `<td>${row.contact_note || ''}</td>`;
        html += `<td>${row.order_id || ''}</td>`;
        html += `<td>${row.seller_code || ''}</td>`;
        html += `<td>${row.payment_amount || '0'}</td>`;
        html += `<td>${row.payment_time || ''}</td>`;
        html += `<td>${row.expiry_time || ''}</td>`;
        html += `<td>${row.price || '0'}</td>`;
        html += `<td>${row.quantity || '0'}</td>`;
        html += `<td>${row.refund_status || ''}</td>`;
        html += '</tr>';
    });
    html += '</tbody></table></div>';
    
    resultDiv.innerHTML = html;
    
    // 为下载按钮添加事件监听
    document.getElementById('downloadButton').addEventListener('click', () => {
        downloadProcessedData(results.processedData);
    });
    
    // 为复制按钮添加事件监听
    document.getElementById('copyButton').addEventListener('click', () => {
        copyTableData();
    });
}

function downloadProcessedData(data) {
    try {
        // 定义字段顺序和映射（使用有序数组确保顺序）
        const orderedFields = [
            { field: 'contact_note', header: '联系方式备注' },
            { field: 'order_id', header: '主订单编号' },
            { field: 'seller_code', header: '商家编码' },
            { field: 'payment_amount', header: '买家实付金额' },
            { field: 'payment_time', header: '订单付款时间' },
            { field: 'expiry_time', header: '到期时间' },
            { field: 'price', header: '商品价格' },
            { field: 'quantity', header: '购买数量' },
            { field: 'refund_status', header: '退款状态' }
        ];
        
        // 对数据进行排序，将商家编码为NULL的排在前面
        const sortedData = [...data].sort((a, b) => {
            if (a.seller_code === 'NULL' && b.seller_code !== 'NULL') return -1;
            if (a.seller_code !== 'NULL' && b.seller_code === 'NULL') return 1;
            return 0;
        });
        
        // 转换数据，将英文字段名改为中文
        const translatedData = sortedData.map(row => {
            const newRow = {};
            orderedFields.forEach(({ field, header }) => {
                newRow[header] = row[field];
            });
            return newRow;
        });
        
        // 创建工作表时指定列顺序
        const ws = XLSX.utils.json_to_sheet(translatedData, {
            header: orderedFields.map(f => f.header)
        });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "处理后数据");
        XLSX.writeFile(wb, "处理后.xlsx");
    } catch (error) {
        console.error('下载文件时出错:', error);
        alert('下载文件时出错: ' + error.message);
    }
}

function copyTableData() {
    // 创建一个临时表格，只包含数据行
    const tempTable = document.createElement('table');
    const tbody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tempTable.appendChild(tbody.cloneNode(true));
    
    // 创建一个临时容器来存放表格
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.appendChild(tempTable);
    document.body.appendChild(tempDiv);
    
    // 选择临时表格
    const range = document.createRange();
    range.selectNode(tempTable);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    
    try {
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        alert('表格数据已复制到剪贴板');
    } catch (err) {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制');
    } finally {
        // 清理临时元素
        document.body.removeChild(tempDiv);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 获取今天的日期
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    
    // 设置天数相差计算的默认日期
    document.getElementById('startDate').value = dateString;
    document.getElementById('endDate').value = dateString;
    
    // 设置日期增加天数计算的默认日期
    document.getElementById('baseDate').value = dateString;
    
    // 初始化时间选择器
    initializeTimePickers();
    
    // 添加菜单点击事件
    document.querySelectorAll('.menu-item').forEach((item, index) => {
        item.onclick = function() {
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // 根据点击的菜单项切换显示内容
            if (index === 0) {
                switchModule('diffCalculator');
            } else if (index === 1) {
                switchModule('addDaysCalculator');
            } else if (index === 2) {
                switchModule('expiryDatesCalculator');
                generateExpiryDates(); // 生成到期日期数据
            } else if (index === 3) {
                switchModule('dataProcessCalculator');
            } else if (index === 4) {
                switchModule('deviceNameGenerator');
            } else if (index === 5) {
                switchModule('deviceNameParser');
            }
        };
    });
    
    // 添加搜索框回车事件
    const searchInput = document.getElementById('searchDays');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchExpiryDate();
            }
        });
    }
    
    // 初始化数据处理模块
    initializeDataProcessor();
});

function showCalculator(calculatorId) {
    // 隐藏所有计算器
    document.querySelectorAll('.calculator').forEach(calc => {
        calc.style.display = 'none';
    });
    
    // 显示选中的计算器
    document.getElementById(calculatorId).style.display = 'block';
    
    // 更新菜单项状态
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
}

/**
 * 生成设备名称
 */
function generateDeviceNames() {
    const count = parseInt(document.getElementById('nameCount').value) || 1;
    const prefix = document.getElementById('prefix').value;
    let startNum = parseInt(document.getElementById('startNumber').value) || 1;
    const suffix = document.getElementById('suffix').value;
    
    // 验证序号格式
    if (!/^\d+$/.test(document.getElementById('startNumber').value)) {
        alert('序号必须为数字！');
        return;
    }
    
    let names = [];
    // 计算结束序号
    const endNum = startNum + count - 1;
    
    // 生成名称总结
    const summary = `${prefix}${startNum.toString().padStart(2, '0')}-${endNum.toString().padStart(2, '0')}${suffix}`;
    
    // 生成具体名称列表
    for (let i = 0; i < count; i++) {
        const number = (startNum + i).toString().padStart(2, '0');
        names.push(`${prefix}${number}${suffix}`);
    }
    
    // 显示结果
    const resultDiv = document.getElementById('generatedNames');
    resultDiv.innerHTML = `
        <div class="name-summary">
            <div style="display: flex; align-items: center; width: 100%;">
                <button onclick="copySummary(this)" class="copy-btn">复制</button>
                <span style="flex: 1;">${summary}</span>
            </div>
        </div>
        <div class="name-list">
            <div style="display: flex; align-items: flex-start;">
                <button onclick="copyGeneratedNames(this)" class="copy-btn">复制</button>
                <span style="flex: 1;">${names.join('\n')}</span>
            </div>
        </div>`;
}

/**
 * 复制名称总结
 */
function copySummary(button) {
    const summaryText = button.parentElement.textContent.replace('复制', '').trim();
    
    // 创建临时文本区域
    const textarea = document.createElement('textarea');
    textarea.value = summaryText;
    document.body.appendChild(textarea);
    
    // 选择并复制文本
    textarea.select();
    document.execCommand('copy');
    
    // 移除临时文本区域
    document.body.removeChild(textarea);
    
    // 显示复制成功提示
    button.textContent = '已复制';
    setTimeout(() => {
        button.textContent = '复制';
    }, 1000);
}

/**
 * 复制生成的名称
 */
function copyGeneratedNames(button) {
    // 修改获取文本内容的方式
    const namesText = button.parentElement.querySelector('span').textContent.trim();
    if (!namesText) {
        alert('没有可复制的内容！');
        return;
    }
    
    // 创建临时文本区域
    const textarea = document.createElement('textarea');
    textarea.value = namesText;
    document.body.appendChild(textarea);
    
    // 选择并复制文本
    textarea.select();
    document.execCommand('copy');
    
    // 移除临时文本区域
    document.body.removeChild(textarea);
    
    // 显示复制成功提示
    button.textContent = '已复制';
    setTimeout(() => {
        button.textContent = '复制';
    }, 1000);
}

/**
 * 解析设备名称
 */
function parseDeviceNames() {
    const input = document.getElementById('nameInput').value.trim();
    if (!input) {
        alert('请输入设备名称！');
        return;
    }
    
    const lines = input.split('\n').filter(line => line.trim());
    let results = [];
    let expandedCount = 0;  // 用于统计展开后的数量
    
    lines.forEach(line => {
        line = line.trim();
        if (!line) return;
        
        // 匹配类似 "7425V01-20" 的格式
        const match = line.match(/^(.+?)(\d+)-(\d+)$/);
        
        if (match) {
            const prefix = match[1];  // 前缀部分
            const start = parseInt(match[2]);
            const end = parseInt(match[3]);
            const numLength = match[2].length;  // 获取原始数字的长度，用于保持前导零
            
            if (start <= end) {
                // 生成序列，使用 padStart 保持前导零
                for (let i = start; i <= end; i++) {
                    results.push(`${prefix}${i.toString().padStart(numLength, '0')}`);
                }
                expandedCount += end - start + 1;  // 计算展开后的数量
            } else {
                // 如果格式不正确，保持原样输出
                results.push(line);
                expandedCount += 1;
            }
        } else {
            // 不符合格式的直接添加
            results.push(line);
            expandedCount += 1;
        }
    });
    
    // 更新解析状态
    document.getElementById('parseStatus').textContent = 
        `已解析 ${lines.length} 条数据，生成结果 ${expandedCount} 条`;
    
    // 显示结果
    const resultDiv = document.getElementById('parsedNames');
    resultDiv.innerHTML = `
        <div class="parsed-result">
            <div style="display: flex; align-items: flex-start;">
                <button onclick="copyParsedNames(this)" class="copy-btn">复制</button>
                <div class="parsed-content">${results.join('\n')}</div>
            </div>
        </div>`;
}

/**
 * 复制解析后的名称
 */
function copyParsedNames(button) {
    const namesText = button.nextElementSibling.textContent.trim();
    if (!namesText) {
        alert('没有可复制的内容！');
        return;
    }
    
    // 创建临时文本区域
    const textarea = document.createElement('textarea');
    textarea.value = namesText;
    document.body.appendChild(textarea);
    
    // 选择并复制文本
    textarea.select();
    document.execCommand('copy');
    
    // 移除临时文本区域
    document.body.removeChild(textarea);
    
    // 显示复制成功提示
    button.textContent = '已复制';
    setTimeout(() => {
        button.textContent = '复制';
    }, 1000);
} 