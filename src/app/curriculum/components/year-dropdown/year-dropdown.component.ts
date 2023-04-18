import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EventManager } from '@angular/platform-browser';
import { map, tap } from 'rxjs';
import { Curriculum2 } from 'src/app/core/models/curriculum';
import { Department } from 'src/app/core/models/department';
import { AuthService } from 'src/app/core/services/auth.service';
import { DepartmentService } from 'src/app/core/services/department.service';
import { SubjectService } from 'src/app/core/services/subject.service';
import { PdfViewerComponent } from 'src/app/shared/components/pdf-viewer/pdf-viewer.component';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
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
  syllabus: string
}

@Component({
  selector: 'app-year-dropdown',
  templateUrl: './year-dropdown.component.html',
  styleUrls: ['./year-dropdown.component.css']
})
export class YearDropdownComponent {
  constructor(private subjectService: SubjectService,
              private authService: AuthService,
              private departmentService: DepartmentService,
              private dialog: MatDialog
    ){}
  departments: Department[] | undefined
  departments$ = this.departmentService.departments$.subscribe({
    next: departments => {      
      this.departments = departments
    }
  })

  getDepartment(){
    return this.departments?.find(dep => dep.id == Number(this.department))?.department_code
  }

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
  @Input() department:string = ''
  @Input() dep:number|null = null

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
      
