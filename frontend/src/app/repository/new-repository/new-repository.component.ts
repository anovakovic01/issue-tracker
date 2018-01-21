import { AuthService } from './../../core/auth/auth.service';
import { RepositoryService } from './../shared/repository.service';
import { SharedModule } from '../../shared/shared.module';
import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { UserService } from '../../user/shared/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OwnedRepositoriesComponent } from '../owned-repositories/owned-repositories.component';
import { User } from '../../core/auth/user.model';
import { RepositorySave } from '../shared/repository-save.model';


@Component({
    selector: 'it-new-repository',
    templateUrl: './new-repository.component.html',
    styleUrls: ['./new-repository.component.css']
  })
  export class NewRepositoryComponent implements OnInit {

    form: FormGroup;
    users: User[];
    control: FormControl = new FormControl();
    repository: RepositorySave = new RepositorySave();

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<NewRepositoryComponent>,
        private userService: UserService,
        private repositoryService: RepositoryService,
        private authService: AuthService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
        name: ['', Validators.required],
        url: ['', Validators.required],
        description: ['', Validators.required]
        });
        this.userService.getAll().subscribe(data => {
            this.users = data.filter(user => user.id !== this.authService.user.id);
        });
    }

    submit(form) {
        if (form.valid) {
            this.repository.name = form.value.name;
            this.repository.url = form.value.url;
            this.repository.description = form.value.description;
            this.repository.ownerId = this.authService.user.id;
            this.repository.contributors = this.control.value.map(contributor => contributor.id);

            this.repositoryService.saveRepository(this.repository).subscribe(repository => {
                this.dialogRef.close(repository);
            }
            );
        }
    }

    get name() { return this.form.get('name'); }
    get url() { return this.form.get('url'); }
    get description() { return this.form.get('description'); }
  }

