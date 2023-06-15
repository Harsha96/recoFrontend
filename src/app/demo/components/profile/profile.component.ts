import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    loading = false
    user: any
    constructor(private userService: UserService) { }
    ngOnInit() {
        this.getUserData()

    }
    getUserData() {
        this.loading = true
        let email = localStorage.getItem('email');
        if (email) {
            // Call the function with the non-null value
            this.userService.getUserByEmail(email).subscribe(async (data) => {
                this.user = data.user;
                console.log(this.user.alResults);

            });
        }
    }
}