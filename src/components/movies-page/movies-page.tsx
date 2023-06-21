import { Component, Host, Listen, State, h } from '@stencil/core';


@Component({
  tag: 'movies-page',
  styleUrl: 'movies-page.css',
  shadow: true,
})
export class MoviesPage {
 @State() moviePopUpActive=false;

 @Listen('eventCheck',{target:"body"})
 onCloseClicked(event:CustomEvent){
    if(event.detail){
      this.moviePopUpActive=false;
    }
 }



moviePopUp(){
   this.moviePopUpActive=true;
  }



  render() {
    
    let movieContent =[
      <div class="container series">
          <h3>Latest Movies</h3>
          <div class="row">
            <div class="column">
              <div class="row">
                <div class="column">
                  <a href='/movies'><img src="../../assets/images/commando2.jpeg" alt="movie"></img></a>
                  <div class="box-content">
									<h3 class="title">Commando 3</h3> <button onClick={this.moviePopUp.bind(this)}>Book</button>
								  </div>
                </div>
                <div class="column">
                <a href='/movies'><img src="../../assets/images/m3.jpg" alt="movie"></img></a>
                <div class="box-content">
									<h3 class="title">Knives Out</h3> <button onClick={this.moviePopUp.bind(this)}>Book</button>
								  </div>
                </div>
                <div class="column">
                 <a href='/movies'><img src="../../assets/images/bharat1.png" alt="movie"></img></a>
                <div class="box-content">
									<h3 class="title">Bharat</h3> <button onClick={this.moviePopUp.bind(this)}>Book</button>
								  </div>
                </div>
                <div class="column">
                <a href="/movies"><img src="../../assets/images/m5.jpg" alt="movie"></img></a>
                 <div class="box-content">
									<h3 class="title">Jumanji</h3>  <button onClick={this.moviePopUp.bind(this)}>Book</button>
								  </div>
                  </div>
                  <div class="column">
                  <a href="/movies"><img src="../../assets/images/m1.jpg" alt="movie"></img></a>
                  <div class="box-content">
									<h3 class="title">Rocket Man</h3> <button onClick={this.moviePopUp.bind(this)}>Book</button>
								  </div>
                  </div>
                  <div class="column">
                  <a href="/movies"><img src="../../assets/images/m2.jpg" alt="movie"></img></a>
                  <div class="box-content">
									<h3 class="title">Doctor Sleep</h3> <button onClick={this.moviePopUp.bind(this)}>Book</button>
								  </div>
                  </div>
                  <div class="column">
                  <a href="/movies"><img src="../../assets/images/ks1.png" alt="movie"></img></a>
                  <div class="box-content">
									<h3 class="title">Kabir Singh</h3> <button onClick={this.moviePopUp.bind(this)}>Book</button>
								  </div>
                  </div>
                  <div class="column">
                  <a href="/movies"><img src="../../assets/images/m9.jpg" alt="movie"></img></a>
                  <div class="box-content">
									<h3 class="title">Joker</h3> <button onClick={this.moviePopUp.bind(this)}>Book</button>
								  </div>
                  </div>
                  <div class="column">
                  <a href="/movies"><img src="../../assets/images/tzp.png" alt="movie"></img></a>
                  <div class="box-content">
									<h3 class="title">Taare Zameen Par</h3> <button onClick={this.moviePopUp.bind(this)}>Book</button>
								  </div>
                  </div>
                  <div class="column">
                  <a href="/movies"><img src="../../assets/images/cp.png" alt="movie"></img></a>
                  <div class="box-content">
									<h3 class="title">Chillar Party</h3> <button onClick={this.moviePopUp.bind(this)}>Book</button>
								  </div>
                  </div>
                </div>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-1"></div>
          </div>
          <br></br><br></br><br></br>
        </div>

    ];
    if(this.moviePopUpActive){
        movieContent=[<movie-popup></movie-popup>];
     }

     return (
      <Host>
        {movieContent}
      </Host>
    );
  }

}
