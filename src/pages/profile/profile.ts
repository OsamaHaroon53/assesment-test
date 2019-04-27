import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  pokemon;
  images = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpProvider) {
    this.getPokemon(this.navParams.data.url);
  }

  getPokemon(url) {
    this.http.get(url)
      .then(res => {
        console.log(res);
        this.pokemon = res;
        let sprites = this.pokemon.sprites;
        for (let key in sprites) {
          if (sprites.hasOwnProperty(key) && sprites[key]) {
            this.images.push(sprites[key]);
            //do something with value;
          }
        }
        console.log(this.images)
      })
      .catch(err => {
        console.log(err);
      })
  }

}
