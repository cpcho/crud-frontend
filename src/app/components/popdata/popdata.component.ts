import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PopDataService } from './popdata.service';
import { PopData } from './popdata';

@Component({
   selector: 'app-pop',
   templateUrl: './popdata.component.html',
   styleUrls: ['./popdata.component.css']
})
export class PopDataComponent implements OnInit { 
   //Component properties
   allPopData: PopData[];
   statusCode: number;
   requestProcessing = false;
   popDataIdToUpdate = null;
   processValidation = false;

    //Pagination properties
    key: string = 'pop'; //set default
    reverse: boolean = false;
    sort(key){
        this.key = key;
        this.reverse = !this.reverse;
    }
    //initializing p to one
    p: number = 1;

    search = '';

   //Create form
   popDataForm = new FormGroup({
       name: new FormControl('', Validators.required),
       pop: new FormControl('', Validators.required),
       lat: new FormControl('', Validators.required),
       lon: new FormControl('', Validators.required),
   });
   //Create constructor to get service instance
   constructor(private popDataService: PopDataService) {
   }

   //Create ngOnInit() and and load population data
   ngOnInit(): void {
	   this.getAllPopData();
   }   

   //Fetch all population data
   getAllPopData() {
        this.popDataService.getAllPopData()
	      .subscribe(
                data => this.allPopData = data,
                errorCode =>  this.statusCode = errorCode);   
   }

   //Handle create and update article
   onPopDataFormSubmit() {
	  this.processValidation = true;   
	  if (this.popDataForm.invalid) {
	      return; //Invalid.
	  }   
	  //Form is valid, now perform create or update
    this.preProcessConfigurations();
    let name = this.popDataForm.get('name').value.trim();
	let pop = this.popDataForm.get('pop').value.trim();
    let lat = this.popDataForm.get('lat').value.trim();	  
    let lon = this.popDataForm.get('lon').value.trim();
	  if (this.popDataIdToUpdate === null) {  
	    //Handle create population data
	    let article= new PopData(null, name, pop, lat, lon);	  
	    this.popDataService.createPopData(article)
	      .subscribe(successCode => {
		              this.statusCode = successCode;
			      this.getAllPopData();	
			      this.backToCreatePopData();
			},
		        errorCode => this.statusCode = errorCode);
	  } else {  
   	    //Handle update article
	    let article= new PopData(this.popDataIdToUpdate, name, pop, lat, lon);	  
	    this.popDataService.updatePopData(article)
	      .subscribe(successCode => {
		        this.statusCode = successCode;
			      this.getAllPopData();	
			      this.backToCreatePopData();
			},
		        errorCode => this.statusCode = errorCode);	  
	  }
   }

   //Load article by id to edit
   loadPopDataToEdit(id: string) {
      this.preProcessConfigurations();
      this.popDataService.getPopDataById(id)
	      .subscribe(popData => {
		            this.popDataIdToUpdate = popData.id;   
		            this.popDataForm.setValue({ name: popData.name, pop: popData.pop, lat: popData.lat, lon: popData.lon });
			    this.processValidation = true;
			    this.requestProcessing = false;   
		    },
		    errorCode =>  this.statusCode = errorCode);   
   }

   //Delete population data
   deletePopData(id: string) {
      this.preProcessConfigurations();
      this.popDataService.deletePopDataById(id)
	      .subscribe(successCode => {
		      this.statusCode = successCode;
		      this.getAllPopData();	
		      this.backToCreatePopData();
		   },
		   errorCode => this.statusCode = errorCode);    
   }

   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
      this.requestProcessing = true;   
   }

   //Go back from update to create
   backToCreatePopData() {
      this.popDataIdToUpdate = null;
      this.popDataForm.reset();	  
      this.processValidation = false;
   }


} 