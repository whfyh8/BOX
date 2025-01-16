import pandas as pd

def process_excel_data(input_file, output_file):
    """
    处理订单数据，只提取指定字段
    @param {string} input_file - 输入文件路径
    @param {string} output_file - 输出文件路径
    @return {DataFrame} - 处理后的数据
    """
    # 读取Excel文件
    df = pd.read_excel(input_file)
    
    # 只选择需要的列
    selected_columns = [
        '主订单编号',
        '联系方式备注',
        '商家编码',
        '买家实付金额',
        '退款状态',
        '订单付款时间'
    ]
    
    df = df[selected_columns]
    
    # 重命名列以便处理
    columns = {
        '主订单编号': 'order_id',
        '联系方式备注': 'contact_note',
        '商家编码': 'seller_code',
        '买家实付金额': 'payment_amount',
        '退款状态': 'refund_status',
        '订单付款时间': 'payment_time'
    }
    df = df.rename(columns=columns)
    
    # 转换数据类型
    df['payment_time'] = pd.to_datetime(df['payment_time'])
    df['payment_amount'] = df['payment_amount'].astype(float)
    
    # 基础数据清洗
    df = df.dropna(subset=['order_id'])  # 删除订单号为空的行
    
    # 保存处理后的数据
    df.to_excel(output_file, index=False)
    
    return df

def generate_basic_analysis(df):
    """
    生成基础数据分析
    @param {DataFrame} df - 处理后的数据框
    @return {dict} - 分析结果
    """
    analysis = {
        '总订单数': len(df),
        '总销售额': df['payment_amount'].sum(),
        '平均订单金额': df['payment_amount'].mean(),
        '退款订单数': df[df['refund_status'].notna()].shape[0]
    }
    
    return analysis

if __name__ == "__main__":
    input_file = "/Users/haowuyu/Desktop/cursor数据分析/提取前.xlsx"
    output_file = "/Users/haowuyu/Desktop/cursor数据分析/处理后.xlsx"
    
    # 处理数据
    processed_df = process_excel_data(input_file, output_file)
    
    # 生成分析报告
    analysis_results = generate_basic_analysis(processed_df)
    
    # 打印分析结果
    for key, value in analysis_results.items():
        print(f"{key}: {value}") 