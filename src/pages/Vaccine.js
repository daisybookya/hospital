import '../css/vaccine.less'
import React, { useState, useEffect } from 'react';
import { Typography,Spin,Tabs,Divider,Col, Row } from 'antd';
const { Title, } = Typography;
const { TabPane } = Tabs;

function Vaccine(){
    const [isLoading,setLoading] = useState(false)
    const [dataList,setDataList] = useState([])

    const handleData = (data)=> {
        //改成不重複疫苗名稱的格式
        let category = []
        data.forEach((v,i)=> {
            const theIndex = category.findIndex(i=> i['name'] === v['疫苗種類'])
            if( theIndex > -1){
                category[theIndex]['content'].push(v)
            }else{
                const newTab = Object.assign({},{
                    'name':v['疫苗種類'],
                    'content':[v]
                })
                category = [...category,newTab]
            }
        })
        return category
    }
    const shortName = (name)=> {
        if(name.length>15) {
            return `${name.slice(0,15)}.....`
        }
        return name
    }
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                setLoading(true)
                const fetchUrl = await fetch(`${process.env.PUBLIC_URL}/baby.json`)
                const theData = await fetchUrl.json()
                // console.log('fetch!',theData)
                const newData = handleData(theData)
                setDataList(newData)
                setLoading(false)
            }
            catch(error){
                console.error(error)
                setLoading(false)
            }
        }
        fetchData()
    },[])
    
    return (
        <>
         <Title level={3}>嬰幼兒疫苗接種介紹</Title>
         <Spin spinning={isLoading} tip="Loading">
            <Tabs tabPosition="left">
                {
                    dataList.map((v,i)=> 
                        <TabPane tab={shortName(v['name'])} key={i}>
                            <Title level={4}>全名：{v['name']}</Title>
                            {
                            v['content'].map((cv,ci)=>
                                <div key={`content${ci}`}>
                                <Divider orientation="left" style={{'marginTop':'40px'}}>{cv['劑別']}</Divider>
                                <Row gutter={[16, 8]} className="row-style">
                                    <Col span={4}>適合接種年齡</Col>
                                    <Col span={20}>{cv['適合接種年齡']}</Col>
                                    <Col span={4}>禁忌</Col>
                                    <Col span={20}>{cv['禁忌']}</Col>
                                </Row>
                                </div>
                            )
                            }
                        </TabPane>
                    )
                }
            </Tabs>
        </Spin>
        </>
       
    )
}

export default Vaccine