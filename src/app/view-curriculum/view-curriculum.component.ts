import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface firstSemContent {
      courseCode:string;
      descriptiveTitle:string;
      lecUnits:string;
      labUnits:string;
      totalUnits:string;
      hoursPerWeek:string;
      preReq:string;
      coReq:string;
      semester:string;
      year:string;
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

  panelOpenState = false;
  del = 'Delete';
  view = 'View Syllabus';
  edit='Edit';
  includeSubjectText='Add Subject';
  cancelAddSubject='Cancel';
  uploadSyllabus='Upload Syllabus';

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

  firstSem: firstSemContent[] = [ //actually dapat subject nalang yung name nung object array na to hahahaha
      {'courseCode':'IT-310',
      'descriptiveTitle':'2nd 2nd',
      'lecUnits':'1.0',
      'labUnits':'1.0',
      'totalUnits':'2.0',
      'hoursPerWeek':'2',
      'preReq':'IT 309',
      'coReq':'IT 308',
    'semester':'1st',
  'year':'1st'},
      {'courseCode':'IT-309',
      'descriptiveTitle':'Subject Name',
      'lecUnits':'1.0',
      'labUnits':'1.0',
      'totalUnits':'2.0',
      'hoursPerWeek':'2',
      'preReq':'IT 309',
      'coReq':'IT 308',
      'semester':'2nd',
    'year':'1st'},
      {'courseCode':'IT-309',
      'descriptiveTitle':'Subject Name',
      'lecUnits':'1.0',
      'labUnits':'1.0',
      'totalUnits':'2.0',
      'hoursPerWeek':'2',
      'preReq':'IT 309',
      'coReq':'IT 308',
      'semester':'1st',
    'year':'3rd'},
    {'courseCode':'IT-311',
      'descriptiveTitle':'Subject Name',
      'lecUnits':'1.0',
      'labUnits':'1.0',
      'totalUnits':'2.0',
      'hoursPerWeek':'2',
      'preReq':'IT 309',
      'coReq':'IT 308',
      'semester':'2nd',
    'year':'3rd'},
  ]

  
  selectedSubject: any; //para sa referencing ng pagaupdate nung subject
  addForm= false;


  isEditing(subjects:any): void{ //para sa referencing ng pagaupdate nung subject
    this.selectedSubject = Object.assign({}, subjects);
  }
  
  add(){
    this.addForm = true;
  }

  updateSubject(){ //pagaupdate ng subject
    const index = this.firstSem.findIndex(subject => subject.courseCode === this.selectedSubject.courseCode);
    this.firstSem[index] = Object.assign({}, this.selectedSubject);
    console.log(this.firstSem);
    this.selectedSubject = null;
  }

  cancel() { //cancel button lang
    this.selectedSubject = null;
    
  }
  canceladd(){ //cancel din
    this.addForm=false;
  }

  deleteSubject(index: number){ //subject deletion
    this.firstSem.splice(index, 1);
  }
  
  OnSubmit(): void{ 
    
  }

  addSubject(form: NgForm): void{ //pag-aadd ng subject
    const newItem = {
      courseCode: form.value.courseCode,
      descriptiveTitle: form.value.descriptiveTitle,
      lecUnits: form.value.lecUnits,
      labUnits: form.value.labUnits,
      totalUnits: form.value.totalUnits,
      hoursPerWeek: form.value.hoursPerWeek,
      preReq: form.value.preReq,
      coReq: form.value.coReq,
      semester:form.value.semester,
      year:form.value.year,
    };
    if(newItem.coReq && newItem.courseCode && newItem.descriptiveTitle && newItem.hoursPerWeek && newItem.labUnits && newItem.lecUnits && newItem.preReq && newItem.totalUnits 
     && newItem.semester && newItem.year
      ){
    this.firstSem.push(newItem);
    console.log(this.firstSem);
    form.reset();
    }
  }

  clearValues(): void{ //form reset
    this.firstSemesterForm.reset();
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

  showTable = true; //para lang sa pag refresh ng filter pipe at table

  refreshTable() {
    // para lang sa pag refresh ng filter pipe at table
    this.showTable = false;
    setTimeout(() => {
      this.showTable = true;
    });
  }
  

}
