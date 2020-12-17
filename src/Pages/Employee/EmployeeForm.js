import React from 'react'
import {Grid} from '@material-ui/core'
import Controls from '../../components/controls/controls'
import {useForm, Form } from '../../components/useForm'
import * as employeeService from '../../Service/employeeService'



const genderItems = [
    {id: 'male', title: '男性'},
    {id: 'female', title: '女性'},
    {id: 'other', title: '無回答'}
]

const initialFvalue ={
    fullName: '',
    email: '',
    age:'',
    gender:'',
    reason:'',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
}

export default function EmployeeForm(props) {
    
const validate =(fieldValues = values)=>{
  let temp ={...errors}
  if('fullName' in fieldValues)
  temp.fullName = fieldValues.fullName? "": "入力必須"
  if('email' in fieldValues)
  temp.email = fieldValues.email?"":"入力必須"
  temp.email =  (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "メールフォーマットが不明です."
  if('reason' in fieldValues)
  temp.reason = fieldValues.reason? "":  "入力必須"
  if('age' in fieldValues)
  temp.age= fieldValues.age? "":  "入力必須"
  if('departmentId' in fieldValues)
  temp.departmentId = fieldValues.departmentId.length !== 0 ? "" : "入力必須"
  setErrors({
    ...temp
  })
  if(fieldValues===values)
  return Object.values(temp).every(x=> x==="")
}

//　aggregate all form actions to useform component 
// ステートとハンドルチェンジをUseFormに委譲　
 const {
    values, 
    errors,
    setErrors,
    handleInputChange,
    resetForm
}= useForm(initialFvalue, true, validate)

const handleSubmit = e => {
  e.preventDefault()
  if (validate()) {
      addOrEdit(values, resetForm);
  }
}

const addOrEdit = (candidate, resetForm) => {
    employeeService.insertEmployee(candidate)
  resetForm()
}  

    return (
      
            <Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                       <Controls.Input 
                       name="fullName"
                       label="お名前"
                       value={values.fullName}
                       onChange ={handleInputChange}
                       error={errors.fullName}/>

                        <Controls.Input 
                        variant="outlined"
                        label="メール"
                        name="email"
                        value = {values.email}
                        onChange ={handleInputChange}
                        error={errors.email}
                        />

                          <Controls.Input 
                        variant="outlined"
                        label="ご年齢"
                      　name="age"
                        value = {values.age}
                        onChange ={handleInputChange}
                        error={errors.age}
                        />

                         <Controls.Input 
                        variant="outlined"
                        label="希望理由"
                        name="reason"
                        value = {values.reason}
                        multiline
                        onChange ={handleInputChange}
                        error={errors.reason}
                        />

                    </Grid>
                    <Grid item xs={6}>
                     <Controls.RadioGroup
                      name="gender"
                      label="性別"
                      value = {values.gender}
                      onChange ={handleInputChange}
                      items={genderItems}
                     />

                     <Controls.Select 
                     name="departmentId"
                     label="希望部署"
                     value={values.departmentId}
                     onChange ={handleInputChange}
                     options={employeeService.getPreferredDeptCollection()} 
                     error={errors.departmentId}/>
                    
                     <Controls.DatePicker
                        name= "hireDate"
                        label="希望入社日"
                        value={values.hireDate}
                        onChange={handleInputChange} />

                     <Controls.CheckBox
                     name= "isPermanent"
                     label="正社員希望"
                     value={values.isPermanent}
                     onChange={handleInputChange} />

                        <div>
                            <Controls.Button
                            type="submit"
                            text="応募する"
                            />
                              <Controls.Button
                            type="reset"
                            color="default"
                            text="やり直す"
                            onClick={resetForm}
                            />
                        </div>


                    </Grid>
                 </Grid>
            </Form>
    )
}
