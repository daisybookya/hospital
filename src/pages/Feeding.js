import React, { useState, useEffect,useMemo } from 'react';
import { Typography,Space,BackTop,Input } from 'antd';
import InforCard from '../components/Card';
import ErrorHint from '../components/Error';
import Assort from '../components/Select';

const { Search } = Input;
const { Title, } = Typography;

function Feeding(){
    const [isLoading,setLoading] = useState(false);
    const [isError,setError] = useState(false)
    const [roomData,setRoomData] = useState([])
    const [areaOpts,setAreaOpts] = useState([])  
    const [areaValue,setAreaValue] = useState('all')
    const [keywords,setKeyword] = useState('')

    //設定select value(選擇分區)
    function handleOpt(value){
        setAreaValue(value)
        setLoading(true)
        window.scrollTo({top: 0, behavior: 'smooth'});
        setTimeout(()=>{
            setLoading(false);
        },700)
    }
    //過濾內容
    function filterContent(data){
        const areaData = areaValue === 'all'? data:data.filter((v)=> v['鄉鎮市區'] === areaValue);
        if(keywords.length>0) {
            return areaData.filter((v)=> v['辦理單位'].indexOf(keywords) > -1 ||
            v['地址'].indexOf(keywords) > -1)
        }
        return areaData
    }
    function onSearch(v){
        setKeyword(v)
    }
    useEffect(()=>{
        const loadData = ()=> {
            setLoading(true)
            fetch('./feeding.json')
            .then((res)=> res.json())
            .then((data)=>{
                setRoomData(data)
                setLoading(false)
            })
            .catch((error)=>{
                console.warn(error)
                setLoading(false);
                setError(true)
            })
        }
        loadData()
    },[])
 
    useMemo(()=>{
        if(roomData.length>0){
            let result = new Set();
            //利用Set抓取不重複值
            roomData.forEach((v)=> result.add(v['鄉鎮市區']));
            const options = Array.from(result,(v)=> Object.assign({},{label:v,value:v}))
            setAreaOpts([{label:'全部',value:'all'},...options])
        }
        
    },[roomData])

    return(
        <>
        <Title level={3}>台中公共哺乳室</Title>
        <Space align="center" size="large" style={{margin:'40px 0'}}>
            篩選台中區域
            <Assort onChange={(v)=>handleOpt(v)} 
            value={areaValue} opts={areaOpts}/>
            篩選地點
            <Search
                placeholder="關鍵字搜尋地點.."
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                />
        </Space>
        {
            isError ? <ErrorHint /> : 
            <InforCard loading={isLoading} data={filterContent(roomData)}
                title={(i)=>i['辦理單位']}
                area={(i)=>i['鄉鎮市區']}
                clickTag={(i)=>handleOpt(i['鄉鎮市區'])}
                search={(i)=>searchData(i)}
                content={(i)=>handleData(i)}>
            </InforCard>
        }
        <BackTop />
        </>
    )
}

//處理卡片資訊
function handleData(item){
    const time = `${item['服務時間']}`
    const tel = `${item['連絡電話']}`
    const address = `${item['地址']}`
    return (<>
                <p>開放時間：{time}</p>
                <p>電話：{tel}</p>
                <p>地址：{address}</p>
            </>)
}
//按鈕-搜尋功能
function searchData(keyword){
    if(keyword !== null){
        const _url = `https://www.google.com.tw/search?q=${keyword['辦理單位']}`
        window.open(_url)
    }
    return false
}

export default Feeding