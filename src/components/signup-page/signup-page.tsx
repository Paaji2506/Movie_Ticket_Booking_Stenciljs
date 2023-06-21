import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'signup-page',
  styleUrl: 'signup-page.css',
  assetsDirs:['assets'],
  shadow: true,
})
export class SignupPage {

@State() regName:HTMLInputElement;
@State() regEmail:HTMLInputElement;
@State() regPswd:HTMLInputElement;
@State() regCpswd:HTMLInputElement;
@State() regMob:HTMLInputElement;
@State() isAdmin:boolean=false;



@State() logEmail: HTMLInputElement;
  @State() logPswd: HTMLInputElement;


  

@State() reEmail: HTMLInputElement;
@State() reOldPsw: HTMLInputElement;
@State() reNewPsw: HTMLInputElement;
@State() reCnewPsw: HTMLInputElement;

@State() error:HTMLElement;

 phPattern:RegExp = /^[6-9]\d{9}$/;
 emailPattern:RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 passPattern:RegExp= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_]).{8,}$/;


  @State() signInPage=false;
  @State() resetPswdPage=false;


  openSignInPage(){
    this.signInPage=true;
    this.resetPswdPage=false;
   
  }

  openSignUpPage(){
    this.signInPage=false;
    
  }

  openResetPswdPage(){
    this.resetPswdPage=true;
    this.signInPage=false;
  }

  logAdmin(user:string,uid){
    localStorage.setItem("loguser",user);
    localStorage.setItem("loguserid",uid);
  }

  validate(event:Event){
   event.preventDefault();
   
   if (!this.regMob.value.match(this.phPattern)) {
     // this.message('Please enter a valid mobile number!...');
     this.error =<error-message message='Please enter a valid mobile number!...' success={false}></error-message>
   } else if (!this.regEmail.value.match(this.emailPattern)) {
     // this.message('Please enter a valid email address!...');
     this.error = <error-message message='Please enter a valid email address!...'></error-message>
   } else if (this.regPswd.value.length < 8) {
     // this.message('Password should be atleast 8 characters long!...');
     this.error = <error-message message='Password should be atleast 8 characters long!...'></error-message>
   } else if (!this.regPswd.value.match(this.passPattern)) {
     // this.message('Password should be strong!...');
     this.error = <error-message message='Password should be strong!...'></error-message>
   } else if (!this.regCpswd.value.match(this.regPswd.value)) {
     // this.message('Password and confirm password should match!...');
     this.error = <error-message message='Password and confirm password should match!...'></error-message>
   } else {
     this.checkUser();
     
   }
  }


  async checkUser(){
    let resp = await fetch('http://localhost:9000/getemail/' + this.regEmail.value);
    if (resp.status == 200) {

    this.error=<error-message message='User already exists please login!...' success={false}></error-message>
    setTimeout(() => (this.openSignInPage()), 1000);
     } else 
     this.signUp();

  }
async signUp() {

  if(this.regEmail.value==="admin@gmail.com"){
    this.isAdmin=true;
  }
  let users = {
    uname: this.regName.value,
    uemail: this.regEmail.value,
    upsw: this.regPswd.value,
    ucpsw: this.regCpswd.value,
    umob: Number(this.regMob.value),
    isAdmin: this.isAdmin,
   
  };
  await fetch('http://localhost:9000/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(users),
  });

  // this.message("You've signed up successfully!", true);
  this.error = <error-message message="You are Registered Successfully!" success={true}></error-message>
  setTimeout(() => (this.openSignInPage.bind(this)), 1000);
}


