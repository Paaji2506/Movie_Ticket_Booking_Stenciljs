import { Component ,Method,Prop,State,h } from '@stencil/core';



@Component({
  tag: 'uc-side-drawer',
  styleUrl:'./side-drawer.css',
  assetsDirs:['assets'],
  shadow:true
})
export class SideDrawer {
  @State() loggedIn = false;
  @State() username :string;
  @Prop({reflect:true, mutable:true }) opened:boolean;

  onCloseDrawer() {
    this.opened=false;
  }

  componentDidLoad(){
    const loguser = localStorage.getItem("loguser");
    if(!(loguser===null)){
      this.loggedIn=true;
      this.username=loguser;
     
    }
  }

  @Method() open(){
   this.opened=true;
  }

  logout(){
    localStorage.clear();
    this.loggedIn=false;
    location.href="/";
  }
  render() {

   let sideContent = <div>
   <header>
    <h1>Register Yourself</h1>
    <button onClick={this.onCloseDrawer.bind(this)}>X</button>
    </header>
  <main>
  <nav class="side-nav">
      <ul>
        <li><i class="fa fa-solid fa-registered"></i>&nbsp;&nbsp;<a href="/signup">SignUp / SignIn</a></li>
      </ul>
      </nav>
   </main>
   </div>;

  if(this.loggedIn){
     sideContent = <div>
    <header>
     <h1>Hello {this.username}</h1>
     <button onClick={this.onCloseDrawer.bind(this)}>X</button>
     </header>
     <section id="tabs">
       <button>Services</button>
     </section>
   <main>
   <nav class="side-nav">
       <ul>
         <li><a onClick={this.logout.bind(this)}>Logout</a></li>
       </ul>
       </nav>
    </main>
    </div>;
  }
   
   // let  mainContent =<slot></slot>;
    

    return [
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)}></div>,
      <aside>
       {sideContent}
     </aside>
    ]
  }
}
