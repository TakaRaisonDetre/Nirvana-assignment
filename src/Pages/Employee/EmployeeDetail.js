import React from 'react'
import {Grid} from '@material-ui/core'
import Controls from '../../components/controls/controls'


export default function EmployeeDetail(props) {
  
  const {recordForEdit} = props

    return (
      
    
        <Grid container>
            <Grid item xs={6}>
               <Controls.Input 
               disabled={true}
               name="fullName"
               label="お名前"
               value={recordForEdit.fullName}
              />

                <Controls.Input 
                disabled={true}
                variant="outlined"
                label="メール"
                name="email"
                value = {recordForEdit.email}
              
                />

                  <Controls.Input 
               disabled={true}
               variant="outlined" 
                label="ご年齢"
              　name="age"
                value = {recordForEdit.age}
              
                />

             <Controls.Input 
              disabled={true}
                variant="outlined"
                label="希望理由"
                name="reason"
                value = {recordForEdit.reason}
                multiline
            
                />

            </Grid>
            <Grid item xs={6}>
            <Controls.Input 
            disabled={true}
              name="gender"
              label="性別"
              value = {recordForEdit.gender}
             />

           <Controls.Input 
           disabled={true}
             name="departmentId"
             label="希望部署"
             value={recordForEdit.departmentId}
            />
            
           
            <Controls.Input 
            disabled={true}
             name= "isPermanent"
             label="正社員希望"
             value={recordForEdit.isPermanent}
             />

               

            </Grid>
         </Grid>

       

       
    )
}
