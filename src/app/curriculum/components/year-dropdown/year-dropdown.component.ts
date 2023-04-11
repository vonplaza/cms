import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventManager } from '@angular/platform-browser';
import { map, tap } from 'rxjs';
import { Curriculum2 } from 'src/app/core/models/curriculum';
import { AuthService } from 'src/app/core/services/auth.service';
import { SubjectService } from 'src/app/core/services/subject.service';

export interface subjects{
  firstSem :Subject[];
  secondSem: Subject[];
}

export interface Subject {
  courseCode:string;
  descriptiveTitle:string;
  lecUnits:string;
  labUnits:string;
  totalUnits:string;
  hoursPerWeek:string;
  preReq:string;
  coReq:string;
}

@Component({
  selector: 'app-year-dropdown',
  templateUrl: './year-dropdown.component.html',
  styleUrls: ['./year-dropdown.component.css']
})
export class YearDropdownComponent {
  constructor(private subjectService: SubjectService,
              private authService: AuthService
    ){}

  @Input() subject: subjects[] = []
  @Input() type: string = ''
  @Input() departmentId: number = 1
  @Input() status: string = ''
  @Input() action: string = ''
  @Input() curriculum!: Curriculum2 
  @Input() buttonTxt: string = ''
  @Input() title: string = 'Creating Curriculum'
  @Input() author: string = ''
  @Input() created_at: string = ''
  @Input() descriptiveTitle: string = ''
  @Input() role: string = ''

  @Output() submitCur = new EventEmitter()
  @Output() approveCur = new EventEmitter()
  @Output() editCur = new EventEmitter()
  @Output() reviseCur = new EventEmitter()
  
  approve(){
    this.approveCur.emit()
  }
  update(){
    this.editCur.emit()
  }
  revise(){
    this.reviseCur.emit()
  }

  version = 1
  department:number = 1
  
  isView = true

  isShown(){
    return this.type !== 'view' && 
    ((this.type == 'create' && this.action == 'curr') 
    || (this.type == 'edit' && this.action == 'curr'))
  }


  currentUser$ = this.authService.getCurrentUser()
    .pipe(
      tap(data => console.log(data.department_id))
    )

  submitCurriculum(){
    this.submitCur.emit({
      subjects: this.subject,
      version: this.version,
      departmentId: this.department
    })
  }
  
  availableSubjects: any[] = []
  availableSubjects$ = this.subjectService.subjectsComplete$
    .pipe(
      map(subjects => {
        const subs = subjects.filter(subj => subj.department_id == this.departmentId)
        this.availableSubjects = subs
        return subs
      })
    )
  
    onSubjecCodeSelected(event:any, yearLevel: number, sem: string){
      const subjCode = event.option.value
      console.log(subjCode);
      
      const isValid = this.availableSubjects.find(subj => subj.subject_code == subjCode)
      console.log(isValid);
      
      if(isValid){
        this.addForms[yearLevel][sem].descriptiveTitle = isValid.description
      }
    }
    onDescriptionSelected(event:any, yearLevel: number, sem: string){
      const description = event.option.value
      const isValid = this.availableSubjects.find(subj => subj.description == description)      
      if(isValid){
        this.addForms[yearLevel][sem].courseCode = isValid.subject_code
      }
    }

    onSubjectCodeEditSelected(event:any, yearLevel: number, sem: string){
      const subjCode = event.option.value
      
      const isValid = this.availableSubjects.find(subj => subj.subject_code == subjCode)
      console.log(isValid);
      
      if(isValid){
        this.isForms[yearLevel][sem].descriptiveTitle = isValid.description
      }
    }
    onDescEditSelected(event:any, yearLevel: number, sem: string){
      const description = event.option.value
      const isValid = this.availableSubjects.find(subj => subj.description == description)      
      if(isValid){
        this.isForms[yearLevel][sem].courseCode = isValid.subject_code
      }
    }

  addYearLevel(){
    console.log('asdasd');

    if(this.subject.length < 4){
      this.addForms.push({
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
        ,secondSem:{
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
        ,secondSem:{
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
      this.subject.push({
        firstSem: [],
        secondSem: []
      })
    }
  }

  removeYearLevel(){
    if(this.subject.length > 1){
      this.subject.pop()
      this.addForms.pop()
      this.isEditFormShow.pop()
      this.isAddFormShow.pop()
      this.isForms.pop()
    }
  }

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

  isAddFormShow:any = []
  isForms:any = []
  addForms: any = []
  isEditFormShow:any = []

  clickAddSubject(yearLevel: number, sem: string){
    // this.isAddFormShow[yearLevel][sem === "firstSem" ? 0 : 1] = true
    this.isAddFormShow[yearLevel][sem] = true
  }

  removeAddForm(yearLevel: number, sem: string){
    // this.isAddFormShow[yearLevel][sem === "firstSem" ? 0 : 1] = false
    this.isAddFormShow[yearLevel][sem] = false
  }

  ngOnInit(): void {
    this.subject.forEach(i => {
      this.isEditFormShow.push({firstSem: false, sencondSem:false})
      this.isAddFormShow.push({firstSem: false, sencondSem:false})
      // this.isAddFormShow.push({firstSem: false, sencondSem:false})
      
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
        ,secondSem:{
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

      this.addForms.push({
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
        ,secondSem:{
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
  }

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
  
  // for editing course
  selectCourse(course: any, yearLevel:number, index: number, sem:string) {
    this.selectedSubjIndex = index
    this.isForms[yearLevel][sem] = {...course}
    console.log(this.isForms);
    this.isEditFormShow[yearLevel][sem] = true
  }

  cancelEditSub(yearLevel:number, sem:string){
    this.isEditFormShow[yearLevel][sem] = false
  }

  editCourse(form: NgForm, yearLevel:number, sem:string){
    this.subject[yearLevel][sem === 'firstSem' ? 'firstSem' : 'secondSem'][this.selectedSubjIndex] = 
    {...this.subject[yearLevel][sem === 'firstSem' ? 'firstSem' : 'secondSem'][this.selectedSubjIndex], ...form.value}
    this.isEditFormShow[yearLevel][sem] = false
  }


  // adding subject
  addSubject(form: NgForm, yearLevel:number, sem:string){
    // if(!NgForm || form.value.preReq || form.value.coReq){
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
    // }
  }

  selectedSubjIndex = 0;
  
  // for deleting course
  deleteCourse(yearLevel:number, index:number, sem:string){
    if(sem === 'firstSem')
      this.subject[yearLevel]['firstSem'].splice(index, 1)
    else
      this.subject[yearLevel]['secondSem'].splice(index, 1)
  }
}