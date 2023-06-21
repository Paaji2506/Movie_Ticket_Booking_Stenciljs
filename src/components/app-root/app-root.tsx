import { Component, Host, h } from '@stencil/core';
import { createRouter, Route } from 'stencil-router-v2';

const Router =createRouter();

@Component({
  tag: 'app-root',

})
export class AppRoot {

  render() {
    return (
      <Host>
       <Router.Switch>
        <Route path="/">
        <ma-home></ma-home>
        </Route>
        <Route path="/signup">
        <signup-page></signup-page>
        </Route>
        <Route path="/signin">
        <signin-page></signin-page>
        </Route>
        <Route path="/about">
        <about-page></about-page>
        </Route>
        <Route path="/contact">
        <contact-page></contact-page>
        </Route>
        <Route path="/movies">
        <movies-page></movies-page>
        </Route> 
        <Route path="/moviepopup">
        <movie-popup></movie-popup>
        </Route>
        <Route path="/adminhome">
        <admin-home></admin-home>
        </Route>
        <Route path="/addtheater">
        <add-theater></add-theater>
        </Route>
        <Route path="/theaterlist">
        <theater-list></theater-list>
        </Route>
        <Route path="/addmovie">
        <add-movie></add-movie>
        </Route>
        <Route path="/movielist">
        <movie-list></movie-list>
        </Route>
        <Route path="/updatetheater">
        <update-theater></update-theater>
        </Route>
        <Route path="/updatemovie">
        <update-movie></update-movie>
        </Route>
        <Route path="/addthmovie">
        <addth-movie></addth-movie>
        </Route>
        <Route path="/bookticket">
        <book-ticket></book-ticket>
        </Route>
        <Route path="/ticketpage">
        <ticket-page></ticket-page>
        </Route>
       </Router.Switch>
      </Host>
    );
  }

}
