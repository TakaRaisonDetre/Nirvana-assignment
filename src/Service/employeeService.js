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

//export function getAllEmployees() {
  // TODO Firebase get all candidates 



  // if (localStorage.getItem(KEYS.employees) == null)
  //     localStorage.setItem(KEYS.employees, JSON.stringify([]))
  // let employees = JSON.parse(localStorage.getItem(KEYS.employees));
  //map departmentID to department title
  // let departments = getPreferredDeptCollection();
  // return candidates.map(x => ({
  //     ...x,
  //     department: departments[x.departmentId - 1].title
  // }))
//}



export function updateEmployee(data) {
  // let employees = getAllEmployees();
  // let recordIndex = employees.findIndex(x => x.id == data.id);
  // employees[recordIndex] = { ...data }
  // localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

// const db = firebase.firestore()
    // db.collection('registration').add(newEntry)
    // .then(()=>{
    //   setNewEntry({
    //     fullName:'',
    //     email:'',
    //     age:'',
    //     reason:'',
    //     gender:'',
    //     departmentId:'',
    //     hireDate:new Date(),
    //     isPermanent:'false'
    // })
    // })