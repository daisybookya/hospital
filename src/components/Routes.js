import Feeding  from '../pages/Feeding';
import Vaccine from '../pages/Vaccine';
import Schedule from '../pages/Schedule';
import BabyFood from '../pages/BabyFood';
import Home from '../pages/Home';
import NoMatch from './NoMatch';
const menuRoutes = [
{
    label:'首頁',
    key:'Home',
    element:<Home />,
    path:'/'
},
{
    label:'嬰幼兒疫苗接種介紹',
    key:'Vaccine',
    element:<Vaccine />,
    path:'Vaccine'
},
{
    label:'預防接種時程',
    key:'Schedule',
    element:<Schedule />,
    path:'Schedule'
},
{
    label:'嬰兒奶粉清單查詢',
    key:'BabyFood',
    element:<BabyFood />,
    path:'BabyFood'
},
{
    label:'公共哺乳室',
    key:'Feeding',
    element:<Feeding />,
    path:'Feeding'
},
{
    label:'404',
    key:'404',
    element:<NoMatch />,
    path:'*'
},
]

export default menuRoutes