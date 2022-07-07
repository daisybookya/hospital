import { Select } from 'antd';
//const { Option } = Select;

function Assort(props){
    //options => [{label,value}]
    return (
        <Select value={props.value} 
        size="large" style={{
            width: 200,
          }}
        options={props.opts} onChange={props.onChange}>
        </Select>
    )
}

export default Assort