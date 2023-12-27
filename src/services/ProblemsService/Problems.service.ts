import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { ConfigAPI } from 'src/model/ConfigAPI';
import { Problem } from 'src/model/Problem';

@Injectable({
  providedIn: 'root'
})
export class ProblemsService {

constructor() { }
  private collectionName = 'Forms'

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

  public async firebaseGetAllForms(): Promise<Problem[]> {
    try {
      const problemsCollectionRef = collection(ConfigAPI.db, this.collectionName);
      const querySnapshot = await getDocs(problemsCollectionRef);
  
      const problems: Problem[] = [];
      for (const doc of querySnapshot.docs) {
        const problemData = doc.data();
        const problem = await Problem.fromFirebase({
          id: doc.id,
          ...problemData,
        });
        if (problem !== null) {
          problems.push(problem);
        }
      }
      return problems;
    } catch (error) {
      console.error('Error getting problems: ', error);
      return [];
    }
  }

  public async addProblemToFirebase(problem: Problem): Promise<string | null> {
    try {
      const problemData = Problem.toFirebase(problem);
      const problemsCollectionRef = collection(ConfigAPI.db, this.collectionName);
      const newProblemRef = await addDoc(problemsCollectionRef, problemData);
      return newProblemRef.id;
    } catch (error) {
      console.error('Error adding problem: ', error);
      return null;
    }
  }

  public async deleteFormFromFirebase(problemId: string): Promise<void> {
    try {
      const problemDocRef = doc(ConfigAPI.db, this.collectionName, problemId);
      await deleteDoc(problemDocRef);
      console.log('Problem deleted successfully!');
    } 
    catch (error) {
      console.error('Error deleting Problem:', error);
    }
  }
}


