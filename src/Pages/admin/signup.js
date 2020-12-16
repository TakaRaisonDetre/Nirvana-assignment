import React,{useState, useContext} from 'react'
import {FirebaseContext} from '../../context/firebase'
import Controls from '../../components/controls/controls';
import {Grid} from '@material-ui/core'
import {Link} from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import {Paper,makeStyles} from '@material-ui/core'
import {useHistory} from 'react-router-dom'


const useStyles = makeStyles(theme=>({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
 }))

export default function Signup(){
  const history = useHistory()
  // MUI customized style 
  const classes = useStyles() 
  // use context for firebase 
  const {firebase} = useContext(FirebaseContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setfullName] = useState('')
    const [confirmPassword, setConfirmedPassword]=useState('');
    const [error, setError]=useState('');
  
    const isInvalid = password === '' || email === '';

    const handleSignup =event =>{
        event.preventDefault();

        if(password !== confirmPassword) {
            alert('password is not mached ');
            return;
            } 

        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result)=>
        result.user 
        .updateProfile({
            displayName: fullName,
        }).then(()=>{
            history.push('/candidates')
        })
        )
        .catch((error)=>{
            setfullName('');
            setEmail('');
            setPassword('');
            setError(error.message);
        })
        
    }

    return (  
    <>
        <PageHeader 
        title ="求職者管理アプリ"
        subTitle="サインアップ"
        icon={<PeopleOutlineTwoToneIcon fontSize="large"/>}
        />
        <Paper className={classes.pageContent}>

       
      
        {error && <p>{error}</p>}
        
       <br/>
 
               <form onSubmit={handleSignup}　method="POST">
             
                     <Grid container>
                     <Grid item xs={12}>

                        <Controls.Input 
                        name="fullName"
                        label="管理者のお名前"
                        value={fullName}
                        onChange ={({target})=> setfullName(target.value)}
                       />

                 
                        <Controls.Input 
                        name="email"
                        label="メール"
                        value={email}
                        onChange ={({target})=> setEmail(target.value)}
                       />
 
                         <Controls.Input 
                         variant="outlined"
                         label="パスワード"
                         type="password"
                         name="password"
                         value = {password}
                         onChange ={({target})=> setPassword(target.value)}
                         />

                         <Controls.Input 
                         autoComplete="off"
                         variant="outlined"
                         label="確認パスワード"
                         type=" password"
                         name="confirmPassword"
                         value = {confirmPassword}
                         onChange ={({target})=> setConfirmedPassword(target.value)}
                         />

                         
 
                          <div>
                             <Controls.Button
                             disabled={isInvalid} 
                             type="submit"
                             text="サインアップ"
                             />
                             </div>
                      </Grid>
                      <p> 既に登録済みの方は<Link to="/signin">ログインへ</Link></p>　
                     </Grid>
               </form>
               </Paper>
         </>

)
}