import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-pop-ups',
  templateUrl: './pop-ups.component.html',
  styleUrls: ['./pop-ups.component.css']
})
export class PopUpsComponent implements OnInit {

  selected_item:any;
  add_item: FormGroup;
  categories:any;
  message: string;
  imagePath: any;
  imgURL: string | ArrayBuffer;
  default_category: any;
  constructor(public dialogRef: MatDialogRef<PopUpsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private menuService:MenuService,
    private fb:FormBuilder,) { 
      this.add_item = this.fb.group({
        name : ['', Validators.required],
        category : ['', Validators.required],
        price : ['', Validators.required],
        image : ['']
      });
    }

  ngOnInit(): void {

    console.log(this.data);
    this.selected_item = this.data.comp[0];
    this.get_data();
  }

  get_data(){
    this.menuService.get_categories().subscribe(data=>{
      this.categories = data['categories']['categories']
      console.log(this.categories)
    })
  }

  
  preview(files) {
    if (files.length === 0)
      return;
    this.add_item.value.image = files.item(0);
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    console.log(this.imagePath)
    reader.readAsDataURL(files[0]); 

    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  onSubmit(){
    console.log(this.add_item)
    console.log(this.add_item)
    this.menuService.add_an_item(this.add_item.value.name,this.add_item.value.category,
      this.add_item.value.price,this.add_item.value.image).subscribe(data=>{
        console.log("uploaded");
      })
  }

}
