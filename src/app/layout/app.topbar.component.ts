import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { UserService } from '../demo/Services/user.service';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];
    user!: any
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private userService: UserService, private router: Router, private messageService: MessageService) { }
    ngOnInit(): void {
        let email = localStorage.getItem('email');
        if (email !== null) {
            // Call the function with the non-null value
            this.userService.getUserByEmail(email).subscribe(

                //     (data) => {
                //     this.user = data.user?.firstName;
                //   }
                (response: any) => {
                    this.user = response


                },
                (error: any) => {
                    if (error.error.msg == 'Token has expired') {
                        this.router.navigate(['/auth/login']);
                    }
                }
            );
        }
        this.validate()
    }

    validate() {
        if (this.user.email) {

        } else {
            this.router.navigate(['/auth/login']);
        }
    }
}
