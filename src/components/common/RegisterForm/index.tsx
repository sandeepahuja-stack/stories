import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "../../../redux/reducers/user/user.thunk";

const USER_REGEX = /^[A-z]{3,23}$/;
const PWD_REGEX = /^[A-z]{8,23}$/;

const RegisterForm = () => {
  
    const dispatch = useDispatch();
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);


    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    
    

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

   

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])


    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch(registerUserAsync({ email: user, password: pwd }));
    }

    return (
        <>
        {/* {isLoading &&<> loading</>} */}
        
            <section>
                <h1>Register</h1>
                <form onSubmit={handleSubmit} data-testid="registerform">
                <Box marginBottom="10px">
                <TextField 
                fullWidth
                        placeholder="User"
                        type="text"
                        id="username"
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        label="User"
                        helperText={<Typography  variant="body2">
                         4 to 24 characters.</Typography>}
                        />
                    </Box>
                  

                    <Box marginBottom="10px">
                <TextField 
                fullWidth
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        placeholder="Password"
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        label="Password"
                        helperText={<Typography  variant="body2">
                        8 to 24 characters.</Typography>}
                        />
                    </Box>
                   

                    <Box marginBottom="10px">
                <TextField 
                        type="password"
                        fullWidth
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        placeholder="Confirm Password"
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        label="Confirm Password"
                        helperText={<Typography  variant="body2">
                        Must match the first password input field.</Typography>}
                        />
                    </Box>
                    
<Button type="submit" variant="contained" color="secondary" disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</Button>
                </form>
              
            </section>
    </>
    )
    
}

export default RegisterForm;