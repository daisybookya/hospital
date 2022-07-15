import { Card,List,Tag } from 'antd';
import { ZoomInOutlined,InfoCircleOutlined} from '@ant-design/icons';

const cardHeadStyle = {
  'background':'#cbe1f3'
}
const iconSize = {
  'font-size':'22px'
}
function InforCard(props){
    return (
        <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        loading={props.loading}
        dataSource={props.data}
        pagination={{
            pageSize: 15,
            showSizeChanger:false,
            onChange: page => {
              window.scrollTo({top: 0, behavior: 'smooth'});
            },
          }}
        renderItem={item => (
          <List.Item>
            <Card title={props.title(item)} headStyle={cardHeadStyle} 
            actions={[
                <Tag color="blue" onClick={()=>props.clickTag(item)}>{props.area(item)}</Tag>,
                <InfoCircleOutlined style={iconSize} onClick={()=> props.mapLink(item) }/>,
                <ZoomInOutlined style={iconSize} key="global" onClick={()=>props.search(item)}/>,
              ]}>
                {props.content(item)}
            </Card>
          </List.Item>
        )}
      />
        
       
    )
}

export default InforCard