import React,{useState, useContext} from 'react'
import {FirebaseContext} from '../../context/firebase'
import Controls from '../../components/controls/controls';
import {Grid} from '@material-ui/core'

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

const Signin=()=> {

    const history = useHistory();
    const classes = useStyles() 
    const {firebase} = useContext(FirebaseContext) 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]=useState('');

    const isInvalid = password === '' || email === '';

     const handleSignIn =event =>{
         event.preventDefault();

         firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(()=>{
             history.pushState('/candidates');
         }).catch((error)=>{
             setEmail('');
             setPassword('');
             setError(error.message);
         })
     }


    return (
        <>
    <PageHeader 
        title ="求職者管理アプリ"
        subTitle="ログインフォーム"
        icon={<PeopleOutlineTwoToneIcon fontSize="large"/>}
        />
        <Paper className={classes.pageContent}>

       
      
       {error && <p>{error}</p>}
       
      <hr/>

              <form onSubmit={handleSignIn}　method="POST">
            
                    <Grid container>
                    <Grid item xs={12}>
                       <Controls.Input 
                       name="email"
                       label="メール"
                       value={email}
                       onChange ={({target})=> setEmail(target.value)}
                      />

                        <Controls.Input 
                        autoComplete="off"
                        variant="outlined"
                        label="パスワード"
                        type="password"
                        name="password"
                        value = {password}
                        onChange ={({target})=> setPassword(target.value)}
                     
                        />

                         <div>
                            <Controls.Button
                            disabled={isInvalid} 
                            type="submit"
                            text="ログイン"
                            />
                            </div>
                     </Grid>

                    </Grid>
              </form>
              </Paper>
        </>
    )
}

export default Signin 