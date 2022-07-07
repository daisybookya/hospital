import '../css/home.less'
import React from 'react';
import { Typography,Col, Row,Card } from 'antd';
const { Title, } = Typography;


function Home(){
    return (
        <div className='home-content'>
            <Row gutter={[24, 24]}>
                <Col span={12} offset={6}>
                <Title level={3}>台中市育嬰健康資訊</Title>
                </Col>
            </Row>
            
            <Row gutter={[24, 40]}>
            <Col span={6} offset={6} className="card-intro">
                <Title level={4}>嬰幼兒疫苗接種介紹</Title>
                <p>提供嬰幼兒各項疫苗接種適合年齡及禁忌</p>
            </Col>
            <Col span={6} offset={1} className="card-intro">
                <Title level={4}>預防接種時程</Title>
                <p>提供臺中市現行兒童預防接種疫苗項目及接種時程</p>
            </Col>
            <Col span={6} offset={6} className="card-intro">
                <Title level={4}>嬰兒奶粉清單查詢</Title>
                <p>提供審核通過之嬰兒配方食品，讓民眾查詢衛生福利部查驗登記許可之嬰兒奶粉清單</p>
            </Col>
            <Col span={6} offset={1} className="card-intro">
                <Title level={4}>公共哺乳室</Title>
                <p>提供台中市資源彙整機關、鄉鎮市區、辦理單位、地址、服務時間、連絡電話</p>
            </Col>
            </Row>
            <Row gutter={[24, 24]} className="tool-intro">
            <Col span={13} offset={6}>
                <Title level={4}>資料來源索引</Title>
                <Card>
                    <p>[1]嬰幼兒疫苗接種介紹/ <a rel="noreferrer" href="https://data.gov.tw/dataset/67670" target="_blank">https://data.gov.tw/dataset/67670</a></p>
                    <p>[2]預防接種時程/ <a rel="noreferrer" href="https://data.gov.tw/dataset/84311" target="_blank">https://data.gov.tw/dataset/84311</a></p>
                    <p>[3]嬰兒奶粉清單查詢/ <a rel="noreferrer" href="https://data.gov.tw/dataset/8451" target="_blank">https://data.gov.tw/dataset/8451</a></p>
                    <p>[4]公共哺乳室/ <a rel="noreferrer" href="https://data.gov.tw/dataset/83651" target="_blank">https://data.gov.tw/dataset/83651</a></p>
                </Card>
            </Col>
            <Col span={13} offset={6}>
                <Title level={4}>網站工具</Title>
                <Card>
                    <p>網站主要由react + react-create-app搭建</p>
                    <p>框架：Ant Design(craco訂製配色)</p>
                    <p>css：Less</p>
                </Card>
            </Col>
            </Row>
        </div>
         
       
    )
}

export default Home