      if(isValid){
        this.addForms[yearLevel][sem].descriptiveTitle = isValid.description
        this.addForms[yearLevel][sem].syllabus = isValid.syllabus_path
        console.log(isValid.syllabus_path);
      }
    }
    onDescriptionSelected(event:any, yearLevel: number, sem: string){
      const description = event.option.value
      const isValid = this.availableSubjects.find(subj => subj.description == description)      
      if(isValid){
        this.addForms[yearLevel][sem].courseCode = isValid.subject_code
        this.addForms[yearLevel][sem].syllabus = isValid.syllabus_path
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

  viewSyllabus(path: string){
    console.log(path);
    
    const dialogRef = this.dialog.open(PdfViewerComponent, {
      data: {
        ref: path
      }
    });
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
      const syllabus = this.availableSubjects.find(subj => subj.subject_code == form.value.courseCode).syllabus_path
      this.subject[yearLevel][sem === 'firstSem' ? 'firstSem' : 'secondSem'][this.selectedSubjIndex] = 
      {...this.subject[yearLevel][sem === 'firstSem' ? 'firstSem' : 'secondSem'][this.selectedSubjIndex], ...form.value, syllabus: syllabus}
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
      const syllabus = this.availableSubjects.find(subj => subj.subject_code == form.value.courseCode).syllabus_path
      if(sem === 'firstSem'){
        this.subject[yearLevel]['firstSem'].push({...form.value, syllabus: syllabus})
        this.addForms[yearLevel]['firstSem'] = this.getSubjectDs()
        console.log({...form.value, syllabus: syllabus});
        
        // form.reset();
        // this.removeAddForm(yearLevel, sem);
      }
      else{
        this.subject[yearLevel]['secondSem'].push({...form.value, syllabus: syllabus})
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

  public convertToPDF(){
    let pdf = new jsPDF('p','mm','a4');

    function addHeader() {
    var bulsuLogoSrc = 'assets/bulsu.png';
    var cictLogoSrc = 'assets/logo-cict.png';
    pdf.addImage(bulsuLogoSrc, 'PNG', 30, 3, 25, 25);
    pdf.addImage(cictLogoSrc, 'PNG', 155, 3, 25, 25);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "bold");
    pdf.text('Republic of the Philippines',105,15,{align: 'center'});
    pdf.text('Bulacan State University',105,20,{align: 'center'});
    pdf.setFont("helvetica", "normal");
    pdf.text('City Of Malolos Bulacan',105,25,{align: 'center'});
    pdf.text('Tel/Fax (044) 791-0153',105,30,{align: 'center'});
    pdf.setFont("helvetica", "bold");
    pdf.text('College of Information and Communications Technology',105,35,{align: 'center'});
    pdf.line(20,38,190,38)
    pdf.setFont("times new roman", "bold");
    pdf.text('BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY',105,50,{align: 'center'});
    pdf.setFont("times new roman", "normal");
    pdf.text('(Based on CMO No. 25 s 2015)',105,55,{align: 'center'});
    }


let tableMargin = 65;


const firstYear = this.subject[0];
if(firstYear){
const firstYearFirstSem = firstYear.firstSem.map((subject) => ({
  "Course": subject.courseCode,
  "Descriptive Title": subject.descriptiveTitle,
  "Lec Units": subject.lecUnits.toString() || '0',
  "Lab Units": subject.lecUnits.toString() || '0',
  "Total Units": subject.totalUnits.toString() || '0',
  "Hours Per Week": subject.hoursPerWeek.toString() || '0',
  "Pre Req": subject.preReq || 'NONE',
  "Co Req": subject.coReq || 'NONE',
}));
let infofirstYear: string[][] = [];
firstYearFirstSem.forEach((element,index,array)=>{
  infofirstYear.push([element.Course,element['Descriptive Title'],element['Lec Units'],element['Lab Units'],element['Total Units'],element['Hours Per Week'],element['Pre Req'],element['Co Req']])
});


const firstYearsecondSem = firstYear.secondSem.map((subject) => ({
  "Course": subject.courseCode,
  "Descriptive Title": subject.descriptiveTitle,
  "Lec Units": subject.lecUnits.toString() || '0',
  "Lab Units": subject.lecUnits.toString() || '0',
  "Total Units": subject.totalUnits.toString() || '0',
  "Hours Per Week": subject.hoursPerWeek.toString() || '0',
  "Pre Req": subject.preReq || 'NONE',
  "Co Req": subject.coReq || 'NONE',
}));
let infofirstYearSecondSem: string[][] = [];
firstYearsecondSem.forEach((element,index,array)=>{
  infofirstYearSecondSem.push([element.Course,element['Descriptive Title'],element['Lec Units'],element['Lab Units'],element['Total Units'],element['Hours Per Week'],element['Pre Req'],element['Co Req']])
});

addHeader()
  autoTable(pdf,{
    styles: {
      fontSize: 8,
       cellWidth:"auto", 
       halign:'center',
       lineWidth: 0.3,
       lineColor: 10,
       font: 'times new roman'
      },
    head:[[
      {content: 'FIRST YEAR', colSpan: 8, styles: {halign: 'center', fillColor: [202, 202, 202]}}
    ],
    [{content: 'FIRST SEMESTER', colSpan: 8, styles: {halign: 'left'}}]
      ,['Course', 'Descriptive Title', 'Lec Units','Lab Units','Total Units','Hours Per Week','Pre Req','Co Req']],
    body: infofirstYear,
    theme:'plain',
    columnStyles: {0:{halign: 'center'}},
    startY: tableMargin,
  })
  autoTable(pdf,{
    styles: {
      fontSize: 8,
       cellWidth:"auto", 
       halign:'center',
       lineWidth: 0.3,
       lineColor: 10,
       font: 'times new roman'
      },
    head:[
    [{content: 'SECOND SEMESTER', colSpan: 8, styles: {halign: 'left'}}]
      ,['Course', 'Descriptive Title', 'Lec Units','Lab Units','Total Units','Hours Per Week','Pre Req','Co Req']],
    body: infofirstYearSecondSem,
    theme:'plain',
    columnStyles: {0:{halign: 'center'}},
    //startY: tableMargin, 
  })}

const secondYear = this.subject[1];
if(secondYear){
const secondYearFirstSem = secondYear.firstSem.map((subject) => ({
  "Course": subject.courseCode,
  "Descriptive Title": subject.descriptiveTitle,
  "Lec Units": subject.lecUnits.toString() || '0',
  "Lab Units": subject.lecUnits.toString() || '0',
  "Total Units": subject.totalUnits.toString() || '0',
  "Hours Per Week": subject.hoursPerWeek.toString() || '0',
  "Pre Req": subject.preReq || 'NONE',
  "Co Req": subject.coReq || 'NONE',
}));
let infoSecondYear: string[][] = [];
secondYearFirstSem.forEach((element,index,array)=>{
  infoSecondYear.push([element.Course,element['Descriptive Title'],element['Lec Units'],element['Lab Units'],element['Total Units'],element['Hours Per Week'],element['Pre Req'],element['Co Req']])
});

const secondYearSecondSem = secondYear.secondSem.map((subject) => ({
  "Course": subject.courseCode,
  "Descriptive Title": subject.descriptiveTitle,
  "Lec Units": subject.lecUnits.toString() || '0',
  "Lab Units": subject.lecUnits.toString() || '0',
  "Total Units": subject.totalUnits.toString() || '0',
  "Hours Per Week": subject.hoursPerWeek.toString() || '0',
  "Pre Req": subject.preReq || 'NONE',
  "Co Req": subject.coReq || 'NONE',
}));
let infoSecondYearSecondSem: string[][] = [];
secondYearSecondSem.forEach((element,index,array)=>{
  infoSecondYearSecondSem.push([element.Course,element['Descriptive Title'],element['Lec Units'],element['Lab Units'],element['Total Units'],element['Hours Per Week'],element['Pre Req'],element['Co Req']])
});

 //second year
 pdf.addPage();
 addHeader()
autoTable(pdf,{
  styles: {
    fontSize: 8,
     cellWidth:"auto", 
     halign:'center',
     lineWidth: 0.3,
     lineColor: 10,
     font: 'times new roman'
    },
  head:[[
    {content: 'SECOND YEAR', colSpan: 8, styles: {halign: 'center', fillColor: [202, 202, 202]}}
  ],
  [{content: 'FIRST SEMESTER', colSpan: 8, styles: {halign: 'left'}}]
    ,['Course', 'Descriptive Title', 'Lec Units','Lab Units','Total Units','Hours Per Week','Pre Req','Co Req']],
  body: infoSecondYear,
  theme:'plain',
  columnStyles: {0:{halign: 'center'}},
  startY: tableMargin,
  
  
})
autoTable(pdf,{
  styles: {
    fontSize: 8,
     cellWidth:"auto", 
     halign:'center',
     lineWidth: 0.3,
     lineColor: 10,
     font: 'times new roman'
    },
  head:[
  [{content: 'SECOND SEMESTER', colSpan: 8, styles: {halign: 'left'}}]
    ,['Course', 'Descriptive Title', 'Lec Units','Lab Units','Total Units','Hours Per Week','Pre Req','Co Req']],
  body: infoSecondYearSecondSem,
  theme:'plain',
  columnStyles: {0:{halign: 'center'}},
  //startY: tableMargin,
  
  
})}

const thirdYear = this.subject[2];
if(thirdYear){
const thirdYearFirstSem = thirdYear.firstSem.map((subject) => ({
  "Course": subject.courseCode,
  "Descriptive Title": subject.descriptiveTitle,
  "Lec Units": subject.lecUnits.toString() || '0',
  "Lab Units": subject.lecUnits.toString() || '0',
  "Total Units": subject.totalUnits.toString() || '0',
  "Hours Per Week": subject.hoursPerWeek.toString() || '0',
  "Pre Req": subject.preReq || 'NONE',
  "Co Req": subject.coReq || 'NONE',
}));
let infoThirdYear: string[][] = [];
thirdYearFirstSem.forEach((element,index,array)=>{
  infoThirdYear.push([element.Course,element['Descriptive Title'],element['Lec Units'],element['Lab Units'],element['Total Units'],element['Hours Per Week'],element['Pre Req'],element['Co Req']])
});

const thirdYearSecondSem = thirdYear.secondSem.map((subject) => ({
  "Course": subject.courseCode,
  "Descriptive Title": subject.descriptiveTitle,
  "Lec Units": subject.lecUnits.toString() || '0',
  "Lab Units": subject.lecUnits.toString() || '0',
  "Total Units": subject.totalUnits.toString() || '0',
  "Hours Per Week": subject.hoursPerWeek.toString() || '0',
  "Pre Req": subject.preReq || 'NONE',
  "Co Req": subject.coReq || 'NONE',
}));
let infoThirdYearSecondSem: string[][] = [];
thirdYearSecondSem.forEach((element,index,array)=>{
  infoThirdYearSecondSem.push([element.Course,element['Descriptive Title'],element['Lec Units'],element['Lab Units'],element['Total Units'],element['Hours Per Week'],element['Pre Req'],element['Co Req']])
});
//third year
pdf.addPage();
addHeader()
autoTable(pdf,{
 styles: {
   fontSize: 8,
    cellWidth:"auto", 
    halign:'center',
    lineWidth: 0.3,
    lineColor: 10,
    font: 'times new roman'
   },
 head:[[
   {content: 'THIRD YEAR', colSpan: 8, styles: {halign: 'center', fillColor: [202, 202, 202]}}
 ],
 [{content: 'FIRST SEMESTER', colSpan: 8, styles: {halign: 'left'}}]
   ,['Course', 'Descriptive Title', 'Lec Units','Lab Units','Total Units','Hours Per Week','Pre Req','Co Req']],
 body: infoThirdYear,
 theme:'plain',
 columnStyles: {0:{halign: 'center'}},
 startY: tableMargin,
 
 
})
autoTable(pdf,{
 styles: {
   fontSize: 8,
    cellWidth:"auto", 
    halign:'center',
    lineWidth: 0.3,
    lineColor: 10,
    font: 'times new roman'
   },
 head:[
 [{content: 'SECOND SEMESTER', colSpan: 8, styles: {halign: 'left'}}]
   ,['Course', 'Descriptive Title', 'Lec Units','Lab Units','Total Units','Hours Per Week','Pre Req','Co Req']],
 body: infoThirdYearSecondSem,
 theme:'plain',
 columnStyles: {0:{halign: 'center'}},
 //startY: tableMargin,
 
 
})}


const fourthYear = this.subject[3];
if(fourthYear){
const fuorthYearFirstSem = fourthYear.firstSem.map((subject) => ({
  "Course": subject.courseCode,
  "Descriptive Title": subject.descriptiveTitle,
  "Lec Units": subject.lecUnits.toString() || '0',
  "Lab Units": subject.lecUnits.toString() || '0',
  "Total Units": subject.totalUnits.toString() || '0',
  "Hours Per Week": subject.hoursPerWeek.toString() || '0',
  "Pre Req": subject.preReq || 'NONE',
  "Co Req": subject.coReq || 'NONE',
}));
let infoFourthYear: string[][] = [];
fuorthYearFirstSem.forEach((element,index,array)=>{
  infoFourthYear.push([element.Course,element['Descriptive Title'],element['Lec Units'],element['Lab Units'],element['Total Units'],element['Hours Per Week'],element['Pre Req'],element['Co Req']])
});

const fourthYearSecondSem = fourthYear.secondSem.map((subject) => ({
  "Course": subject.courseCode,
  "Descriptive Title": subject.descriptiveTitle,
  "Lec Units": subject.lecUnits.toString() || '0',
  "Lab Units": subject.lecUnits.toString() || '0',
  "Total Units": subject.totalUnits.toString() || '0',
  "Hours Per Week": subject.hoursPerWeek.toString() || '0',
  "Pre Req": subject.preReq || 'NONE',
  "Co Req": subject.coReq || 'NONE',
}));
let infofourthYearSecondSem: string[][] = [];
fourthYearSecondSem.forEach((element,index,array)=>{
  infofourthYearSecondSem.push([element.Course,element['Descriptive Title'],element['Lec Units'],element['Lab Units'],element['Total Units'],element['Hours Per Week'],element['Pre Req'],element['Co Req']])
});
  //fourth year
  pdf.addPage();
  addHeader()
  autoTable(pdf,{
    styles: {
      fontSize: 8,
       cellWidth:"auto", 
       halign:'center',
       lineWidth: 0.3,
       lineColor: 10,
       font: 'times new roman'
      },
    head:[[
      {content: 'FOURTH YEAR', colSpan: 8, styles: {halign: 'center', fillColor: [202, 202, 202]}}
    ],
    [{content: 'FIRST SEMESTER', colSpan: 8, styles: {halign: 'left'}}]
      ,['Course', 'Descriptive Title', 'Lec Units','Lab Units','Total Units','Hours Per Week','Pre Req','Co Req']],
    body: infoFourthYear,
    theme:'plain',
    columnStyles: {0:{halign: 'center'}},
    startY: tableMargin,
    
    
  })
  autoTable(pdf,{
    styles: {
      fontSize: 8,
       cellWidth:"auto", 
       halign:'center',
       lineWidth: 0.3,
       lineColor: 10,
       font: 'times new roman'
      },
    head:[
    [{content: 'SECOND SEMESTER', colSpan: 8, styles: {halign: 'left'}}]
      ,['Course', 'Descriptive Title', 'Lec Units','Lab Units','Total Units','Hours Per Week','Pre Req','Co Req']],
    body: infofourthYearSecondSem,
    theme:'plain',
    columnStyles: {0:{halign: 'center'}},
    //startY: tableMargin,
  })
}

    
    var sample = pdf.output('datauristring',{filename:'Curriculum'});
    var pdfWindow = window.open("Curriculum");
    if(pdfWindow)
    pdfWindow.document.write("<iframe width='100%' height='100%' src='" + sample + "'></iframe>");
  }
}