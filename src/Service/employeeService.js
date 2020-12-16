import Firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
  }

 const firebase= Firebase.initializeApp(config);
  
  export  {firebase};
  

export const getPreferredDeptCollection = ()=>(
 [  
   {id:'1312', title: '総務'},
   {id:'3454', title: '人事部'}, 
   {id:'4645', title: '経営管理部'}, 
   {id:'4665', title: '経理部'}, 
   {id:'4675', title: '営業部'}, 
   {id:'4653', title: 'マーケティング部'},
]
)

