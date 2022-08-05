import '../css/home.less'
import React, { useEffect } from 'react';
import { Typography,Col, Row,Divider } from 'antd';
const { Title, } = Typography;


function Home(){
    useEffect(()=>{
        const target = document.getElementsByClassName('animation')[0]
        target.addEventListener('animationstart',function(){
            target.classList.add('opacity')
          });
          target.addEventListener('animationend',function(){
            target.classList.add('active')
          });
        setTimeout(()=>{
            target.classList.remove('fixed')
        },3000)
    },[])
    return (
        <div className='home-content'>
            <div className='animation fixed'>
                <div className='title'><span>Taichung Baby</span> <span>Information</span></div>
            </div>
            <Row gutter={[24, 8]} >
                <Col span={11} offset={12}>
                <Title level={3}>台中市育嬰健康資訊</Title>
                <Title level={5}>*嬰幼兒疫苗接種介紹</Title>
                <p>提供嬰幼兒各項疫苗接種適合年齡及禁忌</p>
                <Title level={5}>*預防接種時程</Title>
                <p>提供臺中市現行兒童預防接種疫苗項目及接種時程</p>
                <Title level={5}>*嬰兒奶粉清單查詢</Title>
                <p>讓民眾查詢衛生福利部查驗登記許可之嬰兒奶粉清單</p>
                <Title level={5}>*公共哺乳室</Title>
                <p>提供台中市彙整機關、鄉鎮市區、辦理單位、地址、服務時間、連絡電話</p>
                <Divider />
                </Col>
            </Row>
            
            <Row gutter={[24, 24]}>
            <Col span={11} offset={12}>
                <Title level={5}>資料來源索引</Title>
                    <p>[1]嬰幼兒疫苗接種介紹/ <a rel="noreferrer" href="https://data.gov.tw/dataset/67670" target="_blank">https://data.gov.tw/dataset/67670</a></p>
                    <p>[2]預防接種時程/ <a rel="noreferrer" href="https://data.gov.tw/dataset/84311" target="_blank">https://data.gov.tw/dataset/84311</a></p>
                    <p>[3]嬰兒奶粉清單查詢/ <a rel="noreferrer" href="https://data.gov.tw/dataset/8451" target="_blank">https://data.gov.tw/dataset/8451</a></p>
                    <p>[4]公共哺乳室/ <a rel="noreferrer" href="https://data.gov.tw/dataset/83651" target="_blank">https://data.gov.tw/dataset/83651</a></p>
            </Col>
            <Col span={11} offset={12}>
                <Title level={5}>網站工具</Title>
                    <p>網站主要由react + react-create-app +React router 搭建</p>
                    <p>框架：Ant Design(craco訂製配色)</p>
                    <p>css：Less</p>
            </Col>
            </Row>
        </div>
         
       
    )
}

export default Home