async signIn(event: Event) {
  event.preventDefault();
  let resp = await fetch('http://localhost:9000/getuser/' + this.logEmail.value);
  if (resp.status == 200) {
    let user = await resp.json();
    if (user.upsw === this.logPswd.value) {
      
      if (this.logEmail.value==="admin@gmail.com") {
        // this.message(`Admin Logged in successfully!...`, true);
        this.error=<error-message message='Admin Logged In Successfully' success={true}></error-message>
        this.logAdmin("Admin",user.uid);
        setTimeout(() => (location.href="/adminhome"), 2000);
        return;
      } else {
        // this.message(`Hello ${user.fname}!. You've Logged in successfully!...`, true);
        this.error=<error-message message= 'You have Logged In Successfully' success={true}></error-message>
        this.logAdmin(user.uname,user.uid);
        setTimeout(() => (location.href = '/movies'), 1000);
        return;
      }
    } else {
      // this.message('Wrong Password Try again!...');
      this.error=<error-message message= 'Wrong Password' success={false}></error-message>
    }
  } else {
    // this.message('Invalid Email or Password!...');
    this.error=<error-message message= 'Invalid Email or Password' success={false}></error-message>
  }
}


validateResetPswd(event:Event){
  event.preventDefault();
    
   if (!this.reEmail.value.match(this.emailPattern)) {
    // this.message('Please enter a valid email address!...');
    this.error = <error-message message='Please enter a valid email address!...'></error-message>
  } else if (this.reNewPsw.value.length < 8) {
    // this.message('Password should be atleast 8 characters long!...');
    this.error = <error-message message='New Password should be atleast 8 characters long!...'></error-message>
  } else if (!this.reNewPsw.value.match(this.passPattern)) {
    // this.message('Password should be strong!...');
    this.error = <error-message message='New Password should be strong!...'></error-message>
  } else if (!this.reCnewPsw.value.match(this.reNewPsw.value)) {
    // this.message('Password and confirm password should match!...');
    this.error = <error-message message='New Password and confirm password should match!...'></error-message>
  } else {
    this.resetPassword();
    
  }

  }

  async resetPassword(){

    let repsw={
     remail: this.reEmail.value,
     roldpsw:this.reOldPsw,
     nnewpsw: this.reNewPsw
    }
      await fetch('http://localhost:9000/resetpsw', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(repsw),
    });
    
    this.error = <error-message message="Password Reset Successfully !" success={true}></error-message>
    setTimeout(() => (this.openSignInPage.bind(this)), 1000);
  }

  
  render() {

    

    let signContent =[
      <div class="error">{this.error}</div>,
      <div class="signup_container">
         <h1>Create Account</h1>
         <div class="social-container">
					<a href="http://www.facebook.com" class="social"><i class="fab fa-facebook-f"></i></a>
					<a href="http://www.google.com" class="social"><i class="fab fa-google-plus-g"></i></a>
					<a href="http://www.linkedin.com" class="social"><i class="fab fa-linkedin-in"></i></a>
				</div>
				&nbsp;&nbsp;&nbsp; <span >or use your email for registration</span>
        
         <form onSubmit={this.validate.bind(this)}>
          <table>
            <tr>
              <td><label>Username : </label></td>
              <td><input id="regname" type='text' placeholder='Enter Your Name'required autofocus ref={el => (this.regName=el as HTMLInputElement)}></input></td>
            </tr>

            <tr>
              <td><label>Email : </label></td>
              <td><input id="regemail" type='email'placeholder='Enter Your Email' required autofocus ref={el => (this.regEmail=el as HTMLInputElement)}></input></td>
            </tr>

            <tr>
              <td><label>Password : </label></td>
              <td><input id="regpswd" type='password' placeholder='Enter Your Password' required autofocus ref={el=>(this.regPswd=el as HTMLInputElement)} ></input></td>
            </tr>

            <tr>
              <td><label>Confirm Password : </label></td>
              <td><input id="regcpswd" type='password' placeholder='Enter Password Again'required autofocus ref={el=>(this.regCpswd=el as HTMLInputElement)}></input></td>
            </tr>

            <tr>
              <td><label>Mobile : </label></td>
              <td><input id="regmob" type='number' placeholder='Enter Mobile Number'required autofocus ref={el=>(this.regMob=el as HTMLInputElement)} ></input></td>
            </tr>

          </table>
        <button type="submit" >Regsiter</button>
        <button type="reset" >Clear</button>
        </form>
        </div>,

        <div class="direct">
					<h1>Welcome Back!</h1>
					<p>To keep connected with us please login with your login details</p>
					<button onClick={this.openSignInPage.bind(this)}>Sign In</button>
				</div>];
          

   

if(this.signInPage){
 signContent= [
  <div class="error">{this.error}</div>,
  <div class="direct">
      <h1>Hello, Friend!</h1>
			<p>Register and book your tickets now!!!</p>
			<button onClick={this.openSignUpPage.bind(this)} >Sign Up</button>
 </div>,
  <div class="signin_container">
  <h1>Sign In</h1>
  <div class="social-container">
   <a href="http://www.facebook.com" class="social"><i class="fab fa-facebook-f"></i></a>
   <a href="http://www.google.com" class="social"><i class="fab fa-google-plus-g"></i></a>
   <a href="http://www.linkedin.com" class="social"><i class="fab fa-linkedin-in"></i></a>
 </div>
 &nbsp;&nbsp;&nbsp; <span>or use your account</span>
 
  <form onSubmit={this.signIn.bind(this)}>
   <table>

     <tr>
       <td><label>Email : </label></td>
       <td><input id="logemail" type='email' required autofocus placeholder='Enter Your Email'  ref={el => (this.logEmail=el as HTMLInputElement)}></input></td>
     </tr>

     <tr>
       <td><label>Password : </label></td>
       <td><input id="logswd" type='password' required autofocus placeholder='Enter Your Password'  ref={el => (this.logPswd=el as HTMLInputElement)}></input></td>
     </tr>

   </table>
   <a onClick={this.openResetPswdPage.bind(this)} class="fpsw">Forgot your password?</a><br></br>
 <button type="submit" >Log In</button>
 <button type="reset" >Clear</button>
 </form>
 </div>
 ];
}


   

if(this.resetPswdPage){
  signContent= [
   <div class="error">{this.error}</div>,
   <div class="direct">
       <h1>Hello, Friend!</h1>
       <p>Register and book your tickets now!!!</p>
       <button onClick={this.openSignUpPage.bind(this)} >Sign Up</button>
  </div>,
   <div class="signin_container">
   <h1>Reset Password</h1>

  
   <form onSubmit={this.validateResetPswd.bind(this)} >
    <table>
 
      <tr>
        <td><label>Email : </label></td>
        <td><input id="remail" type='email' required autofocus placeholder='Enter Your Email'  ref={el => (this.reEmail=el as HTMLInputElement)}></input></td>
      </tr>
 
      <tr>
        <td><label>Old Password : </label></td>
        <td><input id="roldpsw" type='password' required autofocus placeholder='Enter Old Password'  ref={el => (this.reOldPsw=el as HTMLInputElement)}></input></td>
      </tr>
      
      <tr>
        <td><label>New Password : </label></td>
        <td><input id="rnewpsw" type='password' required autofocus placeholder='Enter New Password'  ref={el => (this.reNewPsw=el as HTMLInputElement)}></input></td>
      </tr>

      
      <tr>
        <td><label>Confirm New Password : </label></td>
        <td><input id="rcnewpsw" type='password' required autofocus placeholder='Confirm New Password'  ref={el => (this.reCnewPsw=el as HTMLInputElement)}></input></td>
      </tr>
 
    </table>
    <a onClick={this.openSignInPage.bind(this)} class="fpsw">Signin?</a><br></br>
  <button type="submit" >Reset</button>
  <button type="reset" >Clear</button>
  </form>
  </div>
  ];
 }

    return (
      <Host>
           {signContent}

         
      </Host>
    );
  }

}
