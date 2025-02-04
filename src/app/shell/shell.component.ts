import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';
import { untilDestroyed } from '@app/core';
import { UserService } from '@app/services/user/user.service';

@Component({
	selector: 'app-shell',
	templateUrl: 'shell.component.html',
	styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, OnDestroy {
	@ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
	userLoggedIn: boolean;

	constructor(private media: MediaObserver, public userService: UserService) {}

	ngOnInit() {
		// Automatically close side menu on screens > sm breakpoint

		this.media
			.asObservable()
			.pipe(
				filter((changes: MediaChange[]) =>
					changes.some((change) => change.mqAlias !== 'xs' && change.mqAlias !== 'sm')
				),
				untilDestroyed(this)
			)
			.subscribe(() => this.sidenav.close());
	}

	ngOnDestroy() {
		// Needed for automatic unsubscribe with untilDestroyed
	}
}
