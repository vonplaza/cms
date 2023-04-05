import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


export interface subjects{
  firstSem :subject[];
  secondSem: subject[];
}
export interface subject {
      courseCode:string;
      descriptiveTitle:string;
      lecUnits:string;
      labUnits:string;
      totalUnits:string;
      hoursPerWeek:string;
      preReq:string;
      coReq:string;
      semester:string;
      yearLevel:string;
}



export interface comments{
      username:string;
      header:string;
      feedback:string;
}

@Component({
  selector: 'app-view-curriculum',
  templateUrl: './view-curriculum.component.html',
  styleUrls: ['./view-curriculum.component.css']
})

export class ViewCurriculumComponent {


  @ViewChild("firstSemesterForm", {static: false})"firstSemesterForm": NgForm;
  expansionTitle='';
  panelOpenState = false;
  del = 'Delete';
  view = 'View Syllabus';
  edit='Edit';
  includeSubjectText='Add Subject';
  cancelAddSubject='Cancel';
  uploadSyllabus='Upload Syllabus';
  editForm: any;

  changeYearlvl(index: number){

    if(index==0){
      this.expansionTitle='First Year';
    }
    if(index==1){
      this.expansionTitle='Second Year';
    }
  }
  comment: comments[]=[
    {'username':'Mang ben', 
    'header':'IT 309',
    'feedback':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {'username':'Ryan Nolasco', 
    'header':'IT 308',
    'feedback':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {'username':'Kyla Delfin', 
    'header':'IT 307',
    'feedback':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },

  ]

    subject :subjects[] = [
    {
    firstSem:[
      {
        courseCode: 'CSC101 1st year 1st Sem',
        descriptiveTitle: 'Introduction to Computer Science',
        lecUnits: '3',
        labUnits: '1',
        totalUnits: '4',
        hoursPerWeek: '4',
        preReq: '',
        coReq: '',
        semester: '1',
        yearLevel: '1'
    },
    {
      courseCode: 'ENG101 1st year 1st Sem',
        descriptiveTitle: 'English Composition',
        lecUnits: '3',
        labUnits: '0',
        totalUnits: '3',
        hoursPerWeek: '3',
        preReq: '',
        coReq: '',
        semester: '1',
        yearLevel: '1'
    },
  ],
    secondSem:[
      {
        courseCode: 'CSC102 1st Year 2nd Sem',
        descriptiveTitle: 'Data Structures and Algorithms',
        lecUnits: '3',
        labUnits: '1',
        totalUnits: '4',
        hoursPerWeek: '4',
        preReq: 'CSC101',
        coReq: '',
        semester: '2',
        yearLevel: '1'
      },
      {
        courseCode: 'ENG102 1st year 2nd Sem',
        descriptiveTitle: 'English Literature',
        lecUnits: '3',
        labUnits: '0',
        totalUnits: '3',
        hoursPerWeek: '3',
        preReq: '',
        coReq: '',
        semester: '2',
        yearLevel: '1'
      }
    ],
    },


    {
      firstSem:[
        {
          courseCode: 'MAT102 1st Year 2nd Sem',
          descriptiveTitle: 'Plane Trigonometry',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'MAT101',
          coReq: '',
          semester: '1',
          yearLevel: '2'
        },
      ],
      secondSem:[
        {
          courseCode: 'MAT101',
        descriptiveTitle: 'College Algebra 2nd Year',
        lecUnits: '3',
        labUnits: '0',
        totalUnits: '3',
        hoursPerWeek: '3',
        preReq: '',
        coReq: '',
        semester: '2',
        yearLevel: '2'
        },
      ]
    },

    {
      firstSem: [
        {
          courseCode: 'MATH101 3rd year 1st Sem',
          descriptiveTitle: 'Calculus 1',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: '',
          coReq: '',
          semester: '1',
          yearLevel: '3'
        },
        {
          courseCode: 'PHY101 3rd year 1st Sem',
          descriptiveTitle: 'Introduction to Physics',
          lecUnits: '3',
          labUnits: '2',
          totalUnits: '5',
          hoursPerWeek: '5',
          preReq: '',
          coReq: '',
          semester: '1',
          yearLevel: '3'
        },
        {
          courseCode: 'CS101 3rd year 1st Sem',
          descriptiveTitle: 'Programming Fundamentals',
          lecUnits: '3',
          labUnits: '1',
          totalUnits: '4',
          hoursPerWeek: '4',
          preReq: '',
          coReq: '',
          semester: '1',
          yearLevel: '3'
        }
      ],
      secondSem: [
        {
          courseCode: 'MATH102 3rd Year 2nd Sem',
          descriptiveTitle: 'Calculus 2',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'MATH101',
          coReq: '',
          semester: '2',
          yearLevel: '3'
        },
        {
          courseCode: 'PHY102 3rd year 2nd Sem',
          descriptiveTitle: 'Electricity and Magnetism',
          lecUnits: '3',
          labUnits: '2',
          totalUnits: '5',
          hoursPerWeek: '5',
          preReq: 'PHY101',
          coReq: '',
          semester: '2',
          yearLevel: '3'
        },
        {
          courseCode: 'CS102 3rd year 2nd Sem',
          descriptiveTitle: 'Object Oriented Programming',
          lecUnits: '3',
          labUnits: '1',
          totalUnits: '4',
          hoursPerWeek: '4',
          preReq: 'CS101',
          coReq: '',
          semester: '2',
          yearLevel: '3'
        }
      ],
    },


    {
      firstSem:[
        {
          courseCode: 'PHY101 4th year 1st Sem',
          descriptiveTitle: 'Introduction to Physics',
          lecUnits: '3',
          labUnits: '1',
          totalUnits: '4',
          hoursPerWeek: '4',
          preReq: '',
          coReq: '',
          semester: '1',
          yearLevel: '4'
        },
        {
          courseCode: 'BIO101 4th year 1st Sem',
          descriptiveTitle: 'Introduction to Biology',
          lecUnits: '3',
          labUnits: '1',
          totalUnits: '4',
          hoursPerWeek: '4',
          preReq: '',
          coReq: '',
          semester: '1',
          yearLevel: '4'
        }
      ],
      secondSem:[
        {
          courseCode: 'CHEM102 4th Year 2nd Sem',
          descriptiveTitle: 'Organic Chemistry',
          lecUnits: '3',
          labUnits: '1',
          totalUnits: '4',
          hoursPerWeek: '4',
          preReq: 'CHEM101',
          coReq: '',
          semester: '2',
          yearLevel: '4'
        },
        {
          courseCode: 'MATH102 4th year 2nd Sem',
          descriptiveTitle: 'Calculus I',
          lecUnits: '3',
          labUnits: '0',
          totalUnits: '3',
          hoursPerWeek: '3',
          preReq: 'MATH101',
          coReq: '',
          semester: '2',
          yearLevel: '4'
        }
      ],
    },



];


selectedCourse: any;
forUpdate: any;
selectCourse(course: any) {
  this.selectedCourse = course;
}

editCourse() {

  this.forUpdate = this.subject.map;
  const index = this.forUpdate.secondSem.findIndex((course: { courseCode: any; }) => course.courseCode === this.selectedCourse.courseCode);

  this.forUpdate.secondSem[index] = this.selectedCourse;

  this.selectedCourse = null;
  this.editForm.reset();
}



deleteCourse(event: MouseEvent,courseCode: string){
  event.stopPropagation();
  this.subject = this.subject.map(subject => {
    return {
      firstSem: subject.firstSem.filter(course => course.courseCode !== courseCode),
      secondSem: subject.secondSem.filter(course => course.courseCode !== courseCode)
    };
  });
}


  //add comment
  addComment(form: NgForm): void{
    const newComment = {
      username: form.value.username,
      header: form.value.header,
      feedback: form.value.feedback,
    };
    if(newComment.username && newComment.header && newComment.feedback){
        this.comment.push(newComment);
        form.reset();
       }
  }
  


}
