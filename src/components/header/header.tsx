import { Component,State,h, Host} from "@stencil/core";
@Component({
    tag:'ma-header',
    styleUrl:'./header.css',
    assetsDirs: ['assets'],
    shadow:true
})

export class Header{

    @State() loggedIn=false;
    @State() adminlogIn=false;

    componentDidLoad(){
       const loguser = localStorage.getItem("loguser");
       if(loguser==="Admin"){
        this.adminlogIn=true;
       }else if(loguser==="none"){
        
       }
    }
    render(){


        let headContent=[
            <div class="navbody">
            <a class="active" href="/">Home</a>
            <a href="/movies">Movies</a>
            <a href="/about">About</a>
             <a href="/contact">Contact</a>
          </div>
        ];

        if(this.adminlogIn){
            headContent=(
               <div class="navbody">
                  <a class="active" href="/adminhome">Adminhome</a>
                  <a href="/addtheater">Add Theater</a>
                  <a href="/theaterlist">TheaterList</a>
                   <a href="/addmovie">Add Movie</a>
                   <a href="/movielist">MovieList</a>
            </div>
            );

        }
        return(
        <Host>
            <div class="topnav">
                <div class="navtitle">
                <a href="/"><span class="fa fa-solid fa-video"></span>&nbsp;MoviesAdda</a>
               </div>
                 
                 {headContent}
                 <slot name="errorslot"></slot>
            <slot></slot>
             
            </div>
           </Host>
        );
    }
}