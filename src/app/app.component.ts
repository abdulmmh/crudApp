import { Component, OnInit } from '@angular/core';
import { StudentService } from './students.service';
import { Student } from './student.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  students: Student[] = [];
  departments: string[] = ['CSE', 'EEE', 'BSc'];

  student: Student = {
    name: '',
    email: '',
    department: '',
    gender: '',
    skills: [],
    Session: '',
    address: ''
  };

  editMode: boolean = false;
  editId!: number;
  showTable: boolean = false;

  constructor(private sts: StudentService) {}

  ngOnInit(): void {
    // this.loadStudents();
  }

  loadStudents(): void {
    this.sts.getAll().subscribe(data => {
      this.students = data;
      this.showTable = true;
    });
  }

  onSkillChange(event: any, skill: string): void {
    if (event.target.checked) {
      if (!this.student.skills.includes(skill)) {
        this.student.skills.push(skill);
      }
    } else {
      this.student.skills = this.student.skills.filter(s => s !== skill);
    }
  }

  resetForm(): void {
    this.student = {
      name: '',
      email: '',
      department: '',
      gender: '',
      skills: [],
      Session: '',
      address: ''
    };

    this.editMode = false;
  }

  saveStudent(form: any): void {
    if (form.invalid) {
      return;
    }

    if (this.editMode) {
      this.sts.update(this.editId, this.student).subscribe(() => {
        this.loadStudents();
        this.resetForm();
        form.resetForm();
      });
    } else {
      this.sts.insert(this.student).subscribe(() => {
        this.loadStudents();
        this.resetForm();
        form.resetForm();
      });
    }
  }

  editStudent(s: Student): void {
    this.student = { ...s };
    this.editId = s.id!;
    this.editMode = true;
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure?')) {
      this.sts.delete(id).subscribe(() => {
        this.loadStudents();
      });
    }
  }
}