import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ApiService } from '../../services/api.service';

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(private serviceApi: ApiService) { }
  options: any;
  valueSelected: any;
  @Input() visible;
  @Output() valueOption = new EventEmitter()
  onClick(option) {
    let oldOption = this.serviceApi.valueSelected.option;
    this.serviceApi.setOption(option)
    this.serviceApi.setCategory('popular')
    this.valueSelected = this.serviceApi.valueSelected.option
    this.valueOption.emit(oldOption)
  }
  ngOnInit(): void {

    this.options = this.serviceApi.options
    this.valueSelected = this.serviceApi.valueSelected.option
  }
}
