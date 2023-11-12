import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProblemsService {

constructor() { }
  private problems : string[] = 
    ['Routine Check-ups',
    'Vaccinations',
    'Illness or Injury',
    'Parasite Control',
    'Dental Care',
    'Behavioral Concerns',
    'Weight Management',
    'Other Reason']
  public getProblems(){
    return this.problems;
  }
}
