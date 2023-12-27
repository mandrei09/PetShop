import { doc, getDoc } from "firebase/firestore";
import { Cat } from "./Cat";
import { User } from "./User";
import { ConfigAPI } from "./ConfigAPI";

export class Problem {
    id: string;
    user: User | null;
    cat: Cat | null;
    selectedProblem: string;
    selectedDate: Date;
    otherDetails: string;

    constructor(
        id: string,
        user: User | null,
        cat: Cat | null,
        selectedProblem: string,
        selectedDate: Date,
        otherDetails: string
    ) {
        this.id = id;
        this.user = user;
        this.cat = cat;
        this.selectedProblem = selectedProblem;
        this.selectedDate = selectedDate;
        this.otherDetails = otherDetails;
    }

    static toFirebase(problem: Problem): any {
        return {
          user: User.toFirebasePath(problem.user!.id),
          cat: Cat.toFirebasePath(problem.cat!.id),
          selectedProblem : problem.selectedProblem,
          selectedDate : problem.selectedDate,
          otherDetails : problem.otherDetails
        };
      }
    
      static toFirebasePath(problemId: string){
        const collectionName = 'Forms/'
        return collectionName + problemId
      }
    
      static async fromFirebase(data: any): Promise<Problem> {
        return new Problem(
          data.id,
          await User.fromFireBasePath(data.user),
          await Cat.fromFireBasePath(data.cat),
          data.selectedProblem,
          data.selectedDate.toDate(),
          data.otherDetails
        );
      }
    
      static async fromFireBasePath(path: string): Promise<Problem | null> {
        try {
          const problemDocRef = doc(ConfigAPI.db, path);
          const docSnapshot = await getDoc(problemDocRef);
      
          if (docSnapshot.exists()) {
            const problemData = docSnapshot.data();
            const newProblem = Problem.fromFirebase({
              id: docSnapshot.id,
              ...problemData,
            });
            return newProblem;
          } else {
            console.error('Problem document does not exist');
            return null;
          }
        } catch (error) {
          console.error('Error getting Problem: ', error);
          return null;
        }
      }
}
