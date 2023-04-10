import { Component } from '@angular/core';
import { subjects } from '../year-dropdown/year-dropdown.component';
import { CurriculumService } from 'src/app/core/services/curriculum.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-curriculum-create-container',
  templateUrl: './curriculum-create-container.component.html',
  styleUrls: ['./curriculum-create-container.component.css']
})
export class CurriculumCreateContainerComponent {
  constructor(private curriculumService: CurriculumService,
              private authService: AuthService){}

  subjects = []
  type:string = 'create'
  subject :subjects[] = [{
    firstSem: [],
    secondSem: []
  }]
  buttonTxt = 'Create Curriculum'
  // subject :subjects[] = [
  //   {
  //   firstSem:[
  //     {
  //       courseCode: 'CSC101 1st year 1st Sem',
  //       descriptiveTitle: 'Introduction to Computer Science',
  //       lecUnits: '3',
  //       labUnits: '1',
  //       totalUnits: '4',
  //       hoursPerWeek: '4',
  //       preReq: '',
  //       coReq: '',     },
  //     {
  //       courseCode: 'ENG101 1st year 1st Sem',
  //       descriptiveTitle: 'English Composition',
  //       lecUnits: '3',
  //       labUnits: '0',
  //       totalUnits: '3',
  //       hoursPerWeek: '3',
  //       preReq: '',
  //       coReq: '',     },
  //   ],
  //   secondSem:[
  //     {
  //       courseCode: 'CSC102 1st Year 2nd Sem',
  //       descriptiveTitle: 'Data Structures and Algorithms',
  //       lecUnits: '3',
  //       labUnits: '1',
  //       totalUnits: '4',
  //       hoursPerWeek: '4',
  //       preReq: 'CSC101',
  //       coReq: '',     },
  //     {
  //       courseCode: 'ENG102 1st year 2nd Sem',
  //       descriptiveTitle: 'English Literature',
  //       lecUnits: '3',
  //       labUnits: '0',
  //       totalUnits: '3',
  //       hoursPerWeek: '3',
  //       preReq: '',
  //       coReq: '',     }
  //   ],
  //   },
  //   {
  //     firstSem:[
  //       {
  //         courseCode: 'MAT102 1st Year 2nd Sem',
  //         descriptiveTitle: 'Plane Trigonometry',
  //         lecUnits: '3',
  //         labUnits: '0',
  //         totalUnits: '3',
  //         hoursPerWeek: '3',
  //         preReq: 'MAT101',
  //         coReq: '',
  //       },
  //     ],
  //     secondSem:[
  //       {
  //         courseCode: 'MAT101',
  //       descriptiveTitle: 'College Algebra 2nd Year',
  //       lecUnits: '3',
  //       labUnits: '0',
  //       totalUnits: '3',
  //       hoursPerWeek: '3',
  //       preReq: '',
  //       coReq: '',       },
  //     ]
  //   },

  //   {
  //     firstSem: [
  //       {
  //         courseCode: 'MATH101 3rd year 1st Sem',
  //         descriptiveTitle: 'Calculus 1',
  //         lecUnits: '3',
  //         labUnits: '0',
  //         totalUnits: '3',
  //         hoursPerWeek: '3',
  //         preReq: '',
  //         coReq: '',
  //       },
  //       {
  //         courseCode: 'PHY101 3rd year 1st Sem',
  //         descriptiveTitle: 'Introduction to Physics',
  //         lecUnits: '3',
  //         labUnits: '2',
  //         totalUnits: '5',
  //         hoursPerWeek: '5',
  //         preReq: '',
  //         coReq: '',
  //       },
  //       {
  //         courseCode: 'CS101 3rd year 1st Sem',
  //         descriptiveTitle: 'Programming Fundamentals',
  //         lecUnits: '3',
  //         labUnits: '1',
  //         totalUnits: '4',
  //         hoursPerWeek: '4',
  //         preReq: '',
  //         coReq: '',
  //       }
  //     ],
  //     secondSem: [
  //       {
  //         courseCode: 'MATH102 3rd Year 2nd Sem',
  //         descriptiveTitle: 'Calculus 2',
  //         lecUnits: '3',
  //         labUnits: '0',
  //         totalUnits: '3',
  //         hoursPerWeek: '3',
  //         preReq: 'MATH101',
  //         coReq: '',
  //       },
  //       {
  //         courseCode: 'PHY102 3rd year 2nd Sem',
  //         descriptiveTitle: 'Electricity and Magnetism',
  //         lecUnits: '3',
  //         labUnits: '2',
  //         totalUnits: '5',
  //         hoursPerWeek: '5',
  //         preReq: 'PHY101',
  //         coReq: '',
  //       },
  //       {
  //         courseCode: 'CS102 3rd year 2nd Sem',
  //         descriptiveTitle: 'Object Oriented Programming',
  //         lecUnits: '3',
  //         labUnits: '1',
  //         totalUnits: '4',
  //         hoursPerWeek: '4',
  //         preReq: 'CS101',
  //         coReq: '',
  //       }
  //     ],
  //   },


  //   // {
  //   //   firstSem:[
  //   //     {
  //   //       courseCode: 'PHY101 4th year 1st Sem',
  //   //       descriptiveTitle: 'Introduction to Physics',
  //   //       lecUnits: '3',
  //   //       labUnits: '1',
  //   //       totalUnits: '4',
  //   //       hoursPerWeek: '4',
  //   //       preReq: '',
  //   //       coReq: '',
  //   //     },
  //   //     {
  //   //       courseCode: 'BIO101 4th year 1st Sem',
  //   //       descriptiveTitle: 'Introduction to Biology',
  //   //       lecUnits: '3',
  //   //       labUnits: '1',
  //   //       totalUnits: '4',
  //   //       hoursPerWeek: '4',
  //   //       preReq: '',
  //   //       coReq: '',
  //   //     }
  //   //   ],
  //   //   secondSem:[
  //   //     {
  //   //       courseCode: 'CHEM102 4th Year 2nd Sem',
  //   //       descriptiveTitle: 'Organic Chemistry',
  //   //       lecUnits: '3',
  //   //       labUnits: '1',
  //   //       totalUnits: '4',
  //   //       hoursPerWeek: '4',
  //   //       preReq: 'CHEM101',
  //   //       coReq: '',
  //   //     },
  //   //     {
  //   //       courseCode: 'MATH102 4th year 2nd Sem',
  //   //       descriptiveTitle: 'Calculus I',
  //   //       lecUnits: '3',
  //   //       labUnits: '0',
  //   //       totalUnits: '3',
  //   //       hoursPerWeek: '3',
  //   //       preReq: 'MATH101',
  //   //       coReq: '',
  //   //     }
  //   //   ],
  //   // },
  // ];

  submit(subj: any){
    console.log(subj);
    
    this.curriculumService.createCurriculum(subj).subscribe({
      next: response => {
        console.log(response);
        
      },
      error: err => {
        console.log(err);
      }
    })
  }
}