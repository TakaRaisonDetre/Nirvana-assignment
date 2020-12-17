import React from 'react'
import EmployeeForm from './EmployeeForm'
import PageHeader from '../../components/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import {Paper, makeStyles} from '@material-ui/core'


const useStyles = makeStyles(theme=>({
   pageContent:{
       margin: theme.spacing(5),
       padding: theme.spacing(3)
   }
}))

export default function Employees() {
 
 const classes = useStyles()

    return (
        <> 
        <PageHeader 
        title ="求職者"
        subTitle="求職者リスト管理"
        icon={<PeopleOutlineTwoToneIcon fontSize="large"/>}
        />
        <Paper className={classes.pageContent}>
        
        <EmployeeForm /> 
     
       </Paper>
       </>
       
    )
}
