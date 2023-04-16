import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventManager } from '@angular/platform-browser';
import { map, tap } from 'rxjs';
import { Curriculum2 } from 'src/app/core/models/curriculum';
import { Department } from 'src/app/core/models/department';
import { AuthService } from 'src/app/core/services/auth.service';
import { DepartmentService } from 'src/app/core/services/department.service';
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
              private authService: AuthService,
              private departmentService: DepartmentService
    ){}
  departments: Department[] | undefined
  departments$ = this.departmentService.departments$.subscribe({
    next: departments => {
      console.log(departments);
      
      this.departments = departments
    }
  })

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
  @Input() canEdit: boolean = false
  @Input() department:string = '1'

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
  departmentDisable(){
    return this.role != 'admin'
  }
  submitCurriculum(){ 
    this.submitCur.emit({
      subjects: this.subject,
      version: this.version,
      departmentId: this.department
    })
  }

  version = 1
  unitsOnChange(yearLvl: number, sem:string, type:string){
    // this.addForms[yearLvl][sem][type]
    if(type == 'add'){
      this.addForms[yearLvl][sem]['totalUnits'] = 
        this.addForms[yearLvl][sem]['lecUnits'] 
        + this.addForms[yearLvl][sem]['labUnits']
    }else{
      this.isForms[yearLvl][sem]['totalUnits'] = 
      this.isForms[yearLvl][sem]['lecUnits'] 
      + this.isForms[yearLvl][sem]['labUnits']
    }
    
  }
  getTotalUnits(yearLvl:number, sem:number){
    const units = this.subject[yearLvl][sem ? 'secondSem' : 'firstSem'].map(subj => Number(subj.totalUnits))
    const totalUnits = units.reduce((accumulator:number, currentValue:number) => {
      return accumulator + currentValue;
    }, 0) 
    return totalUnits
  }
  
  getTotalHrs(yearLvl:number, sem:number){
    const hrs = this.subject[yearLvl][sem ? 'secondSem' : 'firstSem'].map(subj => Number(subj.hoursPerWeek))
    const totalHrs = hrs.reduce((accumulator:number, currentValue:number) => {
      return accumulator + currentValue;
    }, 0) 
    return totalHrs
  }
  
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

  
  availableSubjects: any[] = []
  availableSubjects$ = this.subjectService.subjectsComplete$
    .pipe(
      map(subjects => {
        console.log(subjects);
        
        const subs = subjects.filter(subj => subj.department_id == this.departmentId || !subj.department_id)
        this.availableSubjects = subjects   

        return subjects
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
        firstSem: this.getSubjectDs(),
        secondSem:this.getSubjectDs()
      })
      this.isEditFormShow.push({firstSem: false, secondSem:false})
      this.isAddFormShow.push({firstSem: false, secondSem:false})
      this.isForms.push({
        firstSem: this.getSubjectDs(),
        secondSem:this.getSubjectDs()
      })
      this.subject.push({
        firstSem: [],
        secondSem: []
      })
      this.addFormError.push({firstSem: '', secondSem: ''})
      this.editFormError.push({firstSem: '', secondSem: ''})
    }
  }

  removeYearLevel(){
    if(this.subject.length > 1){
      this.subject.pop()
      this.addForms.pop()
      this.isEditFormShow.pop()
      this.isAddFormShow.pop()
      this.isForms.pop()
      this.addFormError.pop()
      this.editFormError.pop()
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
  addFormError: any[] = []
  editFormError: any[] = []

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
      this.isEditFormShow.push({firstSem: false, secondSem:false})
      this.isAddFormShow.push({firstSem: false, secondSem:false})
      // this.isAddFormShow.push({firstSem: false, sencondSem:false})
      this.addFormError.push({firstSem: '', secondSem: ''})
      this.editFormError.push({firstSem: '', secondSem: ''})
      this.isForms.push({
        firstSem: this.getSubjectDs()
        ,secondSem: this.getSubjectDs()
      })

      this.addForms.push({
        firstSem: this.getSubjectDs(),
        secondSem: this.getSubjectDs()
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
    this.selectedCourse = {...this.selectedCourse, ...course}
    this.isEditFormShow.forEach((form:any) => {
      form.firstSem = false
      form.secondSem = false
    })
    this.editFormError.forEach((form:any) => {
      form.firstSem = false
      form.secondSem = false
    })
    this.isEditFormShow[yearLevel][sem] = true
  }

  cancelEditSub(yearLevel:number, sem:string){
    this.isEditFormShow[yearLevel][sem] = false
  }

  editCourse(form: NgForm, yearLevel:number, sem:string){
    const errors = []
    if(form.value.totalUnits > 5)
      errors.push('total units should not exceed 5')
    if(form.value.hoursPerWeek > 5)
      errors.push('hours per week should not exceed 5 hours')
    if(this.isSubjectAlreadyAdded(form.value, 'edit'))
      errors.push('subject is already added')
    if(this.isSubjectValid(form.value))
      errors.push('invalid subject')
    
    this.editFormError[yearLevel][sem] = errors.join(', ')

    if(errors.length == 0){
      this.subject[yearLevel][sem === 'firstSem' ? 'firstSem' : 'secondSem'][this.selectedSubjIndex] = 
      {...this.subject[yearLevel][sem === 'firstSem' ? 'firstSem' : 'secondSem'][this.selectedSubjIndex], ...form.value}
      this.isEditFormShow[yearLevel][sem] = false
      // this.selectedCourse = this.getSubjectDs()
    }
  }

  getSubjectDs(){
    return {  
      courseCode: '',
      descriptiveTitle: '',
      lecUnits: 0,
      labUnits: 0,
      totalUnits: 0,
      hoursPerWeek: 0,
      preReq: '',
      coReq: '',
    }
  }

  // adding subject
  addSubject(form: NgForm, yearLevel:number, sem:string){
    // if(!NgForm || form.value.preReq || form.value.coReq){
    const errors = []
    if(form.value.totalUnits > 5)
      errors.push('total units should not exceed 5')
    if(form.value.hoursPerWeek > 5)
      errors.push('hours per week should not exceed 5 hours')
    if(this.isSubjectAlreadyAdded(form.value))
      errors.push('subject is already added')
    if(this.isSubjectValid(form.value))
      errors.push('invalid subject')
    
    
    this.addFormError[yearLevel][sem] = errors.join(', ')
    
    if(errors.length == 0){
      if(sem === 'firstSem'){
        this.subject[yearLevel]['firstSem'].push(form.value)
        this.addForms[yearLevel]['firstSem'] = this.getSubjectDs()
        // form.reset();
        // this.removeAddForm(yearLevel, sem);
      }
      else{
        this.subject[yearLevel]['secondSem'].push(form.value)
        this.addForms[yearLevel]['secondSem'] = this.getSubjectDs()
        // form.reset();
        // this.removeAddForm(yearLevel, sem);
      }
    }
    // }
  }

  isSubjectAlreadyAdded(subjData: any, type?: string){
    
    const { courseCode, descriptiveTitle } = subjData
    let isAlreadyAdded = false
    this.subject.forEach(subs => {
      subs.firstSem.forEach(sub => {
        if(type){
          if(this.selectedCourse.courseCode != sub.courseCode && this.selectedCourse.descriptiveTitle != sub.descriptiveTitle){
            if(sub.courseCode == courseCode && sub.descriptiveTitle == descriptiveTitle) isAlreadyAdded = true
          }
        }else{
          if(sub.courseCode == courseCode && sub.descriptiveTitle == descriptiveTitle) isAlreadyAdded = true
        }
      })
      subs.secondSem.forEach(sub => {
        if(type){
          if(this.selectedCourse.courseCode != sub.courseCode && this.selectedCourse.descriptiveTitle != sub.descriptiveTitle){
            if(sub.courseCode == courseCode && sub.descriptiveTitle == descriptiveTitle) isAlreadyAdded = true
          }
        }else{
          if(sub.courseCode == courseCode && sub.descriptiveTitle == descriptiveTitle) isAlreadyAdded = true
        }
      })
    })
    return isAlreadyAdded
  }
  isSubjectValid(subjData: any){
    const { courseCode, descriptiveTitle } = subjData
    return !this.availableSubjects.some(subj => subj.subject_code == courseCode && subj.description == descriptiveTitle)
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