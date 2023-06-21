import { Component,h } from "@stencil/core";

@Component({
    tag:'ma-footer',
    styleUrl:'./footer.css',
    assetsDirs: ['assets'],
    shadow:true
})

export class Footer{
 render(){
    return[

             <div class="footpart">
              <div class="row">
                <div class="column">
                    <img src="../../assets/images/banner1.jpg"></img>
                    <img src="../../assets/images/banner2.jpg"></img>
                    <img src="../../assets/images/banner3.jpg"></img>
                    <img src="../../assets/images/banner4.jpg"></img>
                </div>
               
                </div>
                <div class="row">
               
									<ul>
										<li><a href="/movies">Movies</a></li>
										<li><a href="/movies">Videos</a></li>
										<li><a href="/movies">English Movies</a></li>
										<li><a href="/movies">Tailor</a></li>
										<li><a href="/movies">Upcoming Movies</a></li>
										<li><a href="/contact">Contact Us</a></li>
									</ul>
            </div>  
             </div>,
            <div class="below-section">
                <div class="copycontext">
                    <p>&copy; 2023 MoviesAdda. All rights reserved</p>
               </div>

                <ul class="social-text">
                    <li><a href="http://www.facebook.com"><span class="fab fa-facebook" aria-hidden="true"></span></a>
                    </li>
                    <li><a href="http://www.linkedin.com"><span class="fab fa-linkedin" aria-hidden="true"></span></a>
                    </li>
                    <li><a href="http://www.twitter.com"><span class="fab fa-twitter" aria-hidden="true"></span></a>
                    </li>
                    <li><a href="http://www.google.com"><span class="fab fa-google-plus" aria-hidden="true"></span></a>
                    </li>

                </ul>
                <h4>Join Our Community</h4>
            </div>

    ];
 }
}