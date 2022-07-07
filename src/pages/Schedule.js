import '../css/schedule.less'
import ErrorHint from '../components/Error';
import React, { useState, useEffect } from 'react';
import { Typography,Spin,Col, Row,Collapse,BackTop } from 'antd';
const { Title, } = Typography;
const { Panel } = Collapse;
function Schedule(){
    const [isLoading,setLoading] = useState(false)
    const [isError,setError] = useState(false)
    const [dataList,setDataList] = useState([])
    const handleData = (data)=>{
        let timeSort = []
        data.forEach((v,i)=>{
            //找尋重複的時程
            const findIndex = timeSort.findIndex((fv,i)=> fv['time'].includes(v['接種時程']))
            if(findIndex > -1){
                timeSort[findIndex]['content'].push(v)
            }else{
                const newData = Object.assign({},{time:v['接種時程'],content:[v]})
                timeSort = [...timeSort,newData]
            }
        })
        //按照時程做基本排序
        timeSort.sort((a,b)=> {
            const pattern = /[0-9]+/i; //搜尋數字做排序
            const ex1 = a.time.match('5歲')
            const ex2 = b.time.match('24')
            if(ex1 !== null){
                return -1
            }
            if(ex2 !== null){
                return 1
            }
            return a.time.match(pattern)-b.time.match(pattern)
        })
        const excepAge1Data = timeSort.shift() //抽出第一個五歲
        timeSort.push(excepAge1Data) //五歲移到最後
        return timeSort
    }   
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                setLoading(true)
                const resp = await fetch('./baby_schedule.json')
                const data = await resp.json()
                const newData = handleData(data)
                setDataList(newData)
                setLoading(false)
            }
            catch(error){
                console.error(error)
                setLoading(false)
                setError(true)
            }
            
        }
        fetchData()
    },[])
    
    return (
        <>
         <Title level={3}>台中市現行兒童預防接種時程</Title>
         {
            isError ? <ErrorHint /> : 
            <Spin spinning={isLoading} tip="Loading">
                    <Row>
                    <Col span={12} offset={6}>
                        <Collapse defaultActiveKey={['0']} bordered={false} accordion>
                        {
                            dataList.map((v,i)=>
                                <Panel header={v['time']} key={i} >
                                    {
                                        v['content'].map((cv,ci)=> 
                                        <div key={`content${ci}`} style={{'marginTop':'20px'}}>
                                        <Title level={5}>* {cv['疫苗項目']}</Title>
                                        {cv['備註'] ? <p>備註：{cv['備註']}</p>:''}
                                        </div>)
                                    }
                                    
                                </Panel>
                            )
                        }
                        </Collapse>
                    </Col>
                </Row>
            </Spin>  
         }
         <BackTop />
        </>
       
    )
}

export default Schedule