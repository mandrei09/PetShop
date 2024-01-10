import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Problem } from 'src/model/Problem';
import { User } from 'src/model/User';
import { ProblemsService } from 'src/services/ProblemsService/Problems.service';
import { UserService } from 'src/services/UserService/User.service';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent implements OnInit {

  constructor
  (
    private problemsService : ProblemsService,
    private userService : UserService,
    private router : Router,
  ) 
  { 
    this.problemsService = problemsService
    this.userService = userService
    this.router = router
  }

  async ngOnInit() {
    this.user = await this.userService.getUser()
    this.problems = await this.problemsService.firebaseGetAllForms()
  }

  public problems : Problem[] | undefined = undefined
  public user : User | null = null

  navigateToUserProfile(userId : string){
    this.router.navigate(['profile/' + userId])
  }

  navigateToCatProfile(catProfile : string){
    this.router.navigate(['catProfile/' + catProfile])
  }
}
