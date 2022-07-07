import { Result } from 'antd';

function ErrorHint(){
    return (
        <Result
    status="500"
    title="No data找不到資料"
    subTitle="請洽管理員或重新整理"
  />
       
    )
}
export default ErrorHint