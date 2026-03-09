import { Component } from '@angular/core';
import { StudentService } from './students.service';
import { Student } from './student.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  students: Student[] = [];


  student: Student = {
    id: 0,
    name: '',
    email: '',
    department: '',
    gender: '',          
    skills: [], 
    year: '' 
  };

  editMode: boolean = false;
  editId!: number;
  showTable: boolean =  false;

  constructor(private sts: StudentService){}

  ngOnInit() {
      this.loadStudents();
  }
   

  loadStudents(){
    this.sts.getAll().subscribe(data => {
      this.students = data;
      this.showTable = true;
    });
  }

  resetForm(){
    this.student = {
      name: '',
      email: '',
      department: '',
      gender: '',          
      skills: [], 
      year: '' 
    };

    this.editMode = false;
  }

  saveStudent(form: any){
    if (form.invalid) {
      return;
    }
    if (this.editMode) {
      this.sts.update(this.editId, this.student).subscribe(() => {
        this.loadStudents();
        this.resetForm();
      });
    } else {
      this.sts.insert(this.student).subscribe(() =>{
        this.loadStudents();
        this.resetForm();
      });
    }
  }

  editStudent(s: Student) {
    this.student = {...s};
    this.editId = s.id!;
    this.editMode = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure?')) {
      this.sts.delete(id).subscribe(() => {
        this.loadStudents();
      });
    }
  }

}
