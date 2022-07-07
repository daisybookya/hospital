import { Menu,Layout,Avatar,notification } from 'antd';
import { ExclamationOutlined } from '@ant-design/icons'
import React, { useRef } from 'react';
import '../css/header.less'
import menuRoutes from './Routes'
import {  useNavigate} from "react-router-dom";

const { Header } = Layout;

function TopMenu(){
    let navigate = useNavigate();
    const menuRef = useRef()
    // react router hook
    function clickMenu(e){
        let index = e.key === menuRoutes[0].key ? '/': e.key;
        navigate(index)
    }
    function homeLink(e){
        const list = menuRef.current.menu.list.children
        //拿掉menu的highlight
        for(let i=0;i<list.length;i++){
            list[i].classList.remove('ant-menu-item-selected')
        }
        clickMenu({key:'/'})
    }
    const menuObj = menuRoutes.filter((v)=> v.key !== '404'&& v.key !== 'Home')
    const openNotificationWithIcon = (type) => {
        notification[type]({
          placement:'top',
          message: '關於Taichung Baby Info',
          description:
            `主要提供台中市育嬰相關健康資訊，資訊內容皆由政府資料開放平台data.gov.tw取得，
            詳細資訊可從首頁資料索引查看`,
        });
      };

    return (
        <Header
        style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
          }}>
        <div className="menu-box">
            <div className="title" ><span onClick={(e)=> homeLink(e)}>Taichung Baby Info</span>
            <Avatar className="info-style" onClick={() => openNotificationWithIcon('info')}
            size="small" icon={<ExclamationOutlined />} /></div>
            <Menu ref={menuRef}
                mode="horizontal"
                defaultSelectedKeys={menuRoutes[0].key}
                items={menuObj}
                onClick={(e) => clickMenu(e)}
            />
        </div>
        
        </Header>
    )
}
export default TopMenu