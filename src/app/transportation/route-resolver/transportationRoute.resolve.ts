import { Injectable } from '@angular/core';
import { EstateService } from '@app/services/estate/estate.service';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class TransportationRouteResolver implements Resolve<any> {
	constructor(public estateService: EstateService) {}

	resolve() {
		return this.estateService.getEstateMetaData();
	}
}

// If error occurs, this resolve error method won't redirect user to component

// resolve() {
//    return this.usersListService.getUsers().pipe(
//       catchError((error) => {
//          return empty();
//       })
//    )
// }
