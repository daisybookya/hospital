import '../css/babyFood.less'
import React, { useState, useEffect } from 'react';
import { Typography,Table,Col, Row,Radio,Input } from 'antd';
const { Search } = Input;
const { Title, } = Typography;

function BabyFood(){
    const [isLoading,setLoading] = useState(false)
    const [dataList,setDataList] = useState([])
    const [filters,setFilter] = useState({type:'all',keyword:''})
    const columns = [

        {
            title:'商品中文名稱',
            dataIndex:'中文名稱',
            key:'中文名稱'
        },
        {
            title:'核備函字號',
            dataIndex:'核備函字號',
            key:'核備函字號',
            sorter: (a, b) => compareAB(a,b,'核備函字號')
        },
        {
            title:'產地',
            dataIndex:'產地',
            key:'產地',
            sorter: (a, b) => compareAB(a,b,'產地') ,
        },
        {
            title:'申請商',
            dataIndex:'申請商名稱',
            key:'申請商名稱'
        },
        {
            title:'食品類別',
            dataIndex:'類別',
            key:'類別'
        },
    ]
    function compareAB(a,b,label){
        if(a[label] > b[label]) return 1;
        if(a[label] < b[label]) return -1;
        else return 0;
    }
    function filterTable(data){
        let filterData = [...data]
        const type = filters.type
        switch(type){
            case '嬰兒配方食品':
                filterData = filterData.filter(v=>v['類別'] === '嬰兒配方食品')
                break;
            case '較大嬰兒':
                filterData = filterData.filter(v=>v['類別'].includes('較大嬰兒'))
                break;
            case '特殊醫療':
                filterData = filterData.filter(v=>v['類別'].includes('特殊醫療'))
                break;
            default:

        }
        return filterData.filter(v=> 
            v['中文名稱'].includes(filters.keyword)||v['核備函字號'].includes(filters.keyword))
    }
    const handleData = (data)=>{
        // antd表格組件需要key
        const newData = data.map((value,index)=>{
            const category = value['類別'].slice(0,-1) //去掉,
            value['類別'] = category
            const newObj = {...value,key:index}
            return newObj
        })
        return newData
    }
    function changeFilter(type,v){
        const newFilter = {...filters}
        newFilter[type] = v
        setFilter(newFilter)
    }
    const onChangeType = (e)=>{
        const activeValue = e.target.value
        changeFilter('type',activeValue)
    }
    const onSearch = (v)=>{
        changeFilter('keyword',v)
    }
    useEffect(()=>{
        const fetchUrl =async()=>{
            try{
                setLoading(true)
                const response = await fetch('./baby_food.json')
                const data = await response.json();
                const newDataList = handleData(data)
                setDataList(newDataList)
                setLoading(false)
            }catch(error){
                console.error(error)
                setLoading(false)
            }
            
        }
        fetchUrl()
    },[])
    
    return (
        <>
         <Title level={3}>嬰兒(0-12個月) 奶粉審核通過清單查詢</Title>
         
        <Row className="baby-food-item">
            <Col span={16}>
                <Radio.Group onChange={(e)=>onChangeType(e)} value={filters.type} buttonStyle="solid">
                    <Radio.Button value="all">全部清單</Radio.Button>
                    <Radio.Button value="嬰兒配方食品">嬰兒(0-12個月)食品</Radio.Button>
                    <Radio.Button value="較大嬰兒">較大嬰兒(6-12個月)食品</Radio.Button>
                    <Radio.Button value="特殊醫療">特殊醫療用途嬰兒食品</Radio.Button>
                </Radio.Group>
            </Col>
            <Col span={8}>
                <Search
                    placeholder="搜尋商品名稱或核備函字號..."
                    allowClear
                    enterButton="Search"
                    onSearch={onSearch}
                    />
            </Col>
        </Row>
        
         <Table
            loading={isLoading}
            columns={columns}
            expandable={{
            expandedRowRender: (list) => (
                <>
                    <Row style={{'marginLeft':'50px'}}>
                        <Col span={3}>英文名稱：</Col>
                        <Col span={20}>{list['英文名稱']}</Col>
                        <Col span={3}>成分：</Col>
                        <Col span={20}>{list['成分']}</Col>
                        <Col span={3}>包裝規格：</Col>
                        <Col span={11}>{list['包裝規格']}</Col>
                        <Col span={3}>簽審文件編號：</Col>
                        <Col span={5}>{list['簽審文件編號']}</Col>
                    </Row>
                    <Row style={{'margin':'15px 50px'}} >
                        <Col span={3}>審核有效日期：</Col>
                        <Col span={2}>{list['有效日期']}</Col>
                        <Col span={2}>發證日期：</Col>
                        <Col span={2}>{list['發證日期']}</Col>
                        <Col span={2}>申請商電話：</Col>
                        <Col span={3}>{list['申請商電話']}</Col>
                        <Col span={2}>申請商地址：</Col>
                        <Col span={8}>{list['申請商地址']}</Col>
                    </Row>
                </>
                ),
            }}
            dataSource={filterTable(dataList)}
            />
        </>
       
    )
}

export default BabyFood