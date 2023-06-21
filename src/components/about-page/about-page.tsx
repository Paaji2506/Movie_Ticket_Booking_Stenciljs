import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'about-page',
  styleUrl: 'about-page.css',
  shadow: true,
})
export class AboutPage {

  render() {
    return (
      <Host>
         <h2>------------------------------------------------------------------------------About Page------------------------------------------------------------------------------------</h2>
           
           <div>
              <h1>MoviesAdda Entertainment</h1>
              <p class="mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam id quisquam ipsam
						molestiae ad eius accusantium? Nulla dolorem perferendis inventore! posuere cubilia Curae;
						Nunc non risus in justo convallis feugiat.</p>
					<div class="ready-more mt-4">
						<a href="#" class="btn read-button">Read More <span class="fa fa-angle-double-right ml-2"
								aria-hidden="true"></span></a>
					</div>

          <div class="w3l-counter-stats-info text-center">
				<div class="stats_left">
					<div class="counter_grid">
						<div class="icon_info">
							<p id="noofmovies"></p>
							<h4>Movies</h4>

						</div>
					</div>
				</div>
				<div class="stats_left">
					<div class="counter_grid">
						<div class="icon_info">
							<p id="nooftheaters"></p>
							<h4>Theaters</h4>

						</div>
					</div>
				</div>
				<div class="stats_left">
					<div class="counter_grid">
						<div class="icon_info">
							<p id="counter">10</p>
							<h4>Staff Members</h4>

						</div>
					</div>
				</div>
				<div class="stats_left">
					<div class="counter_grid">
						<div class="icon_info">
							<p id="noofusers"></p>
							<h4>No. of Users</h4>

						</div>
					</div>
				</div>
			</div>


           </div>
         
      </Host>
    );
  }

}
