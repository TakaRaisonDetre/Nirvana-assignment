import React,{useEffect, useState}  from 'react'

import PageHeader from '../../components/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import {Paper, makeStyles, Toolbar, TableBody,TableRow,TableCell, InputAdornment} from '@material-ui/core'

import useTable from "../../components/useTable"
import {firebase} from '../../Service/employeeService'

import Controls from '../../components/controls/controls'
import {Search} from '@material-ui/icons'

const useStyles = makeStyles(theme=>({
   pageContent:{
       margin: theme.spacing(5),
       padding: theme.spacing(3)
   },
   searchInput:{
      width:'55%' 
   }
}))

export default function Employees() {
 
 const classes = useStyles()

const [registration, setRegistration ] = useState([])
const [filterFn, setFilterFn] = useState({fn:items=>{return items;}})

useEffect(()=>{
    const fetchData = async()=>{
     const db= firebase.firestore()
     const data = await db.collection("registration").get()
     setRegistration(data.docs.map(doc=>doc.data()))
    }
    fetchData()
   
},[])

const headCells =[
    {id: 'fullName', label: '求職者氏名'},
    {id: 'email', label: 'メールアドレス'},
    {id: 'age', label: '年齢'},
    {id: 'reason', label: '応募理由'},
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
    　　</Toolbar>


       <TblContainer>
           <TblHead/>
            <TableBody>
            {
                  recordsAfterPagingAndSorting().map(item=> (
                      <TableRow key={item.id}>
                          <TableCell>{item.fullName}</TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>{item.age}</TableCell>
                          <TableCell>{item.reason}</TableCell>
                      </TableRow>
                  ))
            }

            </TableBody>
       </TblContainer> 
       <TblPagination/>
       </Paper>
       </>
       
    )
}
