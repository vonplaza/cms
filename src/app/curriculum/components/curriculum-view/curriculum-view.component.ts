import { Component, OnInit } from '@angular/core';
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
      // semester:string;
      // yearLevel:string;
}


export interface comments{
      username?:string;
      header:string;
      feedback:string;
}

@Component({
  selector: 'app-curriculum-view',
  templateUrl: './curriculum-view.component.html',
  styleUrls: ['./curriculum-view.component.css']
})

export class CurriculumViewComponent implements OnInit{
  expansionTitle='';
  panelOpenState = false;
  del = 'Delete';
  view = 'View Syllabus';
  edit='Edit';
  includeSubjectText='Add Subject';
  cancelAddSubject='Cancel';
  uploadSyllabus='Upload Syllabus';
  yearLevel='';
  editForm: any;


  assignYearX(x:number){
    if(x==0){
      this.yearLevel='First';
    }
    else if(x==1){
      this.yearLevel='Second';
    }
    else if(x==2){
      this.yearLevel='Third';
    }
    else if(x==3){
      this.yearLevel='Fourth';
    }

    return this.yearLevel;
  }

  preReqs(yearLevel: number, sem:string){
    const subjects:any = []
    // return []

    if(yearLevel == 0 && sem === 'firstSem')
      return []
    
    const pre = this.subject.slice(0, yearLevel)  
    pre.forEach(year => {
      year.firstSem.forEach(subj => {
        subjects.push(subj)
      })
      year.secondSem.forEach(subj => {
        subjects.push(subj)
      })
    })

    if(sem === 'secondSem')
    this.subject[yearLevel].firstSem.forEach(
      subj => subjects.push(subj)
    )
    
    return subjects
  }

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
  isAddFormShow:any = []
  isForms:any = []
  isEditFormShow:any = []
  one = 0
  clickAddSubject(yearLevel: number, sem: string){
    this.isAddFormShow[yearLevel][sem === "firstSem" ? 0 : 1] = true
  }

  removeAddForm(yearLevel: number, sem: string){
    this.isAddFormShow[yearLevel][sem === "firstSem" ? 0 : 1] = false
  }

  ngOnInit(): void {
    this.subject.forEach(i => {
      this.isEditFormShow.push({firstSem: false, sencondSem:false})
      this.isAddFormShow.push([false, false])
      this.isForms.push({
        firstSem: {  
          courseCode: '',
          descriptiveTitle: '',
          lecUnits: '',
          labUnits: '',
          totalUnits: '',
          hoursPerWeek: '',
          preReq: '',
          coReq: '',
        }
        ,sencondSem:{
          courseCode: '',
          descriptiveTitle: '',
          lecUnits: '',
          labUnits: '',
          totalUnits: '',
          hoursPerWeek: '',
          preReq: '',
          coReq: '',
        }
      })
    })
    console.log(this.isAddFormShow);
    
    
  }
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
        coReq: '',     },
      {
        courseCode: 'ENG101 1st year 1st Sem',
        descriptiveTitle: 'English Composition',
        lecUnits: '3',
        labUnits: '0',
        totalUnits: '3',
        hoursPerWeek: '3',
        preReq: '',
        coReq: '',     },
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
        coReq: '',     },
      {
        courseCode: 'ENG102 1st year 2nd Sem',
        descriptiveTitle: 'English Literature',
        lecUnits: '3',
        labUnits: '0',
        totalUnits: '3',
        hoursPerWeek: '3',
        preReq: '',
        coReq: '',     }
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
        coReq: '',       },
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
        }
      ],
    },



];

selectedCourse:any = {
  courseCode: '',
  descriptiveTitle: '',
  lecUnits: '',
  labUnits: '',
  totalUnits: '',
  hoursPerWeek: '',
  preReq: '',
  coReq: '',
}

cancelEditSub(yearLevel:number, sem:string){
  this.isEditFormShow[yearLevel][sem] = false
}
selectCourse(course: any, yearLevel:number, index: number, sem:string) {
  this.selectedSubjIndex = index
  this.isForms[yearLevel][sem] = {...course}
  console.log(this.isForms);
  this.isEditFormShow[yearLevel][sem] = true
}


addSubject(form: NgForm, yearLevel:number, sem:string){
  if(!NgForm || form.value.preReq || form.value.coReq){
  if(sem === 'firstSem'){
    this.subject[yearLevel]['firstSem'].push(form.value)
    form.reset();
    this.removeAddForm(yearLevel, sem);
  }
  else{
    this.subject[yearLevel]['secondSem'].push(form.value)
    form.reset();
    this.removeAddForm(yearLevel, sem);
  }
  }
  
}



selectedSubjIndex = 0;
editCourse(form: NgForm, yearLevel:number, sem:string){
  this.subject[yearLevel][sem === 'firstSem' ? 'firstSem' : 'secondSem'][this.selectedSubjIndex] = 
  {...this.subject[yearLevel][sem === 'firstSem' ? 'firstSem' : 'secondSem'][this.selectedSubjIndex], ...form.value}
  this.isEditFormShow[yearLevel][sem] = false
}


deleteCourse(yearLevel:number, index:number, sem:string){
  if(sem === 'firstSem')
    this.subject[yearLevel]['firstSem'].splice(index, 1)
  else
    this.subject[yearLevel]['secondSem'].splice(index, 1)
}



  //add comment
  addComment(form: NgForm): void{
    const newComment = {
      username: form.value.username,
      header: form.value.header,
      feedback: form.value.feedback,
    };
    if(newComment.username || newComment.header && newComment.feedback){
        this.comment.push(newComment);
        form.reset();
       }
  }
  


}
