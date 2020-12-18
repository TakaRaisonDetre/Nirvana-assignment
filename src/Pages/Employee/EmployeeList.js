import React,{useEffect, useState}  from 'react'
import PageHeader from '../../components/PageHeader'
import Popup from '../../components/Popup'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import {Paper, makeStyles, Toolbar, TableBody,TableRow,TableCell, InputAdornment} from '@material-ui/core'
import useTable from "../../components/useTable"
import {firebase} from '../../Service/employeeService'
import Controls from '../../components/controls/controls'
import { Search} from '@material-ui/icons'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import GetApp from '@material-ui/icons/GetApp'
import EmployeeDetail from '../../Pages/Employee/EmployeeDetail'
import * as employeeService from '../../Service/employeeService'
import Notification from '../../components/controls/Notification'


const useStyles = makeStyles(theme=>({
   pageContent:{margin: theme.spacing(5),padding: theme.spacing(3)},
   searchInput:{width:'55%' },
   newButton:{position:'absolute',right:'10px'} 
}))

export default function Employees() {
 
const classes = useStyles()
 
const [recordForEdit, setRecordForEdit] = useState(null) 
const [registration, setRegistration ] = useState([employeeService.getall()])

const [filterFn, setFilterFn] = useState({fn:items=>{return items;}})
const [openPopup, setOpenPopup] =useState(false)
const [notify, setNotify] = useState({isOpen:false, message:'', type:''});

const [records, setRecords] = useState([employeeService.getall()])



useEffect(()=>{
    const fetchData = async()=>{
        const db= firebase.firestore()
        const data = await db.collection("registration").get()
        setRegistration(data.docs.map(doc=>({...doc.data(), id: doc.id})))       
       }
   fetchData()
},[setRecords, recordForEdit])

const headCells =[
    {id: 'fullName', label: '求職者氏名'},
    {id: 'email', label: 'メールアドレス'},
    {id: 'age', label: '年齢'},
    {id: 'gender', label: '性別'},
    {id: 'reason', label: '応募理由'},
    {id: 'action', label: '詳細'}
]
 const {
     TblContainer,
     TblHead,
     TblPagination,
     recordsAfterPagingAndSorting
    } = useTable(registration, headCells, filterFn)

const handleSearch=(e)=>{
 let target = e.target;
  setFilterFn({
      fn:items=>{
          if(target.value==="")
          return items;
          else 
          return items.filter(x => x.fullName.toLowerCase().includes(target.value))
      }
  })
}

const download = (data)=>{
  const blob=  new Blob([data], {type: 'text/csv'});
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', 'downlaod.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

}

const objectToCsv =function (data){
    const csvRows =[];
  // get the header
const headers = Object.keys(data[0]);
// to make sure each are correctly comma separated !
csvRows.push(headers.join(','));
console.log(csvRows)
  // loop over the rows
for (const row of data) {
   const values=  headers.map(header=>{
       // replace multiple quote with backslash quote
        const escaped = (''+row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`; 
    });
  
    csvRows.push(values.join(','))
}
  console.log(csvRows)
  return csvRows.join('\n');
};


// CSV (excel) Downlaod function
const getCSVreport = async () =>{
 // first get data of registration from firebase

 const res =  await recordsAfterPagingAndSorting()
  console.log(res);

  // implicit retrun ... wrap with additional parantheses
  // reformat json object to be consistent CSV field format
  const data = res.map(row=> ({
    fullName: row.fullName,
    email: row.email,
    reason:row.reason,
    gender:row.gender,
    departmentId : row.departmentId,
    age:row.age,
    isPermanent:row.isPermanent
  }));

  console.log(data)

   const csvData = objectToCsv(data);
   console.log(csvData);
   download(csvData);

}

// Single data for editing and checking
const openInPopup = item => {
   　　setRecordForEdit(item)
      setOpenPopup(true)
   }
   
// New - Editting data
const EditRecords = (employee, resetForm) => {
    employeeService.updateEmployee(employee)
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
    setRecords(employeeService.getall())
    setNotify({
       isOpen:true,
       message: "情報が更新されました",
       type:"success"
   })
}

// deleting data 
const onDelete = (item) =>{
    const id = item.id
    employeeService.deleteEmployee(item)
    console.log(item)
    setRecordForEdit(null)
    setRecords(employeeService.getall())
   
}

    return (
        <> 
        <PageHeader 
        title ="求職者"
        subTitle="求職者リスト管理"
        icon={<PeopleOutlineTwoToneIcon fontSize="large"/>}
        />
        <Paper className={classes.pageContent}>
       <Toolbar>
            <Controls.Input
               label="求職者検索"
               className={classes.searchInput}
               InputProps={{
                startAdornment:(<InputAdornment position="start">
                       <Search />
                   </InputAdornment>)
               }} 
               onChange={handleSearch}
            />
            <Controls.Button
                type="button"
                text="CSV　ダウンロード"
                variant="outlined"
                className={classes.newButton}
                startIcon ={<GetApp/>}
                onClick={getCSVreport}
                />
           
    　　</Toolbar>


       <TblContainer>
           <TblHead/>
            <TableBody>
            {
                  recordsAfterPagingAndSorting().map(item=> (
                      <TableRow key={item.id}>
                         
                          <TableCell >{item.fullName}</TableCell>
                          <TableCell >{item.email}</TableCell>
                          <TableCell >{item.age}</TableCell>
                          <TableCell >{item.gender}</TableCell>
                          <TableCell >{item.reason}</TableCell>
                          <TableCell >
                             
                              <Controls.ActionButton 
                              color="primary"
                              onClick={() => { openInPopup(item) }}>
                                  <EditOutlinedIcon fontSize = "small"/>
                              </Controls.ActionButton>
                              <Controls.ActionButton 
                              onClick={()=>onDelete(item)}
                              color="primary">
                                  <CloseIcon fontSize = "small"/>
                              </Controls.ActionButton>
                          </TableCell>
                      </TableRow>
                  ))
            }

            </TableBody>
       </TblContainer> 
       <TblPagination/>
       </Paper>

　　　　<Popup 
       title="社内応募入力"
       openPopup = {openPopup}
       setOpenPopup = {setOpenPopup}
       >
        <EmployeeDetail 
        recordForEdit={recordForEdit}
        EditRecords={EditRecords}
        />
       </Popup>
       <Notification 
       notify={notify}
       setNotify={setNotify}/>

       </>
       
    )
}
