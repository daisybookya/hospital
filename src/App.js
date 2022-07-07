import './css/App.less';
import { Breadcrumb, Layout} from 'antd';
import TopMenu from './components/Header';
import menuRoutes from './components/Routes';
import {
  Routes,
  Route,
} from "react-router-dom";
const { Content, Footer } = Layout;

const App = () => (
  <Layout className="layout">
    <TopMenu></TopMenu>
    <Content
      style={{
        padding: '50px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      ></Breadcrumb>
      <div className="site-layout-content">
        <Routes>{
            menuRoutes.map((i)=> <Route path={i.path} 
            element={i.element} key={i.key}></Route>)
          }
        </Routes>
      </div>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      ChengCheng Design ©2022 Created by Cheng
    </Footer>
  </Layout>
);

export default App;
