import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent  implements OnInit {

  constructor() { }
  getBackgroundImage(percentage: number): string {
    const darkGreen = '#005B2F';
    const white = '#ffffff'; 
  
    const darkGreenPercentage = percentage;
    const blackPercentage = 100 - percentage;
  
    return `linear-gradient(90deg, ${darkGreen} ${darkGreenPercentage}%, ${white} ${blackPercentage}%)`;
  }
  ngOnInit() {}

}
