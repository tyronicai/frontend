import { Component, OnInit } from '@angular/core';
import { DemandService } from '@app/services/demand/demand.service';
import { Transportation } from '@app/models/TransportationModels/Transportation.model';
import { EstateService } from '@app/services/estate/estate.service';
import { UserService } from '@app/services/user/user.service';
import { Account } from '@app/models/AccountModels/Account.model';
import { AcceptOfferReqMdl } from '@app/models/RequestModels/AcceptOfferReqMdl.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from '@app/services/account/account.service';

@Component({
	selector: 'app-demands',
	templateUrl: './demands.component.html',
	styleUrls: ['./demands.component.scss'],
})
export class DemandsComponent implements OnInit {
	transportations: Transportation[];
	oldTransportations: Transportation[];
	user: Account;
	panelOpenState = false;
	pageIndex: number;
	links = [
		{ name: 'Demands', color: 'primary' },
		{ name: 'Old Demands', color: 'secondary' },
	];
	constructor(
		private demandService: DemandService,
		private estateService: EstateService,
		private accountService: AccountService,
		private userService: UserService,
		private toastr: ToastrService,
		private spinner: NgxSpinnerService
	) {
		this.pageIndex = 0;
		this.userService.getCurrentUser().subscribe((res: Account) => {
			// console.log(res);

			this.user = res;
			this.demandService
				.GetTransportationsOfDemandsByAccountId()
				.then(
					(res: Transportation[]) => {
						// console.log(res);
						this.transportations = res;
					},
					(err: any) => {
						// console.log(err);
					}
				)
				.catch((ex: any) => {
					// console.log(ex);
				});
			this.demandService
				.GetTransportationsOfDemandsByAccountId()
				.then(
					(res: Transportation[]) => {
						// console.log(res);
						this.oldTransportations = res;
					},
					(err: any) => {
						//console.log(err);
					}
				)
				.catch((ex: any) => {
					// console.log(ex);
				});
		});
	}

	ngOnInit() {}

	acceptOffer(item?: any) {
		if (undefined === item) {
			return this.showMessage('warning', 'Teklif red edildi.', '');
		}

		this.spinner.show();

		const acceptOfferReqMdl = new AcceptOfferReqMdl();
		acceptOfferReqMdl.CompanyDemandServiceId = item.id;
		acceptOfferReqMdl.DemandId = item.demandId;
		this.demandService
			.AcceptOffer(acceptOfferReqMdl)
			.then((res) => {
				this.spinner.hide();
				this.showMessage('success', 'Teklif kabul edildi.', 'Şirket sizinle iletişime geçecek.');
			})
			.catch((err) => {
				this.spinner.hide();
				// console.log(err);
			});
	}

	showMessage(status: string, message: string, title: string) {
		if (status === 'success') {
			this.toastr.success(title, message, {
				progressBar: true,
			});
			setTimeout(() => {
				window.location.reload();
			}, 3000);
		} else if (status === 'warning') {
			this.toastr.warning(title, message, {
				progressBar: true,
			});
		} else if (status === 'info') {
			this.toastr.info(title, message, {
				progressBar: true,
			});
		} else {
			this.toastr.error(title, message, {
				progressBar: true,
			});
		}
	}

	selectDemandType(item: any) {
		if (item === 0) {
			if (this.links[0].color === 'secondary') {
				this.links[0].color = 'primary';
				this.links[1].color = 'secondary';
				this.pageIndex = 0;
			} else {
				this.links[0].color = 'primary';
				this.links[1].color = 'secondary';
			}
		}
		if (item === 1) {
			if (this.links[1].color === 'secondary') {
				this.links[1].color = 'primary';
				this.links[0].color = 'secondary';
				this.pageIndex = 1;
			} else {
				this.links[1].color = 'primary';
				this.links[0].color = 'secondary';
			}
		}
	}
}
