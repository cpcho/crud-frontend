import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { PopData } from './popdata';

@Injectable()
export class PopDataService {
    //URLs for CRUD operations
    allPopDataUrl = "https://sb13-gse00014870.uscom-east-1.oraclecloud.com/api/all";
    popDataUrl = "https://sb13-gse00014870.uscom-east-1.oraclecloud.com/api/pop-data";

    //Create constructor to get Http instance
    constructor(private http:Http) {}
    //Fetch all population data
    getAllPopData(): Observable<PopData[]> {
        return this.http.get(this.allPopDataUrl)
	       .map(this.extractData)
	       .catch(this.handleError);

    }
    //Create population data
    createPopData(popData: PopData):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.popDataUrl, popData, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Fetch article by id
    getPopDataById(id: string): Observable<PopData> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
	let cpParams = new URLSearchParams();
	cpParams.set('id', id);			
	let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
	return this.http.get(this.popDataUrl, options)
		.map(this.extractData)
		.catch(this.handleError);
    }	
    //Update population data
    updatePopData(popData: PopData):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.popDataUrl, popData, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete population data	
    deletePopDataById(id: string): Observable<number> {
	let pdHeaders = new Headers({ 'Content-Type': 'application/json' });
	let pdParams = new URLSearchParams();
	pdParams.set('id', id);			
	let options = new RequestOptions({ headers: pdHeaders, params: pdParams });
	return this.http.delete(this.popDataUrl, options)
	       .map(success => success.status)
	       .catch(this.handleError);
    }		
    private extractData(res: Response) {
	let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.status);
    }
} 