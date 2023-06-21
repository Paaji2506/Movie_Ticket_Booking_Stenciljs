import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ma-home',
  styleUrl: 'ma-home.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class MaHome {

  render() {
    return (
      <Host>
        
        <div class="container series">
          <h3>Popular Movies</h3>
          <div class="row">
            <div class="column">
              <div class="row">
                <div class="column">
                  <a href='/movies'><img src="../../assets/images/wednesday.jpeg" alt="movie"></img></a>
                  <div class="box-content">
									<h3 class="title">Wenesday</h3>
								  </div>
                </div>
                <div class="column">
                <a href='/movies'><img src="../../assets/images/commando2.jpeg" alt="movie"></img></a>
                <div class="box-content">
									<h3 class="title">Commando 2</h3>
								  </div>
                </div>
                <div class="column">
                 <a href='/movies'><img src="../../assets/images/gujju2.jpeg" alt="movie"></img></a>
                <div class="box-content">
									<h3 class="title">Guuju Bhai</h3>
								  </div>
                </div>
                <div class="column">
                <a href="/movies"><img src="../../assets/images/avtar-2.jpeg" alt="movie"></img></a>
                 <div class="box-content">
									<h3 class="title">Avtar 2</h3>
								  </div>
                </div>
              </div>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-1"></div>
          </div>
        </div>
         
        <br></br><br></br><br></br>

       <about-page></about-page>
        <contact-page></contact-page> 


           

      </Host>
    );
  }

}
