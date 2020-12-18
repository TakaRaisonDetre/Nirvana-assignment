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


export function insertEmployee(candidate) {
  
  const db = firebase.firestore()
  db.collection('registration').add(candidate)
  .then(()=>{
    window.alert('登録完了')
  })

}


export const updateEmployee=async(candidate) =>{
 
 const db = firebase.firestore()
 await db.collection('registration').doc(candidate.id).update({
   fullName:candidate.fullName,
   email:candidate.email,
   age:candidate.age,
   gender:candidate.gender,
   isPermanent:candidate.isPermanent,
   reason:candidate.reason,
   departmentId:candidate.departmentId,
 })
 .then(()=>{
 getall()
 })
 
}

export const deleteEmployee=async(candidate)=>{
  const db= firebase.firestore()
await  db.collection('registration').doc(candidate.id).delete()
  .then(()=>{
     getall();
   
  })
}

export const getall=async()=>{
  const db = firebase.firestore()
 await db.collection('registration').get()
 
 
}

